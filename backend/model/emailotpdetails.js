import mongoose from "mongoose";


const emailotpdetails = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    otpcount:{
        type:Number,
        default:0
    },
    verified:{
        type:Boolean,
        default:false
    },
    date: {
        type: Date,
        default: Date.now
    },

});

export default  mongoose.model("EmailOtp", emailotpdetails);