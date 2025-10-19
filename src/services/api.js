import axios from 'axios';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: 'https://wittywealth.org/api',
  withCredentials: true, // Important for sending cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const api = {
  // ✅ NEW: Dashboard summary data
  getDashboardData: async () => {
    return new Promise((resolve) =>
      setTimeout(() =>
        resolve({
          totalClients: 120,
          totalAUM: "₹45,00,000",
          commission: "₹65,000",
          activeSIPs: 32,
        }), 1000
      )
    );
  },

  // ✅ DSA Application Management
  get: async (endpoint) => {
    const response = await apiClient.get(endpoint);
    return response.data;
  },

  post: async (endpoint, data) => {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  },

  put: async (endpoint, data) => {
    const response = await apiClient.put(endpoint, data);
    return response.data;
  },

  delete: async (endpoint) => {
    const response = await apiClient.delete(endpoint);
    return response.data;
  },

  // ✅ Profile and Auth
  updateProfile: async (profileData) => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(profileData), 1000)
    );
  },

  changePassword: async (passwords) => {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (passwords.current && passwords.new) {
          resolve({ success: true });
        } else {
          reject(new Error("Invalid password data"));
        }
      }, 1000)
    );
  },

  // ✅ Client Management (UPDATED)
  fetchClients: async () => {
    return new Promise((resolve) =>
      setTimeout(() =>
        resolve([
          {
            id: 1,
            name: "Rohit Sharma",
            email: "rohit@example.com",
            status: "Active",
            phone: "9876543210",
            address: "101 A Wing, Galaxy Heights, Mumbai",
            pan: "ABCDE1234F",
            aadhar: "1234-5678-9101",
          },
          {
            id: 2,
            name: "Priya Patel",
            email: "priya@example.com",
            status: "Pending KYC",
            phone: "9123456780",
            address: "304 B Block, Shiv Residency, Pune",
            pan: "PQRSX6789Z",
            aadhar: "2345-6789-1012",
          },
          {
            id: 3,
            name: "Aman Verma",
            email: "aman@example.com",
            status: "Inactive",
            phone: "9988776655",
            address: "12 Civil Lines, Nagpur",
            pan: "LMNOP2345K",
            aadhar: "3456-7890-1123",
          },
        ]), 1000
      )
    );
  },

  // ✅ Mutual Fund Purchase
  submitPurchase: async (purchaseData) => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(purchaseData), 1000)
    );
  },

  // ✅ SIP Setup
  submitSIP: async (sipData) => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(sipData), 1000)
    );
  },

  // ✅ KYC Upload
  uploadKYC: async (kycData) => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(kycData), 1000)
    );
  },

  // ✅ Lead Management
  fetchLeads: async () => {
    return new Promise((resolve) =>
      setTimeout(() =>
        resolve([
          {
            id: 1,
            name: "Rahul Deshmukh",
            email: "rahul.d@gmail.com",
            phone: "9876543210",
            status: "New",
            date: "2025-08-06",
          },
          {
            id: 2,
            name: "Sneha Patil",
            email: "sneha.patil@example.com",
            phone: "9123456780",
            status: "Contacted",
            date: "2025-08-05",
          },
        ]), 1000
      )
    );
  },

  addLead: async (leadData) => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(leadData), 1000)
    );
  },

  updateLeadStatus: async (id, status) => {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ id, status }), 1000)
    );
  },

  // ✅ Referral and Commission
  fetchReferrals: async () => {
    return new Promise((resolve) =>
      setTimeout(() =>
        resolve([
          {
            id: 1,
            name: "Ravi Shinde",
            joinedDate: "2025-07-20",
            status: "Active",
            investment: 25000,
            commissionEarned: 375,
          },
          {
            id: 2,
            name: "Ankita Kulkarni",
            joinedDate: "2025-07-25",
            status: "Inactive",
            investment: 0,
            commissionEarned: 0,
          },
        ]), 1000
      )
    );
  },

  // ✅ Transactions
  fetchTransactions: async () => {
    return new Promise((resolve) =>
      setTimeout(() =>
        resolve([
          {
            id: 1,
            client: "Rohit Sharma",
            fund: "HDFC Top 100 Fund",
            type: "SIP",
            amount: 5000,
            date: "2025-08-01",
            status: "Success",
          },
          {
            id: 2,
            client: "Neha Mehta",
            fund: "SBI Bluechip Fund",
            type: "Lump Sum",
            amount: 10000,
            date: "2025-07-29",
            status: "Pending",
          },
          {
            id: 3,
            client: "Rohit Sharma",
            fund: "Axis Growth Opportunities",
            type: "SIP",
            amount: 3000,
            date: "2025-07-20",
            status: "Success",
          },
        ]), 1000
      )
    );
  },

  // ✅ Report Downloads
  downloadReport: async (reportType) => {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ url: `report_${reportType}.pdf` }), 1000)
    );
  },

  // ✅ Notifications
  fetchNotifications: async () => {
    return new Promise((resolve) =>
      setTimeout(() =>
        resolve([
          {
            id: 1,
            type: "Client",
            message: "New client Rohit Sharma registered.",
            date: "2025-08-07T10:30:00Z",
            read: false,
          },
          {
            id: 2,
            type: "Transaction",
            message: "SIP transaction of ₹5000 for Neha Mehta processed.",
            date: "2025-08-06T15:45:00Z",
            read: true,
          },
          {
            id: 3,
            type: "KYC",
            message: "KYC documents for Priya Patel pending review.",
            date: "2025-08-05T09:00:00Z",
            read: false,
          },
        ]), 1000
      )
    );
  },

  markNotificationAsRead: async (id) => {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ id, read: true }), 1000)
    );
  },
};

// Also export as default for compatibility
export default api;
