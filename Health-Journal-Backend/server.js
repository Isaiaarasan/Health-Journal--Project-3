require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5175', 'https://health-journal-project-3.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use((req, res, next) => {
    console.log(`Received ${req.method} request to ${req.path}`);
    next();
});
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://arasan:17652000@health-journal.xxwey.mongodb.net/healthjournal', {
    dbName: 'healthjournal'
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});
const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        lowercase: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });

userSchema.pre('save', function(next) {
    next();
});
userSchema.pre('save', function(next) {
    if (!this.email) {
        return next(new Error('Email is required'));
    }
    if (!this.password) {
        return next(new Error('Password is required'));
    }
    next();
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model('User', userSchema);
app.post('/api/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new User({ email, password });
        await user.save();
        const defaultProfile = new Profile({
            userId: user._id,
            firstName: email.split('@')[0], 
            lastName: 'User', 
            email: email 
        });
        await defaultProfile.save();

        res.status(201).json({ 
            message: 'User created successfully', 
            userId: user._id 
        });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ 
            message: 'Signup failed', 
            error: error.message 
        });
    }
});
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        console.log('User Login Details:', {
            userId: user._id,
            email: user.email
        });
        const userData = {
            userId: user._id,
            email: user.email
        };

        res.json({ 
            message: 'Login successful',
            ...userData
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: 'Login failed', 
            error: error.message 
        });
    }
});

app.get('/api/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userData = {
            id: user._id,
            email: user.email
        };

        res.status(200).json(userData);
    } catch (error) {
        console.error('Get User Data Error:', error);
        res.status(500).json({ 
            message: 'Failed to retrieve user data', 
            error: error.message 
        });
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
const medicalHistorySchema = new mongoose.Schema({
    date: { type: Date, required: true },
    diagnosis: { type: String, required: true },
    medications: { type: String, required: true },
    doctor: { type: String, required: true }
});
const MedicalHistory = mongoose.model("MedicalHistory", medicalHistorySchema);
app.get("/api/medical-history", async (req, res) => {
    try {
        console.log("🔍 Fetching medical history...");
        const history = await MedicalHistory.find();
        res.status(200).json(history);
    } catch (error) {
        console.error("❌ Error fetching medical history:", error.message, error.stack);
        res.status(500).json({ message: "Failed to fetch medical history", error: error.message });
    }
});
app.post("/api/medical-history", async (req, res) => {
    try {
        const { date, diagnosis, medications, doctor } = req.body;
        if (!date || !diagnosis || !medications || !doctor) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newRecord = new MedicalHistory({ date, diagnosis, medications, doctor });
        await newRecord.save();

        res.status(201).json({ message: "Medical history record added", record: newRecord });
    } catch (error) {
        console.error("❌ Error adding medical history:", error.message, error.stack);
        res.status(500).json({ message: "Failed to add medical history", error: error.message });
    }
});
const MedicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  time: { type: String, required: true }
});

