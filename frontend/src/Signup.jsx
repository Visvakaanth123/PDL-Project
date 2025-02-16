import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import "./Login.css"; 

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/signup', {
                email: email,
                password: password
            });
            if(response.status===201)
            {
                navigate("/signin")
            }
            console.log(response.data); 
        } catch (error) {
            console.error("Error signing up:", error.response?.data || error.message);
        }
    };
    

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Sign Up</h2>
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
                    <button type="submit">Sign Up</button>
                </form>
                <p className="signup-text">
                    Already have an account? 
                    <button className="signup-btn" onClick={() => navigate("/signin")}>
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Signup;
