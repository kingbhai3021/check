import mongoose from "mongoose";

const FactaSchema = new mongoose.Schema({
    referenceId: {
        type: String,
        required: true,
        unique: true
    },
    nationality: {
        type: String,
        required: true
    },
    isUSPerson: {
        type: Boolean,
        default: false
    },
    isTaxResident: {
        type: Boolean,
        default: false
    },
    taxResidentCountry: {
        type: String,
        default: ''
    },
    fatcaDeclaration: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})


export default mongoose.model("Facta", FactaSchema);