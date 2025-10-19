import express from 'express';
import { CreditCardLeads, Insurance } from '../controller/CrmLeads.js';


const LeadsCrmRoute = express.Router();

// Store Data For CRM Leads
LeadsCrmRoute.post("/CreditCard", CreditCardLeads);
// LeadsCrmRoute.post("/Loan", Loan)
LeadsCrmRoute.post("/Insurance", Insurance);

export default LeadsCrmRoute;