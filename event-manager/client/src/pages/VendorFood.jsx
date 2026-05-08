import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VendorFood = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cateringName: "",
    place: "",
    contact: "",
    vendorName: "",
    vendorPhone: "",
    vendorAddress: "",
    aadhaar: null,
  });
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!agreed) {
      window.alert("❌ Please agree to the Vendor Agreement before submitting.");
      return;
    }

    if (
      !formData.cateringName ||
      !formData.place ||
      !formData.contact ||
      !formData.vendorName ||
      !formData.vendorPhone ||
      !formData.vendorAddress ||
      !formData.aadhaar
    ) {
      setMessage("❌ Please fill all mandatory fields.");
      return;
    }

    setMessage(
      "✅ Your food service details have been submitted. After approval, it will be added!"
    );
  };

  return (
    <div
      style={{
        padding: 40,
        fontFamily: "'Montserrat', sans-serif",
        minHeight: "100vh",
        background: "#f9f5f6",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 32,
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          maxWidth: 700,
          width: "100%",
        }}
      >
        <button
          onClick={() => navigate("/vendor/dashboard")}
          style={{
            background: "#b76e79",
            color: "#fff",
            padding: "8px 14px",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            marginBottom: 20,
          }}
        >
          ← Back
        </button>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#b76e79",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          Vendor Food Service
        </h1>

        {/* Agreement Section */}
        <div
          style={{
            background: "#fff8f9",
            border: "1px solid #e6bfc5",
            padding: 24,
            borderRadius: 12,
            marginBottom: 28,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "#8a3b45",
              marginBottom: 16,
              fontSize: 20,
              fontWeight: 700,
              textAlign: "center",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Vendor Agreement & Terms
          </h2>

          <div
            style={{
              maxHeight: 200,
              overflowY: "auto",
              padding: "12px 16px",
              background: "#fff",
              border: "1px solid #f0d9dc",
              borderRadius: 8,
              textAlign: "left",
              fontSize: 14,
              lineHeight: 1.6,
              color: "#444",
              marginBottom: 14,
            }}
          >
            <ol style={{ paddingLeft: 20, marginTop: 10 }}>
              <li>
                <strong>Menu & Pricing Control:</strong> All menu items, categories, and prices will be fixed by Vivaaha Sutra.
              </li>
              <li>
                <strong>Commission & Revenue Sharing:</strong> Vivaaha Sutra receives 15% of every order; the remaining 85% goes to the vendor.
              </li>
              <li>
                <strong>Quality & Standards:</strong> Vendors must maintain food quality, hygiene, and freshness.
              </li>
              <li>
                <strong>Licensing & Compliance:</strong> Vendors must have valid FSSAI or equivalent licenses and follow all regulations.
              </li>
              <li>
                <strong>Service & Timeliness:</strong> Food must be prepared and served on time; delays may lead to penalties.
              </li>
              <li>
                <strong>Hygiene & Safety:</strong> Vendors must disclose allergens and follow hygiene protocols.
              </li>
              <li>
                <strong>Liability:</strong> Vendors are solely responsible for complaints or issues; Vivaaha Sutra is not liable.
              </li>
              <li>
                <strong>Verification & Approval:</strong> Listings will be activated only after successful verification and may be suspended if terms are violated.
              </li>
            </ol>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={{ marginRight: 10, transform: "scale(1.2)" }}
            />
            <label htmlFor="agree" style={{ fontSize: 15, color: "#333" }}>
              I have read and agree to the Vendor Agreement
            </label>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          {/* Food Service Details */}
          <h2
            style={{
              color: "#b76e79",
              fontSize: 20,
              marginBottom: 8,
              borderBottom: "2px solid #f0d9dc",
              paddingBottom: 4,
            }}
          >
            Food Service Details
          </h2>
          <input
            type="text"
            name="cateringName"
            placeholder="Catering/Hotel Name *"
            value={formData.cateringName}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="place"
            placeholder="Place / Location *"
            value={formData.place}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="tel"
            name="contact"
            placeholder="Contact Number *"
            value={formData.contact}
            onChange={handleChange}
            style={inputStyle}
          />

          {/* Vendor Details */}
          <h2
            style={{
              color: "#b76e79",
              fontSize: 20,
              marginTop: 16,
              marginBottom: 8,
              borderBottom: "2px solid #f0d9dc",
              paddingBottom: 4,
            }}
          >
            Vendor Details
          </h2>
          <input
            type="text"
            name="vendorName"
            placeholder="Vendor Name *"
            value={formData.vendorName}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="tel"
            name="vendorPhone"
            placeholder="Vendor Phone Number *"
            value={formData.vendorPhone}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="vendorAddress"
            placeholder="Vendor Address *"
            value={formData.vendorAddress}
            onChange={handleChange}
            style={inputStyle}
          />
          <label style={labelStyle}>
            Upload Aadhaar *:
            <input
              type="file"
              name="aadhaar"
              accept="image/*,.pdf"
              onChange={handleChange}
              style={{ marginTop: 6 }}
            />
          </label>

          <button type="submit" style={submitStyle}>
            Submit
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: 20,
              fontWeight: "bold",
              color: message.startsWith("✅") ? "green" : "red",
              textAlign: "center",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: 10,
  borderRadius: 6,
  border: "1px solid #ddd",
  outline: "none",
  fontSize: 14,
};

const labelStyle = { fontSize: 14, color: "#333", marginTop: 8 };

const submitStyle = {
  background: "#b76e79",
  color: "#fff",
  padding: "12px 18px",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 16,
  marginTop: 10,
  transition: "background 0.3s",
};

export default VendorFood;
