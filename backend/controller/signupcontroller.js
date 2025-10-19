// import userSchema from "../model/usermodel.js";

import jwt from 'jsonwebtoken';
import Otpdetail from "../model/otpdetail.js";
import UserSchema from "../model/usermodel.js"
import emailotpdetails from '../model/emailotpdetails.js';
import basicDetails from '../model/basicDetails.js';
import AdditionalPersonalInfoSchema from '../model/AdditionalPersonalInfo.js';
import FactaSchema from "../model/NationalityDetails.js";
import BankDetails from '../model/BankDetails.js';
import { getReferenceIdFromToken } from '../utils/auth.js';
import SignatureSchema from '../model/SignatureSchema.js'; // Adjust path as needed
import cloudinary from '../config/cloudinary.js'; // You'll need to setup cloudinary config
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';


// Generate OTP (6 Digits)
function generateSixDigitNumber() {
    return Math.floor(100000 + Math.random() * 900000);

}


// OTP Mesage send function to Phone number
function OtpSend(message) {
    // res.status(200).json({message:message});
    console.log(message)
};


// Here need to send SMS to Mail Using API
const OtpMessageSendToMail = async (message, email) => {
    try {

    } catch (error) {

    }
}


// create Referance ID
export function GenReferance() {
    return "WITTY-" + Math.floor(100000 + Math.random() * 900000);

}

//Create a Password when craeting Account
export function CreatePassword() {
    let Alpha = "abcdefghijklmnopqrstuvwxyz";
    let smaller = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let AlphaNumeric = Alpha + smaller;
    let Password = "";
    for (let i = 0; i < 8; i++) {
        Password += AlphaNumeric.charAt(Math.floor(Math.random() * AlphaNumeric.length));
    }
    return Password;
}

// Create a WittyWealth Account
export function wittywealth(phone) {
    if (!phone) throw new Error("Phone number is missing");
    const phoneStr = String(phone);
    const Last4Digits = phoneStr.slice(-4);
    const random = Math.floor(1000 + Math.random() * 9000);
    return Last4Digits + random;
}




