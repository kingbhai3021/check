import React, { useState, useEffect } from 'react'
import { Calculator, TrendingUp, DollarSign, Calendar, Percent, PieChart, BarChart3 } from 'lucide-react'
import CountUpNumber from '../CountUpNumber'
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const SIPCalculator = () => {
  const [formData, setFormData] = useState({
    monthlyInvestment: 10000,
    expectedReturn: 12,
    timePeriod: 10
  })

  const [results, setResults] = useState({
    totalInvestment: 0,
    totalReturns: 0,
    maturityAmount: 0,
    breakdown: [],
    pieChartData: [],
    yearlyBreakdown: []
  })

  const calculateSIP = () => {
    const { monthlyInvestment, expectedReturn, timePeriod } = formData
    
    const monthlyRate = expectedReturn / 100 / 12
    const totalMonths = timePeriod * 12
    
    // Calculate maturity amount using SIP formula
    const maturityAmount = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * 
      (1 + monthlyRate)
    
    const totalInvestment = monthlyInvestment * totalMonths
    const totalReturns = maturityAmount - totalInvestment
    
    // Generate pie chart data
    const pieChartData = [
      { name: 'Total Investment', value: totalInvestment, color: '#3b82f6' },
      { name: 'Returns', value: totalReturns, color: '#1d4ed8' }
    ]
    
    // Generate yearly breakdown
    const breakdown = []
    const yearlyBreakdown = []
    for (let year = 1; year <= timePeriod; year++) {
      const yearMonths = year * 12
      const yearAmount = monthlyInvestment * 
        ((Math.pow(1 + monthlyRate, yearMonths) - 1) / monthlyRate) * 
        (1 + monthlyRate)
      const yearInvestment = monthlyInvestment * yearMonths
      const yearReturns = yearAmount - yearInvestment
      
      breakdown.push({
        year,
        investment: yearInvestment,
        returns: yearReturns,
        total: yearAmount
      })
      
      yearlyBreakdown.push({
        year: `Year ${year}`,
        investment: yearInvestment,
        returns: yearReturns,
        total: yearAmount
      })
    }
    
    setResults({
      totalInvestment,
      totalReturns,
      maturityAmount,
      breakdown,
      pieChartData,
      yearlyBreakdown
    })
  }

  useEffect(() => {
    calculateSIP()
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full mb-6 shadow-xl shadow-primary-500/25">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            SIP Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate your Systematic Investment Plan returns and see how your money grows over time with the power of compounding
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
                Calculate SIP
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Monthly Investment (₹)
                </label>
                <input
                  type="number"
                  value={formData.monthlyInvestment}
                  onChange={(e) => handleInputChange('monthlyInvestment', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-white text-gray-900"
                  min="100"
                  step="100"
                />
                <div className="text-sm text-gray-500 mt-2">
                  Min: ₹100 | Max: ₹10,00,000
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Percent className="w-4 h-4 inline mr-2" />
                  Expected Return Rate (% p.a.)
                </label>
                <input
                  type="number"
                  value={formData.expectedReturn}
                  onChange={(e) => handleInputChange('expectedReturn', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-white text-gray-900"
                  min="1"
                  max="50"
                  step="0.1"
                />
                <div className="text-sm text-gray-500 mt-2">
                  Historical returns: 10-15% for equity funds
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Time Period (Years)
                </label>
                <input
                  type="number"
                  value={formData.timePeriod}
                  onChange={(e) => handleInputChange('timePeriod', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-white text-gray-900"
                  min="1"
                  max="50"
                  step="1"
                />
                <div className="text-sm text-gray-500 mt-2">
                  Long-term investments (5+ years) work best
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
                    Start early and stay invested for longer periods to maximize your returns through the power of compounding.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Investment Summary
              </h2>
            </div>

            {/* Revolutionary Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="group bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-2xl border border-primary-200/50 hover:shadow-lg transition-all duration-300 min-h-[140px] flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-primary-600">Total Investment</div>
                </div>
                <div className="text-lg font-bold text-primary-700 break-words overflow-hidden">
                  ₹<CountUpNumber end={results.totalInvestment} duration={1.5} />
                </div>
              </div>

              <div className="group bg-gradient-to-br from-secondary-50 to-secondary-100 p-6 rounded-2xl border border-secondary-200/50 hover:shadow-lg transition-all duration-300 min-h-[140px] flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-secondary-600">Total Returns</div>
                </div>
                <div className="text-lg font-bold text-secondary-700 break-words overflow-hidden">
                  ₹<CountUpNumber end={results.totalReturns} duration={1.5} />
                </div>
              </div>

              <div className="group bg-gradient-to-br from-accent-50 to-accent-100 p-6 rounded-2xl border border-accent-200/50 hover:shadow-lg transition-all duration-300 sm:col-span-2 lg:col-span-1 min-h-[140px] flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-accent-600">Maturity Amount</div>
                </div>
                <div className="text-lg font-bold text-accent-700 break-words overflow-hidden">
                  ₹<CountUpNumber end={results.maturityAmount} duration={1.5} />
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
                  <h3 className="text-xl font-bold text-gray-900">Investment Composition</h3>
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
                  <h3 className="text-xl font-bold text-gray-900">Yearly Growth</h3>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results.yearlyBreakdown.slice(0, 10)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                      <Legend />
                      <Bar dataKey="investment" fill="#3b82f6" name="Investment" />
                      <Bar dataKey="returns" fill="#1d4ed8" name="Returns" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Key Insights
              </h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Growth multiple:</span>
                  <span className="font-semibold text-green-600">
                    {formatNumber((results.maturityAmount / results.totalInvestment - 1) * 100)}x
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Returns percentage:</span>
                  <span className="font-semibold text-emerald-600">
                    {formatNumber((results.totalReturns / results.totalInvestment) * 100)}% of maturity
                  </span>
                </div>
                <div className="text-teal-600 font-medium">
                  🚀 Power of compounding working in your favor!
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
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Investment</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Returns</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Total Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {results.breakdown.map((year, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 font-semibold text-gray-900">Year {year.year}</td>
                    <td className="px-6 py-4 text-right text-green-600 font-semibold">
                      {formatCurrency(year.investment)}
                    </td>
                    <td className="px-6 py-4 text-right text-emerald-600 font-semibold">
                      {formatCurrency(year.returns)}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-900">
                      {formatCurrency(year.total)}
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
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              What is SIP?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Systematic Investment Plan (SIP) is an investment strategy where you invest a fixed amount regularly 
              in mutual funds. It helps in rupee cost averaging and benefits from the power of compounding over time.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-6">
              <Percent className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Benefits of SIP
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                Disciplined investing approach
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                Rupee cost averaging
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                Power of compounding
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                Flexible investment amounts
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Investment Tips
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                Start early to maximize returns
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                Stay invested for long term
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                Choose funds based on your goals
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                Review and rebalance periodically
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SIPCalculator