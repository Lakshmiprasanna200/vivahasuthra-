// src/pages/FoodSelection.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FoodSelection = () => {
  const { mandapName, hallName } = useParams();
  const navigate = useNavigate();

  const [expandedFood, setExpandedFood] = useState(null);
  const [selectedByMenu, setSelectedByMenu] = useState({});
  const [platesByMenu, setPlatesByMenu] = useState({});
  const [chosenMenus, setChosenMenus] = useState({});

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

  const getMenuSelection = (menuName) => selectedByMenu[menuName] || [];

  const toggleItem = (menuName, itemName) => {
    setSelectedByMenu((prev) => {
      const current = new Set(prev[menuName] || []);
      if (current.has(itemName)) current.delete(itemName);
      else current.add(itemName);
      return { ...prev, [menuName]: Array.from(current) };
    });
  };

  // ✅ Correct per-plate amount
  const perPlateAmount = (menu) => {
    const selected = getMenuSelection(menu.name);
    if (!selected || selected.length === 0) return 0; // If nothing selected, assume 0
    return menu.items.reduce(
      (sum, item) => (selected.includes(item.name) ? sum + item.price : sum),
      0
    );
  };

  const totalAmount = (menu) => {
    const plates = parseInt(platesByMenu[menu.name], 10) || 0;
    return perPlateAmount(menu) * plates;
  };

  const handleProceedToDecor = async () => {
    try {
      const totalByMenu = {};
      Object.keys(chosenMenus).forEach((menu) => {
        if (chosenMenus[menu]) {
          const menuObj = foodOptions.find((f) => f.name === menu);
          const plates = parseInt(platesByMenu[menu], 10) || 0;
          totalByMenu[menu] = perPlateAmount(menuObj) * plates;
        }
      });

      await axios.post("http://localhost:5000/api/food", {
        mandapName,
        hallName,
        chosenMenus,
        platesByMenu,
        selectedByMenu,
        totalByMenu,
      });

      navigate(`/mandap/${mandapName}/food/${hallName}/decor`, {
        state: { mandapName, hallName, chosenMenus, platesByMenu, selectedByMenu, totalByMenu },
      });
    } catch (error) {
      console.error("Failed to save food:", error);
      alert("Failed to save food selection. Try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f9f3ff, #e0c3fc, #fbc2eb)",
        padding: "40px 20px",
        fontFamily: "Georgia, serif",
        position: "relative",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "rgba(255,255,255,0.6)",
          border: "none",
          padding: "8px 16px",
          borderRadius: "30px",
          color: "#6a1b9a",
          fontWeight: 600,
          cursor: "pointer",
          marginBottom: "20px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        ← Back
      </button>

      <h1 style={{ color: "#4a148c", textAlign: "center", fontSize: "2.2rem", marginBottom: 8, letterSpacing: "1px" }}>
        Select Food for {hallName?.replace(/-/g, " ")}
      </h1>
      <p style={{ marginTop: 8, textAlign: "center", color: "#4a148c" }}>
        📍 Venue: {mandapName?.replace(/-/g, " ")}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "25px", marginTop: "30px" }}>
        {foodOptions.map((food, i) => {
          const selectedNames = getMenuSelection(food.name);
          const perPlate = perPlateAmount(food);
          const total = totalAmount(food);

          return (
            <div key={food.name} style={{ borderRadius: "20px", padding: "20px", background: "rgba(255,255,255,0.25)", backdropFilter: "blur(10px)", boxShadow: "0 6px 12px rgba(0,0,0,0.15)", cursor: "pointer" }}>
              <h3 style={{ margin: "0 0 12px 0", color: "#6a1b9a", fontSize: "1.4rem", borderBottom: "2px solid #e1bee7", paddingBottom: "6px" }}>
                {food.name}
              </h3>

              <button onClick={() => setExpandedFood(expandedFood === i ? null : i)} style={{ background: expandedFood === i ? "linear-gradient(135deg, #d32f2f, #ef5350)" : "linear-gradient(135deg, #6a1b9a, #ab47bc)", color: "white", border: "none", padding: "10px 16px", borderRadius: "25px", cursor: "pointer", width: "100%", marginBottom: "12px", fontWeight: 600 }}>
                {expandedFood === i ? "Hide Items" : "View & Select Items"}
              </button>

              {expandedFood === i && (
                <div style={{ maxHeight: 240, overflowY: "auto", border: "1px solid #eee", borderRadius: 10, padding: 10, background: "rgba(250,250,250,0.9)" }}>
                  {food.items.map((item) => {
                    const checked = selectedNames.includes(item.name);
                    return (
                      <label key={item.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 10px", borderRadius: 8, background: checked ? "linear-gradient(135deg,#ede7f6,#d1c4e9)" : "transparent", marginBottom: 6, cursor: "pointer" }}>
                        <span>
                          <input type="checkbox" checked={checked} onChange={() => toggleItem(food.name, item.name)} style={{ marginRight: 8 }} />
                          {item.name}
                        </span>
                        <span>₹{item.price}</span>
                      </label>
                    );
                  })}
                </div>
              )}

              <div style={{ marginTop: 12 }}>
                <p style={{ fontWeight: 600, margin: "8px 0", color: "#4a148c" }}>Per-plate Amount: ₹{perPlate}</p>
                {perPlate > 0 && (
                  <>
                    <input
                      type="number"
                      min="1"
                      placeholder="Enter number of plates required"
                      value={platesByMenu[food.name] || ""}
                      onChange={(e) => setPlatesByMenu((prev) => ({ ...prev, [food.name]: e.target.value }))}
                      style={{ padding: "8px", width: "100%", borderRadius: 8, border: "1px solid #ccc", marginBottom: "8px" }}
                    />
                    <p style={{ fontWeight: 600, margin: "8px 0", color: "#4a148c" }}>
                      Total Cost for Plates: ₹{total}
                    </p>

                    <label style={{ display: "flex", alignItems: "center", marginTop: 6 }}>
                      <input
                        type="checkbox"
                        disabled={total <= 0}
                        checked={!!chosenMenus[food.name]}
                        onChange={(e) => setChosenMenus((prev) => ({ ...prev, [food.name]: e.target.checked }))}
                        style={{ marginRight: 8 }}
                      />
                      Choose this Menu
                    </label>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={handleProceedToDecor} style={{ position: "fixed", bottom: "20px", right: "20px", background: "linear-gradient(135deg, #6a1b9a, #ab47bc)", color: "white", padding: "15px 25px", borderRadius: "30px", border: "none", fontSize: "16px", fontWeight: 600, cursor: "pointer", boxShadow: "0 6px 12px rgba(0,0,0,0.2)", zIndex: 100, transition: "0.3s" }}>
        ✅ Proceed to Decor / Skip
      </button>
    </div>
  );
};

export default FoodSelection;
