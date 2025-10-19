import mongoose from "mongoose";

const CibilScoreDetailsSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        dob: {
            type: String,
            required: true,
        },
        cibilScore: {
            type: Number,
            required: true,
        },
        pannumber: {
            type: String,
            required: true,
        },
        cibilScoreDetails: {
            type: String,
            required: true,
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        CreatedAt: {
            type: Date,
            default: Date.now
        }
    }
);


export const CibilScoreDetails = mongoose.model(
    "CibilScoreDetails",
    CibilScoreDetailsSchema
);