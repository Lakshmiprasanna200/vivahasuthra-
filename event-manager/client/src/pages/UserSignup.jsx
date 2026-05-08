// src/pages/UserSignup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("⚠️ All fields are required.");
      return;
    }

    // Save user to localStorage
    localStorage.setItem("weddingUser", JSON.stringify(formData));

    alert("✅ Signup successful! Please login.");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #fbc2eb, #a6c1ee)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "400px",
          background: "#fff",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#b76e79",
            fontFamily: "'Pacifico', cursive",
          }}
        >
          ✨ User Signup
        </h2>

        {error && (
          <p style={{ color: "red", textAlign: "center", marginBottom: "15px" }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div style={{ marginBottom: "15px" }}>
            <label>Full Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: "15px" }}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "15px" }}>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <small style={{ color: "#666" }}>(Password is case-sensitive)</small>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: "#b76e79",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            📝 Signup
          </button>
        </form>

        {/* Link to Login */}
        <p style={{ textAlign: "center", marginTop: "15px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#b76e79", cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
