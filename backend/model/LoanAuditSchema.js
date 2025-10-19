import mongoose from "mongoose";

const ParentSchema = new mongoose.Schema({
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: "usermodel" },
  workerRole: { type: String },
  Updated: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now }
});

const LoanAuditSchema = new mongoose.Schema({
  NameOfClient: String,
  BankName: String,
  DateOfLoanApply: Date,
  TypeOfLoan: String,
  LoanAmount: Number,
  content: String,
  hierarchy: [ParentSchema], // Tracks all users in the hierarchy
}, { timestamps: true });

export default mongoose.model("LoanAudit", LoanAuditSchema);
