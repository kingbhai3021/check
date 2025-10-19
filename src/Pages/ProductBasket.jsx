import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PiggyBank, 
  CreditCard, 
  HandCoins, 
  Shield, 
  Calculator, 
  TrendingUp,
  Home,
  Car,
  GraduationCap,
  Building,
  Heart,
  Plane,
  FileText,
  BarChart3,
  DollarSign,
  Users,
  Star,
  ArrowRight,
  Phone,
  Mail
} from 'lucide-react';
import Illustration from '../components/common/Illustration.jsx';

const ProductBasket = () => {
  const productCategories = [
    {
      id: 'loans',
      title: 'Loans',
      description: 'Personal, Home, Business, Car, Education & Property Loans',
      icon: <HandCoins className="w-12 h-12 text-primary-600" />,
      illustration: 'loanApplication',
      route: '/loans',
      color: 'bg-white/90 backdrop-blur-sm border border-gray-200/50 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/20',
      products: [
        { name: 'Personal Loan', rate: '10.49%', amount: '₹50K - ₹25L' },
        { name: 'Home Loan', rate: '7.60%', amount: '₹5L - ₹10Cr' },
        { name: 'Business Loan', rate: '14%', amount: '₹5L - ₹50Cr' },
        { name: 'Car Loan', rate: '8.5%', amount: '₹2L - ₹50L' }
      ],
      features: ['Quick Approval', 'Low Interest Rates', 'Flexible EMI', 'Minimal Documentation']
    },
    {
      id: 'investments',
      title: 'Investments',
      description: 'Mutual Funds, SIPs, Fixed Deposits & Gold Investments',
      icon: <TrendingUp className="w-12 h-12 text-secondary-600" />,
      illustration: 'investmentGrowth',
      route: '/investment/mutual-funds',
      color: 'bg-white/90 backdrop-blur-sm border border-gray-200/50 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/20',
      products: [
        { name: 'Mutual Funds', type: 'Diversified Portfolio' },
        { name: 'SIP Plans', type: 'Systematic Investment' },
        { name: 'Fixed Deposits', type: 'Guaranteed Returns' },
        { name: 'Gold Investments', type: 'Hedge Against Inflation' }
      ],
      features: ['Professional Management', 'Diversification', 'Tax Benefits', 'Liquidity']
    },
    {
      id: 'credit-cards',
      title: 'Credit Cards',
      description: 'Premium, Shopping, Travel & Lifestyle Credit Cards',
      icon: <CreditCard className="w-12 h-12 text-accent-600" />,
      illustration: 'creditCard',
      route: '/credit-cards',
      color: 'bg-white/90 backdrop-blur-sm border border-gray-200/50 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/20',
      products: [
        { name: 'Premium Cards', type: 'Luxury Benefits' },
        { name: 'Shopping Cards', type: 'Cashback & Rewards' },
        { name: 'Travel Cards', type: 'Miles & Lounge Access' },
        { name: 'Student Cards', type: 'Build Credit History' }
      ],
      features: ['Rewards & Cashback', 'Zero Liability', 'Quick Approval', 'Credit Building']
    },
    {
      id: 'insurance',
      title: 'Insurance',
      description: 'Life, Health, Vehicle, Travel & Term Insurance Plans',
      icon: <Shield className="w-12 h-12 text-success-600" />,
      illustration: 'insuranceProtection',
      route: '/AllInsurance',
      color: 'bg-white/90 backdrop-blur-sm border border-gray-200/50 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/20',
      products: [
        { name: 'Life Insurance', type: 'Financial Security' },
        { name: 'Health Insurance', type: 'Medical Coverage' },
        { name: 'Vehicle Insurance', type: 'Auto Protection' },
        { name: 'Travel Insurance', type: 'Trip Coverage' }
      ],
      features: ['Comprehensive Coverage', 'Tax Benefits', 'Quick Claims', 'Affordable Premiums']
    },
    {
      id: 'calculators',
      title: 'Financial Tools',
      description: 'EMI, SIP, Loan Eligibility & Tax Calculators',
      icon: <Calculator className="w-12 h-12 text-warning-600" />,
      illustration: 'financialPlanning',
      route: '/calculators/sip',
      color: 'bg-white/90 backdrop-blur-sm border border-gray-200/50 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/20',
      products: [
        { name: 'EMI Calculator', type: 'Loan Planning' },
        { name: 'SIP Calculator', type: 'Investment Planning' },
        { name: 'Tax Calculator', type: 'Tax Planning' },
        { name: 'Retirement Calculator', type: 'Future Planning' }
      ],
      features: ['Accurate Calculations', 'Real-time Results', 'Multiple Scenarios', 'Free to Use']
    },
    {
      id: 'services',
      title: 'Additional Services',
      description: 'CIBIL Score, KYC, Account Opening & Support',
      icon: <Users className="w-12 h-12 text-primary-600" />,
      illustration: 'financialPlanning',
      route: '/about',
      color: 'bg-white/90 backdrop-blur-sm border border-gray-200/50 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/20',
      products: [
        { name: 'CIBIL Score Check', type: 'Credit Assessment' },
        { name: 'Account Opening', type: 'Quick Setup' },
        { name: 'KYC Services', type: 'Documentation' },
        { name: 'Customer Support', type: '24/7 Assistance' }
      ],
      features: ['Expert Guidance', 'Quick Processing', 'Secure Platform', 'Personalized Service']
    }
  ];

  const stats = [
    { number: '2.5M+', label: 'Happy Customers' },
    { number: '₹4,200 Cr+', label: 'Funds Managed' },
    { number: '18K+', label: 'Active Partners' },
    { number: '5L+', label: 'Daily Transactions' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 text-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 font-archivo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Financial Solutions
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover a comprehensive range of financial products designed to meet all your needs. 
            From loans to investments, we provide smart solutions for your financial journey.
          </motion.p>
          
          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Product Categories Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-archivo">
            Choose Your Financial Product
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive range of financial products, each designed to help you achieve your specific goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Link to={category.route}>
                <div className={`${category.color} border-2 rounded-2xl p-8 h-full transition-all duration-300 cursor-pointer`}>
                  {/* Illustration */}
                  <div className="mb-6 flex justify-center">
                    <Illustration 
                      type={category.illustration} 
                      width={200} 
                      height={150} 
                      className="rounded-lg"
                      alt={`${category.title} illustration`}
                    />
                  </div>
                  
                  {/* Icon and Title */}
                  <div className="flex items-center mb-6">
                    <div className="mr-4">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                      <p className="text-gray-600 text-sm">{category.description}</p>
                    </div>
                  </div>

                  {/* Products List */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Popular Products:</h4>
                    <div className="space-y-2">
                      {category.products.slice(0, 3).map((product, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <span className="text-gray-700">{product.name}</span>
                          <span className="text-gray-500 font-medium">
                            {product.rate || product.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Key Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.features.map((feature, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-white bg-opacity-60 rounded-full text-xs font-medium text-gray-700"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                      Explore {category.title}
                    </span>
                    <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 font-archivo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Ready to Start Your Financial Journey?
          </motion.h2>
          <motion.p 
            className="text-lg mb-8 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get personalized financial advice from our experts. We're here to help you make the right decisions.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link 
              to="/client-login"
              className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-200 text-lg flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Get Started
            </Link>
            <div className="flex items-center gap-2 text-sm opacity-80">
              <Mail className="w-4 h-4" />
              <span>support@wittywealth.in</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductBasket;
