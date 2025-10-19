import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { FaPiggyBank, FaCreditCard, FaHandHoldingUsd, FaShieldAlt } from 'react-icons/fa';
import { MdCompare } from 'react-icons/md';
import InfoModal from '../common/InfoModal.jsx';

// Placeholder images - no people
const service1 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM2MzY2RjE7c3RvcC1vcGFjaXR5OjEiIC8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6Izg0Q0NGNDtzdG9wLW9wYWNpdHk6MSIgLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjQwIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjIiLz4KPGNpcmNsZSBjeD0iMzAwIiBjeT0iMjAwIiByPSI2MCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xNSIvPgo8L3N2Zz4=";
const service2 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM4QjVDQjY7c3RvcC1vcGFjaXR5OjEiIC8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzEwQjk4MTtzdG9wLW9wYWNpdHk6MSIgLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjQwIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjIiLz4KPGNpcmNsZSBjeD0iMzAwIiBjeT0iMjAwIiByPSI2MCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xNSIvPgo8L3N2Zz4=";
const imgTop = service2;
import mutualFundImg from '../../assets/mutualfund.png';
import creditCardImg from '../../assets/creditCardImg.png';
import loanImg from '../../assets/loanImg.png';
import insuranceImg from '../../assets/insuranceImg.png';

