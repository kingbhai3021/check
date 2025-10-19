import express from 'express';
import { 
  submitLoanApplication, 
  getMyLoanApplications, 
  getEmployeeLoanApplications, 
  updateLoanApplicationStatus, 
  forwardToAdmin,
  getAdminLoanApplications,
  adminReviewLoanApplication,
  getAllLoanApplications 
} from '../controller/LoanApplicationController.js';
import { DSAAccess, EmployeeAccess, AdminAccess } from '../middleware/authMiddleware.js';

const router = express.Router();

// DSA routes
router.post('/submit', DSAAccess, submitLoanApplication);
router.get('/my-applications', DSAAccess, getMyLoanApplications);

// Employee routes
router.get('/employee', EmployeeAccess, getEmployeeLoanApplications);
router.put('/update-status/:applicationId', EmployeeAccess, updateLoanApplicationStatus);
router.post('/forward-to-admin/:applicationId', EmployeeAccess, forwardToAdmin);

// Admin routes
router.get('/admin', AdminAccess, getAdminLoanApplications);
router.get('/all', AdminAccess, getAllLoanApplications);
router.put('/admin-review/:applicationId', AdminAccess, adminReviewLoanApplication);

export default router;
