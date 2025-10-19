import { useState } from "react";
import {  Link } from "react-router-dom"
import Logo from "../assets/logo.png";

function Nav() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <nav className="bg-white border-b shadow-sm px-6 py-3 font-inter fixed z-50 top-0 left-0 right-0">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-semibold">
          <a href="/">
            <img src={Logo} width={60} alt="Finance Growth" />
          </a>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-6 text-[16px] font-inter font-medium">
          <li>
            <Link to="/investment/mutual-funds" className="hover:text-primary transition-colors duration-200 text-gray-700 hover:text-blue-600">
              Mutual Fund
            </Link>
          </li>
          <li>
            <Link to="/credit-cards" className="hover:text-primary transition-colors duration-200 text-gray-700 hover:text-blue-600">
              Credit Cards
            </Link>
          </li>
          <li>
            <Link to="/loans" className="hover:text-primary transition-colors duration-200 text-gray-700 hover:text-blue-600">
              Loan
            </Link>
          </li>
          <li>
            <Link to="/AllInsurance" className="hover:text-primary transition-colors duration-200 text-gray-700 hover:text-blue-600">
              Insurance
            </Link>
          </li>

          {/* Calculators Dropdown */}
          <li className="relative group">
            <button className="hover:text-primary transition-colors duration-200 text-gray-700 hover:text-blue-600">
              Calculators
            </button>
            <ul className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-md z-20 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
              <li>
                <Link to="/calculators/sip" className="block px-4 py-2 hover:bg-gray-100 text-gray-700 hover:text-primary">
                  SIP Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculators/emi" className="block px-4 py-2 hover:bg-gray-100 text-gray-700 hover:text-primary">
                  EMI Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculators/home-loan-emi" className="block px-4 py-2 hover:bg-gray-100 text-gray-700 hover:text-primary">
                  Home Loan EMI
                </Link>
              </li>
              <li>
                <Link to="/calculators/personal-loan" className="block px-4 py-2 hover:bg-gray-100 text-gray-700 hover:text-primary">
                  Personal Loan
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/about" className="hover:text-primary transition-colors duration-200 text-gray-700 hover:text-blue-600">
              About
            </Link>
          </li>

          {/* Login Dropdown */}
          <li className="relative">
            <button
              onClick={() => setLoginOpen((v) => !v)}
              onBlur={() => setTimeout(() => setLoginOpen(false), 100)}
              className="focus:outline-none px-4 py-2 bg-primary text-white rounded-full focus:ring-2 focus:ring-blue-400 hover:bg-blue-700 transition-colors duration-200"
            >
              Login
            </button>

            {loginOpen && (
              <ul className="absolute right-0 mt-2 w-44 border border-gray-200 rounded-lg shadow-md z-20 animate-fadeIn p-2 bg-white">
                <li>
                  <Link
                    to="/distributor"className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
                    Distributor
                  </Link>
                </li>
                <li>
                  <Link
                     to="/client-login" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
                      Client Login
                  </Link>
                </li>
                <li>
                  <Link to="/dsa-login" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">DSA Login</Link>
                 
                </li>
                <li>
                  <Link to="/admin/login" className="block px-4 py-2 hover:bg-gray-100 text-red-600">Admin Login</Link>
                 
                </li>
                <li>
                  <Link to="/employee/login" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">Employee Login</Link>
                 
                </li>

             </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
