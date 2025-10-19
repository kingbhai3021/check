import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Logo from "../../assets/logo.png";
import { Menu, X, User, LogOut } from "lucide-react";

function Nav() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setLoginOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b shadow-sm font-inter fixed z-50 top-0 left-0 right-0">
      <div className="max-w-[1280px] mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center">
            <img src={Logo} width={60} alt="Finance Growth" />
          </a>
        </div>

        {/* Hamburger menu (mobile) - centered */}
        <div className="md:hidden flex-1 flex justify-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-700"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center space-x-6 text-[16px] font-medium">
          <li>
            <Link to="/investment/mutual-funds" className="hover:text-primary-600 transition-colors duration-200 text-gray-700">
              Mutual Fund
            </Link>
          </li>
          <li>
            <Link to="/credit-cards" className="hover:text-primary-600 transition-colors duration-200 text-gray-700">
              Credit Cards
            </Link>
          </li>
          <li>
            <Link to="/loans" className="hover:text-primary-600 transition-colors duration-200 text-gray-700">
              Loan
            </Link>
          </li>
          <li>
            <Link to="/AllInsurance" className="hover:text-primary-600 transition-colors duration-200 text-gray-700">
              Insurance
            </Link>
          </li>

          {/* Calculators Dropdown */}
          <li className="relative group">
            <button className="hover:text-primary-600 transition-colors duration-200 text-gray-700">
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
            <Link to="/about" className="hover:text-primary-600 transition-colors duration-200 text-gray-700">
              About
            </Link>
          </li>


          {/* Authentication Section */}
          {isAuthenticated ? (
            <li className="relative group">
              <button
                onClick={() => setLoginOpen((v) => !v)}
                onBlur={() => setTimeout(() => setLoginOpen(false), 100)}
                className="focus:outline-none px-4 py-2 bg-primary-600 text-white rounded-full focus:ring-2 focus:ring-primary-400 hover:bg-primary-700 transition-colors duration-200 flex items-center gap-2"
              >
                <User size={16} />
                {user?.wittywealth || 'Dashboard'}
              </button>

              {loginOpen && (
                <ul className="absolute right-0 mt-2 w-48 border border-gray-200 rounded-lg shadow-md z-20 animate-fadeIn p-2 bg-white">
                  <li className="px-3 py-2 text-sm text-gray-600 border-b">
                    Welcome, {user?.name || user?.wittywealth || 'User'}
                  </li>
                  <li>
                    <Link 
                      to={user?.redirect === 'CLIENT' ? '/dashboard' : 
                          user?.redirect === 'ADMIN' ? '/admin/dashboard' : 
                          user?.redirect === 'DSA' ? '/agent' : '/dashboard'} 
                      className="block px-3 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      Go to Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 text-red-500 flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <li className="relative">
              <button
                onClick={() => setLoginOpen((v) => !v)}
                onBlur={() => setTimeout(() => setLoginOpen(false), 100)}
                className="focus:outline-none px-4 py-2 bg-primary-600 text-white rounded-full focus:ring-2 focus:ring-primary-400 hover:bg-primary-700 transition-colors duration-200"
              >
                Login
              </button>

              {loginOpen && (
                <ul className="absolute right-0 mt-2 w-44 border border-gray-200 rounded-lg shadow-md z-20 animate-fadeIn p-2 bg-white">
                  <li>
                    <Link to="/distributor" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
                      Distributor
                    </Link>
                  </li>
                  <li>
                    <Link to="/client-login" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
                      Client Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/dsa-login" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
                      DSA Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/login" className="block px-4 py-2 hover:bg-gray-100 text-red-500">
                       Admin Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/employee/login" className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
                      Employee Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/call-centre-login" className="block px-4 py-2 hover:bg-gray-100 text-blue-600">
                      Call Centre Login
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-6 py-4 space-y-3 text-sm border-t font-medium shadow">
          <Link to="/investment/mutual-funds" className="block text-gray-700 hover:text-primary-600">Mutual Fund</Link>
          <Link to="/credit-cards" className="block text-gray-700 hover:text-primary-600">Credit Cards</Link>
          <Link to="/loans" className="block text-gray-700 hover:text-primary-600">Loan</Link>
          <Link to="/AllInsurance" className="block text-gray-700 hover:text-primary-600">Insurance</Link>

          <details className="group">
            <summary className="cursor-pointer text-gray-700 hover:text-primary-600">
              Calculators
            </summary>
            <div className="pl-4 mt-1 space-y-1">
              <Link to="/calculators/sip" className="block hover:text-primary-500">SIP Calculator</Link>
              <Link to="/calculators/emi" className="block hover:text-primary-500">EMI Calculator</Link>
              <Link to="/calculators/home-loan-emi" className="block hover:text-primary-500">Home Loan EMI</Link>
              <Link to="/calculators/personal-loan" className="block hover:text-primary-500">Personal Loan</Link>
            </div>
          </details>

          <Link to="/about" className="block text-gray-700 hover:text-primary-600">About</Link>
          

          <div className="pt-2 border-t">
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 text-sm text-gray-600 border-b mb-2">
                  Welcome, {user?.name || user?.wittywealth || 'User'}
                </div>
                <Link 
                  to={user?.redirect === 'CLIENT' ? '/dashboard' : 
                      user?.redirect === 'ADMIN' ? '/admin/dashboard' : 
                      user?.redirect === 'DSA' ? '/agent' : '/dashboard'} 
                  className="block text-gray-700 hover:text-primary-600"
                >
                  Go to Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-red-500 hover:text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/distributor" className="block text-gray-700 hover:text-primary-600">Distributor</Link>
                <Link to="/client-login" className="block text-gray-700 hover:text-primary-600">Client Login</Link>
                <Link to="/dsa-login" className="block text-gray-700 hover:text-primary-600">DSA Login</Link>
                <Link to="/admin/login" className="block text-gray-700 hover:text-primary-600">Admin Login</Link>
                <Link to="/employee/login" className="block text-gray-700 hover:text-primary-600">Employee Login</Link>
                <Link to="/call-centre-login" className="block text-blue-600 hover:text-primary-600">Call Centre Login</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Nav;
