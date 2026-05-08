import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VendorDecor = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    decorName: "",
    place: "",
    contact: "",
    decorTypes: "",
    decorImages: null,
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
      !formData.decorName ||
      !formData.place ||
      !formData.contact ||
      !formData.decorTypes ||
      !formData.decorImages ||
      !formData.vendorName ||
      !formData.vendorPhone ||
      !formData.vendorAddress ||
      !formData.aadhaar
    ) {
      setMessage("❌ Please fill in all mandatory details before submitting.");
      return;
    }

    setMessage(
      "✅ Your decor service details have been submitted. After approval, it will be added!"
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
            marginBottom: "20px",
            background: "#b76e79",
            color: "#fff",
            padding: "8px 12px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
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
          Add Decor Service
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
              fontWeight: 700,
              textAlign: "center",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Decor Vendor Agreement & Terms
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
                <strong>Design & Pricing Control:</strong> All decor packages, themes, and prices will be fixed by Vivaaha Sutra. No changes without approval.
              </li>
              <li>
                <strong>Commission & Revenue Sharing:</strong> Vivaaha Sutra receives 15% of every booking; vendors retain 85%.
              </li>
              <li>
                <strong>Quality & Standards:</strong> All decor items and installations must meet quality and aesthetic standards.
              </li>
              <li>
                <strong>Licensing & Compliance:</strong> Vendors must follow all local laws, safety, and permissions.
              </li>
              <li>
                <strong>Timeliness & Execution:</strong> Setup and dismantling must follow event schedules. Delays may result in penalties.
              </li>
              <li>
                <strong>Safety & Liability:</strong> Vendors are responsible for safety during setup and event. Vivaaha Sutra is not liable for accidents or disputes.
              </li>
              <li>
                <strong>Verification & Approval:</strong> Listings will be activated only after verification. Violations may lead to suspension or removal.
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
              I have read and agree to the Decor Vendor Agreement
            </label>
          </div>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          {/* Decor Service Details */}
          <h2
            style={{
              color: "#b76e79",
              fontSize: "20px",
              marginBottom: "8px",
              borderBottom: "2px solid #f0d9dc",
              paddingBottom: "4px",
            }}
          >
            Decor Service Details
          </h2>
          <input type="text" name="decorName" placeholder="Decor Service / Hotel Name *" value={formData.decorName} onChange={handleChange} style={inputStyle} />
          <input type="text" name="place" placeholder="Place / Location *" value={formData.place} onChange={handleChange} style={inputStyle} />
          <input type="tel" name="contact" placeholder="Contact Number *" value={formData.contact} onChange={handleChange} style={inputStyle} />
          <textarea name="decorTypes" placeholder="Types of Decorations Offered *" value={formData.decorTypes} onChange={handleChange} style={{ ...inputStyle, minHeight: "80px" }} />
          
          <label style={labelStyle}>
            Upload Images of Previous Work *:
            <input type="file" name="decorImages" accept="image/*" onChange={handleChange} style={{ marginTop: "6px" }} />
          </label>

          {/* Vendor Details */}
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
          <input type="text" name="vendorName" placeholder="Vendor Name *" value={formData.vendorName} onChange={handleChange} style={inputStyle} />
          <input type="tel" name="vendorPhone" placeholder="Vendor Phone Number *" value={formData.vendorPhone} onChange={handleChange} style={inputStyle} />
          <input type="text" name="vendorAddress" placeholder="Vendor Address *" value={formData.vendorAddress} onChange={handleChange} style={inputStyle} />
          <label style={labelStyle}>
            Upload Aadhaar *:
            <input type="file" name="aadhaar" accept="image/*,.pdf" onChange={handleChange} style={{ marginTop: "6px" }} />
          </label>

          <button type="submit" style={submitStyle}>Submit</button>
        </form>

        {/* Message */}
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

const submitStyle = {
  background: "#b76e79",
  color: "#fff",
  padding: "12px 18px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "10px",
  transition: "background 0.3s",
};

export default VendorDecor;