function FinanceGrid() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Define content for each modal
  const modalContents = {
    financialJourney: {
      title: "Empowering Your Financial Journey",
      imageSrc: imgTop,
      ctaLink: "/about",
      ctaText: "Explore Our Services",
      text: (
        <div>
          <p className="mb-4">
            At Witty Wealth, we believe that financial success is not just about making money, 
            but about making smart decisions that secure your future. Our comprehensive suite of 
            financial services is designed to empower you at every stage of your financial journey.
          </p>
          <p className="mb-4">
            From young professionals starting their investment journey to seasoned investors 
            looking to optimize their portfolio, we provide personalized solutions that align 
            with your unique goals and risk tolerance.
          </p>
          <p>
            Our expert team combines cutting-edge technology with deep financial expertise 
            to deliver results that matter. Whether you're planning for retirement, saving 
            for your child's education, or building wealth for the future, we're here to guide you.
          </p>
        </div>
      )
    },
    retirementPlanning: {
      title: "Retirement Planning",
      imageSrc: service1,
      ctaLink: "/investment/mutual-funds",
      ctaText: "Start Planning Today",
      text: (
        <div>
          <p className="mb-4">
            Retirement planning is one of the most important financial decisions you'll ever make. 
            With increasing life expectancy and rising healthcare costs, starting early and planning 
            strategically is crucial for a comfortable retirement.
          </p>
          <p className="mb-4">
            Our retirement planning solutions include:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Systematic Investment Plans (SIPs) for long-term wealth building</li>
            <li>Pension plans and annuity products</li>
            <li>Tax-saving investment options under Section 80C</li>
            <li>Retirement corpus calculators and planning tools</li>
          </ul>
          <p>
            We help you create a comprehensive retirement strategy that considers inflation, 
            healthcare costs, and your desired lifestyle, ensuring you can enjoy your golden years 
            without financial stress.
          </p>
        </div>
      )
    },
    taxSaving: {
      title: "Tax Saving Solutions",
      imageSrc: service2,
      ctaLink: "/investment/mutual-funds",
      ctaText: "Save on Taxes Now",
      text: (
        <div>
          <p className="mb-4">
            Smart tax planning is essential for maximizing your savings and investments. 
            Our tax-saving solutions help you reduce your tax liability while building 
            wealth for the future through various investment instruments.
          </p>
          <p className="mb-4">
            Our tax-saving options include:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>ELSS (Equity Linked Saving Schemes) for Section 80C benefits</li>
            <li>National Pension System (NPS) for additional tax benefits</li>
            <li>Tax-saving fixed deposits and insurance products</li>
            <li>Health insurance plans for Section 80D deductions</li>
          </ul>
          <p>
            With our expert guidance, you can optimize your tax savings while ensuring 
            your investments align with your financial goals and risk appetite. 
            Start saving taxes today and build wealth for tomorrow.
          </p>
        </div>
      )
    }
  };

  const openModal = (contentKey) => {
    setModalContent(modalContents[contentKey]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className="w-full font-Inter bg-[#f5f9ff]">
      {/* Main Services Section */}
      <div className="w-full py-14 text-center font-archivo" id="main-services">
        <h2 className="text-2xl sm:text-3xl font-bold mb-10" data-aos="fade-up">Our Services</h2>

        <div className='max-w-[1280px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {/* Service Cards */}
          {[
            {
              img: mutualFundImg,
              title: 'Mutual Fund',
              desc: 'Grow your wealth through diversified investment plans.',
              icon: <FaPiggyBank className="text-primary-600 text-xl mr-2" />,
              badge: 'Popular',
              color: 'bg-primary-600',
            },
            {
              img: creditCardImg,
              title: 'Credit Cards',
              desc: 'Explore credit cards with rewards and low interest rates.',
              icon: <FaCreditCard className="text-primary-600 text-xl mr-2" />,
              badge: 'New',
              color: 'bg-primary-600',
            },
            {
              img: loanImg,
              title: 'Loan',
              desc: 'Personal, home, or business loans with flexible EMIs.',
              icon: <FaHandHoldingUsd className="text-primary-600 text-xl mr-2" />,
              badge: 'Trending',
              color: 'bg-primary-600',
            },
            {
              img: insuranceImg,
              title: 'Insurance',
              desc: 'Secure your future with our insurance plans.',
              icon: <FaShieldAlt className="text-primary-600 text-xl mr-2" />,
              badge: 'Secure',
              color: 'bg-primary-600',
            },
          ].map((service, index) => {
            // Define routes for each service
            const getServiceRoute = (title) => {
              switch(title) {
                case 'Mutual Fund': return '/investment/mutual-funds';
                case 'Credit Cards': return '/credit-cards';
                case 'Loan': return '/loans';
                case 'Insurance': return '/AllInsurance';
                default: return '/';
              }
            };

            return (
              <Link
                key={index}
                to={getServiceRoute(service.title)}
                className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 text-left overflow-hidden block hover:scale-105 hover:-translate-y-2 transform"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 group-hover:from-primary-500/30 group-hover:to-secondary-500/30 transition-all duration-500"></div>
                <img src={service.img} alt={service.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                  {service.badge}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl">{service.icon}</div>
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                      {service.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.desc}</p>
                  <div className="flex items-center justify-between">
                    <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full font-semibold hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-300 group-hover:scale-105">
                      Explore Now
                    </button>
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Revolutionary Image + Text Section */}
      <div className="max-w-[1280px] mx-auto px-4 mt-32 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          className="relative group cursor-pointer"
          data-aos="fade-right"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={() => openModal('financialJourney')}
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-primary-400/30 to-secondary-400/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <img
            src={imgTop}
            alt="Our Services"
            className="relative rounded-3xl w-full h-auto object-cover shadow-2xl group-hover:shadow-3xl transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-600/20 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </motion.div>
        
        <motion.div 
          className="space-y-8 font-archivo cursor-pointer" 
          data-aos="fade-left"
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={() => openModal('financialJourney')}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
            Financial Excellence
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-primary-600 to-secondary-600 bg-clip-text text-transparent leading-tight">
            Empowering Your Financial Journey
          </h2>
          
          <p className="text-xl text-gray-700 leading-relaxed">
            Discover a wide range of financial products tailored to your needs. From investments to insurance,
            we provide reliable and smart solutions for your future.
          </p>
          
          <div className="flex gap-4 pt-4">
            <Link to="/products">
              <motion.button 
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full font-semibold hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Explore Products
                <svg className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </Link>
            
            <motion.button 
              className="px-8 py-4 bg-white/90 backdrop-blur-sm border-2 border-primary-600 text-primary-600 rounded-full font-semibold hover:bg-primary-600 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Consultation
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Revolutionary Financial Solutions Section */}
      <div className="max-w-[1280px] mx-auto px-4 mt-32 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        </div>
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6">
            <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
            Financial Solutions
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6 font-archivo leading-tight">
            Comprehensive Financial Planning
          </h2>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Secure your future with our expert financial planning services designed to maximize your wealth and minimize your risks.
          </p>
        </motion.div>

        {/* Revolutionary Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          
          {/* Main Feature - Empowering Journey */}
          <motion.div 
            className="lg:col-span-2 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden cursor-pointer group"
            data-aos="fade-up"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={() => openModal('financialJourney')}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-10 w-24 h-24 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-10 left-10 w-16 h-16 border-2 border-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
                Featured Solution
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-4 font-archivo">
                Empowering Your Financial Journey
              </h3>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Discover a wide range of financial products tailored to your needs. From investments to insurance, we provide reliable and smart solutions for your future.
              </p>
              
              <div className="flex gap-4">
                <motion.button 
                  className="px-8 py-4 bg-white text-primary-600 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal('financialJourney');
                  }}
                >
                  Explore Solutions
                  <svg className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
                
                <motion.button 
                  className="px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Side Solutions */}
          <div className="space-y-8">
            
            {/* Retirement Planning */}
            <motion.div 
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 cursor-pointer group hover:-translate-y-2"
              data-aos="fade-left"
              data-aos-delay="100"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => openModal('retirementPlanning')}
            >
              <div className="relative mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
              
              <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-secondary-600 transition-colors duration-300">
                Retirement Planning
              </h4>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                Secure your golden years with strategic retirement plans suited to your goals.
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-secondary-600">Learn More</span>
                <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center group-hover:bg-secondary-600 group-hover:text-white transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Tax Saving Solutions */}
            <motion.div 
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl border border-gray-200/50 transition-all duration-500 cursor-pointer group hover:-translate-y-2"
              data-aos="fade-left"
              data-aos-delay="200"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => openModal('taxSaving')}
            >
              <div className="relative mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accent-600 transition-colors duration-300">
                Tax Saving Solutions
              </h4>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                Save more with our expert tax planning solutions while maximizing your benefits.
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-accent-600">Learn More</span>
                <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center group-hover:bg-accent-600 group-hover:text-white transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
            
          </div>
        </div>
        
        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex justify-center gap-6">
            <button className="px-10 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold rounded-full shadow-2xl hover:shadow-primary-500/30 transition-all duration-300 group">
              Get Free Consultation
              <svg className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
            
            <button className="px-10 py-4 bg-white/90 backdrop-blur-sm border-2 border-primary-600 text-primary-600 font-bold rounded-full hover:bg-primary-600 hover:text-white transition-all duration-300">
              View All Services
            </button>
          </div>
        </motion.div>
      </div>
      </div>

      {/* Modal */}
      {isModalOpen && modalContent && (
        <InfoModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={modalContent.title}
          imageSrc={modalContent.imageSrc}
          ctaLink={modalContent.ctaLink}
          ctaText={modalContent.ctaText}
        >
          {modalContent.text}
        </InfoModal>
      )}
    </div>
  );
}

export default FinanceGrid;
