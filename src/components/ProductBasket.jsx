import React from 'react';
import mutualFundIcon from '../../assets/mutual-fund.svg';
import loanIcon from '../../assets/loan-against-mf.svg';
import equityIcon from '../../assets/equity-etf.svg';
import pmsIcon from '../../assets/pms.svg';
import goldBondIcon from '../../assets/gold-bond.svg';
import npsIcon from '../../assets/nps.svg';

const services = [
  { icon: mutualFundIcon, title: 'Mutual Funds' },
  { icon: loanIcon, title: 'Loan Against MF' },
  { icon: equityIcon, title: 'Equity & ETFs' },
  { icon: pmsIcon, title: 'PMS' },
  { icon: goldBondIcon, title: 'Sovereign Gold Bond' },
  { icon: npsIcon, title: 'NPS' },
];

function ProductBasket() {
  return (
    <section className="bg-[#F9FBFD] text-center px-4 py-16 font-inter">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 font-archivo text-[#1A1A1A]">
        Product Basket
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-[16px]">
        Explore a wide range of financial products with Witty Wealth—all under one roof.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-transform hover:-translate-y-1 duration-300"
          >
            <img src={service.icon} alt={service.title} className="w-14 h-14 mb-3" />
            <span className="text-sm font-semibold text-gray-800 text-center">{service.title}</span>
          </div>
        ))}
      </div>

      <button className="mt-10 bg-[#1D4ED8] hover:bg-[#153fa6] text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300 font-inter">
        Know More
      </button>

      <p className="text-xs text-gray-400 mt-3 italic">
        *Available exclusively with Witty Wealth partner account.
      </p>
    </section>
  );
}

export default ProductBasket;
