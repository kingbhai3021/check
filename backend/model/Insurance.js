import mongoose from "mongoose";

const InsuranceDetails = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    insuranceType: {
        type: String,
        required: true
    }
})


export default mongoose.model("insuranceDetails", InsuranceDetails);