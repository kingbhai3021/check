import mongoose from 'mongoose';

const MutualFundLeadSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 100
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
  salary: {
    type: Number,
    required: true,
    min: 0
  },
  
  // Metadata
  source: {
    type: String,
    default: 'Mutual Fund Page Modal',
    enum: ['Mutual Fund Page Modal', 'Website Form', 'API']
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
MutualFundLeadSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for better query performance
MutualFundLeadSchema.index({ email: 1 });
MutualFundLeadSchema.index({ status: 1 });
MutualFundLeadSchema.index({ createdAt: -1 });

export default mongoose.model('MutualFundLead', MutualFundLeadSchema);
