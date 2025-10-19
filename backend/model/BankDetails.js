import mongoose from "mongoose";

const BankDetailsSchema = new mongoose.Schema({
    referenceId: {
        type: String,
        required: true,
        unique: true
    },
    bankName: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true,
    },
    ifscCode: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        required: false,
    },
    branchName: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("BankDetails", BankDetailsSchema);