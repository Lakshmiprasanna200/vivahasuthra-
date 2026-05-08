// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);

  // close menu on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "absolute", top: 20, right: 20, zIndex: 1000 }}>
      {/* Hamburger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 30,
          height: 22,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        aria-label="Open menu"
        role="button"
      >
        <span style={{ height: 4, background: "#b76e79", borderRadius: 2 }} />
        <span style={{ height: 4, background: "#b76e79", borderRadius: 2 }} />
        <span style={{ height: 4, background: "#b76e79", borderRadius: 2 }} />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: 35,
            right: 0,
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: 8,
            boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
            minWidth: 160,
            overflow: "hidden",
          }}
        >
          <p
            onClick={() => { setIsOpen(false); navigate("/"); }}
            style={{ padding: 12, margin: 0, cursor: "pointer" }}
          >
            Home
          </p>

          <p
            onClick={() => { setIsOpen(false); navigate("/wedding-types"); }}
            style={{ padding: 12, margin: 0, cursor: "pointer" }}
          >
            Wedding Types
          </p>

          <div style={{ height: 1, background: "#f3f3f3" }} />

          <p
            onClick={() => { setIsOpen(false); navigate("/vendor/login"); }}
            style={{ padding: 12, margin: 0, cursor: "pointer", color: "#b76e79", fontWeight: 600 }}
          >
            Vendor Login
          </p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
