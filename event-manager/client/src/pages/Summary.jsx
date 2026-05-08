// src/pages/Summary.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Summary = () => {
  const navigate = useNavigate();
  const [summaryData, setSummaryData] = useState(null);

  // ---- Define food options here so we can get prices ----
  const foodOptions = [
    {
      name: "South Indian Veg Thali",
      items: [
        { name: "Steamed Rice", price: 40 },
        { name: "Sambar", price: 60 },
        { name: "Rasam", price: 50 },
        { name: "Curd Rice", price: 50 },
        { name: "Vegetable Kootu", price: 70 },
        { name: "Poriyal", price: 50 },
        { name: "Avial", price: 80 },
        { name: "Dal", price: 60 },
        { name: "Lemon Rice", price: 50 },
        { name: "Tamarind Rice", price: 50 },
        { name: "Chapati", price: 20 },
        { name: "Poori", price: 30 },
        { name: "Vada", price: 30 },
        { name: "Papadam", price: 15 },
        { name: "Pickle", price: 10 },
        { name: "Payasam", price: 60 },
        { name: "Kesari", price: 50 },
        { name: "Butter Milk", price: 20 },
        { name: "Banana", price: 10 },
      ],
    },
    {
      name: "North Indian Veg Thali",
      items: [
        { name: "Paneer Butter Masala", price: 120 },
        { name: "Dal Tadka", price: 80 },
        { name: "Rajma Masala", price: 100 },
        { name: "Chole", price: 90 },
        { name: "Aloo Gobi", price: 80 },
        { name: "Bhindi Masala", price: 80 },
        { name: "Mixed Veg Curry", price: 100 },
        { name: "Jeera Rice", price: 70 },
        { name: "Veg Pulao", price: 100 },
        { name: "Naan", price: 30 },
        { name: "Tandoori Roti", price: 25 },
        { name: "Paratha", price: 30 },
        { name: "Raita", price: 40 },
        { name: "Green Salad", price: 40 },
        { name: "Papad", price: 15 },
        { name: "Pickle", price: 10 },
        { name: "Gulab Jamun", price: 50 },
        { name: "Rasgulla", price: 50 },
        { name: "Jalebi", price: 60 },
      ],
    },
    {
      name: "Hyderabadi Non-Veg Feast",
      items: [
        { name: "Chicken Dum Biryani", price: 200 },
        { name: "Mutton Biryani", price: 300 },
        { name: "Egg Curry", price: 120 },
        { name: "Fish Fry", price: 180 },
        { name: "Chicken Curry", price: 150 },
        { name: "Paneer Butter Masala", price: 120 },
        { name: "Dal Tadka", price: 80 },
        { name: "Vegetable Kurma", price: 100 },
        { name: "Mirchi Ka Salan", price: 90 },
        { name: "Raita", price: 40 },
        { name: "Tandoori Roti", price: 25 },
        { name: "Naan", price: 30 },
        { name: "Green Salad", price: 40 },
        { name: "Double Ka Meetha", price: 70 },
        { name: "Qubani Ka Meetha", price: 80 },
      ],
    },
    {
      name: "Continental Buffet",
      items: [
        { name: "Pasta in White & Red Sauce", price: 150 },
        { name: "Lasagna", price: 200 },
        { name: "Garlic Bread", price: 70 },
        { name: "Grilled Vegetables", price: 120 },
        { name: "Baked Potatoes", price: 100 },
        { name: "Herbed Rice", price: 100 },
        { name: "Veg Pizza", price: 150 },
        { name: "Chicken Roast", price: 250 },
        { name: "Grilled Fish", price: 280 },
        { name: "Caesar Salad", price: 120 },
        { name: "Soup of the Day", price: 100 },
        { name: "Cheese Platter", price: 200 },
        { name: "Fruit Platter", price: 150 },
        { name: "Brownie with Ice Cream", price: 120 },
        { name: "Cheesecake", price: 150 },
      ],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mandapRes = await axios.get("http://localhost:5000/api/mandap");
        const foodRes = await axios.get("http://localhost:5000/api/food");
        const decorRes = await axios.get("http://localhost:5000/api/decor");
        const photoRes = await axios.get("http://localhost:5000/api/photography");
        const musicRes = await axios.get("http://localhost:5000/api/music");

        setSummaryData({
          mandapSelections: mandapRes.data[mandapRes.data.length - 1] || {},
          foodSelections: foodRes.data[foodRes.data.length - 1] || {},
          decorSelections: decorRes.data[decorRes.data.length - 1] || {},
          photographySelections: photoRes.data[photoRes.data.length - 1] || {},
          musicSelections: musicRes.data[musicRes.data.length - 1] || {},
        });
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };

    fetchData();
  }, []);

  if (!summaryData) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading summary...</p>;
  }

  const {
    mandapSelections,
    foodSelections,
    decorSelections,
    photographySelections,
    musicSelections,
  } = summaryData;

  // ---- Cost Calculations ----
  const mandapCost = mandapSelections?.hallPrice || 0;

  let foodCost = 0;

  const foodList = foodSelections.selectedByMenu
    ? Object.entries(foodSelections.selectedByMenu).map(([menuName, selectedItemNames]) => {
        const menuObj = foodOptions.find((f) => f.name === menuName);
        const plates = parseInt(foodSelections.platesByMenu?.[menuName]) || 0;

        // Only sum prices for selected items
        const perPlateCost = menuObj?.items
          .filter((item) => selectedItemNames.includes(item.name))
          .reduce((sum, item) => sum + item.price, 0);

        const totalMenuCost = perPlateCost * plates;
        foodCost += totalMenuCost;

        return { menu: menuName, plates, perPlateCost, totalMenuCost };
      })
    : [];

  const decorCost = decorSelections?.totalCost || 0;
  const photographyCost = photographySelections?.totalAmount || 0;
  const musicCost = Object.values(musicSelections?.selections || {}).reduce(
    (sum, sel) => sum + (sel.price || 0),
    0
  );

  const totalCost = mandapCost + foodCost + decorCost + photographyCost + musicCost;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "Georgia, serif",
        background: "linear-gradient(to right, #fbc2eb, #a6c1ee)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "700px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          padding: "30px",
          position: "relative",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            background: "#b76e79",
            color: "white",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          🔙 Go Back
        </button>

        <h1
          style={{
            textAlign: "center",
            fontSize: "36px",
            marginBottom: "25px",
            fontFamily: "'Pacifico', cursive",
            color: "#b76e79",
          }}
        >
          💍 Wedding Summary
        </h1>

        <div style={{ lineHeight: "1.6", color: "#333" }}>
          {/* Mandap */}
          <p>
            <strong>Mandap:</strong>{" "}
            {mandapSelections?.hallName
              ? `${mandapSelections.hallName} – ₹${mandapSelections.hallPrice} (Date: ${mandapSelections.date || "N/A"})`
              : "No mandap selected."}
          </p>

          {/* Food */}
          <p>
            <strong>Food:</strong>{" "}
            {foodList.length > 0 ? (
              <ul style={{ margin: "5px 0 10px 20px" }}>
                {foodList.map((f, idx) => (
                  <li key={idx}>
                    {f.menu} – {f.plates} plates × ₹{f.perPlateCost} = ₹{f.totalMenuCost}
                  </li>
                ))}
              </ul>
            ) : (
              "No food selected."
            )}
          </p>

          {/* Decor */}
          <p>
            <strong>Decor:</strong>{" "}
            {decorSelections &&
            ((decorSelections.items && decorSelections.items.length > 0) ||
              (decorSelections.selectedImages &&
                Object.keys(decorSelections.selectedImages).length > 0)) ? (
              <>
                {decorSelections.items && decorSelections.items.length > 0
                  ? decorSelections.items.map(item => item.name).join(", ")
                  : decorSelections.selectedImages && Object.keys(decorSelections.selectedImages).length > 0
                  ? Object.keys(decorSelections.selectedImages)
                      .map(name => name.replace(/\.[^/.]+$/, ""))
                      .join(", ")
                  : "Decor selected."}
              </>
            ) : (
              "No decor selected."
            )}
          </p>

          {/* Photography */}
          <p>
            <strong>Photography:</strong>{" "}
            {photographySelections?.selections &&
            Object.keys(photographySelections.selections).length > 0
              ? Object.entries(photographySelections.selections)
                  .map(([name, sel]) => `${name} (${sel.hours} hrs) – ₹${sel.price}`)
                  .join(", ")
              : "No photography selected."}
          </p>

          {/* Music */}
          <p>
            <strong>Music:</strong>{" "}
            {musicSelections?.selections &&
            Object.keys(musicSelections.selections).length > 0
              ? Object.entries(musicSelections.selections)
                  .map(([name, sel]) => `${name} (${sel.hours} hrs) – ₹${sel.price}`)
                  .join(", ")
              : "No music selected."}
          </p>

          {/* Total */}
          <p
            style={{
              marginTop: "20px",
              padding: "12px",
              borderRadius: "10px",
              background: "#fce4ec",
              textAlign: "center",
              fontWeight: "bold",
              color: "#b76e79",
            }}
          >
            Total Wedding Cost: ₹{totalCost}
          </p>
        </div>

        <div
          style={{
            marginTop: "25px",
            padding: "15px",
            borderRadius: "10px",
            background: "#e8f5e9",
            color: "#2e7d32",
            fontSize: "16px",
            textAlign: "center",
            lineHeight: "1.6",
            fontStyle: "italic",
          }}
        >
          If you are satisfied with the total cost, please <strong>Login or Sign Up</strong> to proceed.
          <br />
          Upon successful login, a personalized <strong>Wedding Agreement</strong> will be generated.
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              background: "#4caf50",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            👉 Proceed to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
