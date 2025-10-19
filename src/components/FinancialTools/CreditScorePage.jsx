import React, { useState } from 'react'
import { ArrowLeft, Calendar, Phone, Mail, CreditCard, Shield, Eye, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'

const CreditScorePage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    mobile: '',
    email: '',
    panCard: '',
    agreeToTerms: false
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required'
    }
    
    if (!formData.dob) {
      newErrors.dob = 'Date of Birth is required'
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required'
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.panCard.trim()) {
      newErrors.panCard = 'PAN Card is required'
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panCard.toUpperCase())) {
      newErrors.panCard = 'Please enter a valid PAN Card number'
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      // Handle form submission here
      console.log('Form submitted:', formData)
      alert('Credit score check request submitted successfully!')
    }
  }

  return (
    <div className="credit-score-page">
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
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              <ArrowLeft size={20} />
            </Link>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>
              Check Your Credit Score
            </h1>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 20px' }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {/* Free Badge */}
          <div style={{
                            backgroundColor: 'var(--background-light)',
                color: 'var(--primary-color)',
            padding: '15px 20px',
            borderRadius: '8px',
            marginBottom: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: '600'
          }}>
            <Shield size={20} />
            Absolutely, FREE
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            marginBottom: '40px'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginBottom: '30px',
              color: '#333'
            }}>
              Cibil Score Check
            </h2>

            {/* Full Name */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: 'var(--text-primary)'
              }}>
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: `1px solid ${errors.fullName ? '#d32f2f' : '#ddd'}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none'
                }}
              />
              {errors.fullName && (
                <p style={{ color: '#d32f2f', fontSize: '14px', marginTop: '5px' }}>
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: 'var(--text-primary)'
              }}>
                DOB (DD/MM/YYYY) *
              </label>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    paddingLeft: '45px',
                    border: `1px solid ${errors.dob ? '#d32f2f' : '#ddd'}`,
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
                <Calendar size={20} style={{
                  position: 'absolute',
                  left: '15px',
                  color: 'var(--text-light)'
                }} />
              </div>
              {errors.dob && (
                <p style={{ color: '#d32f2f', fontSize: '14px', marginTop: '5px' }}>
                  {errors.dob}
                </p>
              )}
            </div>

            {/* Mobile Number */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: 'var(--text-primary)'
              }}>
                Mobile No. *
              </label>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{
                  position: 'absolute',
                  left: '15px',
                  color: 'var(--text-light)',
                  fontWeight: '500'
                }}>
                  +91
                </div>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter mobile number"
                  maxLength="10"
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    paddingLeft: '50px',
                    border: `1px solid ${errors.mobile ? '#d32f2f' : '#ddd'}`,
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
                <Phone size={20} style={{
                  position: 'absolute',
                  right: '15px',
                  color: '#666'
                }} />
              </div>
              {errors.mobile && (
                <p style={{ color: '#d32f2f', fontSize: '14px', marginTop: '5px' }}>
                  {errors.mobile}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333'
              }}>
                Email Address *
              </label>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    paddingLeft: '45px',
                    border: `1px solid ${errors.email ? '#d32f2f' : '#ddd'}`,
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
                <Mail size={20} style={{
                  position: 'absolute',
                  left: '15px',
                  color: '#666'
                }} />
              </div>
              {errors.email && (
                <p style={{ color: '#d32f2f', fontSize: '14px', marginTop: '5px' }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* PAN Card */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333'
              }}>
                PAN Card *
              </label>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <input
                  type="text"
                  name="panCard"
                  value={formData.panCard}
                  onChange={handleInputChange}
                  placeholder="Enter PAN card number"
                  maxLength="10"
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    paddingLeft: '45px',
                    border: `1px solid ${errors.panCard ? '#d32f2f' : '#ddd'}`,
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    textTransform: 'uppercase'
                  }}
                />
                <CreditCard size={20} style={{
                  position: 'absolute',
                  left: '15px',
                  color: '#666'
                }} />
              </div>
              {errors.panCard && (
                <p style={{ color: '#d32f2f', fontSize: '14px', marginTop: '5px' }}>
                  {errors.panCard}
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  style={{
                    marginTop: '3px',
                    transform: 'scale(1.2)'
                  }}
                />
                <span style={{ fontSize: '14px', lineHeight: '1.5', color: '#666' }}>
                  I agree to the Terms and Conditions of TUCIBIL and hereby provide explicit consent to share my Credit Information with Urban Money Private Limited.
                </span>
              </label>
              {errors.agreeToTerms && (
                <p style={{ color: '#d32f2f', fontSize: '14px', marginTop: '5px' }}>
                  {errors.agreeToTerms}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              <Eye size={20} />
              Check Credit Score
            </button>
          </form>

          {/* Features Section */}
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '30px',
            borderRadius: '12px',
            marginBottom: '30px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '20px',
              color: '#333',
              textAlign: 'center'
            }}>
              Learn. Plan. Protect. All in one place. Here's how.
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '15px',
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <Shield size={24} color="var(--primary-color)" />
                <div>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
                    Free and Secure CIBIL Score Check
                  </h4>
                  <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                    Get your credit score instantly without any charges
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '15px',
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <Eye size={24} color="var(--primary-color)" />
                <div>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
                    Credit Score Monitoring with Minimal Information
                  </h4>
                  <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                    Monitor your credit score with just basic details
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '15px',
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <TrendingUp size={24} color="var(--primary-color)" />
                <div>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
                    Get the Lenders Perspective
                  </h4>
                  <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                    Understand how lenders view your credit profile
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreditScorePage 