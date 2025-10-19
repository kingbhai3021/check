import DSAApplication from '../model/DSAApplication.js';
import usermodel from '../model/usermodel.js';
import { generateDSAId, generateTemporaryPassword } from '../utils/dsaIdGenerator.js';
import bcrypt from 'bcryptjs';
import { getIdFromAdmin } from '../utils/auth.js';

// Import SMS service with error handling
let sendCredentialsSMS, sendStatusUpdateSMS;

const loadSMSService = async () => {
  try {
    const smsService = await import('../services/smsService.js');
    sendCredentialsSMS = smsService.sendCredentialsSMS;
    sendStatusUpdateSMS = smsService.sendStatusUpdateSMS;
  } catch (error) {
    console.warn('SMS service not available, will skip SMS notifications');
    sendCredentialsSMS = async () => ({ success: false, fallback: true });
    sendStatusUpdateSMS = async () => ({ success: false, fallback: true });
  }
};

// Initialize SMS service
loadSMSService();

/**
 * Submit a new DSA application by BDE
 * POST /api/dsa-applications/submit
 */
export const submitDSAApplication = async (req, res) => {
  try {
    const {
      // Basic Information
      name,
      phone,
      email,
      // Personal Information
      dateOfBirth,
      gender,
      maritalStatus,
      // Identity Documents
      panNumber,
      aadharNumber,
      // Address Information
      permanentAddress,
      currentAddress,
      // Banking Information
      bankDetails,
      // Emergency Contact
      emergencyContact,
      // Professional Information
      workExperience,
      education,
      // Additional Information
      skills,
      languages,
      certifications,
      // Additional KYC Details
      nomineeDetails,
      familyDetails,
      // Financial Information
      annualIncome,
      occupation,
      employerName,
      employerAddress,
      // Compliance Information
      criminalRecord,
      bankruptcyHistory,
      politicalExposure
    } = req.body;

    // Validate required fields
    if (!name || !phone || !email || !panNumber || !aadharNumber || !dateOfBirth || !gender) {
      return res.status(400).json({
        message: 'Missing required fields: name, phone, email, panNumber, aadharNumber, dateOfBirth, gender'
      });
    }

    // Get the BDE ID from the JWT token (set by EmployeeAccess middleware)
    const bdeId = req.user?.id;
    console.log('DSA Submit - BDE ID from token:', bdeId);
    console.log('DSA Submit - User object:', req.user);
    
    if (!bdeId) {
      return res.status(401).json({ 
        message: 'Unauthorized - BDE ID not found in token. Please login as Employee.' 
      });
    }

    // Verify the BDE exists and is an employee
    const bde = await usermodel.findOne({ 
      _id: bdeId, 
      userType: 'employee' 
    });
    
    if (!bde) {
      return res.status(400).json({
        message: 'Invalid BDE or BDE not found'
      });
    }

    // Check if phone or email already exists in applications or users
    const existingApplication = await DSAApplication.findOne({
      $or: [{ phone }, { email }]
    });

    if (existingApplication) {
      return res.status(400).json({
        message: 'Phone number or email already exists in pending applications'
      });
    }

    const existingUser = await usermodel.findOne({
      $or: [{ phone }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'Phone number or email already registered'
      });
    }

    // Create the DSA application
    const applicationData = {
      // Basic Information
      name,
      phone,
      email,
      // Personal Information
      dateOfBirth: new Date(dateOfBirth),
      gender,
      maritalStatus,
      // Identity Documents
      panNumber: panNumber.toUpperCase(),
      aadharNumber,
      // Address Information
      permanentAddress: permanentAddress || {},
      currentAddress: currentAddress || {},
      // Banking Information
      bankDetails: bankDetails || {},
      // Emergency Contact
      emergencyContact: emergencyContact || {},
      // Professional Information
      workExperience: workExperience || [],
      education: education || [],
      // Additional Information
      skills: skills || [],
      languages: languages || [],
      certifications: certifications || [],
      // Additional KYC Details
      nomineeDetails: nomineeDetails || {},
      familyDetails: familyDetails || {},
      // Financial Information
      annualIncome: annualIncome || 0,
      occupation: occupation || '',
      employerName: employerName || '',
      employerAddress: employerAddress || '',
      // Compliance Information
      criminalRecord: criminalRecord || false,
      bankruptcyHistory: bankruptcyHistory || false,
      politicalExposure: politicalExposure || false,
      // Application Management
      submittedByBDE: bdeId,
      status: 'Pending'
    };

    const newApplication = new DSAApplication(applicationData);
    await newApplication.save();

    // Populate the BDE information for response
    await newApplication.populate('submittedByBDE', 'name username employeeId');

    res.status(201).json({
      message: 'DSA application submitted successfully',
      application: newApplication
    });

  } catch (error) {
    console.error('DSA application submission error:', error);
    res.status(500).json({
      message: 'Internal server error during DSA application submission'
    });
  }
};

/**
 * Get all pending DSA applications (Admin only)
 * GET /api/dsa-applications/pending
 */
