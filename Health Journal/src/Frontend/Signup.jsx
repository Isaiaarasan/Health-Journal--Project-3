import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/signup.css';  // Importing the external CSS file

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch('https://health-journal-project-3.onrender.com/api/signup', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Signup successful! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page
                }, 2000);
            } else {
                setError(data.message || 'Signup failed. Please try again.');
            }
        } catch (err) {
            setError('Network error. Please try again later.');
            console.error('Signup error:', err);
        }
    };

    return (
        <div className="form-container">
            <h2 className="title">Signup</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="signup-email">Email:</label>
                <input
                    type="email"
                    id="signup-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="signup-password">Password:</label>
                <input
                    type="password"
                    id="signup-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="signup-button">Signup</button>
            </form>
            <p className="switch-link">
                Already have an account?{' '}
                <span
                    onClick={() => navigate('/login')}
                    className="link">
                    Login
                </span>
            </p>
        </div>
    );
};

export default Signup;
