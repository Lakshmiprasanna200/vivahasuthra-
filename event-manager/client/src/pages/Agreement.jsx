// src/pages/Agreement.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Agreement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = location.state?.userName || "User";

  const [showPopup, setShowPopup] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "50px 20px",
        background: "linear-gradient(to bottom right, #fbc2eb, #a6c1ee)",
        fontFamily: "Georgia, serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          backgroundColor: "#fff",
          padding: "35px 45px",
          borderRadius: "15px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          lineHeight: "1.8",
          color: "#4a4a4a",
          borderTop: "6px solid #b76e79",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#b76e79",
            fontFamily: "'Pacifico', cursive",
            fontSize: "28px",
          }}
        >
          Wedding Services Agreement
        </h2>

        <p>
          This Agreement is entered into by and between <strong>{userName}</strong> (hereinafter referred to as "Client") and <strong>Vivaaha Sutra</strong>, a professional wedding planning service (hereinafter referred to as "Service Provider"). By proceeding with this Agreement, the Client acknowledges and accepts the terms and conditions outlined herein.
        </p>

        <p>
          The Client agrees to engage the Service Provider for arranging, coordinating, and facilitating wedding-related services including venue booking, catering, décor, photography, music, and other services as mutually agreed. One of our professional Event Planners will contact the Client to discuss the event requirements in detail.
        </p>

        <p>
          As part of this engagement, the Client agrees to pay an initial consultation fee of <strong>₹10,000</strong> to Vivaaha Sutra. This fee confirms the appointment with the Event Manager. Once the services are confirmed, the Client is required to pay <strong>30% of the total event amount</strong> as an advance for further planning and arrangements.
        </p>

        <p>
          The Client understands that all service selections, pricing, and arrangements will be confirmed in advance. Payment terms, schedules, and refund policies shall be clearly communicated and adhered to by both parties. The Client agrees to provide accurate information and cooperate with the Service Provider to ensure successful execution of the planned events.
        </p>

        <p>
          By accepting this Agreement, the Client confirms that they have read, understood, and agreed to all terms stated above and consents to proceed with the services offered by Vivaaha Sutra.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "35px",
          }}
        >
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: "12px 25px",
              borderRadius: "10px",
              border: "1px solid #b76e79",
              background: "#fff",
              color: "#b76e79",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#b76e79") || (e.target.style.color = "#fff")}
            onMouseOut={(e) => (e.target.style.background = "#fff") || (e.target.style.color = "#b76e79")}
          >
            ⬅ Back
          </button>

          <button
            onClick={() => setShowPopup(true)}
            style={{
              padding: "12px 25px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(to right, #b76e79, #f7a1b9)",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "opacity 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.opacity = "0.8")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            ✅ Accept Agreement
          </button>
        </div>
      </div>

      {/* Popup Modal with professional thank-you message */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "40px 50px",
              borderRadius: "15px",
              maxWidth: "500px",
              textAlign: "center",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            }}
          >
            <h2
              style={{
                color: "#b76e79",
                fontFamily: "'Pacifico', cursive",
                marginBottom: "20px",
              }}
            >
              Thank You for Choosing Vivaaha Sutra
            </h2>
            <p style={{ color: "#4a4a4a", fontSize: "16px", lineHeight: "1.8" }}>
              Your agreement has been successfully received. Our event planner will contact you shortly to finalize all details.
            </p>
            <button
              onClick={() => navigate("/")} // Redirect to main page
              style={{
                marginTop: "25px",
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                background: "#b76e79",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              ✨ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agreement;
