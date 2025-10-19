import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const LoanEligibilitySchema = new mongoose.Schema({
  // Personal Information
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: /^\S+@\S+\.\S+$/
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: /^[6-9]\d{9}$/
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  maritalStatus: {
    type: String,
    required: true,
    enum: ['Single', 'Married', 'Divorced', 'Widowed']
  },
  
  // Address Information
  currentAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: 'India' }
  },
  permanentAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: 'India' }
  },
  
  // Employment Information
  employmentType: {
    type: String,
    required: true,
    enum: ['Salaried', 'Self-Employed', 'Business Owner', 'Professional', 'Retired', 'Student', 'Unemployed']
  },
  companyName: {
    type: String,
    trim: true
  },
  designation: {
    type: String,
    trim: true
  },
  workExperience: {
    type: Number,
    required: true,
    min: 0
  },
  monthlyIncome: {
    type: Number,
    required: true,
    min: 0
  },
  
  // Loan Information
  loanType: {
    type: String,
    required: true,
    enum: ['Personal Loan', 'Home Loan', 'Car Loan', 'Business Loan', 'Education Loan', 'Gold Loan', 'Other']
  },
  loanAmount: {
    type: Number,
    required: true,
    min: 0
  },
  loanTenure: {
    type: Number,
    required: true,
    min: 1,
    max: 30
  },
  purpose: {
    type: String,
    required: true,
    trim: true
  },
  
  // Financial Information
  existingLoans: {
    type: String,
    required: true,
    enum: ['Yes', 'No']
  },
  existingLoanDetails: {
    type: String,
    trim: true
  },
  creditScore: {
    type: Number,
    min: 300,
    max: 900
  },
  
  // Property Information (for home loans)
  propertyType: {
    type: String,
    enum: ['Residential', 'Commercial', 'Plot', 'Under Construction', 'Ready to Move']
  },
  propertyValue: {
    type: Number,
    min: 0
  },
  propertyLocation: {
    type: String,
    trim: true
  },
  
  // Vehicle Information (for car loans)
  vehicleType: {
    type: String,
    enum: ['New Car', 'Used Car', 'Two Wheeler', 'Commercial Vehicle']
  },
  vehicleMake: {
    type: String,
    trim: true
  },
  vehicleModel: {
    type: String,
    trim: true
  },
  vehicleYear: {
    type: Number,
    min: 1990,
    max: new Date().getFullYear() + 1
  },
  
  // Business Information (for business loans)
  businessType: {
    type: String,
    enum: ['Sole Proprietorship', 'Partnership', 'Private Limited', 'Public Limited', 'LLP', 'Other']
  },
  businessRegistrationNumber: {
    type: String,
    trim: true
  },
  businessAge: {
    type: Number,
    min: 0
  },
  annualTurnover: {
    type: Number,
    min: 0
  },
  
  // Status and Processing
  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'Approved', 'Rejected', 'Documentation Required'],
    default: 'Pending'
  },
  eligibilityScore: {
    type: Number,
    min: 0,
    max: 100
  },
  maxEligibleAmount: {
    type: Number,
    min: 0
  },
  interestRate: {
    type: Number,
    min: 0
  },
  remarks: {
    type: String,
    trim: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewDate: Date,
  
  // Additional Information
  source: {
    type: String,
    default: 'Website Form'
  },
  utmSource: String,
  utmMedium: String,
  utmCampaign: String,
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for better performance
LoanEligibilitySchema.index({ loanType: 1, status: 1 });
LoanEligibilitySchema.index({ createdAt: -1 });
LoanEligibilitySchema.index({ email: 1 });
LoanEligibilitySchema.index({ phone: 1 });
LoanEligibilitySchema.index({ status: 1 });

// Update the updatedAt field before saving
LoanEligibilitySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Add pagination plugin
LoanEligibilitySchema.plugin(mongoosePaginate);

export default mongoose.model('LoanEligibility', LoanEligibilitySchema);
