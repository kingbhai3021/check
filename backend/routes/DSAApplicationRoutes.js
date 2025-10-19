import express from 'express';
import {
  submitDSAApplication,
  getPendingDSAApplications,
  getAllDSAApplications,
  approveDSAApplication,
  rejectDSAApplication,
  getDSAApplicationsByBDE,
  getMyDSAApplications
} from '../controller/DSAApplicationController.js';
import { EmployeeAccess, AdminAccess } from '../middleware/authMiddleware.js';

const router = express.Router();

// Submit DSA application (BDE only)
router.post('/submit', EmployeeAccess, submitDSAApplication);

// Get pending DSA applications (Admin only)
router.get('/pending', AdminAccess, getPendingDSAApplications);

// Get all DSA applications with optional status filter (Admin only)
router.get('/', AdminAccess, getAllDSAApplications);

// Approve DSA application (Admin only)
router.post('/:id/approve', AdminAccess, approveDSAApplication);

// Reject DSA application (Admin only)
router.post('/:id/reject', AdminAccess, rejectDSAApplication);

// Get DSA applications by BDE (BDE can view their own, Admin can view any)
router.get('/bde/:bdeId', EmployeeAccess, getDSAApplicationsByBDE);

// Get current BDE's applications (me)
router.get('/bde/me', EmployeeAccess, getMyDSAApplications);

export default router;