export const getPendingDSAApplications = async (req, res) => {
  try {
    // Verify admin access
    const adminId = getIdFromAdmin(req);
    if (!adminId) {
      return res.status(401).json({ 
        message: 'Unauthorized - Admin ID not found in token' 
      });
    }

    const admin = await usermodel.findOne({ 
      _id: adminId, 
      userType: 'admin' 
    });
    
    if (!admin) {
      return res.status(403).json({
        message: 'Access denied - Admin privileges required'
      });
    }

    // Fetch all pending applications with BDE information
    const pendingApplications = await DSAApplication.find({ status: 'Pending' })
      .populate('submittedByBDE', 'name username employeeId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Pending DSA applications retrieved successfully',
      applications: pendingApplications,
      count: pendingApplications.length
    });

  } catch (error) {
    console.error('Get pending DSA applications error:', error);
    res.status(500).json({
      message: 'Internal server error while fetching pending applications'
    });
  }
};

/**
 * Get all DSA applications with status filter (Admin only)
 * GET /api/dsa-applications?status=Pending|Approved|Rejected
 */
export const getAllDSAApplications = async (req, res) => {
  try {
    // Verify admin access
    const adminId = getIdFromAdmin(req);
    if (!adminId) {
      return res.status(401).json({ 
        message: 'Unauthorized - Admin ID not found in token' 
      });
    }

    const admin = await usermodel.findOne({ 
      _id: adminId, 
      userType: 'admin' 
    });
    
    if (!admin) {
      return res.status(403).json({
        message: 'Access denied - Admin privileges required'
      });
    }

    const { status } = req.query;
    let filter = {};
    
    if (status && ['pending', 'approved', 'rejected'].includes(status.toLowerCase())) {
      filter.status = status.toLowerCase();
    }

    // Fetch applications with BDE information
    const applications = await DSAApplication.find(filter)
      .populate('submittedByBDE', 'name username employeeId')
      .populate('reviewedByAdmin', 'name username')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'DSA applications retrieved successfully',
      applications,
      count: applications.length
    });

  } catch (error) {
    console.error('Get all DSA applications error:', error);
    res.status(500).json({
      message: 'Internal server error while fetching applications'
    });
  }
};

/**
 * Approve a DSA application and create the DSA user (Admin only)
 * POST /api/dsa-applications/:id/approve
 */
export const approveDSAApplication = async (req, res) => {
  try {
    const { id } = req.params;

    // Verify admin access
    const adminId = getIdFromAdmin(req);
    if (!adminId) {
      return res.status(401).json({ 
        message: 'Unauthorized - Admin ID not found in token' 
      });
    }

    const admin = await usermodel.findOne({ 
      _id: adminId, 
      userType: 'admin' 
    });
    
    if (!admin) {
      return res.status(403).json({
        message: 'Access denied - Admin privileges required'
      });
    }

    // Find the application
    const application = await DSAApplication.findById(id)
      .populate('submittedByBDE', 'name username employeeId');

    if (!application) {
      return res.status(404).json({
        message: 'DSA application not found'
      });
    }

    if (application.status !== 'Pending') {
      return res.status(400).json({
        message: `Application is already ${application.status.toLowerCase()}`
      });
    }

    // Get the BDE's username for DSA ID generation
    const bdeUsername = application.submittedByBDE.username;
    if (!bdeUsername) {
      return res.status(400).json({
        message: 'BDE username not found - cannot generate DSA ID'
      });
    }

    // Generate DSA ID and temporary password
    const dsaId = await generateDSAId(bdeUsername, new Date());
    const temporaryPassword = generateTemporaryPassword(dsaId);

    // Hash the temporary password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(temporaryPassword, saltRounds);

    // Create the DSA user
    const dsaData = {
      name: application.name,
      phone: application.phone,
      email: application.email,
      password: hashedPassword,
      wittywealth: dsaId,
      username: dsaId,
      referenceId: dsaId,
      userType: 'dsa',
      kycStatus: 'Pending',
      kycStep: '1',
      isActive: true,
      refferdBy: application.submittedByBDE._id,
      temporaryPassword: temporaryPassword, // Store temp password for display
      dsaDetails: {
        createdBy: application.submittedByBDE._id,
        createdDate: new Date(),
        status: 'active',
        commissionRate: 0.05, // Default 5% commission
        totalClients: 0,
        totalCommission: 0,
        approvedBy: adminId,
        approvalDate: new Date()
      }
    };

    // Create DSA user
    const newDSA = new usermodel(dsaData);
    await newDSA.save();

    // Update the application status
    application.status = 'Approved';
    application.reviewedByAdmin = adminId;
    application.reviewDate = new Date();
    application.generatedDSAId = dsaId;
    application.generatedUsername = dsaId;
    application.generatedPassword = temporaryPassword; // Store for reference
    await application.save();

    // Send SMS notification with credentials
    try {
      const smsResult = await sendCredentialsSMS(
        application.phone,
        dsaId,
        temporaryPassword,
        application.name
      );
      
      console.log('SMS notification result:', smsResult);
    } catch (smsError) {
      console.error('Failed to send SMS notification:', smsError);
      // Don't fail the approval process if SMS fails
    }

    // Return success response (without hashed password)
    const { password: _, ...dsaResponse } = newDSA.toObject();

    res.status(200).json({
      message: 'DSA application approved and user created successfully',
      dsa: dsaResponse,
      credentials: {
        username: dsaId,
        password: temporaryPassword
      },
      application: {
        id: application._id,
        status: application.status,
        reviewedBy: admin.name,
        reviewDate: application.reviewDate
      }
    });

  } catch (error) {
    console.error('DSA application approval error:', error);
    res.status(500).json({
      message: 'Internal server error during DSA application approval'
    });
  }
};

