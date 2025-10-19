import mongoose from 'mongoose';

const DSAPartnerRegistrationSchema = new mongoose.Schema({
  // Basic Information
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^[6-9]\d{9}$/
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  
  // Professional Information
  experience: {
    type: String,
    enum: ['0-1', '1-3', '3-5', '5+'],
    required: true
  },
  objective: {
    type: String,
    enum: ['Investment', 'Business Opportunity', 'Career Growth', 'Additional Income'],
    required: true
  },
  
  // Application Status
  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  
  // Admin Review
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewDate: Date,
  rejectionReason: String,
  adminNotes: String,
  
  // Contact Attempts
  contactAttempts: [{
    date: {
      type: Date,
      default: Date.now
    },
    method: {
      type: String,
      enum: ['Call', 'Email', 'SMS', 'WhatsApp']
    },
    notes: String,
    contactedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  
  // Follow-up Information
  followUpDate: Date,
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  
  // Source Information
  source: {
    type: String,
    default: 'Website'
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
DSAPartnerRegistrationSchema.index({ status: 1 });
DSAPartnerRegistrationSchema.index({ createdAt: -1 });
DSAPartnerRegistrationSchema.index({ mobileNumber: 1 });
DSAPartnerRegistrationSchema.index({ email: 1 });
DSAPartnerRegistrationSchema.index({ city: 1 });

// Update the updatedAt field before saving
DSAPartnerRegistrationSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Virtual for formatted mobile number
DSAPartnerRegistrationSchema.virtual('formattedMobile').get(function() {
  const mobile = this.mobileNumber;
  return `+91 ${mobile.slice(0, 5)} ${mobile.slice(5)}`;
});

// Virtual for experience in years
DSAPartnerRegistrationSchema.virtual('experienceYears').get(function() {
  const expMap = {
    '0-1': '0-1 years',
    '1-3': '1-3 years', 
    '3-5': '3-5 years',
    '5+': '5+ years'
  };
  return expMap[this.experience] || this.experience;
});

export default mongoose.model('DSAPartnerRegistration', DSAPartnerRegistrationSchema);
