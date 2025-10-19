import mongoose from "mongoose";

const AdditionalPersonalInfoSchema = new mongoose.Schema({
    referenceId: {
        type: String,
        required: true,
        unique: true
    },
    fatherName: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: false
    },
    spouseName: {
        type: String,
        required: false
    },
    occupation: {
        type: String,
        required: true
    },
    annualIncome: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: 'India'
    },
    nomineeName: {
        type: String,
        required: false
    },
    nomineeRelation: {
        type: String,
        required: false
    },
    nomineePhone: {
        type: String,
        required: false
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

export default mongoose.model("AdditionalPersonalInfo", AdditionalPersonalInfoSchema);