import mongoose from "mongoose";

const Otpdetail = new mongoose.Schema({
    phone :{
        type:String,
        required:true,
        unique:true
    },
    otp:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model('Otpdetails', Otpdetail);