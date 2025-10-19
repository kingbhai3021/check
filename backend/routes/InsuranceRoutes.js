import express from 'express';
import {
    submitInsuranceApplication,
    getAllInsuranceApplications,
    getInsuranceStats,
    updateInsuranceApplicationStatus,
    getInsuranceApplicationById,
    getApplicationsByType
} from '../controller/InsuranceController.js';
import { AdminAccess } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route for submitting insurance application
router.post('/submit', submitInsuranceApplication);

// Admin routes for managing insurance applications
router.get('/', AdminAccess, getAllInsuranceApplications);
router.get('/stats', AdminAccess, getInsuranceStats);
router.get('/type/:type', AdminAccess, getApplicationsByType);
router.get('/:id', AdminAccess, getInsuranceApplicationById);
router.put('/:id/status', AdminAccess, updateInsuranceApplicationStatus);

export default router;
