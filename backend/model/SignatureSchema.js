import mongoose from 'mongoose';

const SignatureSchema = new mongoose.Schema({
  referenceId: {
    type: String,
    required: true,
    unique: true,
    ref: 'User' // Reference to UserSchema
  },
  signatureUrl: {
    type: String,
    required: true
  },
  photoUrl: {
    type: String,
    required: false, // Made optional since photo is not required
    default: ''
  },
  cloudinarySignatureId: {
    type: String,
    required: true // Cloudinary public_id for deletion
  },
  cloudinaryPhotoId: {
    type: String,
    required: false, // Made optional since photo is not required
    default: ''
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
SignatureSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Signature', SignatureSchema);