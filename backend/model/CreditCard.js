import mongoose from "mongoose";

const CreditCard = new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    pannumber: {
        type: String,
        required: true
    }
})

export default mongoose.model("CreditCardDetails", CreditCard);