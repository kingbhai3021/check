import React, { useState, useEffect } from 'react';
import { Phone, TrendingUp, Shield, DollarSign, Users, X, User, Mail, MapPin, DollarSign as DollarIcon } from 'lucide-react';
import AccordionFAQ from '../common/AccordionFAQ.jsx';

const sampleFunds = [
  {
    name: 'HDFC Top 100 Fund',
    amc: 'HDFC Mutual Fund',
    category: 'Large Cap',
    risk: 'High',
    returns1y: 18.2,
    returns3y: 15.5,
    returns5y: 13.1,
    rating: 5,
  },
  {
    name: 'SBI Bluechip Fund',
    amc: 'SBI Mutual Fund',
    category: 'Large Cap',
    risk: 'Moderate',
    returns1y: 16.7,
    returns3y: 14.2,
    returns5y: 12.8,
    rating: 4,
  },
  {
    name: 'ICICI Prudential Equity & Debt Fund',
    amc: 'ICICI Prudential Mutual Fund',
    category: 'Hybrid',
    risk: 'Moderate',
    returns1y: 13.5,
    returns3y: 12.1,
    returns5y: 11.0,
    rating: 4,
  },
  {
    name: 'Axis Small Cap Fund',
    amc: 'Axis Mutual Fund',
    category: 'Small Cap',
    risk: 'Very High',
    returns1y: 22.3,
    returns3y: 18.9,
    returns5y: 15.7,
    rating: 5,
  },
  {
    name: 'UTI Flexi Cap Fund',
    amc: 'UTI Mutual Fund',
    category: 'Flexi Cap',
    risk: 'High',
    returns1y: 17.8,
    returns3y: 15.0,
    returns5y: 13.5,
    rating: 4,
  },
];

const categories = ['All', 'Large Cap', 'Small Cap', 'Flexi Cap', 'Hybrid'];
const amcs = ['All', ...Array.from(new Set(sampleFunds.map(f => f.amc)))];
const risks = ['All', 'Low', 'Moderate', 'High', 'Very High'];

