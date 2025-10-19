import React from 'react';
import { FaMoneyCheckAlt, FaHeadset, FaLaptop, FaNetworkWired, FaRocket, FaMobileAlt } from 'react-icons/fa';

const benefits = [
  {
    icon: <FaMoneyCheckAlt size={28} className="text-[#2438A5]" />,
    title: 'High Earning Potential',
    desc: 'Enjoy attractive commissions and long-term recurring income.',
  },
  {
    icon: <FaLaptop size={28} className="text-[#2438A5]" />,
    title: 'Paperless Operations',
    desc: 'Onboard clients, manage investments & services digitally.',
  },
  {
    icon: <FaNetworkWired size={28} className="text-[#2438A5]" />,
    title: 'Robust Technology',
    desc: 'Access powerful tools, dashboards, and portfolio tracking.',
  },
  {
    icon: <FaMobileAlt size={28} className="text-[#2438A5]" />,
    title: 'Mobile Convenience',
    desc: 'Manage your business anywhere with our mobile-friendly platform.',
  },
  {
    icon: <FaRocket size={28} className="text-[#2438A5]" />,
    title: 'Marketing Support',
    desc: 'Grow faster with ready-made creatives and sales collaterals.',
  },
  {
    icon: <FaHeadset size={28} className="text-[#2438A5]" />,
    title: 'Dedicated Support',
    desc: 'Get help from our relationship managers and support team.',
  },
];

function PartnerBenefits() {
  return (
    <section className="bg-[#F9FAFB] py-20 font-inter">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-archivo text-gray-800 mb-12">
          Benefits of <span className="text-[#F54D4D]">Partnering</span> with Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 text-left"
            >
              <div className="mb-4">{benefit.icon}</div>
              <h4 className="text-lg font-semibold font-archivo mb-2 text-gray-800">
                {benefit.title}
              </h4>
              <p className="text-sm text-gray-600">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PartnerBenefits;
