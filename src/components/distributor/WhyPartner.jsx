import React from 'react';
import { FaHandsHelping, FaChartLine, FaUserTie, FaTools } from 'react-icons/fa';

const benefits = [
  {
    icon: <FaHandsHelping className="text-[#2438A5] text-3xl mb-3" />,
    title: "Trust & Support",
    description: "Backed by an experienced team and strong business ethics to guide your journey.",
  },
  {
    icon: <FaChartLine className="text-[#2438A5] text-3xl mb-3" />,
    title: "Growth Opportunities",
    description: "Scale your business and unlock unlimited earning potential with a growing market.",
  },
  {
    icon: <FaUserTie className="text-[#2438A5] text-3xl mb-3" />,
    title: "Professional Platform",
    description: "Get access to a powerful platform with tools, reports, and client management features.",
  },
  {
    icon: <FaTools className="text-[#2438A5] text-3xl mb-3" />,
    title: "Marketing & Training",
    description: "Stay ahead with our continuous training programs and marketing support.",
  },
];

function WhyPartner() {
  return (
    <section className="bg-white py-16 font-inter">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-archivo font-bold text-center text-gray-800 mb-12">
          Why Partner with <span className="text-[#F54D4D]">Witty Wealth</span>?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-[#F9FAFB] p-6 rounded-lg shadow hover:shadow-lg transition duration-300 text-center"
            >
              {item.icon}
              <h3 className="text-lg font-semibold mb-2 font-archivo text-[#2438A5]">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyPartner;
