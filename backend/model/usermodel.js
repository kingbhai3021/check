import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  wittywealth: {
    // required: true,
    type: String,
    unique: true,
    sparse: true
  },
  // Username field for RBAC system (ww1001, ww2025092701, etc.)
  username: {
    type: String,
    unique: true,
    sparse: true,
    index: true
  },
  // New field for unique employee ID (WW1001, WW1002, etc.)
  employeeId: {
    type: String,
    unique: true,
    sparse: true,
    validate: {
      validator: function(v) {
        // Validate format: WW followed by 4 digits
        return /^WW\d{4}$/.test(v);
      },
      message: 'Employee ID must be in format WW1001, WW1002, etc.'
    }
  },
  referenceId: {
    required: true,
    type: String,
    unique: true
  },
  phone: {
    required: true,
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    required: true,
    type: String,
    // enum: ['Admin', 'Employee', 'Sub_employee', 'Dsa', 'Sub_dsa', 'Client', 'Call Centre']
    enum: ["admin", "employee", "sub_employee", "dsa", "sub_dsa", "Client", "call_centre"],
  },
  // Enhanced employee fields
  employeeDetails: {
    department: {
      type: String,
      enum: ['IT', 'HR', 'Finance', 'Sales', 'Marketing', 'Operations', 'Support', 'Compliance', 'Risk Management', 'Customer Service']
    },
    designation: String,
    joiningDate: Date,
    salary: Number,
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    permissions: [{
      type: String,
      enum: ['view_clients', 'edit_clients', 'view_reports', 'manage_employees', 'financial_access', 'approve_transactions', 'manage_kyc', 'view_audit_logs']
    }],
    // Personal Information
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other']
    },
    maritalStatus: {
      type: String,
      enum: ['Single', 'Married', 'Divorced', 'Widowed']
    },
    // Identity Documents
    panNumber: {
      type: String,
      uppercase: true,
      match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    },
    aadharNumber: {
      type: String,
      match: /^[0-9]{12}$/
    },
    // Address Information
    permanentAddress: {
      address: String,
      city: String,
      state: String,
      pincode: String,
      country: { type: String, default: 'India' }
    },
    currentAddress: {
      address: String,
      city: String,
      state: String,
      pincode: String,
      country: { type: String, default: 'India' }
    },
    // Banking Information
    bankDetails: {
      bankName: String,
      accountNumber: String,
      ifscCode: String,
      accountType: {
        type: String,
        enum: ['Savings', 'Current', 'Salary']
      },
      branchName: String,
      branchAddress: String
    },
    // Emergency Contact
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
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
    // Compliance and Security
    backgroundCheckStatus: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed', 'Failed'],
      default: 'Pending'
    },
    securityClearance: {
      type: String,
      enum: ['None', 'Basic', 'High', 'Top Secret'],
      default: 'None'
    },
    // Additional Information
    skills: [String],
    languages: [String],
    certifications: [{
      name: String,
      issuer: String,
      issueDate: Date,
      expiryDate: Date
    }]
  },
  kycStatus: {
    default: "Pending",
    type: String
  },
  kycStep: {
    required: true,
    type: String
  },
  isActive: {
    default: false,
    type: Boolean
  },
  refferdBy: {
    type: mongoose.Schema.Types.ObjectId
  },
  updatedAt: { type: Date, default: Date.now },
  loginAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  token: {
    type: String,
  }
});

// Index for faster employee ID lookups
UserSchema.index({ employeeId: 1 });
UserSchema.index({ userType: 1, employeeId: 1 });

export default mongoose.model('User', UserSchema);
