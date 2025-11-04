import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  CreditCard, 
  Home, 
  Shield, 
  FileText, 
  TrendingUp,
  Phone,
  Mail,
  Calendar,
  Filter,
  Search,
  Download,
  Eye,
  EyeOff,
  ChevronRight,
  Activity,
  Target,
  Zap
} from 'lucide-react';
import LeadDataViewer from './LeadDataViewer.jsx';

const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState('mutual-fund');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedCards, setExpandedCards] = useState(new Set());

  const categories = [
    {
      id: 'mutual-fund',
      name: 'Mutual Funds',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      endpoint: '/api/leads/mutual-fund'
    },
    {
      id: 'credit-card',
      name: 'Credit Cards',
      icon: <CreditCard className="w-5 h-5" />,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      endpoint: '/api/leads/credit-card'
    },
    {
      id: 'loan',
      name: 'Loans',
      icon: <Home className="w-5 h-5" />,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      endpoint: '/api/leads/loan'
    },
    {
      id: 'insurance',
      name: 'Insurance',
      icon: <Shield className="w-5 h-5" />,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      endpoint: '/api/leads/insurance'
    },
    {
      id: 'loan-eligibility',
      name: 'Loan Eligibility',
      icon: <FileText className="w-5 h-5" />,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      endpoint: '/api/leads/loan-eligibility'
    },
    {
      id: 'credit-card-application',
      name: 'Credit Card Apps',
      icon: <CreditCard className="w-5 h-5" />,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10',
      endpoint: '/api/leads/credit-card-application'
    },
    {
      id: 'dsa-partner',
      name: 'DSA Partners',
      icon: <Users className="w-5 h-5" />,
      color: 'text-teal-500',
      bgColor: 'bg-teal-500/10',
      endpoint: '/api/leads/dsa-partner'
    }
  ];

  // Fetch dashboard statistics
  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/leads/stats');
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Fetch leads for active category
  const fetchLeads = async () => {
    setLoading(true);
    setError('');
    
    try {
      const activeCategoryData = categories.find(cat => cat.id === activeCategory);
      const response = await fetch(`http://localhost:5050${activeCategoryData.endpoint}`);
      const data = await response.json();
      
      if (data.success) {
        setLeads(data.data);
      } else {
        setError(data.message || 'Failed to fetch leads');
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [activeCategory]);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = !searchTerm || 
      Object.values(lead).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const toggleCardExpansion = (leadId) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(leadId)) {
      newExpanded.delete(leadId);
    } else {
      newExpanded.add(leadId);
    }
    setExpandedCards(newExpanded);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Lead Aggregation Dashboard</h1>
            <p className="text-gray-400 mt-1">Centralized lead management system</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Converted">Converted</option>
              <option value="Rejected">Rejected</option>
            </select>
            
            {/* Export Button */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 min-h-screen">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">Lead Categories</h2>
            
            {/* Stats Overview */}
            <div className="mb-6 p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium text-gray-300">Total Leads</span>
              </div>
              <div className="text-2xl font-bold text-white">{stats.totalLeads || 0}</div>
            </div>
            
            {/* Category List */}
            <nav className="space-y-2">
              {categories.map((category) => {
                const isActive = activeCategory === category.id;
                const categoryStats = stats.categories?.[category.id] || 0;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-500/20' : category.bgColor}`}>
                        <div className={isActive ? 'text-white' : category.color}>
                          {category.icon}
                        </div>
                      </div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        isActive ? 'bg-blue-500/20 text-blue-200' : 'bg-gray-600 text-gray-300'
                      }`}>
                        {categoryStats}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Category Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              {categories.find(cat => cat.id === activeCategory)?.icon}
              <h2 className="text-xl font-bold text-white">
                {categories.find(cat => cat.id === activeCategory)?.name} Leads
              </h2>
            </div>
            <p className="text-gray-400">
              {filteredLeads.length} of {leads.length} leads
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-400">Loading leads...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-red-400">{error}</span>
              </div>
            </div>
          )}

          {/* Leads Display */}
          {!loading && !error && (
            <LeadDataViewer 
              leads={filteredLeads}
              expandedCards={expandedCards}
              onToggleExpansion={toggleCardExpansion}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
