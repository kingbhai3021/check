import React, { useState, useEffect } from 'react'
import { Calculator, TrendingUp, DollarSign, Calendar, Percent, Home, User, Building, Info, AlertCircle, CheckCircle, Target, ArrowRight, RefreshCw, PieChart, BarChart3 } from 'lucide-react'
import CountUpNumber from '../CountUpNumber'
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const HomeLoanCalculator = () => {
  const [formData, setFormData] = useState({
    propertyValue: 5000000,
    loanAmount: 4000000,
    interestRate: 8.5,
    loanTenure: 20,
    monthlyIncome: 100000,
    existingEMI: 0,
    propertyType: 'residential',
    employmentType: 'salaried'
  })

  const [results, setResults] = useState({
    emi: 0,
    totalAmount: 0,
    totalInterest: 0,
    eligibility: {
      maxLoanAmount: 0,
      eligible: false,
      reason: ''
    },
    breakdown: [],
    pieChartData: [],
    yearlyBreakdown: []
  })

  const propertyTypes = [
    { value: 'residential', label: 'Residential Property' },
    { value: 'commercial', label: 'Commercial Property' },
    { value: 'plot', label: 'Plot/Land' },
    { value: 'underConstruction', label: 'Under Construction' }
  ]

  const employmentTypes = [
    { value: 'salaried', label: 'Salaried' },
    { value: 'selfEmployed', label: 'Self Employed' },
    { value: 'business', label: 'Business Owner' }
  ]

  const calculateHomeLoan = () => {
    const { loanAmount, interestRate, loanTenure, monthlyIncome, existingEMI, propertyValue } = formData
    
    const monthlyRate = interestRate / 100 / 12
    const totalMonths = loanTenure * 12
    
    // EMI calculation
    const emi = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
    
    const totalAmount = emi * totalMonths
    const totalInterest = totalAmount - loanAmount
    
    // Generate pie chart data
    const pieChartData = [
      { name: 'Principal', value: loanAmount, color: '#3b82f6' },
      { name: 'Interest', value: totalInterest, color: '#1d4ed8' }
    ]
    
    // Eligibility calculation
    const maxEMI = monthlyIncome * 0.6 - existingEMI // 60% of income
    const maxLoanAmount = maxEMI * 
      (Math.pow(1 + monthlyRate, totalMonths) - 1) / 
      (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))
    
    const eligible = loanAmount <= maxLoanAmount && loanAmount <= propertyValue * 0.9
    let reason = ''
    
    if (loanAmount > maxLoanAmount) {
      reason = 'Loan amount exceeds your income eligibility'
    } else if (loanAmount > propertyValue * 0.9) {
      reason = 'Loan amount exceeds 90% of property value'
    } else {
      reason = 'You are eligible for this loan'
    }
    
    // Generate yearly breakdown
    const breakdown = []
    const yearlyBreakdown = []
    let remainingPrincipal = loanAmount
    
    for (let year = 1; year <= loanTenure; year++) {
      let yearlyPrincipal = 0
      let yearlyInterest = 0
      
      for (let month = 1; month <= 12; month++) {
        const monthlyInterest = remainingPrincipal * monthlyRate
        const monthlyPrincipal = emi - monthlyInterest
        
        yearlyPrincipal += monthlyPrincipal
        yearlyInterest += monthlyInterest
        remainingPrincipal -= monthlyPrincipal
      }
      
      breakdown.push({
        year,
        principal: yearlyPrincipal,
        interest: yearlyInterest,
        remaining: Math.max(0, remainingPrincipal)
      })
      
      yearlyBreakdown.push({
        year: `Year ${year}`,
        principal: yearlyPrincipal,
        interest: yearlyInterest,
        total: yearlyPrincipal + yearlyInterest
      })
    }
    
    setResults({
      emi,
      totalAmount,
      totalInterest,
      eligibility: {
        maxLoanAmount,
        eligible,
        reason
      },
      breakdown,
      pieChartData,
      yearlyBreakdown
    })
  }

  useEffect(() => {
    calculateHomeLoan()
  }, [formData])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }))
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <Home className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Home Loan Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate your home loan EMI, check eligibility, and get detailed breakdown with our advanced calculator
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Calculate Home Loan
              </h2>
            </div>
            
            <div className="space-y-6">
              {/* Property Value */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Property Value (₹)
                </label>
                <input
                  type="number"
                  value={formData.propertyValue}
                  onChange={(e) => handleInputChange('propertyValue', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  min="100000"
                  step="100000"
                />
              </div>

              {/* Loan Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Loan Amount (₹)
                </label>
                <input
                  type="number"
                  value={formData.loanAmount}
                  onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  min="100000"
                  max={formData.propertyValue * 0.9}
                  step="100000"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Max: {formatCurrency(formData.propertyValue * 0.9)} (90% of property value)
                </p>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Interest Rate (% p.a.)
                </label>
                <input
                  type="number"
                  value={formData.interestRate}
                  onChange={(e) => handleInputChange('interestRate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  min="6"
                  max="15"
                  step="0.1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Current rates: 7.5% - 9.5% for home loans
                </p>
              </div>

              {/* Loan Tenure */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Loan Tenure (Years)
                </label>
                <input
                  type="number"
                  value={formData.loanTenure}
                  onChange={(e) => handleInputChange('loanTenure', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  min="5"
                  max="30"
                  step="1"
                />
              </div>

              {/* Monthly Income */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Monthly Income (₹)
                </label>
                <input
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  min="10000"
                  step="1000"
                />
              </div>

              {/* Existing EMI */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Existing EMI (₹)
                </label>
                <input
                  type="number"
                  value={formData.existingEMI}
                  onChange={(e) => handleInputChange('existingEMI', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  min="0"
                  step="1000"
                />
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Property Type
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => handleInputChange('propertyType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {propertyTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Employment Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Employment Type
                </label>
                <select
                  value={formData.employmentType}
                  onChange={(e) => handleInputChange('employmentType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  {employmentTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pro Tip */}
            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">Pro Tip</h4>
                  <p className="text-sm text-yellow-700">
                    Keep your EMI to income ratio below 40% for better loan approval chances and financial stability.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Loan Summary
              </h2>
            </div>

            {/* Revolutionary Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="group bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-2xl border border-primary-200/50 hover:shadow-lg transition-all duration-300 min-h-[140px] flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-primary-600">Monthly EMI</div>
                </div>
                <div className="text-lg font-bold text-primary-700 break-words overflow-hidden">
                  ₹<CountUpNumber end={results.emi} duration={1.5} />
                </div>
              </div>

              <div className="group bg-gradient-to-br from-secondary-50 to-secondary-100 p-6 rounded-2xl border border-secondary-200/50 hover:shadow-lg transition-all duration-300 min-h-[140px] flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                    <Percent className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-secondary-600">Total Interest</div>
                </div>
                <div className="text-lg font-bold text-secondary-700 break-words overflow-hidden">
                  ₹<CountUpNumber end={results.totalInterest} duration={1.5} />
                </div>
              </div>

              <div className="group bg-gradient-to-br from-accent-50 to-accent-100 p-6 rounded-2xl border border-accent-200/50 hover:shadow-lg transition-all duration-300 sm:col-span-2 lg:col-span-1 min-h-[140px] flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-accent-600">Total Payable</div>
                </div>
                <div className="text-lg font-bold text-accent-700 break-words overflow-hidden">
                  ₹<CountUpNumber end={results.totalAmount} duration={1.5} />
                </div>
              </div>
            </div>
            
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Pie Chart */}
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-200/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                    <PieChart className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Payment Composition</h3>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={results.pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {results.pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Bar Chart */}
              <div className="bg-gradient-to-br from-secondary-50 to-accent-50 rounded-2xl p-6 border border-secondary-200/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Yearly Breakdown</h3>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results.yearlyBreakdown.slice(0, 10)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                      <Legend />
                      <Bar dataKey="principal" fill="#3b82f6" name="Principal" />
                      <Bar dataKey="interest" fill="#1d4ed8" name="Interest" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Eligibility Status */}
            <div className={`p-6 rounded-xl border mb-6 ${
              results.eligibility.eligible 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200'
            }`}>
              <div className="flex items-center mb-3">
                {results.eligibility.eligible ? (
                  <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-red-600 mr-2" />
                )}
                <h4 className="font-semibold text-gray-900">
                  Eligibility Status: {results.eligibility.eligible ? 'Eligible' : 'Not Eligible'}
                </h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">{results.eligibility.reason}</p>
              <p className="text-sm text-gray-600">
                Maximum loan amount based on income: {formatCurrency(results.eligibility.maxLoanAmount)}
              </p>
            </div>

            {/* Key Insights */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="w-5 h-5 text-gray-600 mr-2" />
                Key Insights
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Down payment required: {formatCurrency(formData.propertyValue - formData.loanAmount)}</div>
                <div>• EMI to Income ratio: {formatNumber((results.emi / formData.monthlyIncome) * 100)}%</div>
                <div>• Consider prepayment to reduce interest burden</div>
              </div>
            </div>
          </div>
        </div>

        {/* Yearly Breakdown */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-12">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Yearly Breakdown
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Year</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Principal Paid</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Interest Paid</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Remaining Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {results.breakdown.map((year, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Year {year.year}</td>
                    <td className="px-6 py-4 text-sm text-right text-blue-600 font-medium">
                      {formatCurrency(year.principal)}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-purple-600 font-medium">
                      {formatCurrency(year.interest)}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-gray-900 font-medium">
                      {formatCurrency(year.remaining)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Home Loan Features</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Long repayment tenure (up to 30 years)
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Lower interest rates compared to other loans
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Tax benefits on interest and principal
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Flexible prepayment options
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                <User className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Eligibility Criteria</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Age: 21-65 years
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Income: Minimum ₹25,000/month
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Credit score: 750+ preferred
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Employment: Stable job/business
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                <Building className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Documents Required</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Identity and address proof
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Income proof (salary slips/ITR)
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Property documents
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Bank statements (6 months)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeLoanCalculator