import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import CountUpNumber from '../components/CountUpNumber';
import { 
  FiHome, 
  FiUser, 
  FiFileText, 
  FiCalendar, 
  FiSettings, 
  FiLogOut,
  FiBell,
  FiSearch,
  FiTrendingUp,
  FiUsers,
  FiDollarSign,
  FiClock,
  FiPlus,
  FiEye,
  FiEdit,
  FiTrash2,
  FiInfo,
  FiBarChart,
  FiTarget,
  FiAward,
  FiMessageSquare,
  FiDownload,
  FiFilter,
  FiRefreshCw,
  FiActivity,
  FiPieChart,
  FiTrendingDown,
  FiCheckCircle,
  FiAlertCircle
} from 'react-icons/fi';
import { generateDSAId } from '../utils/dsaIdGenerator.js';
import PasswordChange from '../components/PasswordChange.jsx';
import DSAApplicationForm from '../components/DSAApplicationForm.jsx';
import LoanApplicationsList from '../components/LoanApplicationsList.jsx';

export default function EmployeeDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dsas, setDsas] = useState([]);
  const [showCreateDSA, setShowCreateDSA] = useState(false);
  const [showDSAApplication, setShowDSAApplication] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [dsaApplications, setDsaApplications] = useState([]);
  const [newDSA, setNewDSA] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [notifications, setNotifications] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [performanceData, setPerformanceData] = useState({
    monthlyTarget: 100,
    currentAchievement: 75,
    dsaConversionRate: 85,
    clientSatisfaction: 92
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('employeeToken');
    const userData = localStorage.getItem('employeeUser');
    
    if (!token || !userData) {
      toast.error('Please login first');
      navigate('/employee/login');
      return;
    }
    
    setUser(JSON.parse(userData));
    
    // Load DSAs created by this employee
    loadDSAs();
    // Load DSA applications submitted by this employee
    loadDSAApplications();
  }, [navigate]);

  // Reload DSAs when user state changes
  useEffect(() => {
    if (user) {
      loadDSAs();
      loadNotifications();
      loadRecentActivities();
    }
  }, [user]);

  const loadNotifications = () => {
    // Sample notifications - in production, this would be an API call
    const sampleNotifications = [
      {
        id: 1,
        title: 'New DSA Created',
        message: 'DSA ww2025090444A has been successfully created',
        type: 'success',
        timestamp: new Date().toISOString(),
        read: false
      },
      {
        id: 2,
        title: 'Performance Update',
        message: 'You have achieved 75% of your monthly target',
        type: 'info',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: false
      },
      {
        id: 3,
        title: 'System Maintenance',
        message: 'Scheduled maintenance will occur tonight at 2 AM',
        type: 'warning',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        read: true
      }
    ];
    setNotifications(sampleNotifications);
  };

  const loadRecentActivities = () => {
    // Sample activities - in production, this would be an API call
    const sampleActivities = [
      {
        id: 1,
        action: 'Created DSA',
        target: 'ww2025090444A',
        timestamp: new Date().toISOString(),
        type: 'create'
      },
      {
        id: 2,
        action: 'Updated Profile',
        target: 'Personal Information',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        type: 'update'
      },
      {
        id: 3,
        action: 'Deleted DSA',
        target: 'ww2025090333B',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        type: 'delete'
      }
    ];
    setRecentActivities(sampleActivities);
  };

  const loadDSAs = async () => {
    try {
      // Load DSAs from API
      const currentUser = user || JSON.parse(localStorage.getItem('employeeUser') || '{}');
      // Try multiple ways to get employee identifier
      const employeeId = currentUser.employeeId || currentUser.id || currentUser._id || currentUser.username;
      
      console.log('Loading DSAs for employee:', employeeId);
      console.log('Current user:', currentUser);
      
      if (employeeId) {
        const response = await fetch(`http://localhost:5050/api/dsa/employee/${employeeId}`, {
          method: 'GET',
          credentials: 'include', // Include cookies for authentication
        });

        console.log('DSAs API response status:', response.status);

        if (response.ok) {
          const result = await response.json();
          console.log('DSAs API result:', result);
          
          const dsasFromAPI = result.dsas.map(dsa => ({
            id: dsa._id,
            dsaId: dsa.wittywealth,
            name: dsa.name,
            email: dsa.email,
            phone: dsa.phone,
            status: dsa.dsaDetails?.status || 'active',
            createdAt: dsa.createdAt,
            createdBy: dsa.refferdBy,
            username: dsa.username || dsa.wittywealth,
            temporaryPassword: dsa.temporaryPassword
          }));
          console.log('Mapped DSAs:', dsasFromAPI);
          setDsas(dsasFromAPI);
        } else {
          const errorText = await response.text();
          console.error('Failed to load DSAs:', response.statusText, errorText);
          setDsas([]);
        }
      } else {
        console.warn('No employee ID found');
        setDsas([]);
      }
    } catch (error) {
      console.error('Error loading DSAs:', error);
      setDsas([]);
    }
  };

  const loadDSAApplications = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/dsa-applications/bde/me', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        setDsaApplications(result.applications || []);
      } else {
        console.error('Failed to load DSA applications:', response.statusText);
      }
    } catch (error) {
      console.error('Error loading DSA applications:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('employeeToken');
    localStorage.removeItem('employeeUser');
    toast.success('Logged out successfully');
    navigate('/employee/login');
  };

  const handleCreateDSA = async (e) => {
    e.preventDefault();

    try {
      // Prepare DSA data for API
      const dsaData = {
        name: newDSA.name,
        email: newDSA.email,
        phone: newDSA.phone,
        password: 'temp123', // Temporary password, will be generated by backend
        address: newDSA.address,
        createdBy: user.employeeId || user.id
      };

      // Call API to create DSA
      const response = await fetch('/api/dsa/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify(dsaData)
      });

      const result = await response.json();

      if (response.ok) {
        // Update local state with the created DSA
        const newDSAFromAPI = {
          id: result.dsa._id,
          dsaId: result.username || result.dsa.wittywealth,
          name: result.dsa.name,
          email: result.dsa.email,
          phone: result.dsa.phone,
          status: result.dsa.dsaDetails?.status || 'active',
          createdAt: result.dsa.createdAt,
          createdBy: user.id
        };

        setDsas(prev => [...prev, newDSAFromAPI]);
        
        // Reset form
        setNewDSA({
          name: '',
          email: '',
          phone: '',
          address: ''
        });
        setShowCreateDSA(false);
        
        // Show success message with generated credentials
        if (result.username && result.password) {
          toast.success(`DSA created successfully!\nUsername: ${result.username}\nPassword: ${result.password}`, {
            duration: 10000,
            style: {
              whiteSpace: 'pre-line'
            }
          });
        } else {
          toast.success(`DSA created successfully! DSA ID: ${result.dsa.wittywealth}`);
        }
      } else {
        toast.error(result.message || 'Failed to create DSA');
      }
    } catch (error) {
      console.error('Error creating DSA:', error);
      toast.error('Error creating DSA: ' + error.message);
    }
  };

  const handleDeleteDSA = (dsaId) => {
    if (window.confirm('Are you sure you want to delete this DSA?')) {
      const updatedDSAs = dsas.filter(dsa => dsa.id !== dsaId);
      setDsas(updatedDSAs);
      
      // Update localStorage
      const allDSAs = JSON.parse(localStorage.getItem('dsas') || '[]');
      const filteredDSAs = allDSAs.filter(dsa => dsa.id !== dsaId);
      localStorage.setItem('dsas', JSON.stringify(filteredDSAs));
      
      toast.success('DSA deleted successfully!');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome },
    { id: 'dsa-management', label: 'DSA Management', icon: FiUsers },
    { id: 'dsa-applications', label: 'DSA Applications', icon: FiFileText },
    { id: 'loan-applications', label: 'Loan Applications', icon: FiDollarSign },
    { id: 'analytics', label: 'Analytics', icon: FiBarChart },
    { id: 'performance', label: 'Performance', icon: FiTarget },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'reports', label: 'Reports', icon: FiFileText },
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ];

  const stats = [
    { title: 'DSAs Created', value: dsas?.length || 0, icon: FiUsers, color: 'bg-blue-500' },
    { title: 'DSA Applications', value: dsaApplications?.length || 0, icon: FiFileText, color: 'bg-purple-500' },
    { title: 'Active DSAs', value: dsas?.filter(dsa => dsa.status === 'active').length || 0, icon: FiTrendingUp, color: 'bg-green-500' },
    { title: 'Pending Applications', value: dsaApplications?.filter(app => app.status === 'pending').length || 0, icon: FiClock, color: 'bg-orange-500' },
  ];

  const recentTasks = [
    { id: 1, title: 'Complete monthly report', status: 'completed', priority: 'high' },
    { id: 2, title: 'Review client documents', status: 'in-progress', priority: 'medium' },
    { id: 3, title: 'Team meeting preparation', status: 'pending', priority: 'low' },
    { id: 4, title: 'Update project timeline', status: 'completed', priority: 'medium' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="text-blue-100">Here's what's happening with your work today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">
                  <CountUpNumber end={stat.value} duration={2} />
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Recent Tasks</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{task.title}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                      {task.status.replace('-', ' ')}
                    </span>
                    <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority} priority
                    </span>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={user.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={user.username}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <input
              type="text"
              value={user.role}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <input
              type="text"
              value={user.department}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Analytics Dashboard</h2>
        <p className="text-gray-600">Comprehensive insights into your DSA management performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total DSAs</p>
              <p className="text-3xl font-bold text-gray-900">{dsas?.length || 0}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FiUsers className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <FiTrendingUp className="w-4 h-4 mr-1" />
            <span>+12% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active DSAs</p>
              <p className="text-3xl font-bold text-gray-900">{dsas?.filter(dsa => dsa.status === 'active').length || 0}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FiCheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <FiTrendingUp className="w-4 h-4 mr-1" />
            <span>+8% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-3xl font-bold text-gray-900">{performanceData.dsaConversionRate}%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <FiTarget className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <FiTrendingUp className="w-4 h-4 mr-1" />
            <span>+5% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Satisfaction</p>
              <p className="text-3xl font-bold text-gray-900">{performanceData.clientSatisfaction}%</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <FiAward className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <FiTrendingUp className="w-4 h-4 mr-1" />
            <span>+3% from last month</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">DSA Creation Trend</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <FiBarChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization coming soon</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <FiPieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      {/* Performance Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Performance Tracking</h2>
        <p className="text-gray-600">Monitor your progress and achievements</p>
      </div>

      {/* Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Target Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Current Achievement</span>
                <span>{performanceData.currentAchievement}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${performanceData.currentAchievement}%` }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Target: {performanceData.monthlyTarget} DSAs</span>
              <span className="text-blue-600 font-medium">
                {Math.round((performanceData.currentAchievement / 100) * performanceData.monthlyTarget)} DSAs
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Indicators</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">DSA Conversion Rate</span>
              <span className="font-semibold text-green-600">{performanceData.dsaConversionRate}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Client Satisfaction</span>
              <span className="font-semibold text-green-600">{performanceData.clientSatisfaction}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Response Time</span>
              <span className="font-semibold text-blue-600">2.3 hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-4 bg-green-50 rounded-lg">
            <FiAward className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="font-semibold text-green-800">Top Performer</p>
              <p className="text-sm text-green-600">This month</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-blue-50 rounded-lg">
            <FiTarget className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="font-semibold text-blue-800">Target Achiever</p>
              <p className="text-sm text-blue-600">Last month</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-purple-50 rounded-lg">
            <FiUsers className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="font-semibold text-purple-800">Team Builder</p>
              <p className="text-sm text-purple-600">This quarter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      {/* Notifications Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">Notifications</h2>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <FiRefreshCw className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-500">
              {notifications.filter(n => !n.read).length} unread
            </span>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg shadow-sm border">
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <FiBell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No notifications yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div key={notification.id} className={`p-6 ${!notification.read ? 'bg-blue-50' : ''}`}>
                <div className="flex items-start">
                  <div className={`p-2 rounded-full mr-4 ${
                    notification.type === 'success' ? 'bg-green-100' :
                    notification.type === 'warning' ? 'bg-yellow-100' :
                    notification.type === 'error' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    {notification.type === 'success' && <FiCheckCircle className="w-5 h-5 text-green-600" />}
                    {notification.type === 'warning' && <FiAlertCircle className="w-5 h-5 text-yellow-600" />}
                    {notification.type === 'error' && <FiAlertCircle className="w-5 h-5 text-red-600" />}
                    {notification.type === 'info' && <FiInfo className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      {/* Reports Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">Reports & Insights</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <FiDownload className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Summary</h3>
            <FiFileText className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-gray-600 mb-4">Comprehensive overview of your monthly performance</p>
          <button className="text-blue-600 hover:text-blue-700 font-medium">View Report</button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">DSA Performance</h3>
            <FiBarChart className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-gray-600 mb-4">Detailed analysis of DSA creation and management</p>
          <button className="text-green-600 hover:text-green-700 font-medium">View Report</button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Activity Log</h3>
            <FiActivity className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-gray-600 mb-4">Complete log of all your activities and actions</p>
          <button className="text-purple-600 hover:text-purple-700 font-medium">View Report</button>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className={`p-2 rounded-full mr-3 ${
                  activity.type === 'create' ? 'bg-green-100' :
                  activity.type === 'update' ? 'bg-blue-100' :
                  activity.type === 'delete' ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  {activity.type === 'create' && <FiPlus className="w-4 h-4 text-green-600" />}
                  {activity.type === 'update' && <FiEdit className="w-4 h-4 text-blue-600" />}
                  {activity.type === 'delete' && <FiTrash2 className="w-4 h-4 text-red-600" />}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.target}</p>
                </div>
              </div>
              <span className="text-sm text-gray-400">
                {new Date(activity.timestamp).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const getFilteredDSAs = () => {
    if (!dsas || !Array.isArray(dsas)) return [];
    return dsas.filter(dsa => {
      const matchesSearch = searchTerm === '' || 
        dsa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dsa.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dsa.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || dsa.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  };

  const renderDSAManagement = () => {
    const filteredDSAs = getFilteredDSAs();
    
    return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">DSA Management</h2>
          <button
            onClick={() => setShowCreateDSA(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FiPlus className="w-4 h-4" />
            Create New DSA
          </button>
        </div>
      </div>

      {/* Create DSA Form Modal */}
      {showCreateDSA && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New DSA</h3>
            <form onSubmit={handleCreateDSA} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={newDSA.name}
                  onChange={(e) => setNewDSA({...newDSA, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newDSA.email}
                  onChange={(e) => setNewDSA({...newDSA, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={newDSA.phone}
                  onChange={(e) => setNewDSA({...newDSA, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  value={newDSA.address}
                  onChange={(e) => setNewDSA({...newDSA, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Enter address"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Create DSA
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateDSA(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search DSAs by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiRefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* DSA List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            My DSAs ({filteredDSAs.length})
          </h3>
        </div>
        <div className="p-6">
          {filteredDSAs.length === 0 ? (
            <div className="text-center py-8">
              <FiUsers className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {dsas.length === 0 ? 'No DSAs created yet' : 'No DSAs match your search criteria'}
              </p>
              <p className="text-sm text-gray-400">
                {dsas.length === 0 ? 'Click "Create New DSA" to get started' : 'Try adjusting your search or filter'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDSAs.map((dsa) => (
                <div key={dsa.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{dsa.name}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          dsa.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {dsa.status}
                        </span>
                      </div>
                        <div className="space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">DSA ID:</span> 
                            <span className="font-mono ml-1">{dsa.dsaId || dsa.username || dsa.id}</span>
                          </div>
                          <div>
                            <span className="font-medium">Email:</span> {dsa.email}
                          </div>
                          <div>
                            <span className="font-medium">Phone:</span> {dsa.phone}
                          </div>
                          <div>
                            <span className="font-medium">Created:</span> {new Date(dsa.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        
                        {/* Login Credentials Info */}
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                          <div className="flex items-start gap-2">
                            <FiInfo className="w-4 h-4 text-blue-600 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs font-medium text-blue-900">Login Credentials</p>
                              <div className="mt-2 space-y-2">
                                <div className="flex items-center justify-between bg-white px-2 py-1 rounded border">
                                  <span className="text-xs text-blue-700 font-medium">Username:</span>
                                  <code className="text-xs font-mono bg-blue-100 px-2 py-1 rounded">{dsa.dsaId || dsa.username}</code>
                                </div>
                                <div className="flex items-center justify-between bg-white px-2 py-1 rounded border">
                                  <span className="text-xs text-blue-700 font-medium">Password:</span>
                                  <code className="text-xs font-mono bg-green-100 px-2 py-1 rounded text-green-800">
                                    {dsa.temporaryPassword || 'Not available'}
                                  </code>
                                </div>
                              </div>
                              <p className="text-xs text-blue-600 mt-2 italic">
                                Note: DSA must change password on first login
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleDeleteDSA(dsa.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete DSA"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    );
  };

  const renderDSAApplications = () => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        case 'under_review': return 'bg-blue-100 text-blue-800';
        case 'approved': return 'bg-green-100 text-green-800';
        case 'rejected': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const getStatusIcon = (status) => {
      switch (status) {
        case 'pending': return <FiClock className="w-4 h-4" />;
        case 'under_review': return <FiEye className="w-4 h-4" />;
        case 'approved': return <FiCheckCircle className="w-4 h-4" />;
        case 'rejected': return <FiX className="w-4 h-4" />;
        default: return <FiInfo className="w-4 h-4" />;
      }
    };

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">DSA Applications</h2>
            <button
              onClick={() => setShowDSAApplication(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FiPlus className="w-4 h-4" />
              Submit New Application
            </button>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {dsaApplications.length === 0 ? (
            <div className="text-center py-12">
              <FiFileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No DSA Applications</h3>
              <p className="text-gray-500 mb-4">You haven't submitted any DSA applications yet.</p>
              <button
                onClick={() => setShowDSAApplication(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit First Application
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dsaApplications.map((application) => (
                    <tr key={application._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {application.candidateName}
                          </div>
                          <div className="text-sm text-gray-500">
                            Age: {application.age}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">{application.phone}</div>
                          <div className="text-sm text-gray-500">{application.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {application.location.city}, {application.location.state}
                        </div>
                        <div className="text-sm text-gray-500">
                          {application.location.pincode}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                          {getStatusIcon(application.status)}
                          <span className="ml-1 capitalize">{application.status.replace('_', ' ')}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(application.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => {
                            // View application details
                            console.log('View application:', application);
                          }}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                        {application.status === 'approved' && application.dsaId && (
                          <span className="text-green-600 text-xs">
                            DSA ID: {application.dsaId}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'dsa-management':
        return renderDSAManagement();
      case 'dsa-applications':
        return renderDSAApplications();
      case 'loan-applications':
        return <LoanApplicationsList />;
      case 'analytics':
        return renderAnalytics();
      case 'performance':
        return renderPerformance();
      case 'notifications':
        return renderNotifications();
      case 'reports':
        return renderReports();
      case 'profile':
        return renderProfile();
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-3">Account Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <button
                      onClick={() => setShowPasswordChange(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <FiLock className="w-4 h-4" />
                      Change Password
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Notifications</label>
                    <div className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-600">Receive email notifications</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMS Notifications</label>
                    <div className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-600">Receive SMS notifications</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-3">Display Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Light</option>
                      <option>Dark</option>
                      <option>Auto</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Spanish</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Employee Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <FiBell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <FiLogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>

      {/* DSA Application Modal */}
      {showDSAApplication && (
        <DSAApplicationForm 
          onClose={() => setShowDSAApplication(false)} 
          onSuccess={() => {
            loadDSAApplications();
            loadDSAs();
          }}
        />
      )}

      {/* Password Change Modal */}
      {showPasswordChange && (
        <PasswordChange onClose={() => setShowPasswordChange(false)} />
      )}
    </div>
  );
}