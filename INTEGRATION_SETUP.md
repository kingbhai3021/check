# WittyWealth Unified - Integration Setup Guide

## 🚀 Phase 1 Complete: Backend Integration

### What's Been Set Up

✅ **Backend Structure**: Moved `WittyBackend-dev-temp` to `wittywealth-unified/backend/`
✅ **Package Configuration**: Updated main package.json with backend scripts
✅ **Environment Variables**: Configured .env with all required secrets
✅ **Proxy Configuration**: Vite proxy set to backend port 8000
✅ **CORS Configuration**: Backend configured to allow frontend communication
✅ **Startup Scripts**: Easy development startup with `start-dev.bat`

### 🏗️ Project Structure
```
wittywealth-unified/
├── src/                    # Frontend React code
├── backend/               # Backend Express code
│   ├── config/           # Database & Cloudinary config
│   ├── controller/       # API controllers
│   ├── middleware/       # Auth & validation middleware
│   ├── model/           # MongoDB schemas
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── index.js         # Main server file
├── package.json          # Combined dependencies
├── vite.config.js        # Frontend dev server + proxy
└── start-dev.bat         # Development startup script
```

### 🔧 Environment Configuration
- **Backend Port**: 8000
- **Frontend Port**: 5173
- **MongoDB**: localhost:27017/wittywealth
- **JWT Secrets**: Configured for all user types
- **Cloudinary**: Ready for file uploads

### 📱 Available Scripts

#### Main Package (Frontend + Backend)
```bash
npm run dev:full          # Start both frontend and backend
npm run dev:frontend      # Start only frontend
npm run dev:backend       # Start only backend
npm run build:backend     # Install backend dependencies
npm run start:backend     # Start backend in production mode
```

#### Backend Package
```bash
cd backend
npm run dev               # Start with nodemon (development)
npm run start             # Start with nodemon
npm run prod              # Start with node (production)
```

### 🚀 Quick Start

#### Option 1: Using Batch File (Windows)
```bash
# Double-click start-dev.bat
# This will start both servers automatically
```

#### Option 2: Manual Start
```bash
# Terminal 1: Start Backend
cd backend
npm install
npm run dev

# Terminal 2: Start Frontend
npm install
npm run dev
```

#### Option 3: Combined Start
```bash
npm run dev:full
```

### 🌐 Access Points
- **Frontend**: http://localhost:5173
- **Backend API**: https://wittywealth.org
- **API Endpoints**: http://localhost:5173/api/* (proxied to backend)

### 🔐 Authentication System
- **Phone OTP**: `/api/sendotp`, `/api/verifyotp`
- **Email OTP**: `/api/SendOtpToMail`, `/api/VerifyMailOTP`
- **KYC Process**: `/api/getBasicDetails`, `/api/getAdditionalInfo`, etc.
- **Login**: `/api/login`
- **User Types**: Admin, Employee, DSA, Client with role-based access

### 📊 Database Models
- User management with KYC workflow
- Credit card and insurance leads
- Loan audit tracking
- Commission and salary management

### 🔄 Next Steps (Phase 2)
1. Replace mock API calls with real backend endpoints
2. Implement JWT token management
3. Connect KYC forms to backend APIs
4. Add authentication context and protected routes
5. Integrate lead management forms

### ⚠️ Important Notes
- Ensure MongoDB is running on localhost:27017
- Backend must start before frontend for proxy to work
- JWT tokens are stored in httpOnly cookies for security
- CORS is configured for development (localhost:5173)

### 🐛 Troubleshooting
- **Port conflicts**: Check if ports 8000 or 5173 are in use
- **MongoDB connection**: Ensure MongoDB service is running
- **Proxy issues**: Restart both servers if API calls fail
- **CORS errors**: Check backend is running and CORS headers are set

---
**Status**: Phase 1 Complete ✅  
**Ready for**: Phase 2 - API Integration
