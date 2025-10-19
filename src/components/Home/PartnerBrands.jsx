import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PartnerBrands = () => {
  const [activeTab, setActiveTab] = useState('Loan');

  // Comprehensive brand data structure
  const partnerData = {
    "Loan": [
      "State Bank of India", 
      "HDFC Bank", 
      "ICICI Bank", 
      "Axis Bank", 
      "Kotak Mahindra Bank", 
      "Punjab National Bank", 
      "Bank of Baroda", 
      "Canara Bank", 
      "Union Bank of India", 
      "IDBI Bank", 
      "IndusInd Bank", 
      "YES Bank"
    ],
    "Mutual Funds": [
      "SBI Mutual Fund", 
      "HDFC Mutual Fund", 
      "ICICI Prudential MF", 
      "Axis Mutual Fund", 
      "Kotak Mutual Fund", 
      "Nippon India MF", 
      "UTI Mutual Fund", 
      "Mirae Asset MF", 
      "Parag Parikh Financial", 
      "Quant Mutual Fund", 
      "Motilal Oswal MF", 
      "DSP Mutual Fund"
    ],
    "Credit Cards": [
      "American Express", 
      "HDFC Bank", 
      "ICICI Bank", 
      "Axis Bank", 
      "State Bank of India", 
      "Citibank", 
      "Standard Chartered", 
      "Kotak Mahindra Bank", 
      "RBL Bank", 
      "HSBC Bank", 
      "IndusInd Bank", 
      "Bank of Baroda"
    ],
    "Insurance": [
      "Life Insurance Corp. (LIC)", 
      "HDFC Life", 
      "ICICI Prudential Life", 
      "SBI Life", 
      "Bajaj Allianz Life", 
      "Max Life Insurance", 
      "Shriram Life Insurance", 
      "Star Health Insurance", 
      "New India Assurance", 
      "United India Insurance", 
      "Oriental Insurance Co.", 
      "TATA AIG"
    ]
  };

  const tabs = Object.keys(partnerData);

  return (
    <div className="w-full py-20 bg-gradient-to-br from-white via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Revolutionary Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-lg animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-br from-secondary-400/20 to-accent-400/20 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg shadow-primary-500/25">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            Trusted Partners
          </div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6 font-archivo">
            Brands Who Trust Us
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            We partner with India's leading financial institutions to bring you the best products and services.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-xl shadow-primary-500/30 transform scale-105'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-600 hover:shadow-lg border border-gray-200'
              }`}
            >
              {tab}
              <span className={`text-xs px-3 py-1.5 rounded-full font-bold ${
                activeTab === tab
                  ? 'bg-white/30 text-white'
                  : 'bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-600'
              }`}>
                {partnerData[tab].length}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Brand Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
          >
            {partnerData[activeTab].map((brand, index) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 text-center hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/20 transition-all duration-300 group hover:-translate-y-2"
              >
                <div className="text-base font-semibold text-gray-800 group-hover:text-primary-600 transition-colors duration-300">
                  {brand}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Trust Indicators */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-wrap justify-center items-center gap-12 text-base font-medium">
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200/50 shadow-lg">
              <div className="w-3 h-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700">Trusted by 50+ Financial Institutions</span>
            </div>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200/50 shadow-lg">
              <div className="w-3 h-3 bg-gradient-to-r from-success-500 to-primary-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <span className="text-gray-700">Licensed & Regulated</span>
            </div>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200/50 shadow-lg">
              <div className="w-3 h-3 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <span className="text-gray-700">Secure & Compliant</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PartnerBrands;
