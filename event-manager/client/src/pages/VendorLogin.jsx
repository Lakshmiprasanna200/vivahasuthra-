import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VendorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  // ===== Login Handler =====
  const handleLogin = (e) => {
    e.preventDefault();
    const savedVendor = JSON.parse(localStorage.getItem("vendorAccount"));

    if (!email || !password) return alert("Please enter email & password");

    if (
      savedVendor &&
      savedVendor.email.toLowerCase().trim() === email.toLowerCase().trim() &&
      savedVendor.password === password
    ) {
      alert("Login successful!");
      navigate("/vendor/dashboard");
    } else {
      alert("Incorrect email or password!");
    }
  };

  // ===== Reset Password Handler =====
  const handleReset = (e) => {
    e.preventDefault();
    const savedVendor = JSON.parse(localStorage.getItem("vendorAccount"));

    if (!resetEmail || !newPassword || !confirmPassword)
      return alert("Please fill all fields");

    if (
      !savedVendor ||
      savedVendor.email.toLowerCase().trim() !== resetEmail.toLowerCase().trim()
    ) {
      return alert("Email not found");
    }

    if (newPassword !== confirmPassword)
      return alert("Passwords do not match");

    // Update vendor password
    const updatedVendor = { ...savedVendor, password: newPassword };
    localStorage.setItem("vendorAccount", JSON.stringify(updatedVendor));
    alert("Password reset successful! Please login with new password.");
    setShowReset(false);
    setEmail("");
    setPassword("");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        fontFamily: "'Montserrat', sans-serif",
        padding: "60px 24px",
        background: "#f9f5f6",
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        {!showReset ? (
          <>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#b76e79",
                textAlign: "center",
              }}
            >
              Vendor Login
            </h1>
            <form onSubmit={handleLogin} style={{ marginTop: 16 }}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 6,
                  border: "1px solid #ddd",
                }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 6,
                  border: "1px solid #ddd",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#b76e79",
                  color: "#fff",
                  padding: "10px 16px",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Login
              </button>
            </form>
            <div
              style={{ marginTop: 12, textAlign: "center", cursor: "pointer", color: "#b76e79" }}
              onClick={() => setShowReset(true)}
            >
              Forgot Password?
            </div>
            <p style={{ marginTop: 12, textAlign: "center" }}>
              Don’t have an account?{" "}
              <span
                style={{ color: "#b76e79", cursor: "pointer" }}
                onClick={() => navigate("/vendor/signup")}
              >
                Sign up here
              </span>
            </p>
          </>
        ) : (
          <>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#b76e79",
                textAlign: "center",
              }}
            >
              Reset Password
            </h1>
            <form onSubmit={handleReset} style={{ marginTop: 16 }}>
              <input
                type="email"
                placeholder="Registered Email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 6,
                  border: "1px solid #ddd",
                }}
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 6,
                  border: "1px solid #ddd",
                }}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 6,
                  border: "1px solid #ddd",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#b76e79",
                  color: "#fff",
                  padding: "10px 16px",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Reset Password
              </button>
            </form>
            <div
              style={{ marginTop: 12, textAlign: "center", cursor: "pointer", color: "#b76e79" }}
              onClick={() => setShowReset(false)}
            >
              Back to Login
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VendorLogin;
