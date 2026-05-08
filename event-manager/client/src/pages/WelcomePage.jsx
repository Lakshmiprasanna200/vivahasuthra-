// src/pages/WelcomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import weddingImg from "../assets/wedding.jpg";
import Navbar from "../component/Navbar"; // ✅ Import Navbar

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #fff9f9 0%, #ffebeb 100%)",
        padding: "20px",
        textAlign: "center",
        boxSizing: "border-box",
        position: "relative", // ✅ Important for Navbar absolute positioning
      }}
    >
      {/* ✅ Hamburger Navbar */}
      <Navbar />

      <h1
        style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: "3.5rem",
          color: "#b76e79",
          margin: "0 0 0.5rem 0",
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        Vivaaha Sutra
      </h1>

      <p
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.5rem",
          color: "#8B4513",
          maxWidth: "700px",
          lineHeight: "1.3",
          margin: "0 auto 1rem auto",
        }}
      >
        "Where timeless traditions embrace your unique bond"
      </p>

      <p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "1rem",
          color: "#555",
          maxWidth: "600px",
          margin: "0 auto 1rem auto",
        }}
      >
        Begin your journey to a wedding that perfectly blends heritage with your
        personal love story
      </p>

      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          maxHeight: "40vh",
          margin: "1rem 0",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <img
          src={weddingImg}
          alt="Wedding Couple"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      <button
        onClick={() => navigate("/wedding-types")}
        style={{
          padding: "12px 30px",
          fontSize: "1rem",
          fontFamily: "'Montserrat', sans-serif",
          backgroundColor: "#b76e79",
          color: "white",
          border: "none",
          borderRadius: "30px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 8px rgba(183, 110, 121, 0.3)",
          margin: "0.5rem 0",
        }}
      >
        Get Started
      </button>
    </div>
  );
};

export default WelcomePage;