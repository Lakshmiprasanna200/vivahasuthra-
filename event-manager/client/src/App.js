import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Main User Pages
import WelcomePage from "./pages/WelcomePage";
import WeddingTypes from "./pages/WeddingTypes";
import TraditionalWedding from "./pages/TraditionalWedding";
import DestinationWedding from "./pages/DestinationWedding";
import ThemeWedding from "./pages/ThemeWedding";
import MandapDetail from "./pages/MandapDetail";
import WarangalMandapDetail from "./pages/WarangalMandapDetail";
import FoodSelection from "./pages/FoodSelection";
import DecorSelection from "./pages/DecorSelection";
import Photography from "./pages/Photography"; 
import Music from "./pages/Music"; 
import Summary from "./pages/Summary"; 
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup"; 
import Agreement from "./pages/Agreement";  // ✅ Added

// Vendor Pages
import VendorSignup from "./pages/VendorSignup";  
import VendorLogin from "./pages/VendorLogin";
import VendorDashboard from "./pages/VendorDashboard";
import VendorMandaps from "./pages/VendorMandaps";
import VendorFood from "./pages/VendorFood";  
import VendorDecor from "./pages/VendorDecor";
import VendorPhotography from "./pages/VendorPhotography";  
import VendorMusic from "./pages/VendorMusic";  

function App() {
  return (
    <Router>
      <Routes>
        {/* ======================= */}
        {/* Main Customer Flow */}
        {/* ======================= */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/wedding-types" element={<WeddingTypes />} />
        <Route path="/traditional" element={<TraditionalWedding />} />
        <Route path="/destination" element={<DestinationWedding />} />
        <Route path="/theme" element={<ThemeWedding />} />
        <Route path="/mandap/:mandapName" element={<MandapDetail />} />
        <Route path="/warangal/:mandapName" element={<WarangalMandapDetail />} />
        <Route path="/mandap/:mandapName/food/:hallName" element={<FoodSelection />} />
        <Route path="/mandap/:mandapName/food/:hallName/decor" element={<DecorSelection />} />
        <Route path="/mandap/:mandapName/food/:hallName/decor/photography" element={<Photography />} />
        <Route path="/mandap/:mandapName/food/:hallName/decor/photography/music" element={<Music />} />
        <Route path="/summary" element={<Summary />} />

        {/* ✅ User Authentication */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/agreement" element={<Agreement />} /> {/* ✅ Route for agreement */}

        {/* ======================= */}
        {/* Vendor Flow */}
        {/* ======================= */}
        <Route path="/vendor/signup" element={<VendorSignup />} />
        <Route path="/vendor/login" element={<VendorLogin />} />
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/vendor/mandaps" element={<VendorMandaps />} />
        <Route path="/vendor/food" element={<VendorFood />} />
        <Route path="/vendor/decor" element={<VendorDecor />} />
        <Route path="/vendor/photography" element={<VendorPhotography />} />
        <Route path="/vendor/music" element={<VendorMusic />} />

        {/* 404 Fallback */}
        <Route path="*" element={<div className="text-center p-8">Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;