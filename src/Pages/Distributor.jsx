import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Clock, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin,
  Award,
  Target,
  Zap,
  Building,
  Handshake,
  FileText,
  Calculator,
  BarChart3,
  Globe,
  Heart
} from 'lucide-react';
import CountUpNumber from '../components/CountUpNumber';

function Distributor() {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    city: '',
    experience: '',
    objective: '',
    captcha: generateCaptcha(),
    captchaInput: ''
  });

  // Generate a random captcha
  function generateCaptcha(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < length; i++) {
      captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    return captcha;
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Captcha validation
    if (formData.captchaInput !== formData.captcha) {
      alert("Captcha is incorrect. Please try again.");
      setFormData(prev => ({
        ...prev,
        captcha: generateCaptcha(),
        captchaInput: ''
      }));
      return;
    }

    try {
      // Show loading state
      const submitButton = e.target.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Submitting...';
      submitButton.disabled = true;

      // Submit to backend API
      const response = await fetch('http://localhost:5050/api/leads/dsa-partner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          mobileNumber: formData.mobileNumber,
          email: formData.email,
          city: formData.city,
          experience: formData.experience,
          objective: formData.objective
        })
      });

      const result = await response.json();

      if (result.success) {
        alert("Registration submitted successfully! We'll contact you within 24 hours.");
        
        // Reset form
        setFormData({
          fullName: '',
          mobileNumber: '',
          email: '',
          city: '',
          experience: '',
          objective: '',
          captcha: generateCaptcha(),
          captchaInput: ''
        });
      } else {
        alert(`Registration failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Registration submission error:', error);
      alert('Registration failed. Please try again later.');
    } finally {
      // Reset button state
      const submitButton = e.target.querySelector('button[type="submit"]');
      submitButton.textContent = 'Submit Application';
      submitButton.disabled = false;
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Refresh captcha
  const refreshCaptcha = () => {
    setFormData(prev => ({
      ...prev,
      captcha: generateCaptcha(),
      captchaInput: ''
    }));
  };

  const stats = [
    { icon: <Users size={24} />, value: 5000, suffix: '+', label: 'Active DSA Partners' },
    { icon: <DollarSign size={24} />, value: 500, prefix: '₹', suffix: 'Cr+', label: 'Loans Disbursed' },
    { icon: <Shield size={24} />, value: 99, suffix: '%', label: 'Partner Satisfaction' },
    { icon: <Clock size={24} />, value: 24, suffix: 'hrs', label: 'Quick Onboarding' }
  ];

  const advantages = [
    {
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      title: "An Extra Income Source",
      description: "If you are working in the finance industry and already have an existing pool of clients in tax services and accountancy, you can maximize your income by working as a DSA channel partner. You will earn a commission from referring clients and ensuring that their loan application process is streamlined smoothly."
    },
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Minimum Investment",
      description: "You do not have to make hefty investments or get into shady wagers to strike a deal with the client. Your role as a DSA agent is just to help your clients find their best possible loan option and ensure that it is sanctioned smoothly."
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: "No Professional Qualifications Required",
      description: "There is no meritocratic gatekeeping to enter the DSA industry. You do not need any professional qualifications to begin working as a DSA channel partner."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: "Covers Training Costs",
      description: "Your loan distributors, like Witty Wealth, have several on-job training modules to help you gain your clientele's trust and learn of the most recent loan schemes and products."
    },
    {
      icon: <Clock className="w-8 h-8 text-indigo-600" />,
      title: "Flexible Working Hours",
      description: "As an agent, your job is to mediate between the clients and the loan distributors. You do not have to clock in at a specific hour. You just have to ensure that the loan sanction process is completed on time."
    }
  ];

  const whyChooseUs = [
    {
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      title: "Sort Through the Legal Jargon",
      description: "A DSA channel partner simplifies the legal technicalities to ensure that you understand what the loan product entails."
    },
    {
      icon: <Zap className="w-6 h-6 text-green-600" />,
      title: "Provides Quick Solutions",
      description: "If you feel stuck during the loan application and sanction process, your agent is just a call away. To ensure a hassle-free experience, most customers prefer working with an agent to sanction loans."
    },
    {
      icon: <Target className="w-6 h-6 text-purple-600" />,
      title: "Helps to Choose the Best Possible Option",
      description: "Your agent has your best interests at heart, hence they help to sort through the clutter of various loan products available in the market to choose the best one for you."
    }
  ];

  const features = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Enhance your clientele with our DSA Partner Program",
      description: "If you are looking to increase your client base by providing loan related solutions to refer, this is the right place for you."
    },
    {
      icon: <Globe className="w-8 h-8 text-green-600" />,
      title: "Connect with PAN India Lenders",
      description: "Our Partners have a direct access to get in touch with most reputed PAN India lenders, including major Nationalized & Private banks."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      title: "Get on-work training from Industry experts",
      description: "At Witty Wealth, our Partners can make use of the tips shared by the experienced experts from the lending Industry."
    },
    {
      icon: <DollarSign className="w-8 h-8 text-orange-600" />,
      title: "No investment required, earn maximum commissions",
      description: "Right from the start of the Partner registration program and getting your DSA channel Partner code and until the training, we do not charge a single penny."
    },
    {
      icon: <Award className="w-8 h-8 text-indigo-600" />,
      title: "Support and training from India's largest loan distributor",
      description: "We believe in 'Growing by Learning', our experts have prepared various On-Job training modules to provide inputs throughout the year for our partners to have an edge over others."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8">
            <Handshake className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Become a DSA Partner with
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Witty Wealth
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8">
            Join India's fastest growing loan distribution network. Earn commissions, get training, 
            and help customers achieve their financial goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('registration-form').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold text-lg inline-flex items-center"
            >
              Register Now
              <ArrowRight size={20} className="ml-2" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200 font-semibold text-lg">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-blue-600">{stat.icon}</div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  <CountUpNumber 
                    end={stat.value} 
                    prefix={stat.prefix || ''} 
                    suffix={stat.suffix || ''}
                    duration={2.5}
                    delay={index * 0.2}
                  />
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What is a DSA Partner?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              A DSA Partner is a professional financial advisor providing various services to their clients. 
              Once registered with a DSA, they can also advise and provide loan services to their clientele.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">For Partners</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                For a customer who is already in touch with a financial advisor registered as a DSA agent, 
                the partner becomes the first point of contact for the borrowers to understand a loan product 
                as per their needs and then handles the end-to-end process of applying for and getting their 
                loan approved from the bank.
              </p>
              <p className="text-gray-600 leading-relaxed">
                A DSA partner generally works in their own capacity and reaches out to various customers 
                who are in need or are looking for a viable advice.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">For Customers</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                The main job of a loan DSA Partner is to create a link between a registered DSA and their 
                existing client base that are looking for a loan. They are also the agents who are there 
                to help these individuals arrange funds from a wide range of lenders and act as a bridge 
                between both the parties throughout the process.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Also, they bear an additional responsibility of handling the documents, verification and 
                submission. For a borrower, the DSA partner serves as a single resource for all administrative 
                formalities regarding their loan application.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advantages of Being a DSA Partner
            </h2>
            <p className="text-xl text-gray-600">
              Discover the benefits of joining our DSA partner program
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  {advantage.icon}
                  <h3 className="text-xl font-bold text-gray-900 ml-4">
                    {advantage.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Consumers Choose DSA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Consumers Choose to Apply for Loans through a DSA Agent
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              You may be wondering why would consumers choose an agent to help them through Loan DSA partner 
              registration processes. The answer is fairly simple.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseUs.map((reason, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Features & Benefits
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to succeed as a DSA partner
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  {feature.icon}
                  <h3 className="text-lg font-bold text-gray-900 ml-4">
                    {index + 1}. {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="registration-form" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Join Our DSA Partner Program?
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your mobile number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your city"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Experience in Finance
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select Experience</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Objective *
                  </label>
                  <select
                    value={formData.objective}
                    onChange={(e) => handleInputChange('objective', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">Select Objective</option>
                    <option value="Investment">Investment</option>
                    <option value="Business Opportunity">Business Opportunity</option>
                    <option value="Career Growth">Career Growth</option>
                    <option value="Additional Income">Additional Income</option>
                  </select>
                </div>
              </div>

              {/* Captcha Section */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-200 text-center px-6 py-3 rounded-xl font-mono tracking-wider text-lg">
                    {formData.captcha}
                  </div>
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Refresh
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Enter Captcha"
                  value={formData.captchaInput}
                  onChange={(e) => handleInputChange('captchaInput', e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg inline-flex items-center"
                >
                  Submit Application
                  <ArrowRight size={20} className="ml-2" />
                </button>
              </div>
            </form>

            <p className="text-sm text-gray-500 text-center mt-6">
              Disclaimer: By filling this inquiry form, you are permitting us to
              communicate with you via Call, Email, SMS, RCS or Whatsapp.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to Start Your DSA Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful DSA partners who are already earning with Witty Wealth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+919111777046"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold text-lg inline-flex items-center"
            >
              <Phone size={20} className="mr-2" />
              Call Us: +91 91117 77046
            </a>
            <a 
              href="mailto:support@wittywealth.in"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200 font-semibold text-lg inline-flex items-center"
            >
              <Mail size={20} className="mr-2" />
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Distributor;
