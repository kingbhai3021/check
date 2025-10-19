import React from 'react';
import { Link } from 'react-router-dom';
import mutualFundIcon from '../../assets/mutual-fund.svg';
import loanIcon from '../../assets/loan-against-mf.svg';
import equityIcon from '../../assets/equity-etf.svg';
import pmsIcon from '../../assets/pms.svg';
import goldBondIcon from '../../assets/gold-bond.svg';
import npsIcon from '../../assets/nps.svg';

const services = [
  { icon: mutualFundIcon, title: 'Mutual Funds' },
  { icon: loanIcon, title: 'Loan Against MF' },
  { icon: equityIcon, title: 'Equity & ETFs' },
  { icon: pmsIcon, title: 'PMS' },
  { icon: goldBondIcon, title: 'Sovereign Gold Bond' },
  { icon: npsIcon, title: 'NPS' },
];

function ProductBasket() {
  return (
    <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-center px-4 py-20 font-inter relative overflow-hidden">
      {/* Revolutionary Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-secondary-400/10 to-primary-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6">
          <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
          Financial Products
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold mb-6 font-archivo bg-gradient-to-r from-gray-900 via-primary-600 to-secondary-600 bg-clip-text text-transparent">
          Product Basket
        </h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-16 leading-relaxed">
          Explore a wide range of financial products with Witty Wealth—all under one roof.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 max-w-7xl mx-auto mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group flex flex-col items-center bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-3 cursor-pointer"
            >
              <div className="relative mb-4">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary-400/30 to-secondary-400/30 rounded-full blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                <img 
                  src={service.icon} 
                  alt={service.title} 
                  className="relative w-16 h-16 group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <span className="text-sm font-bold text-gray-800 text-center group-hover:text-primary-600 transition-colors duration-300">
                {service.title}
              </span>
              <div className="w-8 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 mt-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-6">
          <button className="px-10 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold rounded-full shadow-2xl hover:shadow-primary-500/30 transition-all duration-300 group">
            Explore All Products
            <svg className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <button className="px-10 py-4 bg-white/90 backdrop-blur-sm border-2 border-primary-600 text-primary-600 font-bold rounded-full hover:bg-primary-600 hover:text-white transition-all duration-300">
            Get Started
          </button>
        </div>

        <div className="mt-8 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50">
          <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
          <p className="text-sm text-gray-600 font-medium">
            Available exclusively with Witty Wealth partner account
          </p>
        </div>
      </div>

    </section>
  );
}

export default ProductBasket;
