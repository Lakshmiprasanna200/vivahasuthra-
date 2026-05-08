// src/pages/Music.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Music = () => {
  const [modalData, setModalData] = useState(null);
  const [selections, setSelections] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [proceeded, setProceeded] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Receive previous data
  const {
    mandapSelections = {},
    foodSelections = {},
    decorSelections = {},
    photographySelections = {},
  } = location.state || {};

  const musicPackages = [
    {
      name: "Nadaswaram & Thavil",
      basePricePerHour: 10000,
      desc: "Traditional South Indian wedding music, usually played in temples and auspicious events.",
      img: "/images/nadaswaram.jpg",
      clip: "/music/nadaswaram.mp3",
      maxHours: 5,
    },
    {
      name: "Veena",
      basePricePerHour: 8000,
      desc: "Classical Indian string instrument producing melodious tunes for ceremonies.",
      img: "/images/veena.jpg",
      clip: "/music/veena.mp3",
      maxHours: 4,
    },
    {
      name: "Flute",
      basePricePerHour: 6000,
      desc: "Soft and soothing sound, often used in traditional South Indian music and rituals.",
      img: "/images/flute.jpg",
      clip: "/music/flute.mp3",
      maxHours: 4,
    },
    {
      name: "Violin",
      basePricePerHour: 7000,
      desc: "Accompanies classical performances, adds elegance to wedding events.",
      img: "/images/violin.jpg",
      clip: "/music/violin.mp3",
      maxHours: 4,
    },
    {
      name: "Dappu Melam",
      basePricePerHour: 12000,
      desc: "Energetic drum ensemble, common in temple processions and South Indian celebrations.",
      img: "/images/dappu.jpg",
      clip: "/music/dappu.mp3",
      maxHours: 6,
    },
  ];

  // Toggle / update selection with maxHours enforcement
  const updateSelection = (pkg, hours) => {
    let hrs = hours || 0;
    if (hrs > pkg.maxHours) hrs = pkg.maxHours;
    if (hrs < 0) hrs = 0;

    setSelections((prev) => {
      if (hrs === 0) {
        const newSel = { ...prev };
        delete newSel[pkg.name];
        return newSel;
      }
      return {
        ...prev,
        [pkg.name]: { hours: hrs, price: pkg.basePricePerHour * hrs },
      };
    });
  };

  // Total cost
  const totalAmount = Object.values(selections).reduce(
    (sum, sel) => sum + (sel.price || 0),
    0
  );

  // Save to backend + navigate
  const handleProceed = async () => {
    try {
      await fetch("http://localhost:5000/api/music", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mandapName: mandapSelections?.mandapName || "Unknown",
          hallName: mandapSelections?.hallName || "Unknown",
          selections,
          totalAmount,
        }),
      });

      setProceeded(true);

      navigate("/summary", {
        state: {
          mandapSelections,
          foodSelections,
          decorSelections,
          photographySelections,
          musicSelections: selections,
        },
      });
    } catch (error) {
      console.error("Error saving music data:", error);
      alert("Failed to save music data.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #f8cdda, #1d2b64)",
        fontFamily: "Georgia, serif",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontFamily: "'Pacifico', cursive",
          color: "black",
          marginBottom: "40px",
          fontSize: "48px",
        }}
      >
        🎶 Music Selection
      </h1>

      {/* Music Packages */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
        }}
      >
        {musicPackages.map((pkg, idx) => (
          <div
            key={idx}
            onClick={() => setModalData(pkg)}
            style={{
              width: "80%",
              maxWidth: "500px",
              padding: "15px 20px",
              background: selections[pkg.name]
                ? "rgba(0,200,0,0.3)"
                : "rgba(255,255,255,0.3)",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            <span style={{ fontSize: "20px", fontWeight: "600" }}>
              {pkg.name}
            </span>
            <span style={{ fontSize: "18px", fontWeight: "500" }}>
              ₹{pkg.basePricePerHour}/hr (Max {pkg.maxHours} hrs)
            </span>
          </div>
        ))}
      </div>

      {/* Selected Summary */}
      {Object.keys(selections).length > 0 && (
        <div
          style={{
            marginTop: "30px",
            background: "rgba(0,0,0,0.2)",
            padding: "15px",
            borderRadius: "10px",
            maxWidth: "600px",
            margin: "30px auto 0",
            color: "black",
            textAlign: "center",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>Selected Music Packages:</h3>
          <ul>
            {Object.entries(selections).map(([name, sel], i) => (
              <li key={i}>
                {name} ({sel.hours} hours) - ₹{sel.price}
              </li>
            ))}
          </ul>
          <p style={{ fontWeight: "bold", marginTop: "10px" }}>
            Total: ₹{totalAmount}
          </p>

          {!confirmed ? (
            <button
              onClick={() => setConfirmed(true)}
              style={{
                marginTop: "15px",
                padding: "10px 20px",
                background: "#6a1b9a",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Confirm Selection
            </button>
          ) : (
            !proceeded && (
              <button
                onClick={handleProceed}
                style={{
                  marginTop: "15px",
                  padding: "10px 20px",
                  background: "green",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Proceed
              </button>
            )
          )}

          {proceeded && (
            <p
              style={{
                marginTop: "15px",
                color: "darkgreen",
                fontWeight: "600",
              }}
            >
              ✅ Your music selections are saved! Proceeding to summary.
            </p>
          )}
        </div>
      )}

      {/* Modal */}
      {modalData && (
        <div
          onClick={() => setModalData(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "20px",
            overflow: "auto",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(to right, #f8cdda, #1d2b64)",
              padding: "30px",
              borderRadius: "15px",
              width: "90%",
              maxWidth: "500px",
              maxHeight: "90vh",
              overflowY: "auto",
              textAlign: "center",
              color: "black",
            }}
          >
            <h2 style={{ marginBottom: "10px" }}>{modalData.name}</h2>
            <p
              style={{
                color: "#004aad",
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "20px",
              }}
            >
              {modalData.desc}
            </p>

            <img
              src={modalData.img}
              alt={modalData.name}
              style={{
                width: "100%",
                maxHeight: "200px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "20px",
              }}
            />

            {modalData.clip && (
              <audio
                controls
                style={{
                  width: "100%",
                  marginBottom: "20px",
                  borderRadius: "8px",
                }}
              >
                <source src={modalData.clip} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
                marginBottom: "20px",
              }}
            >
              <input
                type="number"
                min="1"
                max={modalData.maxHours}
                placeholder={`Hours (max ${modalData.maxHours})`}
                value={selections[modalData.name]?.hours || ""}
                onChange={(e) =>
                  updateSelection(modalData, Number(e.target.value))
                }
                style={{
                  width: "80px",
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  textAlign: "center",
                }}
              />
              <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                ₹
                {selections[modalData.name]
                  ? modalData.basePricePerHour *
                    selections[modalData.name].hours
                  : 0}
              </span>
            </div>

            <button
              onClick={() => setModalData(null)}
              style={{
                marginTop: "15px",
                padding: "10px 20px",
                background: "#ff4e50",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Select
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Music;
