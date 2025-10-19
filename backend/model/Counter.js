import mongoose from 'mongoose';

const CounterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  sequence_value: {
    type: Number,
    default: 1000
  }
});

// Ensure the counter collection has a unique index on _id
CounterSchema.index({ _id: 1 }, { unique: true });

export default mongoose.model('Counter', CounterSchema);
