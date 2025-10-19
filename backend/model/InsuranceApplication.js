import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const InsuranceApplicationSchema = new mongoose.Schema({
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
    type: Date
  },
  age: {
    type: Number,
    min: 0,
    max: 120
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },

  // Insurance Type and Details
  insuranceType: {
    type: String,
    required: true,
    enum: ['Health Insurance', 'Term Insurance', 'Vehicle Insurance', 'Endowment Insurance', 'ULIP Insurance', 'Travel Insurance']
  },
  
  // Health Insurance Specific Fields
  healthInsurance: {
    preExistingConditions: String,
    coverageType: String,
    sumInsured: Number,
    city: String,
    pincode: String
  },

  // Term Insurance Specific Fields
  termInsurance: {
    tobaccoUse: String,
    annualIncome: Number,
    coverageAmount: Number,
    policyTerm: Number
  },

  // Vehicle Insurance Specific Fields
  vehicleInsurance: {
    vehicleType: String,
    registrationNumber: String,
    manufacturer: String,
    model: String,
    yearOfManufacture: Number,
    fuelType: String,
    previousInsurance: String
  },

  // Endowment Insurance Specific Fields
  endowmentInsurance: {
    policyTerm: Number,
    sumAssured: Number,
    premiumAmount: Number,
    premiumFrequency: String,
    nomineeName: String
  },

  // ULIP Insurance Specific Fields
  ulipInsurance: {
    policyType: String,
    investmentPeriod: Number,
    premiumFrequency: String,
    coverageAmount: Number,
    nomineeName: String
  },

  // Travel Insurance Specific Fields
  travelInsurance: {
    destinationCountry: String,
    travelStartDate: Date,
    travelEndDate: Date,
    purposeOfTravel: String,
    numberOfTravelers: Number
  },

  // Address Information
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: 'India' }
  },

  // Application Status and Processing
  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'Approved', 'Rejected', 'Policy Issued', 'Cancelled'],
    default: 'Pending'
  },
  policyNumber: {
    type: String,
    trim: true
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
  policyIssueDate: Date,

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
InsuranceApplicationSchema.index({ insuranceType: 1, status: 1 });
InsuranceApplicationSchema.index({ createdAt: -1 });
InsuranceApplicationSchema.index({ email: 1 });
InsuranceApplicationSchema.index({ phone: 1 });
InsuranceApplicationSchema.index({ status: 1 });

// Update the updatedAt field before saving
InsuranceApplicationSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Add pagination plugin
InsuranceApplicationSchema.plugin(mongoosePaginate);

export default mongoose.model('InsuranceApplication', InsuranceApplicationSchema);
