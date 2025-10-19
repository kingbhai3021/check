import express from "express";
import { AddPhone, VerifyOTP, SendOtpToMail, VerifyMailOTP, getBasicDetails, AdditionalPersonalInfo, BankDetail, FATCA, Signature ,uploadMiddleware, finalValidationKYC} from "../controller/signupcontroller.js";
import { kycAuthMiddleware } from "../middleware/authMiddleware.js";
import UserSchema from "../model/usermodel.js";
import basicDetails from "../model/basicDetails.js";
import AdditionalPersonalInfoSchema from "../model/AdditionalPersonalInfo.js";
import FactaSchema from "../model/NationalityDetails.js";
import BankDetails from "../model/BankDetails.js";
import SignatureSchema from "../model/SignatureSchema.js";

const router = express.Router();

// router.post("/adduser", addUser);
// Phone number Verification and return JWt
router.post("/sendotp", AddPhone);
router.post("/verifyotp", VerifyOTP);

// Verify Email Address
router.post("/SendOtpToMail", kycAuthMiddleware, SendOtpToMail);
router.post("/VerifyMailOTP", kycAuthMiddleware, VerifyMailOTP);

// Store a Basic Details of user
router.post("/getBasicDetails", kycAuthMiddleware, getBasicDetails);

// Store the Additional Info Of User
router.post("/getAdditionalInfo", kycAuthMiddleware, AdditionalPersonalInfo);

// Store a Facta/Nationality
router.post("/getNationality", kycAuthMiddleware, FATCA);

// Store A Bank Details 
router.post("/getBank", kycAuthMiddleware, BankDetail);

// Signature upload with file handling
router.post('/signature', kycAuthMiddleware, uploadMiddleware, Signature);

// Check KYC Progress
router.get('/check-progress', kycAuthMiddleware, async (req, res) => {
  try {
    const { referenceId } = req.user;
    
    // Check user's current KYC step
    const user = await UserSchema.findOne({ referenceId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check what data exists for each step
    const basicDetails = await basicDetails.findOne({ referenceId });
    const additionalInfo = await AdditionalPersonalInfoSchema.findOne({ referenceId });
    const bankDetails = await BankDetails.findOne({ referenceId });
    const fatcaDetails = await FactaSchema.findOne({ referenceId });
    const signature = await SignatureSchema.findOne({ referenceId });

    // Determine current step
    let currentStep = 1;
    if (basicDetails) currentStep = 2;
    if (additionalInfo) currentStep = 3;
    if (bankDetails) currentStep = 4;
    if (fatcaDetails) currentStep = 5;
    if (signature) currentStep = 6;

    res.json({
      currentStep,
      kycStep: user.kycStep,
      hasBasicDetails: !!basicDetails,
      hasAdditionalInfo: !!additionalInfo,
      hasBankDetails: !!bankDetails,
      hasFatcaDetails: !!fatcaDetails,
      hasSignature: !!signature,
      isComplete: currentStep === 6
    });
  } catch (error) {
    console.error('Progress check error:', error);
    res.status(500).json({ message: 'Failed to check progress' });
  }
});

// Final validation
router.get('/validate', kycAuthMiddleware, finalValidationKYC);

export default router;