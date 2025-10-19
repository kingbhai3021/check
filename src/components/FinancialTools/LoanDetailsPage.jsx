import React, { useState, useEffect } from 'react'
import { ArrowLeft, Star, CheckCircle, Phone, Mail, Globe, Calculator, Shield, Clock, Users, Building, CreditCard, TrendingUp, ArrowRight } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'

const LoanDetailsPage = () => {
  const [searchParams] = useSearchParams()
  const [selectedBank, setSelectedBank] = useState(null)
  const [selectedLoanType, setSelectedLoanType] = useState('')

  // Sample bank data - this will be replaced with API data later
  const banks = [
    {
      id: 'hdfc',
      name: 'HDFC Bank',
      logo: '🏦',
      rating: 4.8,
      reviews: 1250,
      interestRate: '10.49%',
      processingFee: '1-2%',
      loanAmount: '₹50,000 - ₹25,00,000',
      tenure: '12 - 60 months',
      processingTime: '24-48 hours',
      features: ['Quick approval', 'Minimal documentation', 'Competitive rates', 'Flexible repayment'],
      eligibility: 'Salaried/Self-employed',
      documents: 'Minimal documents',
      emi: '₹2,500',
      isRecommended: true
    },
    {
      id: 'icici',
      name: 'ICICI Bank',
      logo: '🏦',
      rating: 4.6,
      reviews: 980,
      interestRate: '10.75%',
      processingFee: '1.5-2.5%',
      loanAmount: '₹50,000 - ₹20,00,000',
      tenure: '12 - 60 months',
      processingTime: '2-5 days',
      features: ['Digital process', 'Instant approval', 'Low documentation', 'Quick disbursal'],
      eligibility: 'Salaried/Self-employed',
      documents: 'Basic documents',
      emi: '₹2,600',
      isRecommended: false
    },
    {
      id: 'sbi',
      name: 'State Bank of India',
      logo: '🏦',
      rating: 4.4,
      reviews: 2100,
      interestRate: '11.25%',
      processingFee: '1-1.5%',
      loanAmount: '₹25,000 - ₹15,00,000',
      tenure: '12 - 60 months',
      processingTime: '3-7 days',
      features: ['Government bank', 'Reliable service', 'Wide network', 'Trusted brand'],
      eligibility: 'Salaried/Self-employed',
      documents: 'Standard documents',
      emi: '₹2,800',
      isRecommended: false
    },
    {
      id: 'axis',
      name: 'Axis Bank',
      logo: '🏦',
      rating: 4.7,
      reviews: 850,
      interestRate: '10.99%',
      processingFee: '1.25-2%',
      loanAmount: '₹50,000 - ₹30,00,000',
      tenure: '12 - 60 months',
      processingTime: '24-72 hours',
      features: ['Quick processing', 'Competitive rates', 'Flexible terms', 'Good customer service'],
      eligibility: 'Salaried/Self-employed',
      documents: 'Minimal documents',
      emi: '₹2,550',
      isRecommended: true
    },
    {
      id: 'kotak',
      name: 'Kotak Mahindra Bank',
      logo: '🏦',
      rating: 4.5,
      reviews: 720,
      interestRate: '11.50%',
      processingFee: '1.5-2%',
      loanAmount: '₹50,000 - ₹18,00,000',
      tenure: '12 - 60 months',
      processingTime: '2-4 days',
      features: ['Digital banking', 'Quick approval', 'Good rates', 'Easy application'],
      eligibility: 'Salaried/Self-employed',
      documents: 'Basic documents',
      emi: '₹2,700',
      isRecommended: false
    }
  ]

  // Loan type mapping
  const loanTypeNames = {
    'personal': 'Personal Loan',
    'home': 'Home Loan',
    'business': 'Business Loan',
    'property': 'Loan Against Property',
    'car': 'Car Loan',
    'education': 'Education Loan'
  }

  useEffect(() => {
    const typeParam = searchParams.get('type')
    if (typeParam) {
      setSelectedLoanType(typeParam)
    }
    
    // Set first bank as default selected
    if (banks.length > 0 && !selectedBank) {
      setSelectedBank(banks[0])
    }
  }, [searchParams, selectedBank])

  const handleBankSelect = (bank) => {
    setSelectedBank(bank)
  }

  return (
    <div className="loan-details-page">
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
              {loanTypeNames[selectedLoanType] || 'Loan Details'}
            </h1>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '350px 1fr',
          gap: '30px',
          minHeight: '600px'
        }}>
          {/* Left Sidebar - Banks */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '25px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            height: 'fit-content'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '20px',
              color: '#333'
            }}>
              Available Banks
            </h3>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              {banks.map((bank) => (
                <div
                  key={bank.id}
                  style={{
                    padding: '20px',
                    border: `2px solid ${selectedBank?.id === bank.id ? 'var(--primary-color)' : '#e0e0e0'}`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    backgroundColor: selectedBank?.id === bank.id ? '#f0f8ff' : 'white',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  onClick={() => handleBankSelect(bank)}
                >
                  {bank.isRecommended && (
                    <div style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '10px',
                      backgroundColor: 'var(--primary-color)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontWeight: '600'
                    }}>
                      Recommended
                    </div>
                  )}
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '10px'
                  }}>
                    <span style={{ fontSize: '24px' }}>{bank.logo}</span>
                    <div>
                      <h4 style={{
                        margin: 0,
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#333'
                      }}>
                        {bank.name}
                      </h4>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        marginTop: '4px'
                      }}>
                        <Star size={14} color="var(--primary-color)" fill="var(--primary-color)" />
                        <span style={{ fontSize: '12px', color: '#666' }}>
                          {bank.rating} ({bank.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px'
                  }}>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: 'var(--primary-color)'
                    }}>
                      {bank.interestRate}
                    </span>
                    <span style={{ fontSize: '12px', color: '#666' }}>
                      Interest Rate
                    </span>
                  </div>
                  
                  <div style={{
                    fontSize: '12px',
                    color: '#666'
                  }}>
                    Processing: {bank.processingTime}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Loan Details */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '30px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            {selectedBank ? (
              <>
                {/* Bank Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '30px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid #e0e0e0'
                }}>
                  <span style={{ fontSize: '40px' }}>{selectedBank.logo}</span>
                  <div>
                    <h2 style={{
                      margin: 0,
                      fontSize: '24px',
                      fontWeight: '600',
                      color: '#333'
                    }}>
                      {selectedBank.name}
                    </h2>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginTop: '5px'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                        <Star size={16} color="var(--primary-color)" fill="var(--primary-color)" />
                        <span style={{ fontSize: '14px', fontWeight: '600' }}>
                          {selectedBank.rating}
                        </span>
                      </div>
                      <span style={{ fontSize: '14px', color: '#666' }}>
                        ({selectedBank.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Loan Details Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '25px',
                  marginBottom: '30px'
                }}>
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <h4 style={{
                      margin: '0 0 10px 0',
                      fontSize: '14px',
                      color: '#666',
                      fontWeight: '500'
                    }}>
                      Interest Rate
                    </h4>
                    <p style={{
                      margin: 0,
                      fontSize: '24px',
                      fontWeight: '700',
                      color: 'var(--primary-color)'
                    }}>
                      {selectedBank.interestRate}
                    </p>
                  </div>

                  <div style={{
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <h4 style={{
                      margin: '0 0 10px 0',
                      fontSize: '14px',
                      color: '#666',
                      fontWeight: '500'
                    }}>
                      Loan Amount
                    </h4>
                    <p style={{
                      margin: 0,
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#333'
                    }}>
                      {selectedBank.loanAmount}
                    </p>
                  </div>

                  <div style={{
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <h4 style={{
                      margin: '0 0 10px 0',
                      fontSize: '14px',
                      color: '#666',
                      fontWeight: '500'
                    }}>
                      Tenure
                    </h4>
                    <p style={{
                      margin: 0,
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#333'
                    }}>
                      {selectedBank.tenure}
                    </p>
                  </div>

                  <div style={{
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <h4 style={{
                      margin: '0 0 10px 0',
                      fontSize: '14px',
                      color: '#666',
                      fontWeight: '500'
                    }}>
                      Processing Time
                    </h4>
                    <p style={{
                      margin: 0,
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#333'
                    }}>
                      {selectedBank.processingTime}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '15px',
                    color: '#333'
                  }}>
                    Key Features
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px'
                  }}>
                    {selectedBank.features.map((feature, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        color: '#666'
                      }}>
                        <CheckCircle size={14} color="var(--primary-color)" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Eligibility & Documents */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                  marginBottom: '30px'
                }}>
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '12px'
                  }}>
                    <h4 style={{
                      margin: '0 0 10px 0',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#333'
                    }}>
                      Eligibility
                    </h4>
                    <p style={{
                      margin: 0,
                      fontSize: '14px',
                      color: '#666'
                    }}>
                      {selectedBank.eligibility}
                    </p>
                  </div>
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '12px'
                  }}>
                    <h4 style={{
                      margin: '0 0 10px 0',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#333'
                    }}>
                      Required Documents
                    </h4>
                    <p style={{
                      margin: 0,
                      fontSize: '14px',
                      color: '#666'
                    }}>
                      {selectedBank.documents}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '15px',
                  marginTop: '30px'
                }}>
                  <button 
                    onClick={() => window.location.href = `/loans/eligibility?type=${selectedLoanType}&bank=${selectedBank.id}`}
                    style={{
                      flex: 1,
                      padding: '15px',
                      backgroundColor: 'var(--primary-color)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontWeight: '600',
                      fontSize: '16px',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--primary-color)'}
                  >
                    Check Eligibility
                  </button>
                  <Link to={`/calculators/emi?loan=${selectedLoanType}&bank=${selectedBank.id}`} style={{
                    flex: 1,
                    padding: '15px',
                    border: '2px solid var(--primary-color)',
                    color: 'var(--primary-color)',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: '16px',
                    backgroundColor: 'transparent',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'var(--primary-color)'
                    e.target.style.color = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.color = 'var(--primary-color)'
                  }}
                  >
                    Calculate EMI
                  </Link>
                </div>
              </>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#666'
              }}>
                <Building size={60} color="#ccc" />
                <h3 style={{
                  margin: '20px 0 10px 0',
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  Select a Bank
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '16px'
                }}>
                  Choose a bank from the left sidebar to view detailed loan information
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoanDetailsPage 