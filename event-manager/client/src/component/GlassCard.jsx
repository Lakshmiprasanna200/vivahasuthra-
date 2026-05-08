// src/components/GlassCard.jsx
import React from "react";

const GlassCard = ({ title, description, price }) => {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.25)", // semi-transparent glass
        backdropFilter: "blur(10px)", // blur background behind
        borderRadius: "20px",
        boxShadow: "0 6px 12px rgba(0,0,0,0.15)", // subtle shadow
        padding: "20px",
        width: "300px",
        transition: "transform 0.3s, box-shadow 0.3s", // smooth hover transition
        cursor: "pointer",
        margin: "15px",
      }}
      className="glass-card"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
      }}
    >
      <h3 style={{ margin: "0 0 10px 0", color: "#4a148c" }}>{title}</h3>
      <p style={{ fontSize: "14px", color: "#333", marginBottom: "10px" }}>
        {description}
      </p>
      <p style={{ fontWeight: "bold", color: "#2e7d32" }}>Price: ₹{price}</p>
    </div>
  );
};

export default GlassCard;
