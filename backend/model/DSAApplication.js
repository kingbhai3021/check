import mongoose from 'mongoose';

const DSAApplicationSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  
  // Personal Information
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
    enum: ['Single', 'Married', 'Divorced', 'Widowed'],
    default: 'Single'
  },
  
  // Identity Documents
  panNumber: {
    type: String,
    required: true,
    uppercase: true,
    match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
  },
  aadharNumber: {
    type: String,
    required: true,
    match: /^[0-9]{12}$/
  },
  
  // Address Information
  permanentAddress: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      default: 'India'
    }
  },
  currentAddress: {
    address: String,
    city: String,
    state: String,
    pincode: String,
    country: {
      type: String,
      default: 'India'
    }
  },
  
  // Banking Information
  bankDetails: {
    bankName: {
      type: String,
      required: true
    },
    accountNumber: {
      type: String,
      required: true
    },
    ifscCode: {
      type: String,
      required: true,
      uppercase: true
    },
    accountType: {
      type: String,
      enum: ['Savings', 'Current', 'Salary'],
      default: 'Savings'
    },
    branchName: String,
    branchAddress: String
  },
  
  // Emergency Contact
  emergencyContact: {
    name: {
      type: String,
      required: true
    },
    relationship: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: String
  },
  
  // Professional Information
  workExperience: [{
    company: String,
    position: String,
    startDate: Date,
    endDate: Date,
    description: String
  }],
  education: [{
    institution: String,
    degree: String,
    fieldOfStudy: String,
    startDate: Date,
    endDate: Date,
    grade: String
  }],
  
  // Additional Information
  skills: [String],
  languages: [String],
  certifications: [{
    name: String,
    issuer: String,
    issueDate: Date,
    expiryDate: Date
  }],
  
  // Application Management
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  submittedByBDE: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewedByAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewDate: Date,
  rejectionReason: {
    type: String,
    trim: true
  },
  
  // Additional KYC Details
  nomineeDetails: {
    name: String,
    relationship: {
      type: String,
      enum: ['Spouse', 'Father', 'Mother', 'Son', 'Daughter', 'Brother', 'Sister', 'Other']
    },
    phone: String,
    aadharNumber: String,
    address: String
  },
  
  familyDetails: {
    fatherName: String,
    motherName: String,
    spouseName: String,
    children: [{
      name: String,
      age: Number,
      relationship: { type: String, enum: ['Son', 'Daughter'] }
    }]
  },
  
  // Financial Information
  annualIncome: {
    type: Number,
    min: 0
  },
  occupation: String,
  employerName: String,
  employerAddress: String,
  
  // Compliance Information
  criminalRecord: {
    type: Boolean,
    default: false
  },
  bankruptcyHistory: {
    type: Boolean,
    default: false
  },
  politicalExposure: {
    type: Boolean,
    default: false
  },
  
  // Document Verification Status
  documentVerification: {
    panVerified: { type: Boolean, default: false },
    aadharVerified: { type: Boolean, default: false },
    addressVerified: { type: Boolean, default: false },
    bankAccountVerified: { type: Boolean, default: false },
    photoVerified: { type: Boolean, default: false }
  },
  
  // Generated DSA Details (populated after approval)
  generatedDSAId: String,
  generatedUsername: String,
  generatedPassword: String,
  
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
DSAApplicationSchema.index({ status: 1 });
DSAApplicationSchema.index({ submittedByBDE: 1 });
DSAApplicationSchema.index({ createdAt: -1 });
DSAApplicationSchema.index({ phone: 1 });
DSAApplicationSchema.index({ email: 1 });

// Update the updatedAt field before saving
DSAApplicationSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('DSAApplication', DSAApplicationSchema);