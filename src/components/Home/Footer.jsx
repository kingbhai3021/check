import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 text-white pt-16 pb-8 font-inter relative overflow-hidden">
      {/* Revolutionary Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-accent-500/20 to-primary-500/20 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-secondary-500/10 to-primary-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {/* About */}
        <div className="space-y-6">
          <div>
            <h4 className="text-2xl font-bold mb-4 font-archivo bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Witty Wealth
            </h4>
            <p className="text-gray-300 leading-relaxed mb-6">
              Your trusted partner in financial growth. Explore loans, investments, credit cards, insurance, and more.
            </p>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
              Market Leader
            </div>
            <p className="text-sm font-semibold text-accent-400 leading-6 mt-4">
              We are one of the Largest Corporate DSA and Fastest Loan Distribution Company in India.
            </p>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-xl font-bold mb-6 font-archivo text-white">Services</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="/investment/mutual-funds" className="text-gray-300 hover:text-accent-400 transition-colors duration-300 flex items-center group">
              <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 group-hover:bg-accent-400 transition-colors duration-300"></span>
              Home Loan
            </a></li>
            <li><a href="/loans" className="text-gray-300 hover:text-accent-400 transition-colors duration-300 flex items-center group">
              <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 group-hover:bg-accent-400 transition-colors duration-300"></span>
              Business Loan
            </a></li>
            <li><a href="/loans" className="text-gray-300 hover:text-accent-400 transition-colors duration-300 flex items-center group">
              <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 group-hover:bg-accent-400 transition-colors duration-300"></span>
              Personal Loan
            </a></li>
            <li><a href="/loans" className="text-gray-300 hover:text-accent-400 transition-colors duration-300 flex items-center group">
              <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 group-hover:bg-accent-400 transition-colors duration-300"></span>
              Mortgage Loan
            </a></li>
            <li><a href="/loans" className="text-gray-300 hover:text-accent-400 transition-colors duration-300 flex items-center group">
              <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 group-hover:bg-accent-400 transition-colors duration-300"></span>
              Car Loan
            </a></li>
            <li><a href="/credit-cards" className="text-gray-300 hover:text-accent-400 transition-colors duration-300 flex items-center group">
              <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 group-hover:bg-accent-400 transition-colors duration-300"></span>
              Credit Card
            </a></li>
          </ul>
        </div>

        {/* Tools */}
        <div>
          <h4 className="text-lg font-semibold mb-4 font-archivo">Tools & Calculators</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/sip-calculator" className="hover:text-blue-600 transition">SIP Calculator</a></li>
            <li><a href="/emi-calculator" className="hover:text-blue-600 transition">EMI Calculator</a></li>
            <li><a href="/home-loan-calculator" className="hover:text-blue-600 transition">Home Loan EMI Calculator</a></li>
            <li><a href="/personal-loan-calculator" className="hover:text-blue-600 transition">Personal Loan Calculator</a></li>
            <li><a href="/cibil-score" className="hover:text-blue-600 transition">CIBIL Score Check</a></li>
            <li><a href="/credit-score" className="hover:text-blue-600 transition">Credit Score Check</a></li>
            <li><a href="/gold-rate" className="hover:text-blue-600 transition">Gold Rate Calculator</a></li>
            <li><a href="/investment/fixed-deposits" className="hover:text-blue-600 transition">FD Interest Calculator</a></li>
            <li><a href="/loans" className="hover:text-blue-600 transition">Loan Eligibility Check</a></li>
            <li><a href="/investment/mutual-funds" className="hover:text-blue-600 transition">Mutual Fund Calculator</a></li>
            <li><a href="/credit-cards" className="hover:text-blue-600 transition">Credit Card EMI Calculator</a></li>
            <li><a href="/AllInsurance" className="hover:text-blue-600 transition">Insurance Premium Calculator</a></li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-4 font-archivo">Connect With Us</h4>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="hover:text-blue-600"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-600"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-600"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-blue-600"><FaYoutube /></a>
          </div>
          <p className="text-sm">Email: support@wittywealth.in</p>
          <p className="text-sm">Phone: +91-99999-99999</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t mt-8 pt-4 text-center text-sm text-gray-500 px-4">
        &copy; {new Date().getFullYear()} Witty Wealth. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
