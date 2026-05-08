import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VendorSignup = () => {
  const [vendor, setVendor] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!vendor.name || !vendor.email || !vendor.password) {
      return alert("Please fill all fields");
    }

    // ✅ Save signup details in localStorage
    localStorage.setItem("vendorAccount", JSON.stringify(vendor));

    alert("Signup successful! Please login now.");
    navigate("/vendor/login"); // redirect to login page
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",       // Center horizontally
        alignItems: "flex-start",       // Start from top vertically
        minHeight: "100vh",
        fontFamily: "'Montserrat', sans-serif",
        padding: "60px 24px",
        background: "#f9f5f6",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#b76e79",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          Vendor Signup
        </h1>

        <form onSubmit={handleSignup} style={{ marginTop: 16 }}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={vendor.name}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: 10,
              marginBottom: 10,
              borderRadius: 6,
              border: "1px solid #ddd",
              outline: "none",
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={vendor.email}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: 10,
              marginBottom: 10,
              borderRadius: 6,
              border: "1px solid #ddd",
              outline: "none",
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={vendor.password}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: 10,
              marginBottom: 10,
              borderRadius: 6,
              border: "1px solid #ddd",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              background: "#b76e79",
              color: "#fff",
              padding: "10px 16px",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              width: "100%",
              fontWeight: "bold",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#9e5e68")}
            onMouseLeave={(e) => (e.target.style.background = "#b76e79")}
          >
            Sign Up
          </button>
        </form>

        <p style={{ marginTop: 12, textAlign: "center" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#b76e79", cursor: "pointer" }}
            onClick={() => navigate("/vendor/login")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default VendorSignup;
