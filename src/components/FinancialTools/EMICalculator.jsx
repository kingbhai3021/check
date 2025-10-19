import React, { useState, useEffect } from 'react'
import { Calculator, TrendingUp, DollarSign, Calendar, Percent, CreditCard, PieChart, BarChart3 } from 'lucide-react'
import CountUpNumber from '../CountUpNumber'
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const EMICalculator = () => {
  const [formData, setFormData] = useState({
    loanAmount: 1000000,
    interestRate: 8.5,
    loanTenure: 20,
    loanType: 'home'
  })

  const [results, setResults] = useState({
    emi: 0,
    totalAmount: 0,
    totalInterest: 0,
    breakdown: [],
    pieChartData: [],
    yearlyBreakdown: []
  })

  const loanTypes = [
    { value: 'home', label: 'Home Loan', maxAmount: 10000000, maxTenure: 30 },
    { value: 'personal', label: 'Personal Loan', maxAmount: 5000000, maxTenure: 7 },
    { value: 'car', label: 'Car Loan', maxAmount: 3000000, maxTenure: 8 },
    { value: 'business', label: 'Business Loan', maxAmount: 20000000, maxTenure: 10 }
  ]

  const calculateEMI = () => {
    const { loanAmount, interestRate, loanTenure } = formData
    
    const monthlyRate = interestRate / 100 / 12
    const totalMonths = loanTenure * 12
    
    // EMI formula: P × r × (1 + r)^n / ((1 + r)^n - 1)
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
      breakdown,
      pieChartData,
      yearlyBreakdown
    })
  }

  useEffect(() => {
    calculateEMI()
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

  const getCurrentLoanType = () => {
    return loanTypes.find(type => type.value === formData.loanType) || loanTypes[0]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full mb-6 shadow-xl shadow-primary-500/25">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            EMI Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate your monthly EMI, total interest, and get a complete loan breakdown with our advanced calculator
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
                Calculate EMI
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <CreditCard className="w-4 h-4 inline mr-2" />
                  Loan Type
                </label>
                <select
                  value={formData.loanType}
                  onChange={(e) => handleInputChange('loanType', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white text-gray-900"
                >
                  {loanTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Loan Amount (₹)
                </label>
                <input
                  type="number"
                  value={formData.loanAmount}
                  onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white text-gray-900"
                  min="10000"
                  max={getCurrentLoanType().maxAmount}
                  step="10000"
                />
                <div className="text-sm text-gray-500 mt-2">
                  Max: {formatCurrency(getCurrentLoanType().maxAmount)}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Percent className="w-4 h-4 inline mr-2" />
                  Interest Rate (% p.a.)
                </label>
                <input
                  type="number"
                  value={formData.interestRate}
                  onChange={(e) => handleInputChange('interestRate', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white text-gray-900"
                  min="1"
                  max="30"
                  step="0.1"
                />
                <div className="text-sm text-gray-500 mt-2">
                  Current rates: 7.5% - 15% depending on loan type
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Loan Tenure (Years)
                </label>
                <input
                  type="number"
                  value={formData.loanTenure}
                  onChange={(e) => handleInputChange('loanTenure', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white text-gray-900"
                  min="1"
                  max={getCurrentLoanType().maxTenure}
                  step="1"
                />
                <div className="text-sm text-gray-500 mt-2">
                  Max: {getCurrentLoanType().maxTenure} years for {getCurrentLoanType().label}
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-white text-sm">💡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Pro Tip</h4>
                  <p className="text-sm text-gray-700">
                    Lower interest rates and longer tenures reduce your EMI, but increase total interest paid.
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
                EMI Summary
              </h2>
            </div>

            {/* Revolutionary Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="group bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-2xl border border-primary-200/50 hover:shadow-lg transition-all duration-300 min-h-[140px] flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
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

              <div className="group bg-gradient-to-br from-accent-50 to-accent-100 p-6 rounded-2xl border border-accent-200/50 hover:shadow-lg transition-all duration-300 min-h-[140px] flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-accent-600">Principal Amount</div>
                </div>
                <div className="text-lg font-bold text-accent-700 break-words overflow-hidden">
                  ₹<CountUpNumber end={formData.loanAmount} duration={1.5} />
                </div>
              </div>

              <div className="group bg-gradient-to-br from-primary-50 to-secondary-50 p-6 rounded-2xl border border-primary-200/50 hover:shadow-lg transition-all duration-300 min-h-[140px] flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-primary-600">Total Payable</div>
                </div>
                <div className="text-lg font-bold text-primary-700 break-words overflow-hidden">
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

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Key Insights
              </h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Interest to Principal ratio:</span>
                  <span className="font-semibold text-blue-600">
                    {formatNumber((results.totalInterest / formData.loanAmount) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Interest multiple:</span>
                  <span className="font-semibold text-purple-600">
                    {formatNumber(results.totalInterest / formData.loanAmount)}x loan amount
                  </span>
                </div>
                <div className="text-orange-600 font-medium">
                  💡 Consider prepayment to reduce interest burden
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Yearly Breakdown */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Year</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Principal Paid</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Interest Paid</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Remaining Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {results.breakdown.map((year, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 font-semibold text-gray-900">Year {year.year}</td>
                    <td className="px-6 py-4 text-right text-blue-600 font-semibold">
                      {formatCurrency(year.principal)}
                    </td>
                    <td className="px-6 py-4 text-right text-purple-600 font-semibold">
                      {formatCurrency(year.interest)}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-900">
                      {formatCurrency(year.remaining)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              What is EMI?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. 
              EMIs are used to pay off both interest and principal each month.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
              <Percent className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Factors Affecting EMI
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                Loan amount
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                Interest rate
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                Loan tenure
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                Credit score
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              EMI Tips
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Keep EMI under 40% of income
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Compare rates from multiple lenders
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Consider prepayment options
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Maintain good credit score
              </li>
            </ul>
          </div>
        </div>
    </div>
  )
}

export default EMICalculator 