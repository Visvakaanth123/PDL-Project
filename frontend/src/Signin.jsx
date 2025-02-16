import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Login.css"; 

function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true); // Start loading
        try {
            const response = await axios.post('http://localhost:3001/signin', {
                email: email,
                password: password
            });

            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('token', token); // Store token in localStorage
                navigate("/home"); // Navigate to home
            } else {
                navigate("/signup"); // Navigate to sign-up page if status is not 200
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setError("Invalid credentials. Please try again.");
                } else if (error.response.status === 403) {
                    setError("Your session has expired. Please sign in again.");
                } else {
                    setError("Error signing in. Please try again later.");
                }
            } else {
                setError("Network error. Please check your connection.");
            }
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Signing In..." : "Sign In"}
                    </button>
                    {error && <p className="error-text">{error}</p>}
                </form>
                <p className="signup-text">
                    Don't have an account? 
                    <button className="signup-btn" onClick={() => navigate("/signup")}>
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Signin;
