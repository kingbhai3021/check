import React, { useState, useEffect } from 'react'
import { Calculator, TrendingUp, DollarSign, Calendar, Percent, User, CreditCard, Zap, Info, AlertCircle, CheckCircle, Target, ArrowRight, RefreshCw, PieChart, BarChart3 } from 'lucide-react'
import CountUpNumber from '../CountUpNumber'
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const PersonalLoanCalculator = () => {
  const [formData, setFormData] = useState({
    loanAmount: 500000,
    interestRate: 12,
    loanTenure: 5,
    monthlyIncome: 80000,
    existingEMI: 0,
    employmentType: 'salaried',
    creditScore: 750,
    loanPurpose: 'personal'
  })

  const [results, setResults] = useState({
    emi: 0,
    totalAmount: 0,
    totalInterest: 0,
    eligibility: {
      maxLoanAmount: 0,
      eligible: false,
      reason: '',
      approvalChance: 0
    },
    breakdown: [],
    pieChartData: [],
    yearlyBreakdown: []
  })

  const loanPurposes = [
    { value: 'personal', label: 'Personal Expenses' },
    { value: 'medical', label: 'Medical Emergency' },
    { value: 'education', label: 'Education' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'travel', label: 'Travel' },
    { value: 'business', label: 'Business' }
  ]

  const employmentTypes = [
    { value: 'salaried', label: 'Salaried' },
    { value: 'selfEmployed', label: 'Self Employed' },
    { value: 'business', label: 'Business Owner' }
  ]

  const calculatePersonalLoan = () => {
    const { loanAmount, interestRate, loanTenure, monthlyIncome, existingEMI, creditScore } = formData
    
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
    const maxEMI = monthlyIncome * 0.5 - existingEMI // 50% of income for personal loans
    const maxLoanAmount = maxEMI * 
      (Math.pow(1 + monthlyRate, totalMonths) - 1) / 
      (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))
    
    // Approval chance calculation
    let approvalChance = 70 // Base chance
    
    if (creditScore >= 750) approvalChance += 20
    else if (creditScore >= 650) approvalChance += 10
    else approvalChance -= 20
    
    if (monthlyIncome >= 100000) approvalChance += 10
    else if (monthlyIncome >= 50000) approvalChance += 5
    else approvalChance -= 10
    
    if (existingEMI === 0) approvalChance += 10
    else approvalChance -= 10
    
    approvalChance = Math.max(0, Math.min(100, approvalChance))
    
    const eligible = loanAmount <= maxLoanAmount && creditScore >= 650
    let reason = ''
    
    if (loanAmount > maxLoanAmount) {
      reason = 'Loan amount exceeds your income eligibility'
    } else if (creditScore < 650) {
      reason = 'Credit score is too low for approval'
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
        reason,
        approvalChance
      },
      breakdown,
      pieChartData,
      yearlyBreakdown
    })
  }

  useEffect(() => {
    calculatePersonalLoan()
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

  const getApprovalColor = (chance) => {
    if (chance >= 80) return 'text-green-600'
    if (chance >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full mb-6">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Personal Loan Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate your personal loan EMI, check eligibility, and get instant approval chances with our advanced calculator
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Calculate Personal Loan
              </h2>
            </div>
            
            <div className="space-y-6">
              {/* Loan Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Loan Amount (₹)
                </label>
                <input
                  type="number"
                  value={formData.loanAmount}
                  onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  min="10000"
                  max="5000000"
                  step="10000"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Min: ₹10,000 | Max: ₹50,00,000
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  min="8"
                  max="25"
                  step="0.1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Current rates: 10.49% - 24% depending on profile
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  min="1"
                  max="7"
                  step="1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Max: 7 years for personal loans
                </p>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  min="15000"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  min="0"
                  step="1000"
                />
              </div>

              {/* Credit Score */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Credit Score
                </label>
                <input
                  type="number"
                  value={formData.creditScore}
                  onChange={(e) => handleInputChange('creditScore', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  min="300"
                  max="900"
                  step="10"
                />
                <p className="text-sm text-gray-500 mt-1">
                  750+ preferred for better rates
                </p>
              </div>

              {/* Loan Purpose */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Loan Purpose
                </label>
                <select
                  value={formData.loanPurpose}
                  onChange={(e) => handleInputChange('loanPurpose', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                >
                  {loanPurposes.map(purpose => (
                    <option key={purpose.value} value={purpose.value}>
                      {purpose.label}
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
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
                    Keep your EMI to income ratio below 50% and maintain a credit score above 750 for better approval chances.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
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
                    <User className="w-5 h-5 text-white" />
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

            {/* Approval Chance */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 mb-6">
              <div className="flex items-center mb-4">
                <Zap className="w-6 h-6 text-blue-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Approval Chance</h4>
              </div>
              <div className={`text-3xl font-bold mb-2 ${getApprovalColor(results.eligibility.approvalChance)}`}>
                <CountUpNumber end={results.eligibility.approvalChance} duration={1.5} suffix="%" />
              </div>
              <p className="text-sm text-gray-600">
                {results.eligibility.approvalChance >= 80 ? 'High chance of approval' :
                 results.eligibility.approvalChance >= 60 ? 'Moderate chance of approval' :
                 'Low chance of approval'}
              </p>
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
                <div>• EMI to Income ratio: {formatNumber((results.emi / formData.monthlyIncome) * 100)}%</div>
                <div>• Interest to Principal ratio: {formatNumber((results.totalInterest / formData.loanAmount) * 100)}%</div>
                <div>• Personal loans have higher rates but faster processing</div>
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
                    <td className="px-6 py-4 text-sm text-right text-green-600 font-medium">
                      {formatCurrency(year.principal)}
                    </td>
                    <td className="px-6 py-4 text-sm text-right text-emerald-600 font-medium">
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
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Personal Loan Features</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Quick approval and disbursal
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                No collateral required
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Flexible repayment options
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Minimal documentation
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                <User className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Eligibility Criteria</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Age: 21-58 years
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Income: Minimum ₹15,000/month
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Credit score: 650+ required
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Employment: 2+ years experience
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Quick Approval Tips</h3>
            </div>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Maintain good credit score
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Keep EMI under 50% of income
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Provide complete documentation
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                Choose shorter tenure for lower rates
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalLoanCalculator