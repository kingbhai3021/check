import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Clock, MapPin, DollarSign } from 'lucide-react';

const sampleGoldRates = {
  '24K': {
    'Mumbai': { rate: 6250, change: 25, trend: 'up' },
    'Delhi': { rate: 6230, change: 20, trend: 'up' },
    'Bangalore': { rate: 6240, change: 30, trend: 'up' },
    'Chennai': { rate: 6220, change: 15, trend: 'down' },
    'Kolkata': { rate: 6210, change: 18, trend: 'up' }
  },
  '22K': {
    'Mumbai': { rate: 5730, change: 23, trend: 'up' },
    'Delhi': { rate: 5710, change: 18, trend: 'up' },
    'Bangalore': { rate: 5720, change: 28, trend: 'up' },
    'Chennai': { rate: 5700, change: 14, trend: 'down' },
    'Kolkata': { rate: 5690, change: 16, trend: 'up' }
  },
  '18K': {
    'Mumbai': { rate: 4690, change: 19, trend: 'up' },
    'Delhi': { rate: 4670, change: 15, trend: 'up' },
    'Bangalore': { rate: 4680, change: 23, trend: 'up' },
    'Chennai': { rate: 4660, change: 11, trend: 'down' },
    'Kolkata': { rate: 4650, change: 13, trend: 'up' }
  }
};

const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'];
const goldTypes = ['24K', '22K', '18K'];

