import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VendorMandaps = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mandapName: "",
    place: "",
    price: "",
    seating: "",
    amenities: "",
    mandapAddress: "",
    mandapContact: "",
    mandapImage: null,
    vendorName: "",
    vendorPhone: "",
    vendorAddress: "",
    aadhaar: null,
  });

  const [agreed, setAgreed] = useState(false);

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
      !formData.mandapName ||
      !formData.place ||
      !formData.price ||
      !formData.seating ||
      !formData.amenities ||
      !formData.mandapAddress ||
      !formData.mandapContact ||
      !formData.mandapImage ||
      !formData.vendorName ||
      !formData.vendorPhone ||
      !formData.vendorAddress ||
      !formData.aadhaar
    ) {
      window.alert("❌ Please fill in all mandatory details before submitting.");
      return;
    }

    // ✅ Popup confirmation
    window.alert(
      "✅ Your mandap details have been submitted.\nAfter approval from the Vivaaha Sutra team, it will be added!"
    );
  };

  return (
    <div
      style={{
        padding: "40px 20px",
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
          padding: "32px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          maxWidth: "700px",
          width: "100%",
        }}
      >
        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate("/vendor/dashboard")}
          style={{
            background: "#ccc",
            color: "#333",
            padding: "8px 14px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginBottom: "16px",
          }}
        >
          ← Back
        </button>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#b76e79",
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          Add Mandap Details
        </h1>

        {/* Agreement Section */}
        <div
          style={{
            background: "#fff8f9",
            border: "1px solid #e6bfc5",
            padding: "24px",
            borderRadius: "12px",
            marginBottom: "28px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "#8a3b45",
              marginBottom: "16px",
              fontSize: "20px",
              fontWeight: "700",
              textAlign: "center",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Vendor Agreement & Terms
          </h2>

          <div
            style={{
              maxHeight: "200px",
              overflowY: "auto",
              padding: "12px 16px",
              background: "#fff",
              border: "1px solid #f0d9dc",
              borderRadius: "8px",
              textAlign: "left",
              fontSize: "14px",
              lineHeight: "1.6",
              color: "#444",
              marginBottom: "14px",
            }}
          >
            <ol style={{ paddingLeft: "20px", marginTop: "10px" }}>
              <li>
                <strong>Accuracy of Information:</strong> All details provided must
                be true, correct, and up to date.
              </li>
              <li>
                <strong>Image Authenticity:</strong> Only genuine images of the mandap
                you own/manage are allowed.
              </li>
              <li>
                <strong>Ownership:</strong> You confirm you are the rightful owner or
                authorized manager of the mandap.
              </li>
              <li>
                <strong>Pricing:</strong> Prices must be transparent with no hidden
                charges.
              </li>
              <li>
                <strong>Legal Compliance:</strong> You agree to follow all local laws,
                safety norms, and regulations.
              </li>
              <li>
                <strong>Verification:</strong> Vivaaha Sutra may verify information,
                images, and documents before approval.
              </li>
              <li>
                <strong>Vendor Responsibility:</strong> Vendors must provide smooth
                service and maintain the mandap properly.
              </li>
              <li>
                <strong>Platform Rights:</strong> Vivaaha Sutra can reject or remove
                listings violating these terms.
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
              style={{ marginRight: "10px", transform: "scale(1.2)" }}
            />
            <label htmlFor="agree" style={{ fontSize: "15px", color: "#333" }}>
              I have read and agree to the Vendor Agreement
            </label>
          </div>
        </div>

        {/* Mandap & Vendor Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <h2
            style={{
              color: "#b76e79",
              fontSize: "20px",
              marginBottom: "8px",
              borderBottom: "2px solid #f0d9dc",
              paddingBottom: "4px",
            }}
          >
            Mandap Details
          </h2>
          <input
            type="text"
            name="mandapName"
            placeholder="Mandap Name *"
            value={formData.mandapName}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="place"
            placeholder="Place (Location) *"
            value={formData.place}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="number"
            name="price"
            placeholder="Price (₹) *"
            value={formData.price}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="number"
            name="seating"
            placeholder="Seating Capacity *"
            value={formData.seating}
            onChange={handleChange}
            style={inputStyle}
          />
          <textarea
            name="amenities"
            placeholder="Amenities *"
            value={formData.amenities}
            onChange={handleChange}
            style={{ ...inputStyle, minHeight: "80px" }}
          />
          <input
            type="text"
            name="mandapAddress"
            placeholder="Mandap Address *"
            value={formData.mandapAddress}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="tel"
            name="mandapContact"
            placeholder="Mandap Contact Number *"
            value={formData.mandapContact}
            onChange={handleChange}
            style={inputStyle}
          />
          <label style={labelStyle}>
            Upload Mandap Image *:
            <input
              type="file"
              name="mandapImage"
              accept="image/*"
              onChange={handleChange}
              style={{ marginTop: "6px" }}
            />
          </label>

          <h2
            style={{
              color: "#b76e79",
              fontSize: "20px",
              marginTop: "16px",
              marginBottom: "8px",
              borderBottom: "2px solid #f0d9dc",
              paddingBottom: "4px",
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
              style={{ marginTop: "6px" }}
            />
          </label>

          <button
            type="submit"
            style={{
              background: "#b76e79",
              color: "#fff",
              padding: "12px 18px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              marginTop: "10px",
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#9e5e68")}
            onMouseLeave={(e) => (e.target.style.background = "#b76e79")}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

// Reusable styles
const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  outline: "none",
  fontSize: "14px",
};

const labelStyle = {
  fontSize: "14px",
  color: "#333",
  marginTop: "8px",
};

export default VendorMandaps; 