/**
 * Reject a DSA application (Admin only)
 * POST /api/dsa-applications/:id/reject
 */
export const rejectDSAApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { rejectionReason } = req.body;

    // Verify admin access
    const adminId = getIdFromAdmin(req);
    if (!adminId) {
      return res.status(401).json({ 
        message: 'Unauthorized - Admin ID not found in token' 
      });
    }

    const admin = await usermodel.findOne({ 
      _id: adminId, 
      userType: 'admin' 
    });
    
    if (!admin) {
      return res.status(403).json({
        message: 'Access denied - Admin privileges required'
      });
    }

    // Find the application
    const application = await DSAApplication.findById(id);

    if (!application) {
      return res.status(404).json({
        message: 'DSA application not found'
      });
    }

    if (application.status !== 'Pending') {
      return res.status(400).json({
        message: `Application is already ${application.status.toLowerCase()}`
      });
    }

    // Update the application status
    application.status = 'Rejected';
    application.reviewedByAdmin = adminId;
    application.reviewDate = new Date();
    application.rejectionReason = rejectionReason || 'Application rejected by admin';
    await application.save();

    // Send SMS notification about rejection
    try {
      const smsResult = await sendStatusUpdateSMS(
        application.phone,
        'Rejected',
        application.name,
        application.rejectionReason
      );
      
      console.log('Rejection SMS notification result:', smsResult);
    } catch (smsError) {
      console.error('Failed to send rejection SMS notification:', smsError);
      // Don't fail the rejection process if SMS fails
    }

    res.status(200).json({
      message: 'DSA application rejected successfully',
      application: {
        id: application._id,
        status: application.status,
        rejectionReason: application.rejectionReason,
        reviewedBy: admin.name,
        reviewDate: application.reviewDate
      }
    });

  } catch (error) {
    console.error('DSA application rejection error:', error);
    res.status(500).json({
      message: 'Internal server error during DSA application rejection'
    });
  }
};

/**
 * Get DSA applications submitted by a specific BDE
 * GET /api/dsa-applications/bde/:bdeId
 */
export const getDSAApplicationsByBDE = async (req, res) => {
  try {
    const { bdeId } = req.params;

    // Verify the requesting user is the BDE or an admin
    const userId = getIdFromAdmin(req);
    if (!userId) {
      return res.status(401).json({ 
        message: 'Unauthorized - User ID not found in token' 
      });
    }

    const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(401).json({
        message: 'User not found'
      });
    }

    // Check if user is admin or the BDE themselves
    if (user.userType !== 'admin' && user._id.toString() !== bdeId) {
      return res.status(403).json({
        message: 'Access denied - Can only view your own applications'
      });
    }

    // Fetch applications submitted by this BDE
    const applications = await DSAApplication.find({ submittedByBDE: bdeId })
      .populate('submittedByBDE', 'name username employeeId')
      .populate('reviewedByAdmin', 'name username')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'DSA applications retrieved successfully',
      applications,
      count: applications.length
    });

  } catch (error) {
    console.error('Get DSA applications by BDE error:', error);
    res.status(500).json({
      message: 'Internal server error while fetching BDE applications'
    });
  }
};

/**
 * Get DSA applications submitted by the current BDE (me)
 * GET /api/dsa-applications/bde/me
 */
export const getMyDSAApplications = async (req, res) => {
  try {
    // Get the current BDE ID from the JWT token (set by EmployeeAccess middleware)
    const bdeId = req.user?.id;
    console.log('Get My DSA Applications - BDE ID:', bdeId);
    
    if (!bdeId) {
      return res.status(401).json({ 
        message: 'Unauthorized - BDE ID not found in token. Please login as Employee.' 
      });
    }

    // Verify the BDE exists and is an employee
    const bde = await usermodel.findOne({ 
      _id: bdeId, 
      userType: 'employee' 
    });
    
    if (!bde) {
      return res.status(400).json({
        message: 'Invalid BDE or BDE not found'
      });
    }

    // Fetch applications submitted by this BDE
    const applications = await DSAApplication.find({ submittedByBDE: bdeId })
      .populate('submittedByBDE', 'name username employeeId')
      .populate('reviewedByAdmin', 'name username')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'DSA applications retrieved successfully',
      applications,
      count: applications.length
    });

  } catch (error) {
    console.error('Get my DSA applications error:', error);
    res.status(500).json({
      message: 'Internal server error while fetching your applications'
    });
  }
};