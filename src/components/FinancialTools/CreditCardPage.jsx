import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CreditCard, Star, Check, ArrowRight, TrendingUp, Shield, Gift, Zap, Users, Award, DollarSign, Clock, AlertCircle, X, User, Mail, MapPin, DollarSign as DollarIcon } from 'lucide-react'
import AccordionFAQ from '../common/AccordionFAQ.jsx'

const CreditCardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    address: '',
    salary: ''
  })

  const featuredCards = [
    {
      id: 1,
      name: "HDFC Regalia Credit Card",
      bank: "HDFC Bank",
      category: "premium",
      image: "https://via.placeholder.com/300x200/1e3a8a/ffffff?text=HDFC+Regalia",
      annualFee: "₹2,500",
      interestRate: "3.49%",
      creditLimit: "₹5,00,000 - ₹15,00,000",
      rewards: "5X rewards on dining, 3X on travel",
      welcomeOffer: "10,000 bonus points",
      rating: 4.8,
      reviews: 1247,
      applyLink: "https://www.hdfcbank.com/personal/pay/cards/credit-cards/regalia"
    },
    {
      id: 2,
      name: "ICICI Amazon Pay Credit Card",
      bank: "ICICI Bank",
      category: "shopping",
      image: "https://via.placeholder.com/300x200/ff9900/ffffff?text=ICICI+Amazon",
      annualFee: "₹500",
      interestRate: "3.99%",
      creditLimit: "₹1,00,000 - ₹10,00,000",
      rewards: "5% cashback on Amazon, 2% on other spends",
      welcomeOffer: "₹500 Amazon voucher",
      rating: 4.6,
      reviews: 2156,
      applyLink: "https://www.icicibank.com/Personal-Banking/cards/Consumer-Cards/Credit-Card/amazon-pay-credit-card"
    },
    {
      id: 3,
      name: "Axis Flipkart Credit Card",
      bank: "Axis Bank",
      category: "shopping",
      image: "https://via.placeholder.com/300x200/2874f0/ffffff?text=Axis+Flipkart",
      annualFee: "₹500",
      interestRate: "3.99%",
      creditLimit: "₹50,000 - ₹8,00,000",
      rewards: "5% unlimited cashback on Flipkart",
      welcomeOffer: "₹1,000 Flipkart voucher",
      rating: 4.5,
      reviews: 1890,
      applyLink: "https://www.axisbank.com/retail/cards/credit-card/flipkart-credit-card"
    },
    {
      id: 4,
      name: "SBI SimplyCLICK Credit Card",
      bank: "SBI Bank",
      category: "lifestyle",
      image: "https://via.placeholder.com/300x200/1e40af/ffffff?text=SBI+SimplyCLICK",
      annualFee: "₹499",
      interestRate: "3.99%",
      creditLimit: "₹25,000 - ₹5,00,000",
      rewards: "5X rewards on online spends",
      welcomeOffer: "₹500 Amazon voucher",
      rating: 4.3,
      reviews: 1456,
      applyLink: "https://www.sbicard.com/en/personal/credit-cards/lifestyle/simplyclick.page"
    },
    {
      id: 5,
      name: "Kotak Mahindra Bank Credit Card",
      bank: "Kotak Bank",
      category: "travel",
      image: "https://via.placeholder.com/300x200/7c3aed/ffffff?text=Kotak+Travel",
      annualFee: "₹1,500",
      interestRate: "3.99%",
      creditLimit: "₹1,00,000 - ₹10,00,000",
      rewards: "4X rewards on travel bookings",
      welcomeOffer: "5,000 bonus points",
      rating: 4.4,
      reviews: 987,
      applyLink: "https://www.kotak.com/en/personal-banking/cards/credit-cards.html"
    },
    {
      id: 6,
      name: "Citibank Rewards Credit Card",
      bank: "Citibank",
      category: "lifestyle",
      image: "https://via.placeholder.com/300x200/059669/ffffff?text=Citi+Rewards",
      annualFee: "₹1,000",
      interestRate: "3.99%",
      creditLimit: "₹50,000 - ₹8,00,000",
      rewards: "1 reward point per ₹100 spent",
      welcomeOffer: "2,500 bonus points",
      rating: 4.2,
      reviews: 756,
      applyLink: "https://www.online.citibank.co.in/credit-card/rewards-credit-card"
    }
  ]

  const categories = [
    { value: 'all', label: 'All Cards' },
    { value: 'premium', label: 'Premium' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'travel', label: 'Travel' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'fuel', label: 'Fuel' },
    { value: 'student', label: 'Student' }
  ]

  const faqData = [
    {
      question: "What is a credit card and how does it work?",
      answer: "A credit card is a payment card that allows you to borrow money from a bank to make purchases. You can use it to buy goods and services, and pay back the amount later with interest if you don't pay the full balance. Credit cards come with a pre-approved credit limit, which is the maximum amount you can spend."
    },
    {
      question: "How do I choose the right credit card for me?",
      answer: "Consider your spending habits, lifestyle, and financial goals. Look for cards that offer rewards in categories you spend most on (travel, dining, shopping, fuel). Compare annual fees, interest rates, credit limits, and welcome offers. Choose a card that aligns with your spending patterns and offers the best value."
    },
    {
      question: "What factors affect my credit card approval?",
      answer: "Banks consider your credit score, income, employment status, existing debt, and credit history. A good credit score (750+), stable income, and low debt-to-income ratio increase your chances of approval. First-time applicants may need to start with secured or basic cards."
    },
    {
      question: "How can I improve my credit score?",
      answer: "Pay your credit card bills on time and in full, keep your credit utilization below 30%, maintain a mix of credit types, avoid applying for multiple cards at once, and regularly monitor your credit report for errors. Building a positive payment history is the most important factor."
    },
    {
      question: "What should I do if my credit card is lost or stolen?",
      answer: "Immediately contact your bank's 24/7 helpline to block the card. Most banks provide instant blocking through their mobile app or website. You'll receive a replacement card within 3-7 business days. Report any unauthorized transactions immediately."
    },
    {
      question: "How do I avoid credit card debt?",
      answer: "Only spend what you can afford to pay back in full each month. Set up automatic payments for the full balance, track your spending, and avoid using credit cards for cash advances or to pay other debts. Create a budget and stick to it."
    }
  ]

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
        />
      )
    }
    return stars
  }

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
      const response = await fetch('https://wittywealth.org/api/leads/credit-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Thank you for your interest! We will contact you soon for your credit card application.')
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
          
          {/* Credit Card Icons Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-24 h-16 border-2 border-white rounded-lg transform rotate-12"></div>
            <div className="absolute top-3/4 right-1/4 w-20 h-12 border border-white rounded-lg transform -rotate-12"></div>
            <div className="absolute bottom-1/4 left-1/2 w-16 h-10 border border-white rounded-lg transform rotate-6"></div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold mb-8">
            <div className="w-3 h-3 bg-accent-400 rounded-full animate-pulse"></div>
            Credit Solutions
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 font-inter bg-gradient-to-r from-white via-blue-100 to-accent-200 bg-clip-text text-transparent leading-tight">
            Best Credit Cards in India
          </h1>
          
          <p className="text-2xl text-blue-100 max-w-5xl mx-auto mb-12 leading-relaxed">
            Compare and apply for credit cards from top banks. Get instant approval, 
            amazing rewards, and exclusive benefits tailored to your lifestyle with revolutionary features.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link to="/credit-cards/compare" className="px-12 py-5 bg-white text-primary-600 rounded-full font-bold text-lg hover:bg-blue-50 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 group">
              Compare Cards
              <svg className="inline-block w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <Link to="/credit-score" className="px-12 py-5 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300">
              Check Credit Score
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-300 mb-2">50+</div>
              <div className="text-blue-200">Credit Cards</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-300 mb-2">₹0</div>
              <div className="text-blue-200">Annual Fee</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-300 mb-2">5%</div>
              <div className="text-blue-200">Cashback</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-300 mb-2">24/7</div>
              <div className="text-blue-200">Support</div>
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
              Credit Education
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6 leading-tight">
              What is a Credit Card?
            </h2>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Understanding the fundamentals of credit cards for your financial success
            </p>
          </div>
          
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Text Content */}
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Convenient Payment Solution</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  A credit card is a payment card that allows you to borrow money from a bank to make purchases. You can use it to buy goods and services, and pay back the amount later with interest if you don't pay the full balance.
                </p>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Build Credit History</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Responsible credit card usage helps build your credit score, which is crucial for future loans, mortgages, and other financial products. It demonstrates your creditworthiness to lenders.
                </p>
              </div>
            </div>
            
            {/* Visual Element */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-400/30 to-secondary-400/30 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 rounded-3xl p-8 text-white">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CreditCard className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Start Your Journey</h3>
                  <p className="text-blue-100 mb-6">Get your first credit card and begin building your credit history</p>
                  <button className="px-8 py-3 bg-white text-primary-600 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Revolutionary Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                Secure Transactions
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Advanced security features with zero liability protection and fraud monitoring.
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
                  <Gift className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-success-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-secondary-600 transition-colors duration-300">
                Rewards & Cashback
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Earn points, miles, and cashback on every purchase with exclusive rewards.
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
                  <TrendingUp className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-accent-600 transition-colors duration-300">
                Build Credit Score
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Improve your credit score with responsible usage and timely payments.
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
                <div className="w-20 h-20 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-success-600 transition-colors duration-300">
                Quick Approval
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Get approved within minutes with minimal documentation and instant processing.
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-success-600">Learn More</span>
                <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center group-hover:bg-success-600 group-hover:text-white transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revolutionary Educational Section 2 */}
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
              Smart Tips
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-secondary-600 to-accent-600 bg-clip-text text-transparent mb-6 leading-tight">
              Basic Tips for Credit Card Usage
            </h2>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Essential strategies to maximize benefits and maintain healthy credit habits
            </p>
          </div>
          
          {/* Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                Pay Full Balance
              </h3>
              
              <p className="text-gray-700 leading-relaxed">
                Always pay your full balance on time to avoid interest charges and improve your credit score.
              </p>
            </div>

            <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-secondary-600 transition-colors duration-300">
                Monitor Spending
              </h3>
              
              <p className="text-gray-700 leading-relaxed">
                Keep track of your expenses and stay within your budget to maintain financial discipline.
              </p>
            </div>

            <div className="group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-accent-600 transition-colors duration-300">
                Use Rewards Wisely
              </h3>
              
              <p className="text-gray-700 leading-relaxed">
                Maximize your rewards by using the card for categories that offer the highest cashback or points.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Revolutionary Credit Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-secondary-400/20 to-accent-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-500 to-primary-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
              Featured Cards
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-accent-600 to-primary-600 bg-clip-text text-transparent mb-6 leading-tight">
              Best Credit Cards in India
            </h2>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Discover the most rewarding credit cards with exclusive benefits and features
            </p>
          </div>
          
          {/* Revolutionary Category Filter */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Filter by Category</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category.value
                      ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg shadow-primary-500/25 transform scale-105'
                      : 'bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-600 hover:shadow-lg'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Revolutionary Credit Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCards
              .filter(card => selectedCategory === 'all' || card.category === selectedCategory)
              .map((card) => (
                <div key={card.id} className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden">
                  {/* Card Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={card.image} 
                      alt={card.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                      {card.category.toUpperCase()}
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                        {card.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold text-gray-600">{card.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{card.bank}</p>
                    
                    {/* Key Features */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Annual Fee: {card.annualFee}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Interest Rate: {card.interestRate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Limit: {card.creditLimit}</span>
                      </div>
                    </div>
                    
                    {/* Rewards */}
                    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-4 mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Rewards</h4>
                      <p className="text-sm text-gray-700">{card.rewards}</p>
                    </div>
                    
                    {/* Welcome Offer */}
                    <div className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-2xl p-4 mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Welcome Offer</h4>
                      <p className="text-sm text-gray-700">{card.welcomeOffer}</p>
                    </div>
                    
                    {/* Apply Button */}
                    <button
                      onClick={openModal}
                      className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 px-6 rounded-full font-semibold hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-300 group-hover:scale-105 flex items-center justify-center gap-2"
                    >
                      Apply Now
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
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
              Credit Card FAQs
            </h2>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Get answers to common questions about credit cards and make informed decisions
            </p>
          </div>
          
          {/* FAQ Component */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8">
            <AccordionFAQ faqData={faqData} />
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
                      Apply for Credit Card
                    </h3>
                    <p className="text-gray-600 mt-1">Fill in your details to get personalized credit card recommendations</p>
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

export default CreditCardPage