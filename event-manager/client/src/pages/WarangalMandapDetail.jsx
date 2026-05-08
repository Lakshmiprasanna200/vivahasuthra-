import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const WarangalMandapDetail = () => {
  const { mandapName } = useParams();
  const navigate = useNavigate();

  const allMandaps = {
    "sri-sai-ram-function-hall": {
      name: "Sri Sai Ram Function Hall",
      location: "Hanamkonda, Warangal",
      halls: [
        {
          name: "Main Hall (AC)",
          type: "AC",
          seating: 800,
          floating: 1200,
          price: "₹1,50,000",
          features: ["Spacious hall", "Modern lighting", "Sound system", "VIP lounge", "Central AC"]
        },
        {
          name: "Main Hall (Non-AC)",
          type: "Non-AC",
          seating: 800,
          floating: 1200,
          price: "₹1,00,000",
          features: ["Spacious hall", "Basic lighting", "Sound system", "Ceiling fans"]
        }
      ],
      contact: "0870-2345678",
      address: "Near Bus Stand, Hanamkonda, Warangal - 506001",
      amenities: ["Parking", "Catering services", "Bridal room", "Power backup"],
      images: ["sai-ram-1.jpg", "sai-ram-2.jpg"],
      mapImage: "sai-ram-map.jpg"
    },
    "grand-trinity-gardens": {
      name: "Grand Trinity Gardens",
      location: "Kazipet, Warangal",
      halls: [
        {
          name: "Lawn Area (Outdoor)",
          type: "Outdoor",
          seating: 1000,
          floating: 1500,
          price: "₹2,00,000",
          features: ["Beautiful garden", "Natural ambiance", "Outdoor lighting", "Separate dining area"]
        }
      ],
      contact: "0870-3456789",
      address: "Kazipet Main Road, Warangal - 506003",
      amenities: ["Landscaped gardens", "Ample parking", "Decoration services", "Catering kitchen"],
      images: ["trinity-1.jpg", "trinity-2.jpg"],
      mapImage: "trinity-map.jpg"
    },
    "kakatiya-kalyanamandapam": {
      name: "Kakatiya Kalyanamandapam",
      location: "Hanamkonda, Warangal",
      halls: [
        {
          name: "Main Mandapam (AC)",
          type: "AC",
          seating: 1500,
          floating: 2000,
          price: "₹3,00,000",
          features: ["Traditional architecture", "Large stage", "Professional lighting", "VIP rooms", "Central AC"]
        }
      ],
      contact: "0870-5678901",
      address: "Kakatiya University Road, Hanamkonda - 506009",
      amenities: ["Huge parking area", "Power backup", "Catering services", "Wheelchair accessible"],
      images: ["kakatiya-1.jpg", "kakatiya-2.jpg"],
      mapImage: "kakatiya-map.jpg"
    },
    "akuthota-convention": {
      name: "Akuthota Convention",
      location: "Warangal",
      halls: [
        {
          name: "Grand Hall (AC)",
          type: "AC",
          seating: 1000,
          floating: 1500,
          price: "₹2,25,000",
          features: ["Elegant interiors", "LED lighting", "Professional sound system", "VIP lounge", "AC"]
        }
      ],
      contact: "0870-7890123",
      address: "Akuthota Road, Warangal - 506004",
      amenities: ["Valet parking", "Bridal suite", "Catering services", "Power backup"],
      images: ["akuthota-1.jpg", "akuthota-2.jpg"],
      mapImage: "akuthota-map.jpg"
    },
    "nandana-banquet-hall": {
      name: "Nandana Banquet Hall",
      location: "Hanamkonda, Warangal",
      halls: [
        {
          name: "Royal Hall (AC)",
          type: "AC",
          seating: 700,
          floating: 1000,
          price: "₹1,80,000",
          features: ["Royal decor", "AC", "LED lighting", "VIP area"]
        }
      ],
      contact: "0870-8901234",
      address: "Near Hanamkonda Chowrasta, Warangal - 506001",
      amenities: ["Parking", "Catering", "Bridal room", "Power backup"],
      images: ["nandana-1.jpg"],
      mapImage: "nandana-map.jpg"
    },
    "rnr-gardens": {
      name: "RNR Gardens",
      location: "Warangal",
      halls: [
        {
          name: "Garden Area (Outdoor)",
          type: "Outdoor",
          seating: 1200,
          floating: 1800,
          price: "₹2,50,000",
          features: ["Beautiful lawn", "Natural setting", "Outdoor lighting"]
        }
      ],
      contact: "0870-9012345",
      address: "RNR Road, Warangal - 506002",
      amenities: ["Ample parking", "Catering", "Decoration services", "Power backup"],
      images: ["rnr-1.jpg", "rnr-2.jpg"],
      mapImage: "rnr-map.jpg"
    },
    "bhadrakshi-banquet-hall": {
      name: "Bhadrakshi Banquet Hall",
      location: "Kazipet, Warangal",
      halls: [
        {
          name: "AC Hall",
          type: "AC",
          seating: 600,
          floating: 900,
          price: "₹1,50,000",
          features: ["Modern decor", "AC", "Sound system", "LED lighting"]
        }
      ],
      contact: "0870-0123456",
      address: "Kazipet Main Road, Warangal - 506003",
      amenities: ["Parking", "Catering", "Changing rooms", "Power backup"],
      images: ["bhadrakshi-1.jpg"],
      mapImage: "bhadrakshi-map.jpg"
    },
    "assuntha-bhavan-banquet-hall": {
      name: "Assuntha Bhavan Banquet Hall",
      location: "Warangal",
      halls: [
        {
          name: "AC Hall",
          type: "AC",
          seating: 500,
          floating: 700,
          price: "₹1,25,000",
          features: ["Elegant decor", "AC", "Sound system", "Stage lighting"]
        }
      ],
      contact: "0870-1234567",
      address: "Near Warangal Railway Station, Warangal - 506002",
      amenities: ["Limited parking", "Basic catering", "Changing rooms"],
      images: ["assuntha-1.jpg"],
      mapImage: "assuntha-map.jpg"
    }
  };

  const mandap = allMandaps[mandapName];

  if (!mandap) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Venue Details Coming Soon</h2>
        <p>We're working on adding details for this venue. Please check back later.</p>
        <button onClick={() => navigate(-1)} style={{ background: '#6a1b9a', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', marginTop: '20px', cursor: 'pointer' }}>Back to List</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#6a1b9a', cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>← Back</button>
      <h1 style={{ color: '#6a1b9a' }}>{mandap.name}</h1>
      <p>📍 {mandap.location}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '10px', margin: '20px 0' }}>
        {mandap.images?.map((img, index) => (
          <div key={index} style={{ height: '200px', background: '#eee', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', overflow: 'hidden' }}>
            <img src={`/images/${img}`} alt={mandap.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>

      <div style={{ margin: '30px 0' }}>
        <h2>Halls Available</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '15px' }}>
          {mandap.halls?.map((hall, i) => (
            <div key={i} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#6a1b9a', marginTop: 0 }}>{hall.name}</h3>
              <p><strong>Type:</strong> {hall.type}</p>
              <p><strong>Capacity:</strong> {hall.seating} seating / {hall.floating} floating</p>
              <p><strong>Price:</strong> {hall.price}</p>
              <div style={{ marginTop: '10px' }}>
                <strong>Features:</strong>
                <ul style={{ paddingLeft: '20px', margin: '10px 0 0 0' }}>
                  {hall.features.map((f, j) => <li key={j}>{f}</li>)}
                </ul>
              </div>
              <button onClick={() => alert(`Booking request for ${hall.name} at ${mandap.name}`)} style={{ background: '#6a1b9a', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', marginTop: '15px', cursor: 'pointer', width: '100%' }}>
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>

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

      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '5px', marginTop: '30px' }}>
        <h2 style={{ marginTop: 0 }}>Contact Information</h2>
        <p><strong>Address:</strong> {mandap.address}</p>
        <p><strong>Phone:</strong> {mandap.contact}</p>
      </div>

      <div style={{ margin: '30px 0' }}>
        <h2>Location</h2>
        <div style={{ height: '300px', width: '100%', borderRadius: '5px', overflow: 'hidden', position: 'relative', border: '1px solid #ddd' }}>
          {mandap.mapImage ? (
            <img src={`/images/${mandap.mapImage}`} alt={`${mandap.name} location map`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0', color: '#666' }}>Map not available</div>
          )}
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mandap.address)}`} target="_blank" rel="noopener noreferrer" style={{ position: 'absolute', bottom: '10px', right: '10px', background: '#6a1b9a', color: 'white', padding: '8px 15px', borderRadius: '4px', textDecoration: 'none', fontSize: '14px' }}>Open in Google Maps ↗</a>
        </div>
      </div>
    </div>
  );
};

export default WarangalMandapDetail;