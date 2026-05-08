import React from "react";
import { useNavigate } from "react-router-dom";

const VendorDashboard = () => {
  const navigate = useNavigate();

  const services = [
    { name: "Mandaps", description: "Manage your wedding mandaps", route: "/vendor/mandaps" },
    { name: "Food", description: "Add or edit catering services", route: "/vendor/food" },
    { name: "Decor", description: "Customize décor and themes", route: "/vendor/decor" },
    { name: "Photography", description: "Upload and manage photography packages", route: "/vendor/photography" },
    { name: "Music", description: "Book and manage music services", route: "/vendor/music" }, // ✅ Added Music
  ];

  const handleLogout = () => {
    localStorage.removeItem("vendorAccount");
    alert("Logged out successfully!");
    navigate("/vendor/login");
  };

  return (
    <div style={{ padding: 24, fontFamily: "'Montserrat', sans-serif", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#b76e79" }}>
          Vendor Dashboard
        </h1>
        <button
          onClick={handleLogout}
          style={{
            background: "#b76e79",
            color: "#fff",
            padding: "8px 14px",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <p style={{ marginTop: 8, marginBottom: 24 }}>
        Welcome! You can manage your mandaps and services here.
      </p>

      {/* Fixed 2-column grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
        }}
      >
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => navigate(service.route)}
            style={{
              background: "#fff",
              padding: "16px",
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              textAlign: "center",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
            }}
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#b76e79",
                marginBottom: 8,
              }}
            >
              {service.name}
            </h2>
            <p style={{ fontSize: "14px", color: "#555" }}>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorDashboard;
