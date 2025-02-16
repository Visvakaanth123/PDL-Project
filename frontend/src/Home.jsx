import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Ensure this CSS file contains the styles from the previous project

const Home = () => {
  const [formData, setFormData] = useState({
    injuryDescription: "",
    age: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    console.log("Token:", token); // Debug log to check the token

    if (!token) {
      alert("Token not found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/home", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure the token is properly set
        },
      });
      console.log("Response from backend:", response.data);
      alert("Recovery plan generated successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response && error.response.status === 403) {
        alert("You are not authorized to perform this action. Please check your login credentials.");
      } else {
        alert("An error occurred while generating the recovery plan.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recovery-plan-container">
      <h1 className="title">Personalized Recovery Plan</h1>
      <form className="recovery-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="injuryDescription">Describe your injury</label>
          <textarea
            name="injuryDescription"
            id="injuryDescription"
            value={formData.injuryDescription}
            onChange={handleChange}
            required
            className="input-large"
            placeholder="Describe your injury in detail..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            id="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="input-age"
            placeholder="Enter your age"
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="input-gender"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Recovery Plan"}
        </button>
      </form>
    </div>
  );
};

export default Home;