const Medication = mongoose.model('Medication', MedicationSchema);
app.get('/api/medications', async (req, res) => {
  try {
    const medications = await Medication.find();
    res.status(200).json(medications);
  } catch (error) {
    console.error('Error fetching medications:', error);
    res.status(500).json({ message: 'Failed to fetch medications', error: error.message });
  }
});
app.post('/api/medications', async (req, res) => {
  try {
    const { name, dosage, time } = req.body;
    const newMedication = new Medication({ name, dosage, time });
    await newMedication.save();
    res.status(201).json(newMedication);
  } catch (error) {
    console.error('Error adding medication:', error);
    res.status(500).json({ message: 'Failed to add medication', error: error.message });
  }
});
app.put('/api/medications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, dosage, time } = req.body;
    const updatedMedication = await Medication.findByIdAndUpdate(
      id, 
      { name, dosage, time }, 
      { new: true }
    );
    
    if (!updatedMedication) {
      return res.status(404).json({ message: 'Medication not found' });
    }
    
    res.status(200).json(updatedMedication);
  } catch (error) {
    console.error('Error updating medication:', error);
    res.status(500).json({ message: 'Failed to update medication', error: error.message });
  }
});
app.delete('/api/medications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMedication = await Medication.findByIdAndDelete(id);
    
    if (!deletedMedication) {
      return res.status(404).json({ message: 'Medication not found' });
    }
    
    res.status(200).json({ message: 'Medication deleted successfully' });
  } catch (error) {
    console.error('Error deleting medication:', error);
    res.status(500).json({ message: 'Failed to delete medication', error: error.message });
  }
});
const ProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    address: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    profilePicture: {
        type: String,
        trim: true
    }
}, { timestamps: true });
const Profile = mongoose.model('Profile', ProfileSchema);
app.post('/api/profile', async (req, res) => {
    console.log('Received Profile Creation Request:', req.body);

    try {
        const { 
            userId, 
            firstName, 
            lastName, 
            dateOfBirth, 
            gender, 
            address, 
            phoneNumber, 
            profilePicture,
            email 
        } = req.body;
        if (!userId) {
            console.error('Profile Creation Error: No User ID provided');
            return res.status(400).json({ message: 'User ID is required' });
        }

        if (!firstName || !lastName) {
            console.error('Profile Creation Error: First Name or Last Name missing', { firstName, lastName });
            return res.status(400).json({ message: 'First Name and Last Name are required' });
        }

        if (!email) {
            console.error('Profile Creation Error: Email is required');
            return res.status(400).json({ message: 'Email is required' });
        }
        const userExists = await User.findById(userId);
        if (!userExists) {
            console.error('Profile Creation Error: User not found', { userId });
            return res.status(404).json({ message: 'User not found' });
        }
        let existingProfile = await Profile.findOne({ userId });

        if (existingProfile) {
            existingProfile.firstName = firstName;
            existingProfile.lastName = lastName;
            existingProfile.dateOfBirth = dateOfBirth;
            existingProfile.gender = gender;
            existingProfile.address = address;
            existingProfile.phoneNumber = phoneNumber;
            existingProfile.profilePicture = profilePicture;
            existingProfile.email = email;

            await existingProfile.save();
            
            console.log('Profile Updated Successfully:', { userId, firstName, lastName });
            return res.status(200).json({ 
                message: 'Profile updated successfully', 
                profile: existingProfile 
            });
        }
        const newProfile = new Profile({
            userId,
            firstName,
            lastName,
            dateOfBirth,
            gender,
            address,
            phoneNumber,
            profilePicture,
            email
        });

        await newProfile.save();

        console.log('New Profile Created Successfully:', { userId, firstName, lastName });
        res.status(201).json({ 
            message: 'Profile created successfully', 
            profile: newProfile 
        });
    } catch (error) {
        console.error('Profile Creation Error:', {
            message: error.message,
            stack: error.stack,
            requestBody: req.body
        });
        res.status(500).json({ 
            message: 'Profile creation failed', 
            error: error.message 
        });
    }
});

// Get Profile Route
app.get('/api/profile/:userId', async (req, res) => {
    console.log('Received Profile Fetch Request:', req.params);

    try {
        const { userId } = req.params;
        if (!userId) {
            console.error('Profile Fetch Error: No User ID provided');
            return res.status(400).json({ message: 'User ID is required' });
        }
        const userExists = await User.findById(userId);
        if (!userExists) {
            console.error('Profile Fetch Error: User not found', { userId });
            return res.status(404).json({ message: 'User not found' });
        }

        const profile = await Profile.findOne({ userId });

        if (!profile) {
            console.log('No Profile Found for User:', { userId });
            return res.status(404).json({ message: 'Profile not found' });
        }

        console.log('Profile Retrieved Successfully:', { userId });
        res.status(200).json(profile);
    } catch (error) {
        console.error('Profile Fetch Error:', {
            message: error.message,
            stack: error.stack,
            userId: req.params.userId
        });
        res.status(500).json({ 
            message: 'Failed to retrieve profile', 
            error: error.message 
        });
    }
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
