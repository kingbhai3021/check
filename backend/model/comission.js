import mongoose from 'mongoose';

// Commission Distribution Schema for tracking individual payouts
const CommissionDistributionSchema = new mongoose.Schema({
  workerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  workerRole: { 
    type: String, 
    required: true,
    enum: ["admin", "employee", "sub_employee", "dsa", "sub_dsa"]
  },
  commissionAmount: { 
    type: Number, 
    required: true 
  },
  commissionRate: { 
    type: Number, 
    required: true 
  },
  level: { 
    type: Number, 
    required: true 
  },
  payoutStatus: {
    type: String,
    enum: ["pending", "processed", "paid", "failed"],
    default: "pending"
  },
  paidAt: { type: Date },
  paymentReference: { type: String },
  tdsDeducted: { type: Number, default: 0 },
  netAmount: { type: Number, required: true }
});

// Main Commission Schema
const CommissionSchema = new mongoose.Schema({
  // Basic Loan Information
  loanAuditId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LoanAudit',
    required: true
  },
  NameOfClient: { type: String, required: true },
  BankName: { type: String, required: true },
  TypeOfLoan: { 
    type: String, 
    required: true,
    enum: ["HOME_LOAN", "LOAN_AGAINST_PROPERTY", "BUSINESS_LOAN", "PERSONAL_LOAN", "WORKING_CAPITAL", "EDUCATION_LOAN", "AUTO_LOAN"]
  },
  LoanAmount: { type: Number, required: true },
  DateOfLoanApply: { type: Date, required: true },
  
  // Bank Payout Information
  bankPayoutRate: { 
    type: Number, 
    required: true 
    // 0.8% for Home Loan, 1% for LAP, 2% for Business/Personal
  },
  totalBankPayout: { 
    type: Number, 
    required: true 
    // LoanAmount * (bankPayoutRate / 100)
  },

  // Loan Originator Information
  originator: {
    workerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    workerRole: { 
      type: String, 
      required: true,
      enum: ["employee", "sub_employee", "dsa", "sub_dsa"]
    },
    // For DSA Categories
    dsaCategory: {
      type: String,
      enum: ["A", "B", "C"],
      // Only applicable if workerRole is dsa or sub_dsa
    }
  },

  // Complete Hierarchy Chain (from LoanAudit)
  hierarchy: [{
    workerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    },
    workerRole: { type: String },
    level: { type: Number }
  }],

  // Commission Distribution Details
  commissionDistribution: [CommissionDistributionSchema],

  // Employee Direct Sourcing Incentives (Monthly Calculation)
  employeeIncentives: [{
    employeeId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    },
    employeeType: {
      type: String,
      enum: ["BDE", "BDM", "SM", "ASM"]
    },
    monthlyVolume: { type: Number }, // Total volume for the month
    incentiveRate: { type: Number }, // Rate based on slab
    incentiveAmount: { type: Number },
    month: { type: Number },
    year: { type: Number }
  }],

  // DSA Activation Bonuses
  dsaActivationBonus: [{
    activatedBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    },
    activatedDSA: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    },
    bonusAmount: { 
      type: Number, 
      default: 1000 
    },
    activationCriteria: {
      type: String,
      // "HL_50L", "LAP_30L", "PL_BL_10L"
    },
    qualificationDate: { type: Date }
  }],

  // Insurance Commissions (if applicable)
  insuranceCommissions: [{
    policyType: {
      type: String,
      enum: ["LIFE", "HEALTH", "MOTOR", "COMMERCIAL"]
    },
    netPremium: { type: Number },
    commissionRate: { type: Number }, // 10% for Life, 5% for others
    commissionAmount: { type: Number },
    policyNumber: { type: String },
    freelookPeriodSurvived: { type: Boolean, default: false }
  }],

  // Status Tracking
  status: {
    type: String,
    enum: ["pending", "bank_confirmed", "commission_calculated", "payout_initiated", "completed", "rejected"],
    default: "pending"
  },

  // Bank Confirmation Details
  bankConfirmation: {
    isConfirmed: { type: Boolean, default: false },
    confirmedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    confirmedAt: { type: Date },
    disbursementDate: { type: Date },
    actualDisbursedAmount: { type: Number },
    bankReferenceNumber: { type: String }
  },

  // Payout Processing
  payoutDetails: {
    payoutTAT: { 
      type: Number, 
      default: 45 
      // 45 days after disbursement
    },
    expectedPayoutDate: { type: Date },
    actualPayoutDate: { type: Date },
    bankTransferReference: { type: String },
    totalTDSDeducted: { type: Number, default: 0 },
    advancePayoutEligible: { 
      type: Boolean, 
      default: false 
      // If loan amount > 40 lakhs
    },
    advancePayoutProcessed: { type: Boolean, default: false }
  },

  // Financial Summary
  financialSummary: {
    totalCommissionEarned: { type: Number, required: true },
    totalTDSDeducted: { type: Number, default: 0 },
    totalNetPayout: { type: Number, required: true },
    companyRetention: { type: Number, default: 0 },
    processingFees: { type: Number, default: 0 }
  },

  // Audit Trail
  auditLog: [{
    action: { type: String, required: true },
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    timestamp: { type: Date, default: Date.now },
    details: { type: mongoose.Schema.Types.Mixed },
    ipAddress: { type: String },
    userAgent: { type: String }
  }],

  // Additional Flags
  flags: {
    isAdvancePayoutCase: { type: Boolean, default: false },
    requiresManagerApproval: { type: Boolean, default: false },
    hasInsuranceComponent: { type: Boolean, default: false },
    isDSAActivationCase: { type: Boolean, default: false }
  }

}, { 
  timestamps: true 
});

