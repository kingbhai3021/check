import mongoose from 'mongoose';

const LoanEligibilityLeadSchema = new mongoose.Schema({
  // Loan Information
  loanAmount: {
    type: Number,
    required: true,
    min: 0
  },
  monthlySalary: {
    type: Number,
    required: true,
    min: 0
  },
  employmentType: {
    type: String,
    required: true,
    enum: ['Salaried', 'Self-employed', 'Business Owner', 'Freelancer', 'Government Employee', 'Other']
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  tenure: {
    type: Number,
    required: true,
    min: 1,
    max: 30
  },
  
  // Personal Information
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  mobileNo: {
    type: String,
    required: true,
    trim: true
  },
  currentEMIs: {
    type: Number,
    default: 0,
    min: 0
  },
  dob: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  pincode: {
    type: String,
    required: true,
    trim: true
  },
  workExperience: {
    type: Number,
    required: true,
    min: 0,
    max: 50
  },
  
  // Metadata
  source: {
    type: String,
    default: 'Loan Eligibility Form',
    enum: ['Loan Eligibility Form', 'Website Form', 'API']
  },
  status: {
    type: String,
    default: 'New',
    enum: ['New', 'Contacted', 'Qualified', 'Converted', 'Rejected']
  },
  priority: {
    type: String,
    default: 'Medium',
    enum: ['Low', 'Medium', 'High', 'Urgent']
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  
  // Additional tracking
  ipAddress: String,
  userAgent: String,
  referrer: String
});

// Update the updatedAt field before saving
LoanEligibilityLeadSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for better query performance
LoanEligibilityLeadSchema.index({ email: 1 });
LoanEligibilityLeadSchema.index({ mobileNo: 1 });
LoanEligibilityLeadSchema.index({ status: 1 });
LoanEligibilityLeadSchema.index({ createdAt: -1 });

export default mongoose.model('LoanEligibilityLead', LoanEligibilityLeadSchema);
