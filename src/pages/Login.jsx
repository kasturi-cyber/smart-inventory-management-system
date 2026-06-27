import { useState } from "react";
import "../styles/Login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();

if (username === "admin" && password === "admin123") {
    setError("");
    onLogin();
} else {
    setError("Invalid Username or Password");
}
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="logo">
          📦
        </div>

        <h1>Smart Inventory System</h1>

        <p>
          Welcome back! Login to continue.
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="👤 Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />

          <div className="password-container">

  <input
    type={showPassword ? "text" : "password"}
    placeholder="🔒 Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <span
    className="toggle-password"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? "🙈" : "👁"}
  </span>

</div>
          {error && (
    <p className="error-message">
        {error}
    </p>
)}

<div className="login-options">

  <label>
    <input type="checkbox" />
    Remember Me
  </label>

  <a href="#">Forgot Password?</a>

</div>

          <button type="submit">
            Login
          </button>

        </form>
        <p className="footer-text">
    © 2026 • Developed by Kasturi Wankhede
</p>

      </div>

    </div>
  );
}

export default Login;