// src/pages/UserLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("weddingUser"));

    if (
      storedUser &&
      formData.email === storedUser.email &&
      formData.password === storedUser.password // ✅ Case-sensitive
    ) {
      setError("");
      alert("✅ Login successful!");
      navigate("/agreement", { state: { userName: storedUser.name } });
    } else {
      setError("❌ Invalid email or password. Please try again.");
    }
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
          👤 User Login
        </h2>

        {error && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              marginBottom: "15px",
              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
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
            <small style={{ color: "#666" }}>
              (Password is case-sensitive)
            </small>
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
            🔐 Login
          </button>
        </form>

        {/* Signup prompt */}
        <p style={{ textAlign: "center", marginTop: "15px", color: "#555" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{
              color: "#b76e79",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
