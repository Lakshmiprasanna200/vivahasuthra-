// src/pages/MandapDetail.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MandapDetail = () => {
  const { mandapName } = useParams();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  // All Telangana mandaps with numeric price
  const allMandaps = {
    "jrc-conventions-and-trade-fairs": {
      name: "JRC Conventions & Trade Fairs",
      location: "Jubilee Hills, Hyderabad",
      halls: [
        { name: "Grand Ballroom", type: "AC", seating: 1500, floating: 2500, price: 375000, features: ["Crystal chandeliers", "VIP lounge", "Dance floor", "Professional lighting"] },
        { name: "Emerald Hall", type: "AC", seating: 800, floating: 1200, price: 225000, features: ["Garden view", "Private entrance", "Built-in sound system"] }
      ],
      contact: "040-23456789",
      address: "Road No. 36, Jubilee Hills, Hyderabad - 500033",
      amenities: ["Valet parking", "Wheelchair accessible", "Bridal suite", "Catering services"],
      images: ["jrc-1.jpg", "jrc-2.jpg"],
      mapImage: "jrc-map.jpg"
    },
    "shri-convention": {
      name: "Shri Convention",
      location: "Kondapur, Hyderabad",
      halls: [
        { name: "Royal Hall", type: "AC", seating: 1200, floating: 1800, price: 300000, features: ["Royal themed decor", "LED wall", "Separate dining area"] },
        { name: "Pearl Hall", type: "AC", seating: 600, floating: 900, price: 175000, features: ["Elegant interiors", "Private green room", "Catering kitchen"] }
      ],
      contact: "040-34567890",
      address: "Near Hitech City, Kondapur, Hyderabad - 500084",
      amenities: ["Ample parking", "Power backup", "Air conditioning", "Elevator"],
      images: ["shri-convention-1.jpg", "shri-convention-2.jpg"],
      mapImage: "shri-map.jpg"
    },
    "lotus-banquet": {
      name: "Lotus Banquet Hall",
      location: "Suryapet, Telangana",
      halls: [
        { name: "Lotus Grand", type: "Non-AC", seating: 500, floating: 800, price: 120000, features: ["Open garden", "Parking facility", "Stage arrangement"] }
      ],
      contact: "08682-123456",
      address: "Near Bus Stand, Suryapet - 508213",
      amenities: ["Catering allowed", "Sound system", "Decor assistance"],
      images: ["lotus-1.jpg", "lotus-2.jpg"],
      mapImage: "lotus-map.jpg"
    },
    "paradise-hall": {
      name: "Paradise Hall",
      location: "Siddipet, Telangana",
      halls: [
        { name: "Paradise Main Hall", type: "AC", seating: 400, floating: 700, price: 100000, features: ["Air-conditioned", "Stage lighting", "VIP seating"] }
      ],
      contact: "08710-987654",
      address: "Main Road, Siddipet - 502103",
      amenities: ["Parking", "Sound system", "Decor options"],
      images: ["paradise-1.jpg", "paradise-2.jpg"],
      mapImage: "paradise-map.jpg"
    },
    "royal-palace": {
      name: "Royal Palace",
      location: "Karimnagar, Telangana",
      halls: [
        { name: "Royal Banquet", type: "AC", seating: 600, floating: 1000, price: 200000, features: ["Grand chandelier", "Dance floor", "VIP lounge"] }
      ],
      contact: "0878-7654321",
      address: "Near Bus Stand, Karimnagar - 505001",
      amenities: ["Catering services", "Parking", "Wheelchair accessible"],
      images: ["royal-1.jpg", "royal-2.jpg"],
      mapImage: "royal-map.jpg"
    }
  };

  const cleanName = mandapName.toLowerCase().replace(/-/g, ' ');
  const mandap = allMandaps[mandapName] || Object.values(allMandaps).find(m => m.name.toLowerCase().includes(cleanName));

  if (!mandap) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Venue Details Coming Soon</h2>
        <p>We're working on adding details for this venue. Please check back later.</p>
        <button
          onClick={() => navigate(-1)}
          style={{ background: '#6a1b9a', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', marginTop: '20px', cursor: 'pointer' }}
        >
          Back to List
        </button>
      </div>
    );
  }

  const handleCheckAvailability = (date) => {
    setSelectedDate(date);
    const available = Math.random() > 0.5;
    setAvailability(available ? "Available ✅" : "Not Available ❌");
  };

  const handleBookMandap = async (hall) => {
    if (!selectedDate) {
      alert("Please select a date before booking!");
      return;
    }

    const mandapData = {
      mandapName: mandap.name,
      hallName: hall.name,
      hallType: hall.type,
      hallPrice: hall.price,
      location: mandap.location,
      date: selectedDate
    };

    try {
      const response = await fetch("http://localhost:5000/save-mandap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mandapData)
      });
      const data = await response.json();
      alert(data.message);

      navigate(`/mandap/${mandapName}/food/${hall.name.replace(/\s+/g, '-').toLowerCase()}`, {
        state: mandapData
      });
    } catch (err) {
      console.error(err);
      alert("Error saving mandap selection");
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#6a1b9a', cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>← Back</button>
      <h1 style={{ color: '#6a1b9a' }}>{mandap.name}</h1>
      <p>📍 {mandap.location}</p>

      {/* Mandap Images */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '10px', margin: '20px 0' }}>
        {mandap.images?.map((img, index) => (
          <div key={index} style={{ height: '200px', background: '#eee', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', overflow: 'hidden' }}>
            <img src={`/images/${img}`} alt={mandap.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>

      {/* Halls */}
      <div style={{ margin: '30px 0' }}>
        <h2>Halls Available</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '15px' }}>
          {mandap.halls?.map((hall, i) => (
            <div key={i} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#6a1b9a', marginTop: 0 }}>{hall.name} ({hall.type})</h3>
              <p><strong>Capacity:</strong> {hall.seating} seating / {hall.floating} floating</p>
              <p><strong>Price:</strong> ₹{hall.price.toLocaleString()}</p>
              <div style={{ marginTop: '10px' }}>
                <strong>Features:</strong>
                <ul style={{ paddingLeft: '20px', margin: '10px 0 0 0' }}>
                  {hall.features.map((f, j) => <li key={j}>{f}</li>)}
                </ul>
              </div>

              {/* Check availability */}
              <button
                onClick={() => setShowCalendar(showCalendar === i ? null : i)}
                style={{ background: '#ff9800', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', marginTop: '15px', cursor: 'pointer', width: '100%' }}
              >
                Check Availability
              </button>

              {showCalendar === i && (
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                  <input
                    type="date"
                    onChange={(e) => handleCheckAvailability(e.target.value)}
                    style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                  />
                  {selectedDate && (
                    <p style={{ marginTop: '10px', fontWeight: 'bold', color: availability.includes("Available") ? "green" : "red" }}>
                      {availability} on {selectedDate}
                    </p>
                  )}
                </div>
              )}

              {/* Book Mandap */}
              <button
                onClick={() => handleBookMandap(hall)}
                style={{ background: '#6a1b9a', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', marginTop: '15px', cursor: 'pointer', width: '100%' }}
              >
                Book
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      {mandap.amenities && (
        <div style={{ margin: '30px 0' }}>
          <h2>Venue Amenities</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
            {mandap.amenities.map((amenity, index) => (
              <span key={index} style={{ background: '#f0e6ff', padding: '5px 10px', borderRadius: '20px', fontSize: '0.9rem' }}>{amenity}</span>
            ))}
          </div>
        </div>
      )}

      {/* Contact */}
      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '5px', marginTop: '30px' }}>
        <h2 style={{ marginTop: 0 }}>Contact Information</h2>
        <p><strong>Address:</strong> {mandap.address}</p>
        <p><strong>Phone:</strong> {mandap.contact}</p>
      </div>

      {/* Map */}
      <div style={{ margin: '30px 0' }}>
        <h2>Location</h2>
        <div style={{ height: '300px', width: '100%', borderRadius: '5px', overflow: 'hidden', position: 'relative', border: '1px solid #ddd' }}>
          {mandap.mapImage ? (
            <img
              src={`/images/${mandap.mapImage}`}
              alt={`${mandap.name} location map`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0', color: '#666' }}>
              Map not available
            </div>
          )}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mandap.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              background: '#6a1b9a',
              color: 'white',
              padding: '8px 15px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '14px'
            }}
          >
            Open in Google Maps ↗
          </a>
        </div>
      </div>
    </div>
  );
};

export default MandapDetail;
