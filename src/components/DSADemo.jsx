import React, { useState } from 'react';
import { generateDSAId, validateDSAId, getDSAIdInfo } from '../utils/dsaIdGenerator.js';

export default function DSADemo() {
  const [generatedIds, setGeneratedIds] = useState([]);
  const [testId, setTestId] = useState('');
  const [validationResult, setValidationResult] = useState(null);

  const generateNewId = () => {
    try {
      const newId = generateDSAId();
      setGeneratedIds(prev => [newId, ...prev.slice(0, 4)]); // Keep last 5 IDs
    } catch (error) {
      alert('Error generating DSA ID: ' + error.message);
    }
  };

  const validateId = () => {
    const isValid = validateDSAId(testId);
    const info = isValid ? getDSAIdInfo(testId) : null;
    setValidationResult({ isValid, info });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        DSA ID Generation System Demo
      </h1>
      
      {/* ID Generation Section */}
      <div className="mb-8 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-blue-800">Generate DSA IDs</h2>
        <button
          onClick={generateNewId}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Generate New DSA ID
        </button>
        
        {generatedIds.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Recently Generated IDs:</h3>
            <div className="space-y-2">
              {generatedIds.map((id, index) => {
                const info = getDSAIdInfo(id);
                return (
                  <div key={index} className="bg-white p-3 rounded border">
                    <div className="font-mono text-lg font-bold text-blue-900">{id}</div>
                    <div className="text-sm text-gray-600">
                      Created: {info.createdAt.toLocaleDateString()} | 
                      Unique Number: {info.uniqueNumber} | 
                      Alphabet: {info.alphabet}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ID Validation Section */}
      <div className="mb-8 p-6 bg-green-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-green-800">Validate DSA ID</h2>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={testId}
            onChange={(e) => setTestId(e.target.value)}
            placeholder="Enter DSA ID to validate (e.g., ww2025090444A)"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={validateId}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Validate
          </button>
        </div>
        
        {validationResult && (
          <div className={`p-4 rounded-lg ${validationResult.isValid ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
            <div className={`font-semibold ${validationResult.isValid ? 'text-green-800' : 'text-red-800'}`}>
              {validationResult.isValid ? '✅ Valid DSA ID' : '❌ Invalid DSA ID'}
            </div>
            {validationResult.info && (
              <div className="mt-2 text-sm text-gray-700">
                <p><strong>Year:</strong> {validationResult.info.year}</p>
                <p><strong>Month:</strong> {validationResult.info.month}</p>
                <p><strong>Date:</strong> {validationResult.info.date}</p>
                <p><strong>Unique Number:</strong> {validationResult.info.uniqueNumber}</p>
                <p><strong>Alphabet:</strong> {validationResult.info.alphabet}</p>
                <p><strong>Created Date:</strong> {validationResult.info.createdAt.toLocaleDateString()}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Format Information */}
      <div className="p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">DSA ID Format</h2>
        <div className="text-sm text-gray-700 space-y-2">
          <p><strong>Format:</strong> ww(year)(month)(date)(unique two digit number)(any alphabet)</p>
          <p><strong>Example:</strong> ww2025090444A</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>ww:</strong> Fixed prefix</li>
            <li><strong>2025:</strong> Year (4 digits)</li>
            <li><strong>09:</strong> Month (2 digits)</li>
            <li><strong>04:</strong> Date (2 digits)</li>
            <li><strong>44:</strong> Unique two-digit number (00-99)</li>
            <li><strong>A:</strong> Random alphabet (A-Z)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
