const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({ origin: "*" }));

const connectWithRetry = async () => {
    try {
        console.log('Attempting to connect to MongoDB Atlas...');
        console.log('Connection URI:', process.env.MONGODB_URI.replace(/:(.*?)@/, ':****@'));
        
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'healthjournal'
        });
        
        console.log('✅ Successfully connected to MongoDB Atlas');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', {
            message: err.message,
            name: err.name,
            stack: err.stack,
            code: err.code
        });
        console.log('Retrying connection in 5 seconds...');
        setTimeout(connectWithRetry, 5000);
    }
};

connectWithRetry();

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);

app.post("/api/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token, userId: user._id });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

const SymptomSchema = new mongoose.Schema({
  symptom: { type: String, required: true },
  severity: { type: String, required: true },
  date: { type: Date, required: true },
  notes: { type: String }
});

const Symptom = mongoose.model("Symptom", SymptomSchema);
app.post("/api/symptoms", async (req, res) => {
  try {
    const { symptom, severity, date, notes } = req.body;
    if (!symptom || !severity || !date) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const newSymptom = new Symptom({ 
      symptom, 
      severity, 
      date: parsedDate, 
      notes: notes || '' 
    });
    
    await newSymptom.save();

    console.log('Symptom saved successfully:', newSymptom);
    res.status(201).json({ 
      message: "Symptom recorded successfully", 
      symptomId: newSymptom._id 
    });
  } catch (error) {
    console.error("Detailed Error recording symptom:", {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    res.status(500).json({ 
      message: "Failed to record symptom", 
      error: error.message 
    });
  }
});

app.delete("/api/symptoms/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Symptom.findByIdAndDelete(id);
    res.status(200).json({ message: "Symptom deleted successfully" });
  } catch (error) {
    console.error("Error deleting symptom:", error);
    res.status(500).json({ message: "Failed to delete symptom", error: error.message });
  }
});

app.get("/api/symptoms", async (req, res) => {
  try {
    const symptoms = await Symptom.find();
    res.status(200).json(symptoms);
  } catch (error) {
    console.error("Error fetching symptoms:", error);
    res.status(500).json({ message: "Failed to fetch symptoms", error: error.message });
  }
});

const MedicalHistorySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  diagnosis: { type: String, required: true },
  medications: { type: String, required: true },
  doctor: { type: String, required: true },
});

const MedicalHistory = mongoose.model("MedicalHistory", MedicalHistorySchema);

app.post("/medical-history", async (req, res) => {
  try {
    const { date, diagnosis, medications, doctor } = req.body;

    if (!date || !diagnosis || !medications || !doctor) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRecord = new MedicalHistory({ date, diagnosis, medications, doctor });
    await newRecord.save();

    res.status(201).json({ message: "Medical history added successfully", record: newRecord });
  } catch (error) {
    console.error("Error adding medical history:", error);
    res.status(500).json({ message: "Failed to add medical history", error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5001;
const findAvailablePort = (port) => {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      const actualPort = server.address().port;
      server.close(() => {
        resolve(actualPort);
      });
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        findAvailablePort(port + 1).then(resolve).catch(reject);
      } else {
        reject(err);
      }
    });
  });
};

findAvailablePort(PORT)
  .then((availablePort) => {
    app.listen(availablePort, () => {
      console.log(`Server running on port ${availablePort}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server:', err);
  });
