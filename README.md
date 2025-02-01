# Health Journal Project

## Overview
A comprehensive health tracking application designed to help users monitor their medical history, symptoms, and personal health information.

## Project Structure
```
Health Journal- P3/
│
├── Health-Journal-Backend/
│   ├── server.js          # Main backend server configuration
│   ├── package.json       # Backend dependencies
│   └── .env               # Environment configuration
│
├── Health Journal/
│   ├── src/
│   │   ├── Frontend/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Profile Settings.jsx
│   │   │   ├── Medical History.jsx
│   │   │   └── Symptom Tracker.jsx
│   │   └── CSS/           # Styling files
│   ├── package.json       # Frontend dependencies
│   └── .env               # Frontend environment configuration
│
└── README.md              # Project documentation
```

## Features
- User Authentication
- Profile Management
- Medical History Tracking
- Symptom Tracking
- Dashboard Overview

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- MongoDB Atlas account

### Backend Setup
1. Navigate to the backend directory
```bash
cd Health-Journal-Backend
npm install
```

2. Create a `.env` file with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5001
```

3. Start the backend server
```bash
npm start
```

### Frontend Setup
1. Navigate to the frontend directory
```bash
cd "Health Journal"
npm install
```

2. Create a `.env` file with the following variable:
```
VITE_API_URL=http://localhost:5001
```

3. Start the frontend development server
```bash
npm run dev
```

## Technologies Used
- Frontend: React, Vite
- Backend: Express.js, Node.js
- Database: MongoDB
- Authentication: JWT
- Styling: CSS

## Current Project Status
- Basic authentication implemented
- Profile and medical history tracking
- Simplified component structure

## Future Improvements
- Implement more robust error handling
- Add comprehensive form validations
- Enhance state management
- Improve UI/UX
- Add more detailed health tracking features

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Distributed under the MIT License.

## Contact
Elavarasan - arasan9706@gmail.com

Project Link: [Your Project Repository URL]
```
