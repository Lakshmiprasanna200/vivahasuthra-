import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VendorPhotography = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    serviceName: "",
    place: "",
    sampleImage: null,
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
      window.alert("❌ Please agree to the Photography Vendor Agreement before submitting.");
      return;
    }

    if (
      !formData.serviceName ||
      !formData.place ||
      !formData.sampleImage ||
      !formData.vendorName ||
      !formData.vendorPhone ||
      !formData.vendorAddress ||
      !formData.aadhaar
    ) {
      setMessage("❌ Please fill in all mandatory details before submitting.");
      return;
    }

    setMessage(
      "✅ Your photography service has been submitted. After approval, it will be added!"
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
        {/* Back Button */}
        <button
          onClick={() => navigate("/vendor/dashboard")}
          style={{
            background: "#b76e79",
            color: "#fff",
            padding: "8px 14px",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            marginBottom: "16px",
          }}
        >
          &larr; Back
        </button>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#b76e79",
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          Add Photography Service
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
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Photography Vendor Agreement & Terms
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
                <strong>Services & Pricing Control:</strong> All photography
                packages, services, and pricing are fixed and approved by Vivaaha Sutra.
              </li>
              <li>
                <strong>Commission & Revenue Sharing:</strong> Vivaaha Sutra receives
                15% commission; the vendor retains the remaining 85%. Settlements are monthly.
              </li>
              <li>
                <strong>Quality & Standards:</strong> Photography and videography
                services must meet the standards set by Vivaaha Sutra.
              </li>
              <li>
                <strong>Licensing & Compliance:</strong> Vendors must comply with
                all copyright, privacy, and local laws. Permissions are required for
                special equipment (drones, etc.).
              </li>
              <li>
                <strong>Timeliness & Execution:</strong> Services must follow the
                event schedule. Delays may lead to penalties or removal from the platform.
              </li>
              <li>
                <strong>Safety & Liability:</strong> Vendors are responsible for
                their staff, equipment, and any disputes arising from services.
              </li>
              <li>
                <strong>Verification & Approval:</strong> Listings are activated only
                after verification by Vivaaha Sutra. Violations may result in suspension.
              </li>
            </ol>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={{ marginRight: "10px", transform: "scale(1.2)" }}
            />
            <label htmlFor="agree" style={{ fontSize: "15px", color: "#333" }}>
              I have read and agree to the Photography Vendor Agreement
            </label>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <h2 style={sectionTitleStyle}>Photography Service Details</h2>
          <input
            type="text"
            name="serviceName"
            placeholder="Service Name *"
            value={formData.serviceName}
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
          <label style={labelStyle}>
            Upload Sample Image *:
            <input
              type="file"
              name="sampleImage"
              accept="image/*"
              onChange={handleChange}
              style={{ marginTop: "6px" }}
            />
          </label>

          <h2 style={sectionTitleStyle}>Vendor Details</h2>
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
            style={submitButtonStyle}
            onMouseEnter={(e) => (e.target.style.background = "#9e5e68")}
            onMouseLeave={(e) => (e.target.style.background = "#b76e79")}
          >
            Submit
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "20px",
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

const labelStyle = {
  fontSize: 14,
  color: "#333",
  marginTop: 8,
};

const sectionTitleStyle = {
  color: "#b76e79",
  fontSize: 20,
  marginBottom: 8,
  borderBottom: "2px solid #f0d9dc",
  paddingBottom: 4,
};

const submitButtonStyle = {
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

export default VendorPhotography;
