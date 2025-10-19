import React, { useState, useEffect } from 'react'
import { ArrowLeft, X, Phone, Calendar, Building, User, DollarSign, MapPin, Clock, CheckCircle } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'

const LoanEligibilityForm = () => {
  const [searchParams] = useSearchParams()
  const [showOTPModal, setShowOTPModal] = useState(false)
  const [otp, setOtp] = useState(['', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    loanAmount: '',
    monthlySalary: '',
    employmentType: '',
    companyName: '',
    city: '',
    tenure: '',
    fullName: '',
    mobileNo: '',
    currentEMIs: '',
    dob: '',
    email: '',
    address: '',
    state: '',
    pincode: '',
    workExperience: 1
  })

  const loanTypeNames = {
    'personal': 'Personal Loan',
    'home': 'Home Loan',
    'business': 'Business Loan',
    'property': 'Loan Against Property',
    'car': 'Car Loan',
    'education': 'Education Loan'
  }

  const employmentTypes = [
    'Salaried',
    'Self-employed',
    'Business Owner',
    'Freelancer',
    'Government Employee',
    'Other'
  ]

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
    'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur',
    'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad',
    'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik',
    'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar', 'Varanasi'
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEmploymentTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      employmentType: type,
      companyName: type === 'Self-employed' ? 'Self-employed' : ''
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Client-side validation
    if (!formData.fullName || !formData.email || !formData.mobileNo || !formData.dob || 
        !formData.address || !formData.state || !formData.pincode || !formData.employmentType || 
        !formData.loanAmount || !formData.monthlySalary || !formData.city || !formData.tenure) {
      alert('Please fill in all required fields')
      return
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address')
      return
    }

    // Validate phone format
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(formData.mobileNo)) {
      alert('Please enter a valid 10-digit mobile number')
      return
    }

    // Validate pincode format
    const pincodeRegex = /^[0-9]{6}$/
    if (!pincodeRegex.test(formData.pincode)) {
      alert('Please enter a valid 6-digit pincode')
      return
    }
    
    setIsLoading(true)
    
    try {
      // Prepare data for submission
      const loanType = searchParams.get('type') || 'personal'
      const loanTypeNames = {
        'personal': 'Personal Loan',
        'home': 'Home Loan',
        'business': 'Business Loan',
        'property': 'Loan Against Property',
        'car': 'Car Loan',
        'education': 'Education Loan'
      }

      const submissionData = {
        // Personal Information
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.mobileNo,
        dateOfBirth: formData.dob,
        gender: 'Other', // Default value
        maritalStatus: 'Single', // Default value
        
        // Address Information
        currentAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: 'India'
        },
        permanentAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: 'India'
        },
        
        // Employment Information
        employmentType: formData.employmentType,
        companyName: formData.companyName || 'Self-employed',
        designation: '',
        workExperience: parseInt(formData.workExperience) || 1,
        monthlyIncome: parseInt(formData.monthlySalary) || 0,
        
        // Loan Information
        loanType: loanTypeNames[loanType],
        loanAmount: parseInt(formData.loanAmount) || 0,
        loanTenure: parseInt(formData.tenure) || 1,
        purpose: `Apply for ${loanTypeNames[loanType]}`,
        
        // Financial Information
        existingLoans: formData.currentEMIs ? 'Yes' : 'No',
        existingLoanDetails: formData.currentEMIs ? `Current EMI: ₹${formData.currentEMIs}` : '',
        creditScore: null
      }

      // Submit to backend
      const response = await fetch('https://wittywealth.org/api/loan-eligibility/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      const result = await response.json()

      if (response.ok) {
        setIsLoading(false)
        setShowOTPModal(true)
        // Store the eligibility result for later use
        localStorage.setItem('loanEligibilityResult', JSON.stringify(result.eligibility))
      } else {
        throw new Error(result.message || 'Failed to submit form')
      }
    } catch (error) {
      console.error('Error submitting loan eligibility:', error)
      alert('Failed to submit form. Please try again.')
      setIsLoading(false)
    }
  }

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        if (nextInput) nextInput.focus()
      }
    }
  }

  const handleOtpSubmit = () => {
    const otpString = otp.join('')
    if (otpString.length === 4) {
      // Get eligibility result from localStorage
      const eligibilityResult = JSON.parse(localStorage.getItem('loanEligibilityResult') || '{}')
      
      // Show eligibility results
      const message = `OTP verified successfully!\n\nYour Loan Eligibility Results:\n• Eligibility Score: ${eligibilityResult.eligibilityScore || 0}%\n• Max Eligible Amount: ₹${eligibilityResult.maxEligibleAmount?.toLocaleString() || 0}\n• Interest Rate: ${eligibilityResult.interestRate || 0}%\n• Status: ${eligibilityResult.status || 'Pending'}\n\nWe will contact you within 24 hours for further processing.`
      
      alert(message)
      setShowOTPModal(false)
      setOtp(['', '', '', ''])
      
      // Clear stored result
      localStorage.removeItem('loanEligibilityResult')
    }
  }

  const resendOTP = () => {
    setOtp(['', '', '', ''])
    alert('OTP resent successfully!')
  }

  return (
    <div className="eligibility-form-page">
      {/* Header */}
      <div className="header-section" style={{
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        padding: '20px 0'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <Link to="/loans" style={{ color: 'white', textDecoration: 'none' }}>
              <ArrowLeft size={20} />
            </Link>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>
              Check Loan Eligibility
            </h1>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 20px' }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '600',
              marginBottom: '10px',
              color: '#333'
            }}>
              {loanTypeNames[searchParams.get('type')] || 'Loan'} Eligibility
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#666',
              margin: 0
            }}>
              Fill in your details to check loan eligibility
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '20px'
            }}>
              {/* Required Loan Amount */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  <DollarSign size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Required Loan Amount
                </label>
                <input
                  type="number"
                  value={formData.loanAmount}
                  onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                  placeholder="Enter loan amount"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'Inter'
                  }}
                />
              </div>

              {/* Monthly Net Salary */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  <DollarSign size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Monthly Net Salary
                </label>
                <input
                  type="number"
                  value={formData.monthlySalary}
                  onChange={(e) => handleInputChange('monthlySalary', e.target.value)}
                  placeholder="Enter monthly salary"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'Inter'
                  }}
                />
              </div>
            </div>

            {/* Employment Type */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333'
              }}>
                <Building size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Employment Type
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '10px'
              }}>
                {employmentTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleEmploymentTypeChange(type)}
                    style={{
                      padding: '10px',
                      border: `2px solid ${formData.employmentType === type ? 'var(--primary-color)' : '#ddd'}`,
                      backgroundColor: formData.employmentType === type ? 'var(--primary-color)' : 'white',
                      color: formData.employmentType === type ? 'white' : '#333',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontFamily: 'Inter',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Company Name */}
            {formData.employmentType && formData.employmentType !== 'Self-employed' && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  <Building size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Enter company name"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'Inter'
                  }}
                />
              </div>
            )}

            {/* Work Experience */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333'
              }}>
                💼 Work Experience (Years)
              </label>
              <select
                value={formData.workExperience}
                onChange={(e) => handleInputChange('workExperience', e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'Inter'
                }}
              >
                <option value="">Select Experience</option>
                <option value="0">Less than 1 year</option>
                <option value="1">1 year</option>
                <option value="2">2 years</option>
                <option value="3">3 years</option>
                <option value="4">4 years</option>
                <option value="5">5 years</option>
                <option value="6">6 years</option>
                <option value="7">7 years</option>
                <option value="8">8 years</option>
                <option value="9">9 years</option>
                <option value="10">10+ years</option>
              </select>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '20px'
            }}>
              {/* Choose City */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  <MapPin size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Choose City
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'Inter'
                  }}
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Tenure of Repayment */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  <Clock size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Tenure of Repayment (Years)
                </label>
                <select
                  value={formData.tenure}
                  onChange={(e) => handleInputChange('tenure', e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'Inter'
                  }}
                >
                  <option value="">Select Tenure</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30].map((year) => (
                    <option key={year} value={year}>{year} Years</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '20px'
            }}>
              {/* Full Name */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  <User size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'Inter'
                  }}
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  <Phone size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={formData.mobileNo}
                  onChange={(e) => handleInputChange('mobileNo', e.target.value)}
                  placeholder="Enter mobile number"
                  required
                  pattern="[0-9]{10}"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'Inter'
                  }}
                />
              </div>
            </div>

            {/* Email Address */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333'
              }}>
                📧 Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'Inter'
                }}
              />
            </div>

            {/* Address Information */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333'
              }}>
                <MapPin size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter your complete address"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'Inter'
                }}
              />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '20px'
            }}>
              {/* State */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  State
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="Enter your state"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'Inter'
                  }}
                />
              </div>

              {/* Pincode */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  Pincode
                </label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  placeholder="Enter pincode"
                  required
                  pattern="[0-9]{6}"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'Inter'
                  }}
                />
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '20px'
            }}>
              {/* Current Monthly EMIs */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  <DollarSign size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Current Monthly EMIs
                </label>
                <input
                  type="number"
                  value={formData.currentEMIs}
                  onChange={(e) => handleInputChange('currentEMIs', e.target.value)}
                  placeholder="Enter current EMIs"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'Inter'
                  }}
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  <Calendar size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Date of Birth (DD/MM/YYYY)
                </label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleInputChange('dob', e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'Inter'
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
                fontFamily: 'Inter'
              }}
            >
              {isLoading ? 'Processing...' : 'Check Eligibility'}
            </button>
          </form>
        </div>
      </div>

      {/* OTP Modal */}
      {showOTPModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '40px',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowOTPModal(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              <X size={20} />
            </button>

            <div style={{
              marginBottom: '30px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto'
              }}>
                <Phone size={30} color="white" />
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '10px',
                color: '#333'
              }}>
                OTP Verification
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#666',
                margin: 0
              }}>
                We've sent a 4-digit OTP to your mobile number
              </p>
            </div>

            <div style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              marginBottom: '30px'
            }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  style={{
                    width: '50px',
                    height: '50px',
                    textAlign: 'center',
                    fontSize: '20px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    fontFamily: 'Inter'
                  }}
                />
              ))}
            </div>

            <div style={{
              display: 'flex',
              gap: '15px'
            }}>
              <button
                onClick={handleOtpSubmit}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: 'Inter'
                }}
              >
                Verify OTP
              </button>
              <button
                onClick={resendOTP}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: '2px solid var(--primary-color)',
                  color: 'var(--primary-color)',
                  backgroundColor: 'transparent',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: 'Inter'
                }}
              >
                Resend OTP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoanEligibilityForm 