import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      padding: "15px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      zIndex: 10
    }}>
      {/* Logo / App Name */}
      <h2
        onClick={() => navigate("/")}
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: "1.8rem",
          color: "#b76e79",
          cursor: "pointer",
          margin: 0
        }}
      >
        Vivaaha Sutra
      </h2>

      {/* Hamburger Icon */}
      <div
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: "5px"
        }}
      >
        <div style={{ width: "25px", height: "3px", background: "#333" }}></div>
        <div style={{ width: "25px", height: "3px", background: "#333" }}></div>
        <div style={{ width: "25px", height: "3px", background: "#333" }}></div>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div style={{
          position: "absolute",
          top: "60px",
          right: "20px",
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          padding: "10px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}>
          <span
            onClick={() => { setMenuOpen(false); navigate("/"); }}
            style={{ cursor: "pointer", color: "#333" }}
          >
            Home
          </span>
          <span
            onClick={() => { setMenuOpen(false); navigate("/packages"); }}
            style={{ cursor: "pointer", color: "#333" }}
          >
            Packages
          </span>
          <span
            onClick={() => { setMenuOpen(false); navigate("/vendor/login"); }}
            style={{ cursor: "pointer", color: "#b76e79", fontWeight: "bold" }}
          >
            Vendor Login
          </span>
        </div>
      )}
    </div>
  );
};

export default Header;
