import mongoose from 'mongoose';

const DSAPartnerLeadSchema = new mongoose.Schema({
  // Basic Information
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  experience: {
    type: String,
    required: true,
    trim: true
  },
  objective: {
    type: String,
    required: true,
    trim: true
  },
  
  // Metadata
  source: {
    type: String,
    default: 'DSA Partner Registration Form',
    enum: ['DSA Partner Registration Form', 'Website Form', 'API']
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
DSAPartnerLeadSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for better query performance
DSAPartnerLeadSchema.index({ email: 1 });
DSAPartnerLeadSchema.index({ mobileNumber: 1 });
DSAPartnerLeadSchema.index({ status: 1 });
DSAPartnerLeadSchema.index({ createdAt: -1 });

export default mongoose.model('DSAPartnerLead', DSAPartnerLeadSchema);
