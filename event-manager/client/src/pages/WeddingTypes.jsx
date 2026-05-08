import React from 'react';
import { useNavigate } from 'react-router-dom';
import destinationImg from '../assets/destination.jpg';
import traditionalImg from '../assets/Traditional.jpg';
import themeImg from '../assets/themebased.jpg';

const WeddingTypes = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '30px', backgroundColor: '#fff8f8' }}>
      <h1
        style={{
          textAlign: 'center',
          fontSize: '2.8rem',
          fontFamily: "'Petrov Sans', Georgia, serif",
          fontStyle: 'italic',
          fontWeight: '500',
          color: '#4a148c',
          marginBottom: '40px',
          letterSpacing: '1px',
          textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        Design the Wedding You Deserve
      </h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
        <div style={cardStyle} onClick={() => navigate('/traditional')}>
          <img src={traditionalImg} alt="Traditional Wedding" style={imageStyle} />
          <h2 style={labelStyle}>Traditional Wedding</h2>
        </div>

        <div style={cardStyle} onClick={() => navigate('/destination')}>
          <img src={destinationImg} alt="Destination Wedding" style={imageStyle} />
          <h2 style={labelStyle}>Destination Wedding</h2>
        </div>

        <div style={cardStyle} onClick={() => navigate('/theme')}>
          <img src={themeImg} alt="Theme Based Wedding" style={imageStyle} />
          <h2 style={labelStyle}>Theme-Based Wedding</h2>
        </div>
      </div>
    </div>
  );
};

// Styles
const cardStyle = {
  width: '300px',
  textAlign: 'center',
  borderRadius: '15px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  backgroundColor: '#ffffff',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'transform 0.2s',
};

const imageStyle = {
  width: '100%',
  height: '250px',
  objectFit: 'cover',
};

const labelStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  padding: '15px 10px',
  backgroundColor: '#fce4ec',
  color: '#880e4f',
  fontFamily: 'Georgia, serif',
};

export default WeddingTypes;