import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TraditionalWedding = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const mandapsData = {
    Hyderabad: [
      'JRC Conventions & Trade Fairs – Jubilee Hills',
      'Shri Convention – Kondapur',
      'PM Gardens and Convention Hall – Bowenpally',
      'Sri Venkateshwara Function Hall – Amberpet',
      'Sai Mahalaxmi Gardens – Katedan',
      'Balaji Function Hall – Uppal'
    ],
    Warangal: [
      'Sri Sai Ram Function Hall – Hanamkonda',
      'Grand Trinity Gardens – Kazipet',
      'Kakatiya Kalyanamandapam – Hanamkonda',
      'Akuthota Convention – Hanamkonda',
      'Nandana Banquet Hall – Hanamkonda',
      'RNR Gardens – Warangal',
      'Bhadrakshi Banquet Hall – Kazipet',
      'Assuntha Bhavan Banquet Hall – Warangal'
    ],
    Karimnagar: [
      'KSL Convention and Utsav – Kothapalli',
      'PM Gardens and Convention Hall – Karimnagar Main Road',
      'Rajasree Convention – Vidyanagar',
      'Aviyaan Events – Choppadandi Road',
      'Padmashali Kalyana Mandapam – Karimnagar Town',
      'Pushpavalli Function Hall – Sircilla Road',
      'Sri Vinayaka Function Hall – Mancherial Road'
    ],
    Nizamabad: [
      'Grand Convention Center – Bodhan Road',
      'Galaxy Function Hall – Khaleelwadi',
      'Classic Gardens – Near Bus Stand',
      'Royal Palace Banquet – Dichpally',
      'Siri Convention Hall – Arsapally',
      'Vijaya Gardens – Gandhi Chowk',
      'Sri Sai Function Hall – Shivajinagar'
    ],
    Khammam: [
      'Raj Convention Hall – Mamillagudem',
      'Haritha Gardens – NST Road',
      'Sundara Gardens – Bonakal Road',
      'Sri Krishna Gardens – Khammam City',
      'Siddhartha Gardens – Wyra Road',
      'Kalyana Mandapam Palace – Prakash Nagar',
      'Ganesh Function Hall – Devarkadra Road'
    ],
    Mahbubnagar: [
      'Kalyana Grand Convention Hall – Veerannapet',
      'Harshini Gardens – Mettugadda',
      'Raghavendra Gardens – New Town',
      'Sri Laxmi Gardens – Yenugonda',
      'Ganesh Function Hall – Devarkadra Road',
      'Sri Venkateshwara Function Hall – Rajendra Nagar',
      'Shanthi Gardens – Station Road'
    ],
    Nalgonda: [
      'Venkateshwara Convention Center – Miryalaguda Road',
      'Green Hills Function Hall – Nalgonda Bypass',
      'Sri Sai Gardens – Gollaguda',
      'Shubham Banquets – Near RTC Complex',
      'Laxmi Function Hall – Clock Tower Center',
      'Annapurna Function Hall – Main Road',
      'Satya Function Hall – Dwaraka Nagar'
    ],
    Adilabad: [
      'Siri Convention Center – Nirmal',
      'Aditya Gardens – Bhainsa Road',
      'Lalitha Convention Hall – Adilabad City',
      'Sri Rama Function Hall – Ichoda',
      'Durga Function Hall – Utnoor',
      'Siri Function Hall – Bela Road',
      'Classic Function Hall – Adilabad Town'
    ],
    Siddipet: [
      'SAHASRA DLA AC CONVENTION HALL – Collectorate Road',
      'PDR AC Gardens – Siddipet Town',
      'Anr Gardens – Dubbak Road',
      'D Convention & Hotel D Light – Main Road',
      'Dreamland Garden Function Hall – Pragnapur',
      'Nagarjuna Convention Hall – Komuravelly Road',
      'SIRI BANQUET Hall – Opp. Police Station'
    ],
    Suryapet: [
      'Satya Convention Center – NH65 Bypass',
      'Sri Venkateswara Gardens – Kudakuda',
      'Manjeera Gardens – Suryapet Town',
      'Sai Ganesh Gardens – Nalgonda Road',
      'Vaibhav Garden – Housing Board',
      'Balaji Function Hall – Indira Nagar',
      'Shubham Banquets – Near RTC Complex'
    ],
    Nirmal: [
      'Green Hills Convention Hall – Bypass Road',
      'Siri Convention Center – Nirmal City',
      'Lakshmi Gardens – Ichoda Road',
      'Nirmal Function Palace – Near RTC Complex',
      'Sri Venkateshwara Function Hall – Old Town',
      'Sai Palace Function Hall – Bazar Street',
      'Shubham Gardens – Bheemgal Road'
    ],
    Mancherial: [
      'Siri Convention Hall – Bellampalli Road',
      'Sree Balaji Gardens – Near Railway Station',
      'Vinayaka Convention – Model Colony',
      'Rama Function Hall – Old Bus Stand',
      'Lahari Gardens – Luxettipet Road',
      'Sri Sai Function Hall – Mandamarri Area',
      'Annapurna Banquet Hall – Market Street'
    ]
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const generateMandapId = (mandapName) => {
    return mandapName.split('–')[0].trim()
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };

  const filteredMandaps = selectedLocation
    ? (mandapsData[selectedLocation] || []).filter(mandap =>
        mandap.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div style={{ textAlign: 'center', padding: '30px' }}>
      <h1 style={{
        fontFamily: '"Playfair Display", Georgia, serif',
        fontSize: '2.8rem',
        color: '#8e44ad',
        marginBottom: '20px',
      }}>
        Traditional Wedding Mandaps
      </h1>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '1.2rem', fontWeight: 'bold', marginRight: '10px' }}>
          Select Location:
        </label>
        <select
          onChange={handleLocationChange}
          value={selectedLocation}
          style={{
            padding: '10px 15px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            width: '250px',
          }}
        >
          <option value="">-- Choose a location --</option>
          {Object.keys(mandapsData).map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '1.2rem', fontWeight: 'bold', marginRight: '10px' }}>
          Search Mandaps:
        </label>
        <input
          type="text"
          placeholder="Search by mandap name..."
          onChange={handleSearchChange}
          style={{
            padding: '10px 15px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            width: '300px',
          }}
        />
      </div>

      {selectedLocation && (
        <div style={{ marginTop: '30px' }}>
          <h2 style={{
            marginTop: '20px',
            fontSize: '1.8rem',
            color: '#2c3e50',
          }}>
            Mandaps in {selectedLocation}
          </h2>

          {filteredMandaps.length === 0 ? (
            <p>No mandaps found matching your search</p>
          ) : (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {filteredMandaps.map((mandap, index) => {
                const mandapId = generateMandapId(mandap);
                return (
                  <li
                    key={index}
                    style={{
                      background: '#f2f2f2',
                      margin: '10px auto',
                      padding: '15px',
                      borderRadius: '8px',
                      maxWidth: '600px',
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {selectedLocation === 'Warangal' ? (
                      <Link
                        to={`/warangal/${mandapId}`}
                        style={{ textDecoration: 'none', color: '#2c3e50' }}
                      >
                        {mandap}
                      </Link>
                    ) : (
                      <Link
                        to={`/mandap/${mandapId}`}
                        style={{ textDecoration: 'none', color: '#2c3e50' }}
                      >
                        {mandap}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default TraditionalWedding;