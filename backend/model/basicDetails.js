import mongoose from "mongoose";

const BasicDetails = new mongoose.Schema({
    referenceId:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pannumber:{
        type:String,
        required: true
    },
    dob:{
        type:Date,
        required: true
    },
    gender:{
        type:String,
        required: true
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    updatedAt:{
        type:Date,
        default: Date.now
    }
    
})

export default mongoose.model("BasicDetails", BasicDetails);