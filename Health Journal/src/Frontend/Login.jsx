import { Link } from 'react-router-dom';
import '../CSS/Login.css';
const Login = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        window.location.href = "/Dashboard";
    };
  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="login-email">Email:</label>
        <input type="email" id="login-email" name="login-email" required />

        <label htmlFor="login-password">Password:</label>
        <input type="password" id="login-password" name="login-password" required />

        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="switch-link">
        Don&apos;t have an account? <Link to="/Signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;