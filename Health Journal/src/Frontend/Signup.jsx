import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch('https://health-journal-project-3-api.vercel.app/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/login');
            } else {
                setError(data.message || 'Signup failed');
            }
        } catch (err) {
            setError('Network error occurred');
            console.error('Signup error:', err);
        }
    };

    return (
        <div className="form-container">
            <h2 style={{color:'blue'}}>Signup</h2>
            {error && <div className="error-message">{error}</div>}
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
                Already have an account? <Link to="/Login">Login</Link>
            </p>
        </div>
    );
};

export default Signup;
