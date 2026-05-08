// src/pages/Photography.jsx
import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

const Photography = () => {
  const navigate = useNavigate();
  const { mandapName, hallName } = useParams();
  const location = useLocation();

  // ✅ Receive Mandap + Food + Decor from previous page
  const { mandap, hall, selectedDate, food, decor } = location.state || {};

  const photographyStyles = [
    { name: "Candid", photographers: 2, album: "Digital", albumCost: 10000, basePricePerHour: 5000 },
    { name: "Pre-wedding shoot", photographers: 2, album: "Digital", albumCost: 50000, basePricePerHour: 6000 },
    { name: "Traditional", photographers: 2, album: "Printed", albumCost: 100000, basePricePerHour: 8000 },
    { name: "Drone / Aerial", photographers: 1, album: "Digital", albumCost: 10000, basePricePerHour: 6000 },
    { name: "Night photography", photographers: 2, album: "Printed", albumCost: 100000, basePricePerHour: 7000 },
  ];

  const [selections, setSelections] = useState({});
  const [confirmed, setConfirmed] = useState(false);

  const handleHoursChange = (style, hours) => {
    const hrs = hours || 0;
    const totalPrice = hrs * style.basePricePerHour + style.albumCost;
    setSelections((prev) => ({
      ...prev,
      [style.name]: { hours: hrs, price: totalPrice, album: style.album, albumCost: style.albumCost },
    }));
  };

  const totalAmount = Object.values(selections).reduce((sum, sel) => sum + (sel.price || 0), 0);

  const handleConfirm = async () => {
    if (!mandapName || !hallName) {
      alert("Mandap and Hall info missing!");
      return;
    }

    const photographyData = {
      mandapName,
      hallName,
      selections,
      totalCost: totalAmount,
      timestamp: new Date(),
    };

    try {
      // ✅ Save Photography data to backend
      await axios.post("http://localhost:5000/api/photography", photographyData);
      console.log("Photography data saved successfully:", photographyData);

      setConfirmed(true);

      setTimeout(() => {
        // ✅ Navigate to Music page
        navigate(`/mandap/${mandapName}/food/${hallName}/decor/photography/music`, {
          state: {
            mandap,
            hall,
            selectedDate,
            food,
            decor,
            photography: photographyData,
          },
        });
      }, 1000);
    } catch (err) {
      console.error("Error saving photography data:", err);
      alert("Failed to save photography data. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f9f3ff, #e0c3fc, #fbc2eb)",
        padding: "20px",
        fontFamily: "Georgia, serif",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "rgba(255,255,255,0.6)",
          border: "none",
          padding: "8px 16px",
          borderRadius: "30px",
          color: "#4a148c",
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          transition: "0.3s",
        }}
      >
        ← Back
      </button>

      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontFamily: "'Pacifico', cursive",
          color: "#4a148c",
          fontSize: "2.4rem",
        }}
      >
        Choose Your Photography Style
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {photographyStyles.map((style, idx) => {
          const sel = selections[style.name] || {};
          return (
            <div
              key={idx}
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                padding: "20px",
                borderRadius: "15px",
                width: "320px",
                color: "#4a148c",
                boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
              }}
            >
              <h2 style={{ marginBottom: "15px", color: "#4a148c" }}>{style.name}</h2>
              <p>
                <strong>Photographers:</strong> {style.photographers}
              </p>
              <p>
                <strong>Album Type:</strong> {style.album} (₹ {style.albumCost})
              </p>
              <p>
                <strong>Base Price per Hour:</strong> ₹ {style.basePricePerHour}
              </p>

              <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "10px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ color: "#4a148c" }}>Hours of Coverage:</label>
                  <input
                    type="number"
                    min="1"
                    value={sel.hours || ""}
                    onChange={(e) => handleHoursChange(style, parseInt(e.target.value))}
                    style={{ width: "100%", padding: "5px", borderRadius: "5px" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ color: "#4a148c" }}>Total Price:</label>
                  <div
                    style={{
                      background: "rgba(0,0,0,0.05)",
                      padding: "5px",
                      borderRadius: "5px",
                      textAlign: "center",
                      color: "#4a148c",
                    }}
                  >
                    {sel.price ? `₹ ${sel.price}` : "-"}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected items summary */}
      {Object.keys(selections).length > 0 && (
        <div
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            padding: "20px",
            borderRadius: "15px",
            maxWidth: "500px",
            color: "#4a148c",
            margin: "30px auto",
            boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Selected Photography Styles:</h3>
          {Object.entries(selections).map(([name, sel]) =>
            sel.hours > 0 ? (
              <p key={name}>
                {name}: {sel.hours} hours × ₹ {photographyStyles.find((s) => s.name === name).basePricePerHour} + Album ({sel.album}, ₹ {sel.albumCost}) = <strong>₹ {sel.price}</strong>
              </p>
            ) : null
          )}
          <p style={{ fontWeight: "bold", marginTop: "10px" }}>Total Amount: ₹ {totalAmount}</p>

          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <button
              onClick={handleConfirm}
              style={{
                padding: "12px 25px",
                background: "#4a148c",
                color: "white",
                fontSize: "16px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Confirm & Save
            </button>
          </div>

          {confirmed && (
            <p style={{ textAlign: "center", marginTop: "15px", fontSize: "18px" }}>
              ✅ Photography selection saved! Redirecting to Music...
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Photography;
