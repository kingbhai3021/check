import mongoose from 'mongoose';

const LoanApplicationSchema = new mongoose.Schema({
  // Basic loan information
  applicantName: {
    type: String,
    required: true,
    trim: true
  },
  bankName: {
    type: String,
    required: true,
    trim: true
  },
  loanType: {
    type: String,
    required: true,
    enum: ['Personal Loan', 'Home Loan', 'Car Loan', 'Business Loan', 'Education Loan', 'Gold Loan', 'Other'],
    trim: true
  },
  loanAmount: {
    type: Number,
    required: true,
    min: 0
  },
  appliedDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  branchName: {
    type: String,
    required: true,
    trim: true
  },
  
  // Applicant personal details
  applicantPhone: {
    type: String,
    required: true,
    trim: true
  },
  applicantEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  applicantAddress: {
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    pincode: { type: String, required: true, trim: true },
    country: { type: String, default: 'India', trim: true }
  },
  
  // Banking details
  accountNumber: {
    type: String,
    required: true,
    trim: true
  },
  ifscCode: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  panCard: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format']
  },
  
  // Additional details
  aadharNumber: {
    type: String,
    required: true,
    trim: true,
    match: [/^[0-9]{12}$/, 'Invalid Aadhar format']
  },
  monthlyIncome: {
    type: Number,
    required: true,
    min: 0
  },
  employmentType: {
    type: String,
    required: true,
    enum: ['Salaried', 'Self-Employed', 'Business', 'Retired', 'Other'],
    trim: true
  },
  companyName: {
    type: String,
    trim: true
  },
  
  // DSA and Employee references
  submittedByDSA: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dsaName: {
    type: String,
    required: true,
    trim: true
  },
  dsaId: {
    type: String,
    required: true,
    trim: true
  },
  referredByEmployee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  employeeName: {
    type: String,
    required: true,
    trim: true
  },
  employeeId: {
    type: String,
    required: true,
    trim: true
  },
  
  // Application status and tracking
  status: {
    type: String,
    enum: ['Submitted', 'Under Review', 'Approved', 'Rejected', 'Disbursed', 'Forwarded to Admin', 'Admin Approved', 'Admin Rejected'],
    default: 'Submitted',
    trim: true
  },
  remarks: {
    type: String,
    trim: true
  },
  forwardedToAdmin: {
    type: Boolean,
    default: false
  },
  forwardedAt: {
    type: Date
  },
  forwardedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  adminReviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  adminReviewedAt: {
    type: Date
  },
  
  // Timestamps
  submittedAt: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better query performance
LoanApplicationSchema.index({ submittedByDSA: 1, status: 1 });
LoanApplicationSchema.index({ referredByEmployee: 1, status: 1 });
LoanApplicationSchema.index({ appliedDate: -1 });

export default mongoose.model('LoanApplication', LoanApplicationSchema);
