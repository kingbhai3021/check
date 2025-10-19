import React, { useState, useEffect } from 'react';

const sampleFdRates = [
  {
    bank: 'HDFC Bank',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/HDFC_Bank_Logo.svg',
    rates: [
      { tenure: '1 Year', regular: 6.5, senior: 7.0 },
      { tenure: '2 Years', regular: 6.75, senior: 7.25 },
      { tenure: '3 Years', regular: 7.0, senior: 7.5 },
    ],
    lastUpdated: '2024-08-04',
  },
  {
    bank: 'ICICI Bank',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/ICICI_Bank_Logo.svg',
    rates: [
      { tenure: '1 Year', regular: 6.6, senior: 7.1 },
      { tenure: '2 Years', regular: 6.8, senior: 7.3 },
      { tenure: '3 Years', regular: 7.1, senior: 7.6 },
    ],
    lastUpdated: '2024-08-04',
  },
  {
    bank: 'SBI',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/State_Bank_of_India_logo.svg',
    rates: [
      { tenure: '1 Year', regular: 6.7, senior: 7.2 },
      { tenure: '2 Years', regular: 6.9, senior: 7.4 },
      { tenure: '3 Years', regular: 7.2, senior: 7.7 },
    ],
    lastUpdated: '2024-08-04',
  },
];

const tenures = ['1 Year', '2 Years', '3 Years'];

const FDInterestRatesPage = () => {
  const [fdRates, setFdRates] = useState([]);
  const [selectedTenure, setSelectedTenure] = useState('1 Year');

  // Simulate API fetch
  useEffect(() => {
    // In future, replace with API call
    setFdRates(sampleFdRates);
  }, []);

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h1 style={{ fontFamily: 'Archivo', fontWeight: 700, fontSize: 32, marginBottom: 24 }}>FD Interest Rates 2024</h1>
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
        <label style={{ fontWeight: 600, fontFamily: 'Inter' }}>Select Tenure:</label>
        <select
          value={selectedTenure}
          onChange={e => setSelectedTenure(e.target.value)}
          style={{ padding: 8, borderRadius: 8, border: '1px solid #ddd', fontFamily: 'Inter' }}
        >
          {tenures.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <span style={{ marginLeft: 'auto', color: '#666', fontSize: 14 }}>
          <b>Live rates</b> (API ready)
        </span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
          <thead>
            <tr style={{ background: 'var(--primary-color)', color: 'white' }}>
              <th style={{ padding: 16, fontFamily: 'Archivo', fontWeight: 600, fontSize: 16, textAlign: 'left' }}>Bank</th>
              <th style={{ padding: 16, fontFamily: 'Archivo', fontWeight: 600, fontSize: 16 }}>Regular Rate (%)</th>
              <th style={{ padding: 16, fontFamily: 'Archivo', fontWeight: 600, fontSize: 16 }}>Senior Citizen Rate (%)</th>
              <th style={{ padding: 16, fontFamily: 'Archivo', fontWeight: 600, fontSize: 16 }}>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {fdRates.map(bank => {
              const rate = bank.rates.find(r => r.tenure === selectedTenure);
              return (
                <tr key={bank.bank} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img src={bank.logo} alt={bank.bank} style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: 6, background: '#f5f5f5' }} />
                    <span style={{ fontFamily: 'Archivo', fontWeight: 600 }}>{bank.bank}</span>
                  </td>
                  <td style={{ padding: 16, fontFamily: 'Inter', fontWeight: 500, fontSize: 16 }}>{rate ? rate.regular : '-'}</td>
                  <td style={{ padding: 16, fontFamily: 'Inter', fontWeight: 500, fontSize: 16 }}>{rate ? rate.senior : '-'}</td>
                  <td style={{ padding: 16, fontFamily: 'Inter', fontSize: 14, color: '#888' }}>{bank.lastUpdated}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 32, color: '#888', fontSize: 14, fontFamily: 'Inter' }}>
        <b>Note:</b> Rates are for illustration. Live rates will be fetched from partner banks soon.
      </div>
    </div>
  );
};

export default FDInterestRatesPage;