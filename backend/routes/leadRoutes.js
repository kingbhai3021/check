import express from 'express';
import {
  // Mutual Fund Lead routes
  saveMutualFundLead,
  getMutualFundLeads,
  
  // Credit Card Lead routes
  saveCreditCardLead,
  getCreditCardLeads,
  
  // Loan Lead routes
  saveLoanLead,
  getLoanLeads,
  
  // Insurance Lead routes
  saveInsuranceLead,
  getInsuranceLeads,
  
  // Loan Eligibility Lead routes
  saveLoanEligibilityLead,
  getLoanEligibilityLeads,
  
  // Credit Card Application Lead routes
  saveCreditCardApplicationLead,
  getCreditCardApplicationLeads,
  
  // DSA Partner Lead routes
  saveDSAPartnerLead,
  getDSAPartnerLeads,
  
  // Dashboard routes
  getDashboardStats
} from '../controller/LeadController.js';

const router = express.Router();

// Dashboard Statistics
router.get('/stats', getDashboardStats);

// Mutual Fund Lead routes
router.post('/mutual-fund', saveMutualFundLead);
router.get('/mutual-fund', getMutualFundLeads);

// Credit Card Lead routes
router.post('/credit-card', saveCreditCardLead);
router.get('/credit-card', getCreditCardLeads);

// Loan Lead routes
router.post('/loan', saveLoanLead);
router.get('/loan', getLoanLeads);

// Insurance Lead routes
router.post('/insurance', saveInsuranceLead);
router.get('/insurance', getInsuranceLeads);

// Loan Eligibility Lead routes
router.post('/loan-eligibility', saveLoanEligibilityLead);
router.get('/loan-eligibility', getLoanEligibilityLeads);

// Credit Card Application Lead routes
router.post('/credit-card-application', saveCreditCardApplicationLead);
router.get('/credit-card-application', getCreditCardApplicationLeads);

// DSA Partner Lead routes
router.post('/dsa-partner', saveDSAPartnerLead);
router.get('/dsa-partner', getDSAPartnerLeads);

export default router;
