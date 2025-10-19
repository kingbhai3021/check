import express from 'express';
import {
  submitDSAPartnerRegistration,
  getAllDSAPartnerRegistrations,
  getDSAPartnerRegistration,
  updateDSAPartnerRegistrationStatus,
  addContactAttempt,
  getDSAPartnerRegistrationStats
} from '../controller/DSAPartnerRegistrationController.js';
import { AdminAccess } from '../middleware/authMiddleware.js';

const router = express.Router();

// Submit DSA partner registration (Public - no auth required)
router.post('/submit', submitDSAPartnerRegistration);

// Get all DSA partner registrations (Admin only)
router.get('/', AdminAccess, getAllDSAPartnerRegistrations);

// Get specific DSA partner registration (Admin only)
router.get('/:id', AdminAccess, getDSAPartnerRegistration);

// Update DSA partner registration status (Admin only)
router.put('/:id/status', AdminAccess, updateDSAPartnerRegistrationStatus);

// Add contact attempt to DSA partner registration (Admin only)
router.post('/:id/contact-attempt', AdminAccess, addContactAttempt);

// Get DSA partner registration statistics (Admin only)
router.get('/stats/overview', AdminAccess, getDSAPartnerRegistrationStats);

export default router;
