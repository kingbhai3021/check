import React, { useState, useEffect } from 'react'
import { ArrowLeft, Calculator, Shield, Clock, CheckCircle, Star, Users, DollarSign, Home, Building, CreditCard, TrendingUp, ArrowRight, Phone, Mail, Calendar, User, MapPin, Car, GraduationCap, Briefcase, Zap, Award, Target, Heart, Globe, Smartphone, FileText, Percent, Clock as ClockIcon, Users as UsersIcon, Shield as ShieldIcon, Star as StarIcon, BookOpen, Lightbulb, X, Mail as MailIcon, DollarSign as DollarIcon } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import CountUpNumber from '../CountUpNumber'
import AccordionFAQ from '../common/AccordionFAQ.jsx'

const LoanPage = () => {
  const [searchParams] = useSearchParams()
  const [selectedLoanType, setSelectedLoanType] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    address: '',
    salary: ''
  })

  const loanTypes = [
    {
      id: 'personal',
      name: 'Personal Loan',
      icon: '💰',
      rate: '10.49%',
      amount: '₹50,000 - ₹25,00,000',
      tenure: '12 - 60 months',
      features: ['No collateral required', 'Quick disbursal', 'Minimal documentation', 'Flexible repayment'],
      description: 'Get instant personal loans for any purpose with minimal documentation and quick approval.',
      color: 'bg-blue-50 border-blue-200',
      emi: '₹2,500',
      processingTime: '24-48 hours',
      eligibility: 'Salaried/Self-employed',
      documents: 'Minimal documents'
    },
    {
      id: 'home',
      name: 'Home Loan',
      icon: '🏠',
      rate: '7.60%',
      amount: '₹5,00,000 - ₹10,00,00,000',
      tenure: '5 - 30 years',
      features: ['Lowest interest rates', 'Long repayment tenure', 'Tax benefits', 'Property as collateral'],
      description: 'Realize your dream of owning a home with our competitive home loan rates and flexible terms.',
      color: 'bg-purple-50 border-purple-200',
      emi: '₹45,000',
      processingTime: '7-15 days',
      eligibility: 'Salaried/Self-employed',
      documents: 'Property documents required'
    },
    {
      id: 'business',
      name: 'Business Loan',
      icon: '💼',
      rate: '14%',
      amount: '₹5,00,000 - ₹50,00,00,000',
      tenure: '12 - 60 months',
      features: ['Business expansion', 'Working capital', 'Equipment financing', 'Quick approval'],
      description: 'Fuel your business growth with our business loans designed for entrepreneurs and SMEs.',
      color: 'bg-green-50 border-green-200',
      emi: '₹15,000',
      processingTime: '3-7 days',
      eligibility: 'Business owners',
      documents: 'Business documents'
    },
    {
      id: 'property',
      name: 'Loan Against Property',
      icon: '🏢',
      rate: '9.2%',
      amount: '₹10,00,000 - ₹5,00,00,000',
      tenure: '5 - 20 years',
      features: ['Property as collateral', 'Lower interest rates', 'Higher loan amounts', 'Flexible usage'],
      description: 'Leverage your property to get substantial loan amounts at competitive interest rates.',
      color: 'bg-orange-50 border-orange-200',
      emi: '₹35,000',
      processingTime: '10-15 days',
      eligibility: 'Property owners',
      documents: 'Property documents'
    },
    {
      id: 'car',
      name: 'Car Loan',
      icon: '🚗',
      rate: '8.5%',
      amount: '₹2,00,000 - ₹50,00,000',
      tenure: '1 - 7 years',
      features: ['Quick approval', 'Competitive rates', 'Minimal down payment', 'Flexible tenure'],
      description: 'Drive your dream car with our hassle-free car loans and competitive interest rates.',
      color: 'bg-blue-50 border-blue-200',
      emi: '₹12,000',
      processingTime: '2-5 days',
      eligibility: 'Salaried/Self-employed',
      documents: 'Vehicle documents'
    },
    {
      id: 'education',
      name: 'Education Loan',
      icon: '🎓',
      rate: '8.75%',
      amount: '₹2,00,000 - ₹1,00,00,000',
      tenure: '5 - 15 years',
      features: ['Study abroad', 'Domestic courses', 'Low interest rates', 'Grace period'],
      description: 'Invest in your future with our education loans for domestic and international studies.',
      color: 'bg-red-50 border-red-200',
      emi: '₹8,000',
      processingTime: '7-10 days',
      eligibility: 'Students with co-applicant',
      documents: 'Admission documents'
    }
  ]

  const filteredLoans = selectedLoanType === 'all' 
    ? loanTypes 
    : loanTypes.filter(loan => loan.id === selectedLoanType)

  const stats = [
    { icon: <Users size={24} />, value: 50000, suffix: '+', label: 'Happy Customers' },
    { icon: <DollarSign size={24} />, value: 500, prefix: '₹', suffix: 'Cr+', label: 'Loans Disbursed' },
    { icon: <Shield size={24} />, value: 99, suffix: '%', label: 'Customer Satisfaction' },
    { icon: <Clock size={24} />, value: 24, suffix: 'hrs', label: 'Processing Time' }
  ]

  const features = [
    {
      icon: <CheckCircle size={24} />,
      title: 'Quick Approval',
      description: 'Get loan approval within 24-48 hours with minimal documentation'
    },
    {
      icon: <Shield size={24} />,
      title: 'Secure & Safe',
      description: 'Bank-grade security with complete data protection and privacy'
    },
    {
      icon: <Calculator size={24} />,
      title: 'EMI Calculator',
      description: 'Calculate your EMI and plan your loan repayment easily'
    },
    {
      icon: <TrendingUp size={24} />,
      title: 'Best Rates',
      description: 'Competitive interest rates starting from 7.60% onwards'
    }
  ]

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setFormData({
      name: '',
      age: '',
      email: '',
      address: '',
      salary: ''
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch('https://wittywealth.org/api/leads/loan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Thank you for your interest! We will contact you soon for your loan application.')
        closeModal()
      } else {
        alert('Error submitting form. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Error submitting form. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Revolutionary Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-32 relative overflow-hidden">
        {/* Revolutionary Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-32 w-32 h-32 bg-accent-400/20 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-1/3 w-48 h-48 bg-secondary-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          
          {/* Loan Icons Pattern */}
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
            Loan Solutions
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 font-inter bg-gradient-to-r from-white via-blue-100 to-accent-200 bg-clip-text text-transparent leading-tight">
            Get the Loan You Need
          </h1>
          
          <p className="text-2xl text-blue-100 max-w-5xl mx-auto mb-12 leading-relaxed">
            Choose from a wide range of loan products with competitive interest rates, 
            quick approval, and flexible repayment options designed for your financial success.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button 
              onClick={openModal}
              className="px-12 py-5 bg-white text-primary-600 rounded-full font-bold text-lg hover:bg-blue-50 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 group"
            >
              Check Eligibility
              <svg className="inline-block w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            
            <Link 
              to="/calculators/emi" 
              className="px-12 py-5 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300"
            >
              Calculate EMI
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-300 mb-2">₹10Cr+</div>
              <div className="text-blue-200">Loans Disbursed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-300 mb-2">7.6%</div>
              <div className="text-blue-200">Starting Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-300 mb-2">24hrs</div>
              <div className="text-blue-200">Quick Approval</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-300 mb-2">100%</div>
              <div className="text-blue-200">Digital Process</div>
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
              Loan Education
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6 leading-tight">
              What are Loans?
            </h2>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Understanding the fundamentals of loans for your financial growth
            </p>
          </div>
          
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Text Content */}
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Financial Assistance</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  A loan is a financial product that allows you to borrow money from a bank or financial institution with the agreement to pay it back over time, typically with interest. Loans help you achieve your financial goals without having to save the entire amount upfront.
                </p>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Flexible Repayment</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Loans come with flexible repayment options, allowing you to choose a tenure that suits your financial capacity. You can opt for shorter tenures with higher EMIs or longer tenures with lower monthly payments.
                </p>
              </div>
            </div>
            
            {/* Visual Element */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-400/30 to-secondary-400/30 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 rounded-3xl p-8 text-white">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <DollarSign className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Start Your Journey</h3>
                  <p className="text-blue-100 mb-6">Get the loan you need to achieve your financial goals</p>
                  <button 
                    onClick={openModal}
                    className="px-8 py-3 bg-white text-primary-600 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg mb-4">
              A loan is a financial arrangement where a lender provides money to a borrower with the expectation that it will be repaid with interest over a specified period. Loans are essential financial tools that help individuals and businesses achieve their goals by providing access to funds they don't currently have.
            </p>
            <p className="text-lg mb-4">
              Loans come in various types, each designed for specific purposes. Whether you need funds for a home, education, business expansion, or personal expenses, there's a loan product tailored to your needs. The key is understanding your requirements and choosing the right loan with favorable terms.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <DollarSign className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Access to Capital</h3>
                <p className="text-gray-600">Get immediate access to funds for major purchases or investments without waiting to save the full amount.</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Structured Repayment</h3>
                <p className="text-gray-600">Fixed monthly payments (EMI) help you budget and plan your finances with predictable expenses.</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Build Credit History</h3>
                <p className="text-gray-600">Responsible loan repayment helps build a positive credit history for future financial opportunities.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Section 2: Basic Tips */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-3">
            <Lightbulb className="h-8 w-8 text-blue-600" />
            Basic Tips for Loan Application
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Check Your Credit Score</h3>
                  <p className="text-gray-600 text-sm">A good credit score (750+) increases your chances of loan approval and helps you get better interest rates. Check your credit score before applying.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Compare Interest Rates</h3>
                  <p className="text-gray-600 text-sm">Shop around and compare interest rates from multiple lenders. Even a small difference in rates can save you thousands over the loan tenure.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Calculate Your EMI</h3>
                  <p className="text-gray-600 text-sm">Use EMI calculators to determine if you can comfortably afford the monthly payments. Your EMI should not exceed 40% of your monthly income.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Prepare Documentation</h3>
                  <p className="text-gray-600 text-sm">Keep all required documents ready - income proof, bank statements, identity proof, and address proof. This speeds up the approval process.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-primary">{stat.icon}</div>
            </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  <CountUpNumber 
                    end={stat.value} 
                    prefix={stat.prefix || ''} 
                    suffix={stat.suffix || ''}
                    duration={2.5}
                    delay={index * 0.2}
                  />
                </div>
                <div className="text-gray-600">{stat.label}</div>
            </div>
            ))}
            </div>
          </div>
        </div>

      {/* 4-Step Process Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-inter">
            Your Loan Application Made Easy in 4 Steps
          </h2>
          <p className="text-xl text-gray-600">
            Simple and fast
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">01</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Tell us about you
            </h3>
            <h4 className="text-lg font-medium text-gray-800 mb-3">
              Tell us about your financial requirement
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Fill out the details in less than 2 minutes.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">02</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              AI based eligibility engine
            </h3>
            <h4 className="text-lg font-medium text-gray-800 mb-3">
              AI based eligibility engine to match you with best banks
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Based upon your details, our AI engine, using pool of 90+ bank details will match you with the best banks with success rate of over 90%
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">03</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Digital Bank application
            </h3>
            <h4 className="text-lg font-medium text-gray-800 mb-3">
              Digital Bank application
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Add few more details in completely digital platform to create bank application.
            </p>
          </div>

          {/* Step 4 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">04</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Get quick sanction on your loan
            </h3>
            <h4 className="text-lg font-medium text-gray-800 mb-3">
              Get quick sanction on your loan
            </h4>
            <p className="text-gray-600 leading-relaxed">
              The whole process of application filling to loan sanction gets reduced from weeks to few minutes.
            </p>
          </div>
        </div>

        {/* CTA for Steps */}
        <div className="text-center mt-12">
          <Link 
            to="/loans/eligibility" 
            className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg"
          >
            Get Started
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Loan Type Filter */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 font-inter">
            Choose Your Loan Type
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setSelectedLoanType('all')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedLoanType === 'all'
                  ? 'bg-primary text-white'
                  : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
              }`}
            >
              All Loans
            </button>
            {loanTypes.map((loan) => (
              <button
                key={loan.id}
                onClick={() => setSelectedLoanType(loan.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedLoanType === loan.id
                    ? 'bg-primary text-white'
                    : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                }`}
              >
                {loan.name}
              </button>
            ))}
          </div>
        </div>

        {/* Revolutionary Loan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredLoans.map((loan) => (
            <Link 
              key={loan.id}
              to={`/loans/details?type=${loan.id}`}
              className="group block"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden">
                {/* Loan Header */}
                <div className="relative p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                        {loan.icon}
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors duration-300">
                        {loan.name}
                      </h3>
                      <p className="text-gray-600 font-semibold">
                        Starting from {loan.rate}
                      </p>
                    </div>
                  </div>

                  {/* Loan Description */}
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {loan.description}
                  </p>

                  {/* Loan Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl">
                      <span className="text-sm text-gray-600 font-medium">Loan Amount:</span>
                      <span className="font-bold text-gray-900">{loan.amount}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-secondary-50 to-accent-50 rounded-2xl">
                      <span className="text-sm text-gray-600 font-medium">Tenure:</span>
                      <span className="font-bold text-gray-900">{loan.tenure}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-accent-50 to-primary-50 rounded-2xl">
                      <span className="text-sm text-gray-600 font-medium">EMI:</span>
                      <span className="font-bold text-gray-900">{loan.emi}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl">
                      <span className="text-sm text-gray-600 font-medium">Processing Time:</span>
                      <span className="font-bold text-gray-900">{loan.processingTime}</span>
                    </div>
                  </div>
              </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Key Features:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {loan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl">
                          <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
                          <span className="text-sm text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Eligibility & Documents */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-r from-secondary-50 to-accent-50 rounded-2xl">
                      <span className="text-xs text-gray-600 font-medium">Eligibility:</span>
                      <p className="text-sm font-bold text-gray-900">{loan.eligibility}</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-accent-50 to-primary-50 rounded-2xl">
                      <span className="text-xs text-gray-600 font-medium">Documents:</span>
                      <p className="text-sm font-bold text-gray-900">{loan.documents}</p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl">
                    <button 
                      onClick={openModal}
                      className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-4 px-6 rounded-full font-semibold hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-300 group-hover:scale-105 flex items-center justify-center gap-2"
                    >
                      Apply Now
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
            </div>
            </Link>
          ))}
        </div>

        {/* Revolutionary Features Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-12 mb-16 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-2xl animate-float"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
          </div>
          
          <div className="relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6">
                <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
                Why Choose Us
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6 leading-tight">
                Why Choose Our Loans?
              </h2>
              
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Experience the difference with our revolutionary loan solutions
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white text-2xl">{feature.icon}</div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-700 leading-relaxed">
                    {feature.description}
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
              ))}
            </div>
          </div>
        </div>

        {/* Revolutionary CTA Section */}
        <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white text-center py-24 rounded-3xl relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-40 right-32 w-32 h-32 bg-accent-400/20 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-32 left-1/3 w-48 h-48 bg-secondary-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold mb-8">
              <div className="w-3 h-3 bg-accent-400 rounded-full animate-pulse"></div>
              Get Started Today
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-inter bg-gradient-to-r from-white via-blue-100 to-accent-200 bg-clip-text text-transparent leading-tight">
              Ready to Apply for a Loan?
            </h2>
            
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Get instant approval with minimal documentation and competitive interest rates designed for your success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={openModal}
                className="px-12 py-5 bg-white text-primary-600 rounded-full font-bold text-lg hover:bg-blue-50 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 group"
              >
                Check Eligibility
                <svg className="inline-block w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              
              <Link
                to="/calculators/emi"
                className="px-12 py-5 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300"
              >
                Calculate EMI
              </Link>
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
                Loan Application FAQs
              </h2>
              
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Get answers to common questions about loans and make informed decisions
              </p>
            </div>
            
            {/* FAQ Component */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8">
              <AccordionFAQ 
                title=""
            faqData={[
              {
                question: "What documents do I need to apply for a loan?",
                answer: "Common documents include: Identity proof (Aadhaar, PAN, Passport), Address proof (Utility bills, Bank statements), Income proof (Salary slips, ITR, Bank statements), Employment proof (Offer letter, Employment certificate), and Property documents (for secured loans). Requirements may vary by loan type and lender."
              },
              {
                question: "How long does it take to get a loan approved?",
                answer: "Approval time varies by loan type: Personal loans (24-48 hours), Home loans (7-15 days), Business loans (3-7 days), Education loans (7-14 days). The process is faster if you have all documents ready and a good credit score."
              },
              {
                question: "What is the minimum credit score required for a loan?",
                answer: "Most lenders require a minimum credit score of 650-700. However, a score of 750+ gives you access to better interest rates and higher loan amounts. Some lenders may approve loans with lower scores but at higher interest rates."
              },
              {
                question: "Can I prepay my loan? Are there any charges?",
                answer: "Yes, most loans allow prepayment. Personal loans typically have no prepayment charges after 6-12 months. Home loans may have prepayment charges (1-2% of outstanding amount) for floating rate loans, but no charges for fixed rate loans. Check with your lender for specific terms."
              },
              {
                question: "What is the difference between fixed and floating interest rates?",
                answer: "Fixed rates remain constant throughout the loan tenure, providing predictable EMIs. Floating rates change based on market conditions (like RBI repo rate changes), which can increase or decrease your EMI. Fixed rates are usually higher initially but provide stability."
              },
              {
                question: "How is EMI calculated?",
                answer: "EMI is calculated using the formula: EMI = [P × R × (1+R)^N] / [(1+R)^N - 1], where P is the principal amount, R is the monthly interest rate, and N is the loan tenure in months. You can use online EMI calculators for quick calculations."
              },
              {
                question: "Can I get a loan if I'm self-employed?",
                answer: "Yes, self-employed individuals can get loans. You'll need to provide additional documents like ITR for the last 2-3 years, business registration documents, bank statements, and audited financial statements. The approval process may take longer than for salaried individuals."
              },
              {
                question: "What happens if I miss an EMI payment?",
                answer: "Missing EMI payments results in late fees (typically ₹500-1000) and negatively impacts your credit score. Multiple missed payments can lead to loan default, legal action, and asset seizure (for secured loans). Contact your lender immediately if you're facing financial difficulties."
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
                      Apply for Loan
                    </h3>
                    <p className="text-gray-600 mt-1">Fill in your details to get personalized loan recommendations</p>
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
                    <MailIcon className="w-4 h-4 text-accent-600" />
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
                    Submit Application
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
  )
}

export default LoanPage 