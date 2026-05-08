// src/pages/DecorSelection.jsx
import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const DecorSelection = () => {
  const navigate = useNavigate();
  const { mandapName, hallName } = useParams();
  const location = useLocation();

  const {
    mandap,
    hall,
    selectedDate,
    selectedMenus = [],
    selectedByMenu = {},
    platesByMenu = {},
  } = location.state || {};

  const [selectedImages, setSelectedImages] = useState({});
  const [uploads, setUploads] = useState({});
  const [notes, setNotes] = useState({});
  const [confirmed, setConfirmed] = useState(false);

  const decorSamples = {
    "Floral Decor": [
      "/images/floral1.jpg",
      "/images/floral2.jpg",
      "/images/floral3.jpg",
      "/images/floral4.jpg",
      "/images/floral5.jpg",
    ],
    "Lighting Decor": ["/images/lighting1.jpg", "/images/lighting2.jpg", "/images/lighting3.jpg"],
    "Entrance Decor": ["/images/entrance1.jpg", "/images/entrance2.jpg", "/images/entrance3.jpg"],
    "Seating Decor": ["/images/seating1.jpg", "/images/seating2.jpg", "/images/seating3.jpg"],
    "Photo Booth": ["/images/stage1.jpg", "/images/stage2.jpg", "/images/stage3.jpg"],
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleImageSelect = (decor, index) => {
    setSelectedImages((prev) => ({ ...prev, [decor]: [index] }));
    setUploads((prev) => ({ ...prev, [decor]: null })); // clear upload if sample chosen
  };

  const handleFileChange = (decor, file) => {
    setUploads((prev) => ({ ...prev, [decor]: file }));
    setSelectedImages((prev) => ({ ...prev, [decor]: [0] })); // dummy index
  };

  const handleNoteChange = (decor, text) => {
    setNotes({ ...notes, [decor]: text });
  };

  const handleConfirm = async () => {
    try {
      const itemsArray = Object.keys(decorSamples)
        .map((decor) => {
          if (uploads[decor]) {
            return { name: uploads[decor].name, price: 0 };
          } else if (selectedImages[decor]?.length > 0) {
            return { name: decorSamples[decor][selectedImages[decor][0]].split("/").pop(), price: 0 };
          }
          return null;
        })
        .filter(Boolean);

      const totalCost = itemsArray.length * 5000; // example cost per item

      await axios.post("http://localhost:5000/api/decor", {
        mandapName,
        hallName,
        items: itemsArray,
        totalCost,
        notes,
        timestamp: new Date(),
      });

      setConfirmed(true);
    } catch (error) {
      console.error("Error saving decor data:", error);
      alert("Failed to save decor selections. Try again.");
    }
  };

  const handleProceed = () => {
    navigate(`/mandap/${mandapName}/food/${hallName}/decor/photography`, {
      state: {
        mandap,
        hall,
        selectedDate,
        selectedMenus,
        selectedByMenu,
        platesByMenu,
        decor: {
          selectedImages,
          uploads,
          notes,
        },
      },
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f9f3ff, #e0c3fc, #fbc2eb)",
        padding: "20px",
        fontFamily: "Georgia, serif",
        display: "flex",
        flexDirection: "column",
        position: "relative",
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
        }}
      >
        ← Back
      </button>

      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#4a148c",
          fontSize: "2.4rem",
          letterSpacing: "1px",
        }}
      >
        Choose Your Signature Wedding Style
      </h1>

      <div style={{ flex: "1 0 auto" }}>
        {Object.keys(decorSamples).map((decor, idx) => (
          <div
            key={idx}
            style={{
              margin: "20px auto",
              padding: "20px",
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              borderRadius: "15px",
              maxWidth: "600px",
              boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                marginBottom: "10px",
                color: "#4a148c",
                fontSize: "1.6rem",
              }}
            >
              {decor}
            </h2>

            <Slider {...sliderSettings}>
              {decorSamples[decor].map((img, i) => {
                const isSelected = selectedImages[decor]?.includes(i) && !uploads[decor];
                return (
                  <div key={i} style={{ display: "flex", justifyContent: "center" }}>
                    <div
                      style={{
                        width: "100%",
                        maxWidth: "500px",
                        height: "500px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                      }}
                    >
                      <img
                        src={img}
                        alt={`${decor} sample ${i + 1}`}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                          borderRadius: "10px",
                          display: "block",
                          cursor: "pointer",
                          border: isSelected ? "4px solid #4a148c" : "none",
                          transition: "0.3s",
                        }}
                        onClick={() => handleImageSelect(decor, i)}
                      />
                      {isSelected && (
                        <span
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            background: "green",
                            color: "white",
                            borderRadius: "50%",
                            padding: "8px",
                            fontSize: "18px",
                            fontWeight: "bold",
                          }}
                        >
                          ✔
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </Slider>

            <div style={{ marginTop: "10px" }}>
              <p style={{ margin: "10px 0", color: "#4a148c" }}>
                Didn’t find your style? Upload your reference image:
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(decor, e.target.files[0])}
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  cursor: "pointer",
                }}
              />

              {uploads[decor] && (
                <div style={{ marginBottom: "10px", color: "black" }}>
                  Selected File: {uploads[decor].name}
                  <img
                    src={URL.createObjectURL(uploads[decor])}
                    alt="upload preview"
                    style={{ maxWidth: "100px", display: "block", marginTop: "5px" }}
                  />
                </div>
              )}

              <textarea
                placeholder={`Describe your idea for ${decor}`}
                value={notes[decor] || ""}
                onChange={(e) => handleNoteChange(decor, e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                  resize: "none",
                  minHeight: "60px",
                }}
              />
            </div>

            {(selectedImages[decor]?.length > 0 || uploads[decor]) && (
              <p style={{ marginTop: "10px", fontWeight: "bold", color: "#4a148c" }}>
                Selected {decor}:{" "}
                {uploads[decor]
                  ? uploads[decor].name
                  : decorSamples[decor][selectedImages[decor][0]].split("/").pop()}
              </p>
            )}
          </div>
        ))}

        {/* Selected items summary + confirmation message */}
        {confirmed && (
          <div
            style={{
              marginTop: "30px",
              padding: "15px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.3)",
              maxWidth: "700px",
              margin: "30px auto",
            }}
          >
            <h3 style={{ textAlign: "center", marginBottom: "10px", color: "#4a148c" }}>
              Your Selected Items:
            </h3>
            {Object.keys(decorSamples).map((decor) => (
              <p key={decor}>
                {decor}:{" "}
                {uploads[decor]
                  ? uploads[decor].name
                  : selectedImages[decor]
                  ? decorSamples[decor][selectedImages[decor][0]].split("/").pop()
                  : "None"}
              </p>
            ))}
            <p style={{ marginTop: "15px", fontWeight: "bold", color: "#4a148c" }}>
              A professional from our team will contact you soon with full decor details.
            </p>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "20px" }}>
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
          <button
            onClick={handleProceed}
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              background: "linear-gradient(135deg, #6a1b9a, #ab47bc)",
              color: "white",
              padding: "15px 25px",
              borderRadius: "30px",
              border: "none",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
              zIndex: 100,
            }}
          >
            ✅ Proceed to Photography
          </button>
        )}
      </div>
    </div>
  );
};

export default DecorSelection;