// Indexes for performance
CommissionSchema.index({ loanAuditId: 1 });
CommissionSchema.index({ "originator.workerId": 1 });
CommissionSchema.index({ "hierarchy.workerId": 1 });
CommissionSchema.index({ status: 1 });
CommissionSchema.index({ TypeOfLoan: 1, status: 1 });
CommissionSchema.index({ "bankConfirmation.disbursementDate": 1 });
CommissionSchema.index({ createdAt: -1 });

// Static methods for commission calculation
CommissionSchema.statics.getBankPayoutRate = function(loanType) {
  const rates = {
    'HOME_LOAN': 0.8,
    'LOAN_AGAINST_PROPERTY': 1.0,
    'BUSINESS_LOAN': 2.0,
    'PERSONAL_LOAN': 2.0
  };
  return rates[loanType] || 0;
};

CommissionSchema.statics.getDSACommissionRate = function(loanType, category) {
  const rates = {
    'HOME_LOAN': { 'A': 0.70, 'B': 0.50, 'C': 0.35 },
    'LOAN_AGAINST_PROPERTY': { 'A': 0.90, 'B': 0.70, 'C': 0.50 },
    'BUSINESS_LOAN': { 'A': 1.50, 'B': 1.20, 'C': 1.00 },
    'PERSONAL_LOAN': { 'A': 1.50, 'B': 1.20, 'C': 1.00 }
  };
  return rates[loanType]?.[category] || 0;
};

CommissionSchema.statics.getEmployeeIncentiveRate = function(employeeType, volume) {
  if (employeeType === 'BDE' || employeeType === 'BDM') {
    if (volume >= 50000000) return 0.20; // 5Cr & Above
    if (volume >= 30000000) return 0.15; // 3Cr to <5Cr
    if (volume >= 20000000) return 0.10; // 2Cr to <3Cr
    if (volume >= 7500000) return 0.07;  // 75L to <2Cr
  } else if (employeeType === 'SM' || employeeType === 'ASM') {
    if (volume >= 80000000) return 0.20; // 8Cr & Above
    if (volume >= 50000000) return 0.15; // 5Cr to <8Cr
    if (volume >= 30000000) return 0.10; // 3Cr to <5Cr
    if (volume >= 15000000) return 0.07; // 1.5Cr to <3Cr
  }
  return 0;
};

// Instance methods
CommissionSchema.methods.calculateTotalBankPayout = function() {
  return (this.LoanAmount * this.bankPayoutRate) / 100;
};

CommissionSchema.methods.calculateTDS = function(amount) {
  return (amount * 2) / 100; // 2% TDS
};

CommissionSchema.methods.isAdvancePayoutEligible = function() {
  return this.LoanAmount > 4000000; // > 40 lakhs
};

CommissionSchema.methods.getExpectedPayoutDate = function() {
  if (this.bankConfirmation.disbursementDate) {
    const payoutDate = new Date(this.bankConfirmation.disbursementDate);
    payoutDate.setDate(payoutDate.getDate() + 45); // 45 days TAT
    return payoutDate;
  }
  return null;
};

// Pre-save middleware
CommissionSchema.pre('save', function(next) {
  // Auto-calculate financial summary
  if (this.isModified('commissionDistribution')) {
    this.financialSummary.totalCommissionEarned = this.commissionDistribution.reduce((sum, dist) => sum + dist.commissionAmount, 0);
    this.financialSummary.totalTDSDeducted = this.commissionDistribution.reduce((sum, dist) => sum + dist.tdsDeducted, 0);
    this.financialSummary.totalNetPayout = this.financialSummary.totalCommissionEarned - this.financialSummary.totalTDSDeducted;
  }
  
  // Set advance payout eligibility
  this.flags.isAdvancePayoutCase = this.isAdvancePayoutEligible();
  
  next();
});

export default mongoose.model('Commission', CommissionSchema);