const MutualFundsPage = () => {
  const [funds, setFunds] = useState([]);
  const [category, setCategory] = useState('All');
  const [amc, setAmc] = useState('All');
  const [risk, setRisk] = useState('All');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    address: '',
    salary: ''
  });

  useEffect(() => {
    // In future, replace with API call
    setFunds(sampleFunds);
  }, []);

  const filteredFunds = funds.filter(f =>
    (category === 'All' || f.category === category) &&
    (amc === 'All' || f.amc === amc) &&
    (risk === 'All' || f.risk === risk) &&
    (f.name.toLowerCase().includes(search.toLowerCase()) || f.amc.toLowerCase().includes(search.toLowerCase()))
  );

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Very High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      age: '',
      email: '',
      address: '',
      salary: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://wittywealth.org/api/leads/mutual-fund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Thank you for your interest! We will contact you soon.');
        closeModal();
      } else {
        alert('Error submitting form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Revolutionary Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-32 relative overflow-hidden">
        {/* Revolutionary Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-32 w-32 h-32 bg-accent-400/20 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-1/3 w-48 h-48 bg-secondary-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          
          {/* Geometric patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-24 h-24 border-2 border-white rounded-full"></div>
            <div className="absolute top-3/4 right-1/4 w-16 h-16 border border-white rounded-full"></div>
            <div className="absolute bottom-1/4 left-1/2 w-20 h-20 border border-white rounded-full"></div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-10 text-center relative z-10">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold mb-8">
            <div className="w-3 h-3 bg-accent-400 rounded-full animate-pulse"></div>
            Investment Solutions
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-accent-200 bg-clip-text text-transparent leading-tight">
            Mutual Funds
          </h1>
          
          <p className="text-2xl text-blue-100 max-w-5xl mx-auto leading-relaxed mb-12">
            Discover the best mutual fund opportunities with expert analysis, personalized recommendations, and revolutionary investment strategies designed for your financial growth.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={openModal}
              className="px-12 py-5 bg-white text-primary-600 rounded-full font-bold text-lg hover:bg-blue-50 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 group"
            >
              Start Investing Today
              <svg className="inline-block w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            
            <button 
              onClick={openModal}
              className="px-12 py-5 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300"
            >
              Explore Funds
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-300 mb-2">500+</div>
              <div className="text-blue-200">Fund Options</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-300 mb-2">₹500</div>
              <div className="text-blue-200">Minimum SIP</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-300 mb-2">15%+</div>
              <div className="text-blue-200">Average Returns</div>
            </div>
          </div>
        </div>
      </div>

      {/* Revolutionary Main Content */}
      <div className="max-w-7xl mx-auto px-10 py-20 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        </div>
        
        {/* Revolutionary Educational Section 1 */}
        <div className="relative z-10 mb-20">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
              Investment Education
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6 leading-tight">
              What is a Mutual Fund?
            </h2>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Understanding the fundamentals of mutual fund investing for your financial success
            </p>
          </div>
          
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Text Content */}
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Investment Management</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  A mutual fund is a professionally managed investment vehicle that pools money from multiple investors to purchase a diversified portfolio of stocks, bonds, or other securities. Think of it as a basket of investments managed by expert fund managers on your behalf.
                </p>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  When you invest in a mutual fund, you're buying units of the fund, and the value of your investment grows (or decreases) based on the performance of the underlying securities. This approach allows you to invest in a diversified portfolio even with a small amount of money.
                </p>
              </div>
            </div>
            
            {/* Visual Element */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-400/30 to-secondary-400/30 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 rounded-3xl p-8 text-white">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Start Your Journey</h3>
                  <p className="text-blue-100 mb-6">Begin investing with as little as ₹500 per month through SIP</p>
                  <button className="px-8 py-3 bg-white text-primary-600 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300">
                    Calculate SIP Returns
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Revolutionary Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                Professional Management
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Expert fund managers make investment decisions based on research and market analysis, ensuring optimal portfolio performance.
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-primary-600">Learn More</span>
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-success-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-secondary-600 transition-colors duration-300">
                Risk Diversification
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Your money is spread across multiple securities, reducing individual stock risk and providing stable returns.
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-secondary-600">Learn More</span>
                <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center group-hover:bg-secondary-600 group-hover:text-white transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-accent-600 transition-colors duration-300">
                Affordable Investment
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Start investing with as little as ₹500 through SIP (Systematic Investment Plan) and build wealth gradually.
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-accent-600">Learn More</span>
                <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center group-hover:bg-accent-600 group-hover:text-white transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Revolutionary Tips Section */}
        <div className="relative z-10 mb-20">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-500 to-accent-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
              Investment Tips
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-secondary-600 to-accent-600 bg-clip-text text-transparent mb-6 leading-tight">
              Smart Investment Tips
            </h2>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Essential tips to help you make informed mutual fund investment decisions
            </p>
          </div>
          
          {/* Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center font-bold text-white text-xl group-hover:scale-110 transition-transform duration-300">1</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">Start with SIP</h3>
                    <p className="text-gray-700 leading-relaxed">Systematic Investment Plans allow you to invest small amounts regularly, helping you build wealth over time while averaging out market volatility.</p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center font-bold text-white text-xl group-hover:scale-110 transition-transform duration-300">2</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-secondary-600 transition-colors duration-300">Understand Your Risk Profile</h3>
                    <p className="text-gray-700 leading-relaxed">Assess your risk tolerance and investment horizon. Younger investors can typically take more risk, while those nearing retirement should be more conservative.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center font-bold text-white text-xl group-hover:scale-110 transition-transform duration-300">3</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accent-600 transition-colors duration-300">Diversify Your Portfolio</h3>
                    <p className="text-gray-700 leading-relaxed">Don't put all your money in one type of fund. Mix large-cap, mid-cap, small-cap, and debt funds based on your risk profile.</p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center font-bold text-white text-xl group-hover:scale-110 transition-transform duration-300">4</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">Review and Rebalance</h3>
                    <p className="text-gray-700 leading-relaxed">Regularly review your portfolio performance and rebalance if needed. Avoid frequent changes based on short-term market movements.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Revolutionary Filters Section */}
        <div className="relative z-10 mb-20">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-500 to-primary-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
              Fund Discovery
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-accent-600 to-primary-600 bg-clip-text text-transparent mb-6 leading-tight">
              Find Your Perfect Fund
            </h2>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover the best mutual funds tailored to your investment goals and risk profile
            </p>
          </div>
          
          {/* Revolutionary Filter Cards */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Search Funds</label>
                <input
                  type="text"
                  placeholder="Search by fund or AMC"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-primary-50 to-secondary-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Category</label>
                <select 
                  value={category} 
                  onChange={e => setCategory(e.target.value)} 
                  className="w-full px-4 py-3 bg-gradient-to-r from-secondary-50 to-accent-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-300 text-sm"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">AMC</label>
                <select 
                  value={amc} 
                  onChange={e => setAmc(e.target.value)} 
                  className="w-full px-4 py-3 bg-gradient-to-r from-accent-50 to-primary-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300 text-sm"
                >
                  {amcs.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Risk Level</label>
                <select 
                  value={risk} 
                  onChange={e => setRisk(e.target.value)} 
                  className="w-full px-4 py-3 bg-gradient-to-r from-primary-50 to-secondary-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm"
                >
                  {risks.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Action</label>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white rounded-2xl font-semibold text-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/25 transform hover:scale-105">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Revolutionary Results Section */}
        <div className="relative z-10 mb-20">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
              Fund Results
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6 leading-tight">
              {filteredFunds.length} Funds Found
            </h2>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover the best mutual funds that match your investment criteria
            </p>
          </div>
          
          {/* Revolutionary Fund Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFunds.map((fund, index) => (
              <div key={index} className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer overflow-hidden">
                {/* Fund Header */}
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                          {fund.name}
                        </h3>
                        <p className="text-sm text-gray-600">{fund.amc}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {getRatingStars(fund.rating)}
                    </div>
                  </div>

                  {/* Fund Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl">
                      <span className="text-sm text-gray-600 font-medium">Category:</span>
                      <span className="font-bold text-gray-900">{fund.category}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-secondary-50 to-accent-50 rounded-2xl">
                      <span className="text-sm text-gray-600 font-medium">Risk:</span>
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getRiskColor(fund.risk)}`}>
                        {fund.risk}
                      </span>
                    </div>
                  </div>

                  {/* Returns Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-gradient-to-r from-accent-50 to-primary-50 rounded-2xl">
                      <div className="text-sm text-gray-600 mb-1">1Y Returns</div>
                      <div className={`text-lg font-bold ${fund.returns1y > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {fund.returns1y > 0 ? '+' : ''}{fund.returns1y}%
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl">
                      <div className="text-sm text-gray-600 mb-1">3Y Returns</div>
                      <div className={`text-lg font-bold ${fund.returns3y > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {fund.returns3y > 0 ? '+' : ''}{fund.returns3y}%
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-secondary-50 to-accent-50 rounded-2xl">
                      <div className="text-sm text-gray-600 mb-1">5Y Returns</div>
                      <div className={`text-lg font-bold ${fund.returns5y > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {fund.returns5y > 0 ? '+' : ''}{fund.returns5y}%
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl">
                    <button 
                      onClick={openModal}
                      className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 px-6 rounded-full font-semibold hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-300 group-hover:scale-105 flex items-center justify-center gap-2"
                    >
                      Invest Now
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revolutionary CTA Section */}
        <div className="relative z-10 mb-20">
          <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white text-center py-24 rounded-3xl relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-float"></div>
              <div className="absolute top-40 right-32 w-32 h-32 bg-accent-400/20 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-32 left-1/3 w-48 h-48 bg-secondary-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold mb-8">
                <div className="w-3 h-3 bg-accent-400 rounded-full animate-pulse"></div>
                Start Investing Today
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold mb-6 font-inter bg-gradient-to-r from-white via-blue-100 to-accent-200 bg-clip-text text-transparent leading-tight">
                Ready to Start Investing?
              </h2>
              
              <p className="text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
                Get expert guidance and start building your wealth with our carefully curated mutual fund recommendations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button 
                  onClick={openModal}
                  className="px-12 py-5 bg-white text-primary-600 rounded-full font-bold text-lg hover:bg-blue-50 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 group flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Get Free Consultation
                  <span className="text-sm opacity-75">+91 91117 77046</span>
                </button>
                
                <button 
                  onClick={openModal}
                  className="px-12 py-5 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300"
                >
                  Download App
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Revolutionary FAQ Section */}
        <div className="relative z-10 mb-20">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-2xl animate-float"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
          </div>
          
          <div className="relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6">
                <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
                Frequently Asked Questions
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6 leading-tight">
                Mutual Fund Investment FAQs
              </h2>
              
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Get answers to common questions about mutual fund investing
              </p>
            </div>
            
            {/* FAQ Component */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8">
              <AccordionFAQ 
                title=""
                faqData={[
              {
                question: "What is the minimum amount I can invest in mutual funds?",
                answer: "Most mutual funds allow you to start with as little as ₹500 through SIP (Systematic Investment Plan). For lump sum investments, the minimum is typically ₹1,000-5,000 depending on the fund."
              },
              {
                question: "How do I choose the right mutual fund for me?",
                answer: "Consider your investment goals, risk tolerance, and time horizon. Look at the fund's past performance, expense ratio, and the fund manager's track record. Diversify across different categories like large-cap, mid-cap, and debt funds."
              },
              {
                question: "What is the difference between SIP and lump sum investment?",
                answer: "SIP (Systematic Investment Plan) allows you to invest a fixed amount regularly (monthly/quarterly), helping you average out market volatility. Lump sum investment is a one-time investment of a larger amount. SIP is generally recommended for beginners."
              },
              {
                question: "Are mutual funds safe? What are the risks?",
                answer: "Mutual funds are subject to market risks. While they provide diversification, your investment value can go up or down based on market performance. Debt funds are generally less risky than equity funds. Always invest according to your risk tolerance."
              },
              {
                question: "What is NAV (Net Asset Value)?",
                answer: "NAV is the price per unit of a mutual fund. It's calculated by dividing the total value of the fund's assets minus liabilities by the number of outstanding units. NAV changes daily based on the performance of underlying securities."
              },
              {
                question: "Can I withdraw my money anytime from mutual funds?",
                answer: "Yes, most mutual funds (except ELSS with 3-year lock-in) allow you to redeem your investment anytime. However, exit loads may apply if you withdraw within a specified period (usually 1 year)."
              },
              {
                question: "What are the tax implications of mutual fund investments?",
                answer: "Equity funds held for more than 1 year are subject to 10% LTCG tax on gains above ₹1 lakh. Debt funds held for more than 3 years are subject to 20% LTCG tax with indexation. ELSS funds offer tax deduction under Section 80C."
              },
              {
                question: "How often should I review my mutual fund portfolio?",
                answer: "Review your portfolio annually or when there are significant changes in your financial goals or market conditions. Avoid frequent changes based on short-term market movements. Focus on long-term performance and alignment with your goals."
              }
            ]}
          />
            </div>
          </div>
        </div>
      </div>

      {/* Revolutionary Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 w-full max-w-md relative overflow-hidden">
            {/* Modal Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-xl animate-float"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-lg animate-float" style={{animationDelay: '1s'}}></div>
            </div>
            
            <div className="relative z-10">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                      Get Started
                    </h3>
                    <p className="text-gray-600 mt-1">Fill in your details to get personalized investment advice</p>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4 text-primary-600" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gradient-to-r from-primary-50 to-secondary-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Age Field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4 text-secondary-600" />
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    min="18"
                    max="100"
                    className="w-full px-4 py-3 bg-gradient-to-r from-secondary-50 to-accent-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your age"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-accent-600" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gradient-to-r from-accent-50 to-primary-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Address Field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary-600" />
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-3 bg-gradient-to-r from-primary-50 to-secondary-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Enter your complete address"
                  />
                </div>

                {/* Salary Field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <DollarIcon className="w-4 h-4 text-secondary-600" />
                    Monthly Salary (₹)
                  </label>
                  <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 bg-gradient-to-r from-secondary-50 to-accent-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your monthly salary"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/25 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    Submit & Get Started
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MutualFundsPage;