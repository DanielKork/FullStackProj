import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();

    const data = { username: username, password: password };
    // console.log(`The Data which is being sent is: ${data}`);
    axios
      .post("http://localhost:3001/login", data)
      .then((response) => {
        if (response.data === "Logged in successfully") setLoginSuccess(true);
        else {
          setLoginSuccess(false);
          alert(response.data);
        }
      })
      .catch((error) => {
        alert("Sign in failed:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <div className="container">
      <div className="signin-container">
        <h2 className="signin-heading">Sign In</h2>
        <form onSubmit={handleSignIn} className="signin-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>
        <div className="links">
          <Link to="/register" className="link">
            Register
          </Link>
          <Link to="/reset-password" className="link">
            Forgot your password?
          </Link>
        </div>
        {loginSuccess && (
          <div className="success-message">
            <p>You have been logged in successfully.</p>
            <Link to="/dashboard" className="btn btn-success">
              Go to Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default SignInPage;
