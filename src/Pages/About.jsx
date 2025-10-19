import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Shield, Users, TrendingUp, Award, Target, Star, CheckCircle, ArrowRight, Zap, Globe, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Revolutionary Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-32 relative overflow-hidden">
        {/* Revolutionary Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-32 w-32 h-32 bg-accent-400/20 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-1/3 w-48 h-48 bg-secondary-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          
          {/* Company Icons Pattern */}
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
            About Our Company
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 font-inter bg-gradient-to-r from-white via-blue-100 to-accent-200 bg-clip-text text-transparent leading-tight">
            About Witty Wealth
          </h1>
          
          <p className="text-2xl text-blue-100 max-w-5xl mx-auto mb-12 leading-relaxed">
            Empowering individuals with smart financial solutions and expert guidance 
            to build a secure and prosperous future.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link 
              to="/client-login" 
              className="px-12 py-5 bg-white text-primary-600 rounded-full font-bold text-lg hover:bg-blue-50 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 group"
            >
              Get Started
              <svg className="inline-block w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <Link 
              to="/contact" 
              className="px-12 py-5 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Get Free Consultation
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-300 mb-2">10+</div>
              <div className="text-blue-200">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-300 mb-2">50K+</div>
              <div className="text-blue-200">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-300 mb-2">₹100Cr+</div>
              <div className="text-blue-200">Assets Managed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-300 mb-2">100+</div>
              <div className="text-blue-200">Expert Advisors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Revolutionary Company Overview Section */}
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
              Company Overview
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6 leading-tight">
              Your Trusted Financial Partner
            </h2>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Leading the way in comprehensive financial solutions and expert guidance
            </p>
          </div>
          
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Text Content */}
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Witty Wealth is a leading financial services company dedicated to helping individuals 
                  and families achieve their financial goals. With years of experience in the industry, 
                  we provide comprehensive solutions across mutual funds, insurance, loans, and credit cards.
                </p>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Guidance</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Our team of certified financial advisors works closely with clients to understand 
                  their unique needs and create personalized strategies that align with their long-term objectives.
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/client-login"
                  className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full font-semibold hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-300 group flex items-center justify-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-white/90 backdrop-blur-sm border-2 border-primary-600 text-primary-600 rounded-full font-semibold hover:bg-primary-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Contact Us
                </Link>
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
                  <h3 className="text-2xl font-bold mb-4">Trusted by Thousands</h3>
                  <p className="text-blue-100 mb-6">Join our community of satisfied clients</p>
                  <button className="px-8 py-3 bg-white text-primary-600 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">10+</div>
              <div className="text-gray-600 font-semibold">Years Experience</div>
            </div>

            <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-secondary-600 transition-colors duration-300">50K+</div>
              <div className="text-gray-600 font-semibold">Happy Clients</div>
            </div>

            <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-accent-600 transition-colors duration-300">₹100Cr+</div>
              <div className="text-gray-600 font-semibold">Assets Managed</div>
            </div>

            <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">100+</div>
              <div className="text-gray-600 font-semibold">Expert Advisors</div>
            </div>
          </div>
        </div>
      </div>

      {/* Revolutionary Services Overview Section */}
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
              Our Services
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-secondary-600 to-accent-600 bg-clip-text text-transparent mb-6 leading-tight">
              Our Comprehensive Services
            </h2>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Complete financial solutions designed to meet all your investment and protection needs
            </p>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                Mutual Funds
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Expert guidance on mutual fund investments with personalized portfolio management.
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
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-secondary-600 transition-colors duration-300">
                Credit Cards
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Best-in-class credit card solutions with exclusive rewards and benefits.
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
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-accent-600 transition-colors duration-300">
                Loans
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Quick and easy loan solutions with competitive interest rates and flexible terms.
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

            <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                Insurance
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Comprehensive insurance coverage for life, health, and general protection needs.
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
          </div>
        </div>
      </div>

      {/* Revolutionary Mission & Vision Section */}
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
              Our Purpose
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-accent-600 to-primary-600 bg-clip-text text-transparent mb-6 leading-tight">
              Mission & Vision
            </h2>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Driving financial empowerment through innovation and integrity
            </p>
          </div>
          
          {/* Mission & Vision Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-primary-600 transition-colors duration-300">
                Our Mission
              </h3>
              
              <p className="text-gray-700 leading-relaxed text-lg">
                To democratize financial services and make professional financial advice accessible 
                to every individual, helping them build wealth and secure their financial future 
                through innovative solutions and personalized guidance.
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
                  <Globe className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-secondary-600 transition-colors duration-300">
                Our Vision
              </h3>
              
              <p className="text-gray-700 leading-relaxed text-lg">
                To become the most trusted financial services partner, recognized for our integrity, 
                innovation, and commitment to client success, while contributing to the financial 
                literacy and prosperity of our communities.
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
              Start Your Journey
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-inter bg-gradient-to-r from-white via-blue-100 to-accent-200 bg-clip-text text-transparent leading-tight">
              Ready to Start Your Financial Journey?
            </h2>
            
            <p className="text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join thousands of satisfied clients who have achieved their financial goals with Witty Wealth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/client-login"
                className="px-12 py-5 bg-white text-primary-600 rounded-full font-bold text-lg hover:bg-blue-50 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 group"
              >
                Get Started
                <svg className="inline-block w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <Link
                to="/contact"
                className="px-12 py-5 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Get Free Consultation
                <span className="text-sm opacity-90">+91 91117 77046</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
