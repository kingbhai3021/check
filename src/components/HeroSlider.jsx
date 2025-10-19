import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import slider1 from '../assets/slider1.svg';
import slider2 from '../assets/slider2.svg';
import slider3 from '../assets/slider3.svg';    
import slider4 from '../assets/slider4.svg'; // Adjust the path as necessary


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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <div className="w-full bg-[#FAFAFA] py-10 font-inter">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 px-6">
        {/* Left Text Content */}
        <div className="w-full lg:w-1/2 space-y-4 animate-fadeIn">
          <h3 className="text-lg text-gray-500 font-archivo">{slide.title}</h3>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 font-archivo leading-snug">
            {slide.subtitle} <span className="text-red-600">{slide.highlight}</span>
          </h2>
          <ul className="space-y-2 mt-4">
            {slide.points.map((point, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700 font-inter font-medium">
                <FaCheckCircle className="text-[#00A86B]" />
                {point}
              </li>
            ))}
          </ul>
          <button className="mt-6 inline-flex items-center px-6 py-3 bg-[#2438A5] text-white rounded-lg hover:bg-[#182a90] transition-all duration-200 shadow-lg font-inter">
            Apply Now <FaArrowRight className="ml-2" />
          </button>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={slide.image}
            alt={slide.highlight}
            className="w-full object-contain max-h-[400px] transition-all duration-700 ease-in-out rounded-xl drop-shadow-md"
          />
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              current === index ? 'bg-blue-600 scale-110' : 'bg-gray-300'
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;
