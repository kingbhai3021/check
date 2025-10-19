import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

import slider1 from '../../assets/slider1.svg';
import slider2 from '../../assets/slider2.svg';
import slider3 from '../../assets/slider3.svg';
import slider4 from '../../assets/slider4.svg';

const slides = [
  {
    title: "Your Dream",
    subtitle: "Home with Simpler Faster Friendlier",
    highlight: "Home Loans",
    points: ["100% Paperless", "Lowest Interest Rate"],
    image: slider1,
  },
  {
    title: "Take Control",
    subtitle: "Track & Manage your",
    highlight: "Investments Easily",
    points: ["Real-time updates", "Portfolio Analysis"],
    image: slider2,
  },
  {
    title: "Get Insured",
    subtitle: "Simple & Secure",
    highlight: "Insurance Plans",
    points: ["Instant Quotes", "Maximum Coverage"],
    image: slider3,
  },
  {
    title: "Check Your Score",
    subtitle: "Free",
    highlight: "CIBIL Score Check",
    points: ["No OTP Required", "Fast & Safe"],
    image: slider4,
  },
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    trackTouch: true,
    trackMouse: false,
  });

  const slide = slides[current];

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 py-20 font-inter relative overflow-hidden" {...swipeHandlers}>
      {/* Revolutionary Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-40 right-32 w-32 h-32 bg-accent-400/20 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/3 w-48 h-48 bg-secondary-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 2px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 overflow-hidden relative z-10">
        
        {/* Text + Image Slide */}
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="w-full md:flex items-center justify-between gap-6 md:gap-12"
          >
            {/* Text Section */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
                {slide.title}
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white font-archivo leading-tight mb-2">
                {slide.subtitle}
              </h2>
              <h3 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent font-archivo mb-6">
                {slide.highlight}
              </h3>
              <ul className="mt-6 space-y-3 flex flex-col items-center md:items-start mb-8">
                {slide.points.map((point, index) => (
                  <li key={index} className="flex items-center text-white/90 gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <FaCheckCircle className="text-success-400 text-lg" />
                    <span className="font-medium">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex justify-center md:justify-start gap-4">
                <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-full hover:shadow-2xl hover:shadow-accent-500/30 transition-all duration-300 font-semibold text-lg group">
                  Apply Now 
                  <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 rounded-full hover:bg-white/30 transition-all duration-300 font-semibold">
                  Learn More
                </button>
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/2 flex justify-center relative">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-accent-400/30 to-secondary-400/30 rounded-3xl blur-xl"></div>
                <img
                  src={slide.image}
                  alt={slide.highlight}
                  loading="lazy"
                  className="relative w-[300px] h-[310px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Revolutionary Navigation Dots */}
      <div className="flex justify-center mt-12 space-x-4 relative z-10">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`relative transition-all duration-500 cursor-pointer group ${
              current === index ? 'scale-125' : 'scale-100 hover:scale-110'
            }`}
            onClick={() => {
              setDirection(index > current ? 1 : -1);
              setCurrent(index);
            }}
          >
            <div className={`w-4 h-4 rounded-full transition-all duration-500 ${
              current === index 
                ? 'bg-gradient-to-r from-accent-400 to-accent-600 shadow-lg shadow-accent-500/50' 
                : 'bg-white/30 backdrop-blur-sm border-2 border-white/50 group-hover:bg-white/50'
            }`}></div>
            {current === index && (
              <div className="absolute inset-0 w-4 h-4 rounded-full bg-gradient-to-r from-accent-400 to-accent-600 animate-ping opacity-75"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;
