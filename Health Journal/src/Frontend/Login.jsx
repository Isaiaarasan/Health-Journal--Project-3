import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../CSS/signup.css';

const API_URL = 'https://health-journal-project-3.onrender.com'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${API_URL}/api/login`, {
                email,
                password
            });
            localStorage.setItem('userId', response.data.userId);
            navigate('/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2 style={{ color: 'blue' }}>Login</h2>
            {error && (
                <div className="error-message" style={{
                    color: '#dc3545',
                    backgroundColor: '#f8d7da',
                    padding: '10px',
                    borderRadius: '4px',
                    marginBottom: '15px',
                    textAlign: 'center'
                }}>
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <label htmlFor="login-email">Email:</label>
                <input 
                    type="email" 
                    id="login-email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />

                <label htmlFor="login-password">Password:</label>
                <input 
                    type="password" 
                    id="login-password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />

                <button type="submit" className="login-button" disabled={loading}>Login</button>
            </form>
            <p className="switch-link">
                Don&apos;t have an account? <Link to="/signup">Signup</Link>
            </p>
        </div>
    );
};

export default Login;
