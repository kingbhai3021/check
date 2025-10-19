import mongoose from 'mongoose';

const CreditCardLeadSchema = new mongoose.Schema({
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
    default: 'Credit Card Page Modal',
    enum: ['Credit Card Page Modal', 'Website Form', 'API']
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
CreditCardLeadSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for better query performance
CreditCardLeadSchema.index({ email: 1 });
CreditCardLeadSchema.index({ status: 1 });
CreditCardLeadSchema.index({ createdAt: -1 });

export default mongoose.model('CreditCardLead', CreditCardLeadSchema);
