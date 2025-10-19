import mongoose from "mongoose";

const MLMMemberSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["admin", "employee", "sub_employee", "dsa", "sub_dsa"],
        required: true
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    children: [{
        workerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        workerRole: {
            type: String,
            required: true
        },
        workerLevel: {
            type: Number,
            required: true
        }
    }],
    level: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


export default mongoose.model("UsersReferralFlow", MLMMemberSchema);