// Enterd Phone number To send OTP
export const AddPhone = async (req, res) => {
    try {
        const phonenumber = req.body.phone;
        console.log(phonenumber);
        if (!/^\d{10}$/.test(phonenumber)) {
            return res.status(400).json({ message: "Invalid phone number format" });
        }

        const findphone = await Otpdetail.findOne({ phone: phonenumber })
        const otp = generateSixDigitNumber();

        if (findphone) {
            const checktime = await Otpdetail.findOne({ phone: phonenumber });
            const date = checktime?.date;
            // console.log(date);
            if (date) {
                // Here check the saved date and current time date 2 min 
                const diff = Date.now() - date;
                if (diff < 2 * 60 * 1000) {
                    res.status(400).json({ message: "OTP is already sent" });
                } else {
                    await Otpdetail.findOneAndUpdate({ phone: phonenumber }, { otp: otp, date: Date.now() });
                    OtpSend(`This is our One time Password ${otp} for Wiity Wealth. Please enter this OTP to verify your phone number Dont share this OTP with anyone.`)
                    res.status(200).json({ message: "Resend OTP sent successfully", otp: otp })
                }
            }

        } else {
            await Otpdetail.create({ phone: phonenumber, otp: otp });
            OtpSend(`This is our One time Password ${otp} for Wiity Wealth. Please enter this OTP to verify your phone number Dont share this OTP with anyone.`)
            res.status(200).json({ message: "OTP sent successfully", otp: otp })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// Enterd OTP To verify Phone
export const VerifyOTP = async (req, res) => {
    try {
        const verifydata = req.body;
        // Api Request Body
        const { phone, otp, userType } = verifydata;

        const otpdetails = await Otpdetail.findOne({ phone: phone });

        const date = otpdetails?.date;
        const diff = Date.now() - date;
        if (diff < 2 * 60 * 1000) {
            console.log(otpdetails.otp);
            if (otpdetails.otp === otp) {
                const users = await UserSchema.findOne({ phone: phone });
                if (users?.phone === phone) {
                    console.log('Existing user, creating token with JWT_SECRET:', process.env.JWT_SECRET ? 'Exists' : 'Missing');
                    const token = jwt.sign(
                        { phone: users.phone, referenceId: users.referenceId },
                        process.env.JWT_SECRET,
                        { expiresIn: '7d' }
                    );
                    console.log('Token created for existing user, length:', token.length);
                    users.token = token;
                    await users.save();
                    await otpdetails.deleteOne();
                    try {
                        res.cookie('token', token, {
                            httpOnly: true,
                            // secure: process.env.NODE_ENV === 'production', // true if in production
                            sameSite: 'strict',
                            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                        });
                    } catch (error) {
                        console.log(error);
                        res.status(500).json({ message: "Something went wrong" });
                    }
                    return res.status(200).json({
                        message: "OTP is valid, User already exists",
                        kycStep: users.kycStep,
                        token: token  // ✅ ADD THE TOKEN HERE!
                    });
                } else {
                    const refid = GenReferance();
                    const Rpass = CreatePassword();
                    const Acnumber = wittywealth(phone);
                    const user = new UserSchema({
                        wittywealth: Acnumber,
                        phone: phone,
                        referenceId: refid,
                        password: Rpass,
                        userType: userType,
                        kycStep: 1
                    });
                    
                    console.log('Creating token with JWT_SECRET:', process.env.JWT_SECRET ? 'Exists' : 'Missing');
                    const token = jwt.sign(
                        { phone: phone, referenceId: refid },
                        process.env.JWT_SECRET,
                        { expiresIn: '7d' }
                    );
                    console.log('Token created successfully, length:', token.length);
                    user.token = token;
                    await user.save();
                    await otpdetails.deleteOne();

                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict',
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                    });

                    res.status(200).json({ message: "OTP is valid , User Created", kycStep: 1, token: token });
                }

            } else {
                res.status(400).json({ message: "OTP is not valid" });
            }
        } else {
            res.status(400).json({ message: "Resend OTP" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}





// Email Verification
export const SendOtpToMail = async (req, res) => {
    try {
        // Validation by frontend
        const { email } = req.body;
        const AlredyUser = await emailotpdetails.findOne({ email: email });
        const otp = generateSixDigitNumber();

        if (AlredyUser) {
            const date = AlredyUser?.date;
            const mailverified = AlredyUser?.verified;
            const MailIsAlready = basicDetails.findOne({ email: email });
            // if(MailIsAlready){
            //     res.status(400).json({ message: "Email is already Exists" });
            // }
            if (mailverified || MailIsAlready) {
                res.status(400).json({ message: "Email is already verified" });
            } else {
                const diff = Date.now() - date;
                if (diff < 2 * 60 * 1000) {
                    res.status(400).json({ message: "OTP is already sent, That OTP is Valid You can use" });
                } else {
                    const otpcount = AlredyUser?.otpcount;
                    console.log(otpcount);
                    if (otpcount === 5) {
                        res.status(500).json({ message: "You have tried to send OTP more than 5 times, You Need to change Email" })
                    }
                    const count = otpcount;
                    const UpdatedCount = count + 1;
                    console.log(UpdatedCount);
                    await emailotpdetails.findOneAndUpdate({ email: email }, { otp: otp, date: Date.now(), otpcount: UpdatedCount });
                    OtpMessageSendToMail(`Your OTP is ${otp} Please Verify it, Witty Wealth`, email);
                    res.status(200).json({ message: "Resend OTP sent successfully", otp: otp })

                }
            }
        } else {
            await emailotpdetails.create({
                email: email,
                otp: otp
            });
            OtpMessageSendToMail(`Your OTP is ${otp} Please Verify it, Witty Wealth`, email)
            res.status(200).json({ message: "Otp Send Successfully", otp: otp });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }

}


// Verify MailOTP
export const VerifyMailOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const AlredyUsers = await emailotpdetails.findOne({ email: email });
        // console.log(AlredyUser);
        if (AlredyUsers) {
            const date = AlredyUsers?.date;
            const NowDate = Date.now() - date;
            if (NowDate < 2 * 60 * 1000) {
                // console.log("Counting ");
                const VerifyOTP = await emailotpdetails.findOne({ email: email, otp: otp });
                if (VerifyOTP) {
                    await emailotpdetails.findOneAndUpdate({ email: email }, { verified: true });
                    res.status(200).json({ message: "OTP is verified successfully", email: email, otp: otp, verified: true });
                } else {
                    res.status(400).json({ message: "OTP is not verified, Incorrect OTP" });
                }
            } else {
                res.status(400).json({ message: "Otp is Expired, Please Resend OTP" });
            }
        } else {
            res.status(400).json({ message: "Resend OTP and Try Again to Verify" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}


// Get Basic Details Of User and save  (Basic Detals and also email Id verification)
export const getBasicDetails = async (req, res) => {
    try {
        const BasicDetail = req.body;
        const { email, name, dob, pannumber, gender } = BasicDetail;

        const referenceId = req.user?.referenceId; // from authenticateUser middleware

        if (!referenceId) {
            return res.status(401).json({ message: "Unauthorized: No referenceId in token" });
        }

        if (!name || !dob || !email || !pannumber || !gender) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const AlredyUsers = await emailotpdetails.findOne({ email });
        const AlredyHaveUsers = await basicDetails.findOne({ referenceId });

        if (AlredyHaveUsers) {
            return res.status(400).json({ message: "You Already have Basic Details" });
        }

        if (AlredyUsers?.verified === true) {
            await basicDetails.create({ referenceId, name, dob, email, pannumber, gender });
            await emailotpdetails.findOneAndDelete({ email });
            await UserSchema.findOneAndUpdate({ referenceId }, { kycStep: "2" });

            return res.status(200).json({ message: "Basic Details Saved Successfully" });
        } else {
            return res.status(400).json({ message: "Please Verify Your Email first" });
        }
    } catch (error) {
        console.log("Error in getBasicDetails:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};




// Digi locker Page redirect and store the KYC data 
export const DigiLocker = async (req, res) => {
    try {

    } catch (error) {

    }
}


// Additional personal info
export const AdditionalPersonalInfo = async (req, res) => {
    const AdditionalPersonalInfo = req.body;
    console.log('Received additional info data:', AdditionalPersonalInfo);
    
    // Extract fields that frontend actually sends
    const { 
        fatherName, 
        motherName, 
        spouseName, 
        occupation, 
        annualIncome, 
        address, 
        city, 
        state, 
        pincode,
        nomineeName,
        nomineeRelation,
        nomineePhone
    } = AdditionalPersonalInfo;
    
    const referenceId = getReferenceIdFromToken(req);
    if (!referenceId) return res.status(401).json({ message: "Unauthorized: Invalid or missing token" });

    // Check for required fields that frontend actually sends
    if (!fatherName || !address || !city || !state || !pincode) {
        console.log('Missing required fields:', { fatherName, address, city, state, pincode });
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const AlredyHaveUsers = await AdditionalPersonalInfoSchema.findOne({ referenceId: referenceId });
        if (AlredyHaveUsers) {
            res.status(400).json({ message: "You Already have Additional Personal Info" });
        } else {
            await AdditionalPersonalInfoSchema.create({ 
                referenceId, 
                fatherName,
                motherName,
                spouseName,
                occupation,
                annualIncome,
                address,
                city,
                state,
                pincode,
                nomineeName,
                nomineeRelation,
                nomineePhone
            });
            await UserSchema.findOneAndUpdate({ referenceId: referenceId }, { kycStep: "3" });
            res.status(200).json({ message: "Additional Personal Info Saved Successfully" });
        }
    } catch (error) {
        console.error("Error in getAdditionalPersonalInfo:", error);
        console.error("Error stack:", error.stack);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}


// FATCA Declaration 
export const FATCA = async (req, res) => {
    try {
        const FactaDetails = req.body;
        console.log('Received FATCA data:', FactaDetails);
        
        // Extract fields that frontend actually sends
        const { nationality, isUSPerson, isTaxResident, taxResidentCountry, fatcaDeclaration } = FactaDetails;
        
        if (!nationality) {
            console.log('Missing required field: nationality');
            return res.status(400).json({ message: "Missing required field: nationality" });
        }
        
        const referenceId = getReferenceIdFromToken(req);
        if (!referenceId) return res.status(401).json({ message: "Unauthorized: Invalid or missing token" });
        
        const AlredyHaveUsers = await FactaSchema.findOne({ referenceId: referenceId });
        if (AlredyHaveUsers) {
            console.log('User already has FATCA details');
            return res.status(400).json({ message: "You Already have FATCA Declaration" });
        } else {
            await FactaSchema.create({ 
                referenceId, 
                nationality, 
                isUSPerson: isUSPerson || false, 
                isTaxResident: isTaxResident || false, 
                taxResidentCountry: taxResidentCountry || '', 
                fatcaDeclaration: fatcaDeclaration || false 
            });
            await UserSchema.findOneAndUpdate({ referenceId: referenceId }, { kycStep: "5" });
            console.log('FATCA details saved successfully');
            return res.status(200).json({ message: "FATCA Declaration Saved Successfully" });
        }
    } catch (error) {
        console.error("Error in FATCA:", error);
        console.error("Error stack:", error.stack);
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}


// Bank details 
export const BankDetail = async (req, res) => {
    const BankDetailData = req.body;
    console.log('Received bank details data:', BankDetailData);
    
    // Extract only the fields that frontend actually sends
    const { bankName, accountNumber, ifscCode, accountType, branchName } = BankDetailData;
    
    if (!bankName || !accountNumber || !ifscCode) {
        console.log('Missing required bank fields:', { bankName, accountNumber, ifscCode });
        return res.status(400).json({ message: "Missing required fields: bankName, accountNumber, ifscCode" });
    }
    const referenceId = getReferenceIdFromToken(req);
    if (!referenceId) return res.status(401).json({ message: "Unauthorized: Invalid or missing token" });
    try {
        const AlreadyBank = await BankDetails.findOne({ referenceId: referenceId });
        if (AlreadyBank) {
            res.status(400).json({ message: "You Already have Bank Details" })
        }
        await BankDetails.create({ 
            referenceId, 
            bankName, 
            accountNumber, 
            ifscCode, 
            accountType, 
            branchName
        });
        await UserSchema.findOneAndUpdate({ referenceId: referenceId }, { kycStep: "6" });
        res.status(200).json({ message: "Bank Details Saved Successfully" });
    } catch (error) {
        console.log("Error in BankDetail:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}



// Signature Upload 
// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Allow images and PDFs for signatures
        const allowedTypes = /jpeg|jpg|png|gif|pdf/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        console.log('File filter check:', {
            filename: file.originalname,
            extname: path.extname(file.originalname).toLowerCase(),
            mimetype: file.mimetype,
            extnameMatch: extname,
            mimetypeMatch: mimetype
        });
        
        if (mimetype && extname) {
            console.log('File accepted by filter');
            return cb(null, true);
        } else {
            console.log('File rejected by filter');
            cb(new Error('Only image files (JPEG, PNG, GIF) and PDF files are allowed'));
        }
    }
});

// Export multer middleware for use in routes
export const uploadMiddleware = upload.fields([
    { name: 'signature', maxCount: 1 }
    // Photo is optional, so not required in middleware
]);

// Signature Upload Function
export const Signature = async (req, res) => {
    try {
        console.log('=== Signature Upload Started ===');
        console.log('Request body:', req.body);
        console.log('Request files:', req.files);
        
        const referenceId = getReferenceIdFromToken(req);
        console.log('Reference ID from token:', referenceId);
        
        if (!referenceId) {
            console.log('No reference ID found');
            return res.status(401).json({ message: "Unauthorized: Invalid or missing token" });
        }

        // Check if user has completed previous KYC steps
        const user = await UserSchema.findOne({ referenceId });
        console.log('User found:', user ? 'Yes' : 'No');
        console.log('User KYC step:', user?.kycStep);
        
        if (!user) {
            console.log('User not found in database');
            return res.status(404).json({ message: "User not found" });
        }

        if (parseInt(user.kycStep) < 5) {
            console.log('User KYC step too low:', user.kycStep);
            return res.status(400).json({ 
                message: "Please complete previous KYC steps before uploading signature" 
            });
        }

        // Check if signature already exists
        const existingSignature = await SignatureSchema.findOne({ referenceId });
        if (existingSignature) {
            return res.status(400).json({ 
                message: "Signature already uploaded. To update, please contact support." 
            });
        }

        // Check if signature file is uploaded (photo is optional for now)
        console.log('Checking files:', { 
            hasFiles: !!req.files, 
            hasSignature: !!req.files?.signature,
            fileNames: req.files ? Object.keys(req.files) : 'none'
        });
        
        if (!req.files || !req.files.signature) {
            console.log('Signature file missing');
            return res.status(400).json({ 
                message: "Signature file is required" 
            });
        }

        const signatureFile = req.files.signature[0];
        console.log('Signature file details:', {
            filename: signatureFile.originalname,
            size: signatureFile.size,
            path: signatureFile.path,
            mimetype: signatureFile.mimetype
        });
        
        // Photo is optional - create a placeholder if not provided
        const photoFile = req.files.photo ? req.files.photo[0] : null;

        // Check Cloudinary configuration
        console.log('Cloudinary config check:', {
            cloudName: process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Missing',
            apiKey: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Missing',
            apiSecret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Missing'
        });
        
        // Validate Cloudinary configuration
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            console.error('Missing Cloudinary environment variables');
            return res.status(500).json({ 
                message: "Cloudinary configuration incomplete. Please check environment variables." 
            });
        }
        
        // Upload signature to Cloudinary
        console.log('Starting Cloudinary upload for signature...');
        
        // Determine resource type based on file extension
        const fileExt = path.extname(signatureFile.originalname).toLowerCase();
        const resourceType = fileExt === '.pdf' ? 'raw' : 'image';
        
        console.log('Cloudinary upload config:', {
            fileExtension: fileExt,
            resourceType: resourceType,
            filePath: signatureFile.path
        });
        
        const signatureUpload = await cloudinary.uploader.upload(signatureFile.path, {
            folder: 'kyc-signatures',
            public_id: `signature_${referenceId}_${Date.now()}`,
            resource_type: resourceType
        });
        console.log('Signature uploaded to Cloudinary successfully');

        // Upload photo to Cloudinary if provided, otherwise use placeholder
        let photoUpload = null;
        if (photoFile) {
            photoUpload = await cloudinary.uploader.upload(photoFile.path, {
                folder: 'kyc-photos',
                public_id: `photo_${referenceId}_${Date.now()}`,
                resource_type: 'image'
            });
        }

        // Save to database
        const newSignature = await SignatureSchema.create({
            referenceId: referenceId,
            signatureUrl: signatureUpload.secure_url,
            photoUrl: photoUpload ? photoUpload.secure_url : '',
            cloudinarySignatureId: signatureUpload.public_id,
            cloudinaryPhotoId: photoUpload ? photoUpload.public_id : ''
        });

        // Update KYC step
        await UserSchema.findOneAndUpdate(
            { referenceId }, 
            { kycStep: "7" }
        );

        // Clean up local files
        fs.unlinkSync(signatureFile.path);
        if (photoFile) {
            fs.unlinkSync(photoFile.path);
        }

        res.status(200).json({
            message: photoFile ? "Signature and photo uploaded successfully" : "Signature uploaded successfully",
            data: {
                signatureUrl: newSignature.signatureUrl,
                photoUrl: newSignature.photoUrl,
                uploadedAt: newSignature.uploadedAt
            }
        });

    } catch (error) {
        console.error("Error in Signature upload:", error);
        
        // Clean up files in case of error
        if (req.files) {
            if (req.files.signature) {
                try {
                    fs.unlinkSync(req.files.signature[0].path);
                } catch (unlinkError) {
                    console.log('Could not delete signature file:', unlinkError.message);
                }
            }
            if (req.files.photo) {
                try {
                    fs.unlinkSync(req.files.photo[0].path);
                } catch (unlinkError) {
                    console.log('Could not delete photo file:', unlinkError.message);
                }
            }
        }
        
        // Provide more specific error messages
        let errorMessage = "Failed to upload signature";
        if (error.message.includes('Cloudinary')) {
            errorMessage = "Cloudinary configuration error. Please check environment variables.";
        } else if (error.message.includes('file')) {
            errorMessage = "File processing error: " + error.message;
        }
        
        console.error("Final error message:", errorMessage);
        res.status(500).json({ message: errorMessage, error: error.message });
    }
};

// Final Validation AND isActive Make true
export const finalValidationKYC = async (req, res) => {
    try {
        const referenceId = getReferenceIdFromToken(req);
        if (!referenceId) {
            return res.status(401).json({ message: "Unauthorized: Invalid or missing token" });
        }

        // Check all KYC components
        const [
            user,
            basic,
            additional,
            facta,
            bank,
            signatureData
        ] = await Promise.all([
            UserSchema.findOne({ referenceId }),
            basicDetails.findOne({ referenceId }),
            AdditionalPersonalInfoSchema.findOne({ referenceId }),
            FactaSchema.findOne({ referenceId }),
            BankDetails.findOne({ referenceId }),
            SignatureSchema.findOne({ referenceId })
        ]);

        // Validate all components exist
        const missingComponents = [];
        if (!basic) missingComponents.push("Basic Details");
        if (!additional) missingComponents.push("Additional Personal Info");
        if (!facta) missingComponents.push("FATCA Declaration");
        if (!bank) missingComponents.push("Bank Details");
        if (!signatureData) missingComponents.push("Signature");

        if (missingComponents.length > 0) {
            return res.status(400).json({
                message: "KYC incomplete",
                missingComponents: missingComponents,
                kycStep: user.kycStep
            });
        }

        // All validations passed - activate user
        await UserSchema.findOneAndUpdate(
            { referenceId },
            {
                isActive: true,
                kycCompleted: true,
                kycCompletedAt: Date.now(),
                kycStep: "completed"
            }
        );

        res.status(200).json({
            message: "KYC validation successful",
            data: {
                referenceId: referenceId,
                kycStatus: "completed",
                isActive: true,
                completedAt: new Date()
            }
        });

    } catch (error) {
        console.error("Error in final KYC validation:", error);
        res.status(500).json({ message: "KYC validation failed" });
    }
};
