import React, { useState, useEffect } from 'react'
import { ArrowLeft, X, Phone, User, CreditCard, MapPin, DollarSign, Shield, CheckCircle } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'

const CreditCardApplicationForm = () => {
  const [searchParams] = useSearchParams()
  const [showOTPModal, setShowOTPModal] = useState(false)
  const [otp, setOtp] = useState(['', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [captcha, setCaptcha] = useState('')
  const [captchaInput, setCaptchaInput] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    panNumber: '',
    pincode: '',
    annualIncome: ''
  })

  const [errors, setErrors] = useState({})

  // Generate a simple CAPTCHA
  useEffect(() => {
    const generateCaptcha = () => {
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      let result = ''
      for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      setCaptcha(result)
    }
    generateCaptcha()
  }, [])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Name validation (as per Aadhaar)
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters'
    }

    // Mobile number validation (linked to Aadhaar)
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required'
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number'
    }

    // PAN number validation
    if (!formData.panNumber.trim()) {
      newErrors.panNumber = 'PAN number is required'
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber.toUpperCase())) {
      newErrors.panNumber = 'Please enter a valid PAN number'
    }

    // Pincode validation
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required'
    } else if (!/^[1-9][0-9]{5}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode'
    }

    // Annual income validation
    if (!formData.annualIncome.trim()) {
      newErrors.annualIncome = 'Annual income is required'
    } else {
      const income = parseInt(formData.annualIncome.replace(/,/g, ''))
      if (isNaN(income) || income < 200000) {
        newErrors.annualIncome = 'Insufficient Annual Income. Please ensure that you\'ve entered your ANNUAL income. Currently, we don\'t accept applications if annual income is less than 2 Lakhs.'
      }
    }

    // CAPTCHA validation
    if (!captchaInput.trim()) {
      newErrors.captcha = 'Please enter the CAPTCHA'
    } else if (captchaInput.toUpperCase() !== captcha) {
      newErrors.captcha = 'CAPTCHA does not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsLoading(true)
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        setShowOTPModal(true)
      }, 2000)
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
      // Simulate OTP verification and redirect to credit card website
      alert('OTP verified successfully! Redirecting to credit card website...')
      setShowOTPModal(false)
      setOtp(['', '', '', ''])
      
      // Simulate redirect to credit card website
      setTimeout(() => {
        window.open('https://example-credit-card-website.com', '_blank')
      }, 1000)
    }
  }

  const resendOTP = () => {
    setOtp(['', '', '', ''])
    alert('OTP resent successfully!')
  }

  const regenerateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptcha(result)
    setCaptchaInput('')
  }

  const formatIncome = (value) => {
    // Remove all non-digits
    const numbers = value.replace(/\D/g, '')
    // Add commas for thousands
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <div className="credit-card-application-page">
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
            <Link to="/credit-cards" style={{ color: 'white', textDecoration: 'none' }}>
              <ArrowLeft size={20} />
            </Link>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>
              Credit Card Application
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
              Apply for Credit Card
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#666',
              margin: 0
            }}>
              Fill in your details to apply for the credit card
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Name (As per Aadhaar) */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333'
              }}>
                <User size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Name (As per Aadhaar)
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your name as per Aadhaar"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.name ? '#dc3545' : '#ddd'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'Inter'
                }}
              />
              {errors.name && (
                <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Mobile Number (Linked to Aadhaar) */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333'
              }}>
                <Phone size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Mobile Number (Linked to Aadhaar)
              </label>
              <input
                type="tel"
                value={formData.mobileNumber}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                placeholder="Enter 10-digit mobile number"
                required
                maxLength="10"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.mobileNumber ? '#dc3545' : '#ddd'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'Inter'
                }}
              />
              {errors.mobileNumber && (
                <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                  {errors.mobileNumber}
                </p>
              )}
            </div>

            {/* PAN Number */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333'
              }}>
                <CreditCard size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                PAN Number
              </label>
              <input
                type="text"
                value={formData.panNumber}
                onChange={(e) => handleInputChange('panNumber', e.target.value.toUpperCase())}
                placeholder="Enter PAN number"
                required
                maxLength="10"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.panNumber ? '#dc3545' : '#ddd'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'Inter',
                  textTransform: 'uppercase'
                }}
              />
              {errors.panNumber && (
                <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                  {errors.panNumber}
                </p>
              )}
            </div>

            {/* Pincode */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333'
              }}>
                <MapPin size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Pincode
              </label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                placeholder="Enter 6-digit pincode"
                required
                maxLength="6"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.pincode ? '#dc3545' : '#ddd'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'Inter'
                }}
              />
              {errors.pincode && (
                <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                  {errors.pincode}
                </p>
              )}
            </div>

            {/* Net Annual Income */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333'
              }}>
                <DollarSign size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Net Annual Income (₹)
              </label>
              <input
                type="text"
                value={formData.annualIncome}
                onChange={(e) => handleInputChange('annualIncome', formatIncome(e.target.value))}
                placeholder="Enter your annual income"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.annualIncome ? '#dc3545' : '#ddd'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'Inter'
                }}
              />
              {errors.annualIncome && (
                <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                  {errors.annualIncome}
                </p>
              )}
            </div>

            {/* CAPTCHA */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333'
              }}>
                <Shield size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Enter CAPTCHA
              </label>
              <div style={{
                display: 'flex',
                gap: '15px',
                alignItems: 'center'
              }}>
                <div style={{
                  padding: '12px 20px',
                  backgroundColor: '#f8f9fa',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                  letterSpacing: '3px',
                  color: '#333',
                  minWidth: '120px',
                  textAlign: 'center'
                }}>
                  {captcha}
                </div>
                <button
                  type="button"
                  onClick={regenerateCaptcha}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  ↻ Refresh
                </button>
              </div>
              <input
                type="text"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                placeholder="Enter CAPTCHA"
                required
                maxLength="6"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.captcha ? '#dc3545' : '#ddd'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'Inter',
                  marginTop: '10px'
                }}
              />
              {errors.captcha && (
                <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
                  {errors.captcha}
                </p>
              )}
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
              {isLoading ? 'Processing...' : 'SUBMIT'}
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

export default CreditCardApplicationForm 