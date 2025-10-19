import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#F3F4F6] text-gray-700 pt-10 pb-6 font-inter border-t">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h4 className="text-lg font-semibold mb-4 font-archivo">Witty Wealth</h4>
          <p className="text-sm leading-6 mb-4">
            Your trusted partner in financial growth. Explore loans, investments, credit cards, insurance, and more.
          </p>
          <p className="text-sm font-semibold text-blue-600 leading-6">
            We are one of the Largest Corporate DSA and Fastest Loan Distribution Company in India.
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-semibold mb-4 font-archivo">Services</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/investment/mutual-funds" className="hover:text-blue-600 transition">Home Loan</a></li>
            <li><a href="/loans" className="hover:text-blue-600 transition">Business Loan</a></li>
            <li><a href="/loans" className="hover:text-blue-600 transition">Personal Loan</a></li>
            <li><a href="/loans" className="hover:text-blue-600 transition">Mortgage Loan</a></li>
            <li><a href="/loans" className="hover:text-blue-600 transition">Car Loan</a></li>
            <li><a href="/credit-cards" className="hover:text-blue-600 transition">Credit Card</a></li>
            <li><a href="/loans" className="hover:text-blue-600 transition">Education Loan</a></li>
            <li><a href="/" className="hover:text-blue-600 transition">OD/CC/DOD</a></li>
            <li><a href="/" className="hover:text-blue-600 transition">Balance Transfer</a></li>
            <li><a href="/privacy-policy" className="hover:text-blue-600 transition">Privacy Policy</a></li>
            <li><a href="/grievance" className="hover:text-blue-600 transition">Grievance Redressal</a></li>
            <li><a href="/sachet-portal" className="hover:text-blue-600 transition">Sachet Portal</a></li>
          </ul>
        </div>

        {/* Tools */}
        <div>
          <h4 className="text-lg font-semibold mb-4 font-archivo">Tools & Calculators</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/sip-calculator" className="hover:text-blue-600 transition">SIP Calculator</a></li>
            <li><a href="/cibil-score" className="hover:text-blue-600 transition">CIBIL Score</a></li>
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
