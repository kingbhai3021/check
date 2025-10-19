import express from 'express';
import { LoanAuditCreate, AccessLoanAudit, UpdateAuditParent } from '../controller/LoanAuditCreate.js';

const LoanAuditRouter = express.Router();

// Create a Loan Audit
LoanAuditRouter.post("/Create_LoanAudit", LoanAuditCreate);


// Get a Loan Audit
LoanAuditRouter.get("/get_LoanAudit", AccessLoanAudit);

// Update Audit and Parent to send 
LoanAuditRouter.put("/Update_audit",UpdateAuditParent);


export default LoanAuditRouter;