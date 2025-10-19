import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import router from './routes/SignupRoute.js';
import LoginRoute from "./routes/LoginRoute.js";
import cookieParser from 'cookie-parser';
import AdminRouter from './routes/AdminRouts.js';
import LeadsCrmRoute from './routes/LeadsCrmRoute.js';
import employeeRoutuer from './routes/EmployeeRouts.js';
import dsarouter from './routes/DsaRoutes.js';
import DSAApplicationRouter from './routes/DSAApplicationRoutes.js';
import DSAPartnerRegistrationRouter from './routes/DSAPartnerRegistrationRoutes.js';
import LoanApplicationRouter from './routes/LoanApplicationRoutes.js';
import LoanAuditRouter from './routes/LoanAuditRouter.js';
import LoanEligibilityRouter from './routes/LoanEligibilityRoutes.js';
import InsuranceRouter from './routes/InsuranceRoutes.js';
import LeadRouter from './routes/leadRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from backend directory
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api', router);
app.use('/api', LoginRoute);
app.use('/api/admin', AdminRouter);
app.use('/api/leads', LeadsCrmRoute);
app.use("/api/employee", employeeRoutuer);
app.use("/api/dsa", dsarouter);
app.use("/api/dsa-applications", DSAApplicationRouter);
app.use("/api/dsa-partner-registration", DSAPartnerRegistrationRouter);
app.use("/api/loan-applications", LoanApplicationRouter);
app.use("/api/loanaudit",LoanAuditRouter);
app.use("/api/loan-eligibility", LoanEligibilityRouter);
app.use("/api/insurance", InsuranceRouter);
app.use("/api/leads", LeadRouter);

// Connect to DB and start server
const startServer = async () => {
    console.log('🔧 Environment variables loaded:');
    console.log('   PORT:', process.env.PORT);
    console.log('   MONGO_URL:', process.env.MONGO_URL ? '✅ Loaded' : '❌ Not found');
    console.log('   JWT_SECRET:', process.env.JWT_SECRET ? '✅ Loaded' : '❌ Not found');
    
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
        console.log(`📱 Frontend proxy configured for http://localhost:5173`);
    });
};

startServer();