const GoldRatePage = () => {
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [selectedType, setSelectedType] = useState('24K');
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    // Simulate live data update
    const now = new Date();
    setLastUpdated(now.toLocaleString());
  }, []);

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 
      <TrendingUp size={16} color="#22c55e" /> : 
      <TrendingDown size={16} color="#ef4444" />;
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? '#22c55e' : '#ef4444';
  };

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h1 style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 32, marginBottom: 24 }}>
        Gold Rate Today
      </h1>
      
      {/* Live Status */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white', 
        padding: '20px', 
        borderRadius: '12px', 
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <h3 style={{ margin: 0, fontFamily: 'Archivo', fontWeight: 600 }}>
            Live Gold Rates
          </h3>
          <p style={{ margin: '8px 0 0 0', fontSize: '14px', opacity: 0.9 }}>
            Last updated: {lastUpdated}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
          <span style={{ fontSize: '14px' }}>Live</span>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontFamily: 'Inter' }}>
            <MapPin size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Select City
          </label>
          <select
            value={selectedCity}
            onChange={e => setSelectedCity(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', fontFamily: 'Inter', minWidth: '150px' }}
          >
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontFamily: 'Inter' }}>
            <DollarSign size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Gold Type
          </label>
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', fontFamily: 'Inter', minWidth: '120px' }}
          >
            {goldTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Current Rate Card */}
      <div style={{ 
        background: 'white', 
        borderRadius: '16px', 
        padding: '24px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontFamily: 'Archivo', fontWeight: 600, fontSize: 24, marginBottom: '16px' }}>
          Current Gold Rate in {selectedCity}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <span style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'Archivo' }}>
            ₹{sampleGoldRates[selectedType][selectedCity].rate}
          </span>
          <span style={{ 
            color: getTrendColor(sampleGoldRates[selectedType][selectedCity].trend),
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontWeight: 600
          }}>
            {getTrendIcon(sampleGoldRates[selectedType][selectedCity].trend)}
            +₹{sampleGoldRates[selectedType][selectedCity].change}
          </span>
        </div>
        <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
          Per 10 grams of {selectedType} gold
        </p>
      </div>

      {/* All Cities Comparison */}
      <div style={{ 
        background: 'white', 
        borderRadius: '16px', 
        padding: '24px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        marginBottom: '24px'
      }}>
        <h3 style={{ fontFamily: 'Archivo', fontWeight: 600, fontSize: 20, marginBottom: '16px' }}>
          Gold Rates Across Cities ({selectedType})
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontFamily: 'Archivo', fontWeight: 600 }}>City</th>
                <th style={{ padding: '12px', textAlign: 'right', fontFamily: 'Archivo', fontWeight: 600 }}>Rate (₹/10g)</th>
                <th style={{ padding: '12px', textAlign: 'center', fontFamily: 'Archivo', fontWeight: 600 }}>Change</th>
              </tr>
            </thead>
            <tbody>
              {cities.map(city => {
                const rateData = sampleGoldRates[selectedType][city];
                return (
                  <tr key={city} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px', fontFamily: 'Inter', fontWeight: 500 }}>{city}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'Inter', fontWeight: 600 }}>
                      ₹{rateData.rate}
                    </td>
                    <td style={{ 
                      padding: '12px', 
                      textAlign: 'center',
                      color: getTrendColor(rateData.trend),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}>
                      {getTrendIcon(rateData.trend)}
                      ₹{rateData.change}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gold Types Comparison */}
      <div style={{ 
        background: 'white', 
        borderRadius: '16px', 
        padding: '24px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        marginBottom: '24px'
      }}>
        <h3 style={{ fontFamily: 'Archivo', fontWeight: 600, fontSize: 20, marginBottom: '16px' }}>
          Gold Types Comparison ({selectedCity})
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontFamily: 'Archivo', fontWeight: 600 }}>Gold Type</th>
                <th style={{ padding: '12px', textAlign: 'right', fontFamily: 'Archivo', fontWeight: 600 }}>Rate (₹/10g)</th>
                <th style={{ padding: '12px', textAlign: 'center', fontFamily: 'Archivo', fontWeight: 600 }}>Purity</th>
                <th style={{ padding: '12px', textAlign: 'center', fontFamily: 'Archivo', fontWeight: 600 }}>Change</th>
              </tr>
            </thead>
            <tbody>
              {goldTypes.map(type => {
                const rateData = sampleGoldRates[type][selectedCity];
                const purity = type === '24K' ? '99.9%' : type === '22K' ? '91.7%' : '75%';
                return (
                  <tr key={type} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px', fontFamily: 'Inter', fontWeight: 500 }}>{type}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'Inter', fontWeight: 600 }}>
                      ₹{rateData.rate}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center', fontFamily: 'Inter', fontWeight: 500 }}>
                      {purity}
                    </td>
                    <td style={{ 
                      padding: '12px', 
                      textAlign: 'center',
                      color: getTrendColor(rateData.trend),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}>
                      {getTrendIcon(rateData.trend)}
                      ₹{rateData.change}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Information Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
        color: 'white', 
        padding: '24px', 
        borderRadius: '12px',
        marginBottom: '24px'
      }}>
        <h3 style={{ fontFamily: 'Archivo', fontWeight: 600, fontSize: 20, marginBottom: '16px' }}>
          Gold Rate Information
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          <div>
            <h4 style={{ fontFamily: 'Archivo', fontWeight: 600, marginBottom: '8px' }}>24K Gold</h4>
            <p style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>
              Purest form of gold (99.9% purity). Most expensive and commonly used for investment.
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: 'Archivo', fontWeight: 600, marginBottom: '8px' }}>22K Gold</h4>
            <p style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>
              Contains 91.7% gold. Popular for jewelry making due to durability.
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: 'Archivo', fontWeight: 600, marginBottom: '8px' }}>18K Gold</h4>
            <p style={{ fontSize: '14px', margin: 0, opacity: 0.9 }}>
              Contains 75% gold. Used in premium jewelry and watches.
            </p>
          </div>
        </div>
      </div>

      <div style={{ color: '#888', fontSize: '14px', fontFamily: 'Inter', textAlign: 'center' }}>
        <b>Note:</b> Rates are updated every 15 minutes. Live rates will be fetched from authorized sources soon.
      </div>
    </div>
  );
};

export default GoldRatePage; 