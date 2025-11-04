import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Heart, Car, Home, Users, Lightbulb, TrendingUp, DollarSign, Star, CheckCircle, ArrowRight, Zap, Target, Award, Globe, Phone, X, User, Mail, MapPin, DollarSign as DollarIcon } from 'lucide-react';
import AccordionFAQ from '../../components/common/AccordionFAQ.jsx';

function AllInsurance() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    address: '',
    salary: ''
  });

  const insuranceTypes = [
    {
      id: 'health',
      title: 'Health Insurance',
      description: 'Comprehensive health coverage for you and your family with cashless hospitalization and extensive network coverage.',
      image: '/health_insurance.jpg',
      route: '/health',
      features: ['Cashless Hospitalization', 'Pre & Post Hospitalization', 'Critical Illness Cover', 'Family Floater Option'],
      color: 'bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200/50',
      category: 'health',
      icon: <Heart className="w-8 h-8" />,
      premium: 'Starting ₹500/month',
      coverage: 'Up to ₹1 Cr'
    },
    {
      id: 'term',
      title: 'Term Insurance',
      description: 'Affordable life insurance that provides high coverage at low premiums, ensuring your family\'s financial security.',
      image: '/life-insurance.jpg',
      route: '/termform',
      features: ['High Coverage Amount', 'Low Premiums', 'Flexible Tenure', 'Rider Benefits'],
      color: 'bg-gradient-to-br from-secondary-50 to-secondary-100 border-secondary-200/50',
      category: 'life',
      icon: <Shield className="w-8 h-8" />,
      premium: 'Starting ₹200/month',
      coverage: 'Up to ₹2 Cr'
    },
    {
      id: 'vehicle',
      title: 'Vehicle Insurance',
      description: 'Complete protection for your vehicle with comprehensive coverage including third-party liability and own damage.',
      image: '/vehicle_insurance.png',
      route: '/vehicle',
      features: ['Third Party Liability', 'Own Damage Cover', 'Roadside Assistance', 'Zero Depreciation'],
      color: 'bg-gradient-to-br from-accent-50 to-accent-100 border-accent-200/50',
      category: 'vehicle',
      icon: <Car className="w-8 h-8" />,
      premium: 'Starting ₹1,500/year',
      coverage: 'Full Vehicle Value'
    },
    {
      id: 'endowment',
      title: 'Endowment Insurance',
      description: 'Life insurance that combines protection with savings, providing both death benefit and maturity benefit.',
      image: '/endowment.jpg',
      route: '/endowment',
      features: ['Life Coverage', 'Savings Component', 'Guaranteed Returns', 'Maturity Benefit'],
      color: 'bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200/50',
      category: 'life',
      icon: <TrendingUp className="w-8 h-8" />,
      premium: 'Starting ₹1,000/month',
      coverage: 'Up to ₹50 Lakhs'
    },
    {
      id: 'ulip',
      title: 'ULIP Insurance',
      description: 'Unit Linked Insurance Plans that offer life coverage along with investment opportunities in various funds.',
      image: '/ULIP.jpg',
      route: '/ulip',
      features: ['Life Insurance', 'Investment Options', 'Fund Switching', 'Tax Benefits'],
      color: 'bg-gradient-to-br from-secondary-50 to-accent-50 border-secondary-200/50',
      category: 'investment',
      icon: <DollarSign className="w-8 h-8" />,
      premium: 'Starting ₹2,000/month',
      coverage: 'Up to ₹1 Cr'
    },
    {
      id: 'travel',
      title: 'Travel Insurance',
      description: 'Comprehensive travel protection covering medical emergencies, trip cancellation, and baggage loss worldwide.',
      image: '/travel.jpg',
      route: '/travel',
      features: ['Medical Coverage', 'Trip Cancellation', 'Baggage Protection', '24/7 Assistance'],
      color: 'bg-gradient-to-br from-accent-50 to-primary-50 border-accent-200/50',
      category: 'travel',
      icon: <Globe className="w-8 h-8" />,
      premium: 'Starting ₹200/trip',
      coverage: 'Up to ₹10 Lakhs'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Insurance', icon: <Shield className="w-5 h-5" /> },
    { id: 'health', name: 'Health', icon: <Heart className="w-5 h-5" /> },
    { id: 'life', name: 'Life', icon: <Shield className="w-5 h-5" /> },
    { id: 'vehicle', name: 'Vehicle', icon: <Car className="w-5 h-5" /> },
    { id: 'investment', name: 'Investment', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'travel', name: 'Travel', icon: <Globe className="w-5 h-5" /> }
  ];

  const filteredInsurance = selectedCategory === 'all' 
    ? insuranceTypes 
    : insuranceTypes.filter(insurance => insurance.category === selectedCategory);

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
      const response = await fetch('http://localhost:5050/api/leads/insurance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Thank you for your interest! We will contact you soon for your insurance quote.');
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
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-32 relative overflow-hidden">
        {/* Revolutionary Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-32 w-32 h-32 bg-accent-400/20 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-1/3 w-48 h-48 bg-secondary-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          
          {/* Insurance Icons Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-24 h-24 border-2 border-white rounded-full transform rotate-12"></div>
            <div className="absolute top-3/4 right-1/4 w-20 h-20 border border-white rounded-full transform -rotate-12"></div>
            <div className="absolute bottom-1/4 left-1/2 w-16 h-16 border border-white rounded-full transform rotate-6"></div>
            <div className="absolute top-1/2 right-1/3 w-28 h-28 border border-white rounded-full transform -rotate-6"></div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold mb-8">
            <div className="w-3 h-3 bg-accent-400 rounded-full animate-pulse"></div>
            Insurance Solutions
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 font-inter bg-gradient-to-r from-white via-blue-100 to-accent-200 bg-clip-text text-transparent leading-tight">
            Protect What Matters
          </h1>
          
          <p className="text-2xl text-blue-100 max-w-5xl mx-auto mb-12 leading-relaxed">
            Comprehensive insurance solutions designed to provide complete financial security 
            and peace of mind for you and your family's future.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button 
              onClick={openModal}
              className="px-12 py-5 bg-white text-primary-600 rounded-full font-bold text-lg hover:bg-blue-50 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 group"
            >
              Get Quote Now
              <svg className="inline-block w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            
            <button 
              onClick={openModal}
              className="px-12 py-5 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300"
            >
              Talk to Expert
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-300 mb-2">50L+</div>
              <div className="text-blue-200">Policies Sold</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-300 mb-2">99.2%</div>
              <div className="text-blue-200">Claim Settlement</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-300 mb-2">24/7</div>
              <div className="text-blue-200">Support</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-300 mb-2">₹500Cr+</div>
              <div className="text-blue-200">Claims Paid</div>
            </div>
          </div>
        </div>
      </section>

      {/* Revolutionary Educational Section 1 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
              Insurance Education
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6 leading-tight">
              What is Insurance?
            </h2>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Understanding the fundamentals of insurance for your financial protection
            </p>
          </div>
          
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Text Content */}
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Financial Safety Net</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Insurance is a financial safety net that protects you and your loved ones from unexpected financial losses. It's a contract between you (the policyholder) and an insurance company, where you pay regular premiums in exchange for financial protection against specific risks.
                </p>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Peace of Mind</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  When an insured event occurs (like an accident, illness, or property damage), the insurance company compensates you for the financial loss, helping you recover without depleting your savings or going into debt. Insurance provides peace of mind and financial stability during difficult times.
                </p>
              </div>
            </div>
            
            {/* Visual Element */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-400/30 to-secondary-400/30 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 rounded-3xl p-8 text-white">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Start Your Protection</h3>
                  <p className="text-blue-100 mb-6">Get the insurance coverage you need for complete financial security</p>
                  <button 
                    onClick={openModal}
                    className="px-8 py-3 bg-white text-primary-600 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                Risk Protection
              </h3>
              
              <p className="text-gray-700 leading-relaxed">
                Protects you from financial losses due to unexpected events like accidents, illnesses, or natural disasters.
              </p>
              
              <div className="flex items-center justify-between mt-6">
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
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-secondary-600 transition-colors duration-300">
                Family Security
              </h3>
              
              <p className="text-gray-700 leading-relaxed">
                Ensures your family's financial well-being even in your absence, providing them with financial support.
              </p>
              
              <div className="flex items-center justify-between mt-6">
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
                  <DollarSign className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-accent-600 transition-colors duration-300">
                Tax Benefits
              </h3>
              
              <p className="text-gray-700 leading-relaxed">
                Many insurance premiums qualify for tax deductions under Section 80C and 80D of the Income Tax Act.
              </p>
              
              <div className="flex items-center justify-between mt-6">
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
      </div>

      {/* Revolutionary Tips Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-secondary-400/20 to-accent-400/20 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary-500 to-accent-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
              Insurance Planning Tips
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-secondary-600 to-accent-600 bg-clip-text text-transparent mb-6 leading-tight">
              Smart Insurance Planning
            </h2>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Essential tips to help you make informed insurance decisions
            </p>
          </div>
          
          {/* Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center font-bold text-white text-xl group-hover:scale-110 transition-transform duration-300">1</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">Assess Your Insurance Needs</h3>
                    <p className="text-gray-700 leading-relaxed">Evaluate your financial situation, dependents, assets, and liabilities to determine the right amount and type of insurance coverage you need.</p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center font-bold text-white text-xl group-hover:scale-110 transition-transform duration-300">2</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-secondary-600 transition-colors duration-300">Buy Early and Stay Covered</h3>
                    <p className="text-gray-700 leading-relaxed">Insurance premiums are lower when you're younger and healthier. Start early and maintain continuous coverage to avoid coverage gaps.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center font-bold text-white text-xl group-hover:scale-110 transition-transform duration-300">3</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accent-600 transition-colors duration-300">Compare Before You Buy</h3>
                    <p className="text-gray-700 leading-relaxed">Compare policies from multiple insurers, considering coverage, premiums, claim settlement ratio, and customer service quality.</p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center font-bold text-white text-xl group-hover:scale-110 transition-transform duration-300">4</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">Review and Update Regularly</h3>
                    <p className="text-gray-700 leading-relaxed">Review your insurance coverage annually or when major life events occur (marriage, children, job change) to ensure adequate protection.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revolutionary Insurance Types Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
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
              Our Insurance Products
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6 leading-tight">
              Choose Your Protection
            </h2>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Comprehensive insurance solutions tailored to your unique needs and lifestyle
            </p>
          </div>
          
          {/* Revolutionary Category Filter */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Filter by Insurance Type</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg shadow-primary-500/25 transform scale-105'
                      : 'bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-600 hover:shadow-lg'
                  }`}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Revolutionary Insurance Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredInsurance.map((insurance) => (
              <Link 
                key={insurance.id}
                to={insurance.route}
                className="group block"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden">
                  {/* Insurance Header */}
                  <div className="relative p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                          {insurance.icon}
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors duration-300">
                          {insurance.title}
                        </h3>
                        <p className="text-gray-600 font-semibold">
                          {insurance.premium}
                        </p>
                      </div>
                    </div>

                    {/* Insurance Image */}
                    <div className="mb-6">
                    <img
                      src={insurance.image}
                      alt={insurance.title}
                        className="w-full h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                    {/* Insurance Description */}
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {insurance.description}
                    </p>

                    {/* Insurance Details */}
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl">
                        <span className="text-sm text-gray-600 font-medium">Coverage:</span>
                        <span className="font-bold text-gray-900">{insurance.coverage}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-secondary-50 to-accent-50 rounded-2xl">
                        <span className="text-sm text-gray-600 font-medium">Premium:</span>
                        <span className="font-bold text-gray-900">{insurance.premium}</span>
                      </div>
                    </div>
                  </div>
                    
                    {/* Features */}
                  <div className="mb-6 px-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Key Features:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {insurance.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl">
                          <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                          <span className="text-sm text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    </div>

                  {/* CTA Button */}
                  <div className="p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl">
                    <button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-4 px-6 rounded-full font-semibold hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-300 group-hover:scale-105 flex items-center justify-center gap-2">
                        Buy Insurance
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                  </div>
                </div>
                    </Link>
            ))}
                  </div>
                </div>
              </div>

      {/* Revolutionary Why Choose Us Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
            </div>
        
        <div className="relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-500 to-primary-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
              Why Choose Us
        </div>

            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-accent-600 to-primary-600 bg-clip-text text-transparent mb-6 leading-tight">
            Why Choose Our Insurance?
          </h2>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Experience the difference with our comprehensive insurance solutions
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                Trusted Coverage
              </h3>
              
              <p className="text-gray-700 leading-relaxed">
                Comprehensive coverage from top-rated insurance providers with excellent claim settlement ratios.
              </p>
              
              <div className="flex items-center justify-between mt-6">
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
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-secondary-600 transition-colors duration-300">
                Quick Claims
              </h3>
              
              <p className="text-gray-700 leading-relaxed">
                Fast and hassle-free claim processing with dedicated support team and digital claim filing.
              </p>
              
              <div className="flex items-center justify-between mt-6">
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
                  <Award className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-accent-600 transition-colors duration-300">
                Best Rates
              </h3>
              
              <p className="text-gray-700 leading-relaxed">
                Competitive premiums and flexible payment options to suit your budget and requirements.
              </p>
              
              <div className="flex items-center justify-between mt-6">
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
        </div>

      {/* Revolutionary CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
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
              Get Protected Today
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-inter bg-gradient-to-r from-white via-blue-100 to-accent-200 bg-clip-text text-transparent leading-tight">
            Ready to Get Protected?
          </h2>
            
            <p className="text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Get expert advice and choose the right insurance plan for you and your family's complete financial security.
          </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={openModal}
                className="px-12 py-5 bg-white text-primary-600 rounded-full font-bold text-lg hover:bg-blue-50 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 group"
            >
                Get Quote Now
                <svg className="inline-block w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              
            <button
              onClick={openModal}
                className="px-12 py-5 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
            >
                <Phone className="w-5 h-5" />
              Talk to Expert
            </button>
          </div>
          </div>
        </div>
      </div>

      {/* Revolutionary FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
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
              Insurance FAQs
            </h2>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Get answers to common questions about insurance and make informed decisions
            </p>
          </div>
          
          {/* FAQ Component */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8">
            <AccordionFAQ 
              title=""
              faqData={[
              {
                question: "What is the difference between life insurance and health insurance?",
                answer: "Life insurance provides financial protection to your family in case of your death, while health insurance covers medical expenses during illness or hospitalization. Life insurance is for your family's future, health insurance is for your current medical needs."
              },
              {
                question: "How much insurance coverage do I need?",
                answer: "For life insurance, aim for 10-15 times your annual income. For health insurance, consider your family size, medical history, and potential healthcare costs. A general rule is ₹5-10 lakhs for individuals and ₹10-20 lakhs for families."
              },
              {
                question: "What is the waiting period in health insurance?",
                answer: "Waiting period is the time you must wait before certain benefits become available. Pre-existing diseases typically have a 2-4 year waiting period, while maternity benefits may have a 9-month to 2-year waiting period. Accidental injuries are usually covered immediately."
              },
              {
                question: "Can I have multiple insurance policies?",
                answer: "Yes, you can have multiple insurance policies. In fact, it's recommended to have different types of insurance (life, health, motor, etc.) for comprehensive coverage. However, for the same type of insurance, check if there are any restrictions or overlapping benefits."
              },
              {
                question: "What happens if I miss paying my insurance premium?",
                answer: "Most policies have a grace period (15-30 days) after the due date. If you pay within this period, coverage continues. After the grace period, the policy may lapse, and you'll need to revive it by paying outstanding premiums with interest."
              },
              {
                question: "Are insurance premiums tax deductible?",
                answer: "Yes, life insurance premiums qualify for tax deduction under Section 80C (up to ₹1.5 lakhs), and health insurance premiums qualify under Section 80D (up to ₹25,000 for individuals, ₹50,000 for senior citizens)."
              },
              {
                question: "What is a no-claim bonus in motor insurance?",
                answer: "No-claim bonus (NCB) is a discount on your premium for not making any claims during the policy year. It can reduce your premium by up to 50% over 5 claim-free years. NCB is transferable when you switch insurers."
              },
              {
                question: "How do I file an insurance claim?",
                answer: "Contact your insurance company immediately after the incident. For health insurance, inform the hospital's insurance desk for cashless treatment. For other claims, submit required documents like claim form, bills, police report (if applicable), and medical reports. Most insurers offer online claim filing."
              }
            ]}
          />
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
                      Get Insurance Quote
                    </h3>
                    <p className="text-gray-600 mt-1">Fill in your details to get personalized insurance recommendations</p>
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
                    Get Quote
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
}

export default AllInsurance;
