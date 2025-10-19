import mongoose from 'mongoose';

const CreditCardApplicationLeadSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: true,
    trim: true
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true
  },
  panNumber: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  pincode: {
    type: String,
    required: true,
    trim: true
  },
  annualIncome: {
    type: Number,
    required: true,
    min: 0
  },
  
  // Metadata
  source: {
    type: String,
    default: 'Credit Card Application Form',
    enum: ['Credit Card Application Form', 'Website Form', 'API']
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
CreditCardApplicationLeadSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for better query performance
CreditCardApplicationLeadSchema.index({ mobileNumber: 1 });
CreditCardApplicationLeadSchema.index({ panNumber: 1 });
CreditCardApplicationLeadSchema.index({ status: 1 });
CreditCardApplicationLeadSchema.index({ createdAt: -1 });

export default mongoose.model('CreditCardApplicationLead', CreditCardApplicationLeadSchema);
