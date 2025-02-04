import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/profile-settings.css';

const API_URL = 'https://health-journal-project-3.onrender.com';

const ProfileSettings = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: localStorage.getItem('email') || '',
        dateOfBirth: '',
        gender: '',
        address: '',
        phoneNumber: '',
        profilePicture: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const userId = localStorage.getItem('userId');
            
            if (!userId) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(`${API_URL}/api/profile/${userId}`);
                setProfile(response.data);
            } catch (err) {
                console.log('No existing profile found:', err.response?.data?.message || err.message);
                setProfile({
                    userId,
                    firstName: '',
                    lastName: '',
                    email: localStorage.getItem('email') || '',
                    dateOfBirth: '',
                    gender: '',
                    address: '',
                    phoneNumber: '',
                    profilePicture: ''
                });
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('No user ID found. Please log in again.');
            }
            if (!profile.email || !profile.email.includes('@')) {
                setError('Please enter a valid email address');
                setLoading(false);
                return;
            }
            const profileData = {
                userId,
                ...profile
            };

            const response = await axios.post(`${API_URL}/api/profile`, profileData);
            localStorage.setItem('email', profile.email);
            alert('Profile updated successfully!');
            navigate('/dashboard');
        } catch (err) {
            console.error('Profile update error:', err);
            setError(err.response?.data?.message || 'Profile update failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-settings-container">
            <h2>Profile Settings</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={profile.dateOfBirth}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        value={profile.gender}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={profile.address}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={profile.phoneNumber}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="profilePicture">Profile Picture URL</label>
                    <input
                        type="url"
                        id="profilePicture"
                        name="profilePicture"
                        value={profile.profilePicture}
                        onChange={handleInputChange}
                    />
                </div>

                <button 
                    type="submit" 
                    className="save-profile-btn"
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save Profile'}
                </button>
            </form>
        </div>
    );
};

export default ProfileSettings;
