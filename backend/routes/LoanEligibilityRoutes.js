import express from 'express';
import {
    submitLoanEligibility,
    getAllLoanEligibility,
    getLoanEligibilityStats,
    updateLoanEligibilityStatus,
    getLoanEligibilityById
} from '../controller/LoanEligibilityController.js';
import { AdminAccess } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route for submitting loan eligibility form
router.post('/submit', submitLoanEligibility);

// Admin routes for managing loan eligibility applications
router.get('/', AdminAccess, getAllLoanEligibility);
router.get('/stats', AdminAccess, getLoanEligibilityStats);
router.get('/:id', AdminAccess, getLoanEligibilityById);
router.put('/:id/status', AdminAccess, updateLoanEligibilityStatus);

export default router;

