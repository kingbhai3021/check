import React from 'react';
// Placeholder images - no people
const service1 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM2MzY2RjE7c3RvcC1vcGFjaXR5OjEiIC8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6Izg0Q0NGNDtzdG9wLW9wYWNpdHk6MSIgLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjQwIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjIiLz4KPGNpcmNsZSBjeD0iMzAwIiBjeT0iMjAwIiByPSI2MCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xNSIvPgo8L3N2Zz4=";
const service2 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM4QjVDQjY7c3RvcC1vcGFjaXR5OjEiIC8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzEwQjk4MTtzdG9wLW9wYWNpdHk6MSIgLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjQwIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjIiLz4KPGNpcmNsZSBjeD0iMzAwIiBjeT0iMjAwIiByPSI2MCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xNSIvPgo8L3N2Zz4=";
const imgTop = service2;
import mutualFundImg from '../assets/mutualfund.png';
import creditCardImg from '../assets/creditCardImg.png';
import loanImg from '../assets/loanImg.png';
import insuranceImg from '../assets/insuranceImg.png';
// import imgTop from '../assets/top-image.jpg'; 

function FinanceGrid() {
  return (
    <div className="w-full text-Inter">
      {/* Top Section with Image and Text */}
      <br />
      <div className="max-w-[1280px] mx-auto px-4 mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left - Image */}
        <img src={imgTop} alt="Our Services" className="rounded-xl w-full h-auto object-cover" />

        {/* Right - Text Content */}
        <div className="space-y-4 font-archivo">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Empowering Your Financial Journey</h2>
          <p className="text-white text-sm sm:text-base">
            Discover a wide range of financial products tailored to your needs. From investments to insurance,
            we provide reliable and smart solutions for your future.
          </p>
          <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Learn More
          </button>
        </div>
      </div>

      {/* 2 Boxes After Image Section */}
      <div className="max-w-[1280px] mx-auto px-4 mt-20 grid grid-cols-1 sm:grid-cols-2 gap-6 font-archivo">
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
          <img src={service1} alt="Service 1" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h4 className="text-lg font-semibold mb-2">Retirement Planning</h4>
            <p className="text-sm text-gray-600">
              Secure your golden years with strategic retirement plans suited to your goals.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
          <img src={service2} alt="Service 2" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h4 className="text-lg font-semibold mb-2">Tax Saving Solutions</h4>
            <p className="text-sm text-gray-600">
              Save more with our expert tax planning solutions while maximizing your benefits.
            </p>
          </div>
        </div>
      </div>

      {/* Main 4 Services */}
      <div className='w-full py-14 text-center font-archivo'>
        <h2 className="text-2xl sm:text-3xl font-bold mb-10">Our Services</h2>

        <div className='max-w-[1280px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {/* Box 1 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition text-left">
            <img src={mutualFundImg} alt="Mutual Fund" className="w-full h-40 object-cover" />
            <div className="p-5">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Mutual Fund</h4>
              <p className="text-sm text-gray-600 mb-4">
                Grow your wealth through diversified investment plans managed by experts.
              </p>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition">
                Learn Now
              </button>
            </div>
          </div>

          {/* Box 2 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition text-left">
            <img src={creditCardImg} alt="Credit Cards" className="w-full h-40 object-cover" />
            <div className="p-5">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Credit Cards</h4>
              <p className="text-sm text-gray-600 mb-4">
                Choose from a variety of credit cards with exciting rewards and low interest rates.
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition">
                Learn Now
              </button>
            </div>
          </div>

          {/* Box 3 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition text-left">
            <img src={loanImg} alt="Loan Services" className="w-full h-40 object-cover" />
            <div className="p-5">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Loan</h4>
              <p className="text-sm text-gray-600 mb-4">
                Get personal, home, or business loans with flexible EMIs and quick approval.
              </p>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 transition">
                Learn Now
              </button>
            </div>
          </div>

          {/* Box 4 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition text-left">
            <img src={insuranceImg} alt="Insurance" className="w-full h-40 object-cover" />
            <div className="p-5">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Insurance</h4>
              <p className="text-sm text-gray-600 mb-4">
                Protect your future with our comprehensive health, life, and vehicle insurance plans.
              </p>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700 transition">
                Learn Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinanceGrid;
