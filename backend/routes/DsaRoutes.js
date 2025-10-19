import express from 'express';
import {
  createDSA,
  getDSAsByEmployee,
  getAllDSAs,
  updateDSAStatus
} from '../controller/DSAController.js';
import { EmployeeAccess, AdminAccess } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create DSA (employee only)
router.post('/create', EmployeeAccess, createDSA);

// Get DSAs created by specific employee
router.get('/employee/:employeeId', EmployeeAccess, getDSAsByEmployee);

// Get all DSAs (admin only)
router.get('/all', AdminAccess, getAllDSAs);

// Update DSA status (admin only)
router.put('/:dsaId/status', AdminAccess, updateDSAStatus);

export default router;