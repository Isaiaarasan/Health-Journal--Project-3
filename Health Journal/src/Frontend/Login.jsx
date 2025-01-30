import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        
        try {
            const response = await fetch('http://localhost:5001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                navigate('/dashboard');
            } else {
                setError(data.message);
                setPassword('');
            }
        } catch (err) {
            setError('Network error occurred. Please try again.');
            console.error('Login error:', err);
        }
    };

    return (
        <div className="form-container">
            <h2 style={{color:'blue'}}>Login</h2>
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

                <button type="submit" className="login-button">Login</button>
            </form>
            <p className="switch-link">
                Don&apos;t have an account? <Link to="/Signup">Signup</Link>
            </p>
        </div>
    );
};

export default Login;