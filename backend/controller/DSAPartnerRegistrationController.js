import DSAPartnerRegistration from '../model/DSAPartnerRegistration.js';
import usermodel from '../model/usermodel.js';
import { getIdFromAdmin } from '../utils/auth.js';

// Import SMS service with error handling
let sendRegistrationSMS, sendStatusUpdateSMS;

const loadSMSService = async () => {
  try {
    const smsService = await import('../services/smsService.js');
    sendRegistrationSMS = smsService.sendRegistrationSMS;
    sendStatusUpdateSMS = smsService.sendStatusUpdateSMS;
  } catch (error) {
    console.warn('SMS service not available, will skip SMS notifications');
    sendRegistrationSMS = async () => ({ success: false, fallback: true });
    sendStatusUpdateSMS = async () => ({ success: false, fallback: true });
  }
};

// Initialize SMS service
loadSMSService();

/**
 * Submit a new DSA partner registration from website
 * POST /api/dsa-partner-registration/submit
 */
export const submitDSAPartnerRegistration = async (req, res) => {
  try {
    const {
      fullName,
      mobileNumber,
      email,
      city,
      experience,
      objective
    } = req.body;

    // Validate required fields
    if (!fullName || !mobileNumber || !email || !city || !experience || !objective) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
        missingFields: {
          fullName: !fullName,
          mobileNumber: !mobileNumber,
          email: !email,
          city: !city,
          experience: !experience,
          objective: !objective
        }
      });
    }

    // Validate mobile number format
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobileNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid mobile number format. Please enter a valid 10-digit Indian mobile number.'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Check if mobile number or email already exists
    const existingRegistration = await DSAPartnerRegistration.findOne({
      $or: [{ mobileNumber }, { email }]
    });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'Registration already exists with this mobile number or email address',
        existingRegistration: {
          fullName: existingRegistration.fullName,
          mobileNumber: existingRegistration.mobileNumber,
          email: existingRegistration.email,
          status: existingRegistration.status,
          createdAt: existingRegistration.createdAt
        }
      });
    }

    // Check if user already exists in the system
    const existingUser = await usermodel.findOne({
      $or: [{ phone: mobileNumber }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already registered in the system',
        existingUser: {
          name: existingUser.name,
          phone: existingUser.phone,
          email: existingUser.email,
          userType: existingUser.userType
        }
      });
    }

    // Create the DSA partner registration
    const registrationData = {
      fullName: fullName.trim(),
      mobileNumber: mobileNumber.trim(),
      email: email.toLowerCase().trim(),
      city: city.trim(),
      experience,
      objective,
      status: 'Pending',
      source: 'Website',
      utmSource: req.body.utmSource || null,
      utmMedium: req.body.utmMedium || null,
      utmCampaign: req.body.utmCampaign || null
    };

    const newRegistration = new DSAPartnerRegistration(registrationData);
    await newRegistration.save();

    // Send SMS notification
    try {
      const smsResult = await sendRegistrationSMS(
        mobileNumber,
        fullName,
        'DSA Partner Registration'
      );
      
      console.log('Registration SMS notification result:', smsResult);
    } catch (smsError) {
      console.error('Failed to send registration SMS notification:', smsError);
      // Don't fail the registration process if SMS fails
    }

    res.status(201).json({
      success: true,
      message: 'DSA partner registration submitted successfully',
      registration: {
        id: newRegistration._id,
        fullName: newRegistration.fullName,
        mobileNumber: newRegistration.formattedMobile,
        email: newRegistration.email,
        city: newRegistration.city,
        experience: newRegistration.experienceYears,
        objective: newRegistration.objective,
        status: newRegistration.status,
        createdAt: newRegistration.createdAt
      }
    });

  } catch (error) {
    console.error('DSA partner registration submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during registration submission'
    });
  }
};

/**
 * Get all DSA partner registrations (Admin only)
 * GET /api/dsa-partner-registration
 */
export const getAllDSAPartnerRegistrations = async (req, res) => {
  try {
    // Verify admin access
    const adminId = getIdFromAdmin(req);
    if (!adminId) {
      return res.status(401).json({ 
        success: false,
        message: 'Unauthorized - Admin access required' 
      });
    }

    const admin = await usermodel.findOne({ 
      _id: adminId, 
      userType: 'admin' 
    });
    
    if (!admin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied - Admin privileges required'
      });
    }

    const { status, page = 1, limit = 10, search } = req.query;
    const skip = (page - 1) * limit;
    
    // Build filter
    let filter = {};
    
    if (status && ['Pending', 'Under Review', 'Approved', 'Rejected'].includes(status)) {
      filter.status = status;
    }
    
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { mobileNumber: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } }
      ];
    }

    // Fetch registrations with pagination
    const registrations = await DSAPartnerRegistration.find(filter)
      .populate('reviewedBy', 'name username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await DSAPartnerRegistration.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: 'DSA partner registrations retrieved successfully',
      registrations,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalRegistrations: total,
        hasNext: skip + registrations.length < total,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Get DSA partner registrations error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching registrations'
    });
  }
};

/**
 * Get a specific DSA partner registration (Admin only)
 * GET /api/dsa-partner-registration/:id
 */
export const getDSAPartnerRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    // Verify admin access
    const adminId = getIdFromAdmin(req);
    if (!adminId) {
      return res.status(401).json({ 
        success: false,
        message: 'Unauthorized - Admin access required' 
      });
    }

    const admin = await usermodel.findOne({ 
      _id: adminId, 
      userType: 'admin' 
    });
    
    if (!admin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied - Admin privileges required'
      });
    }

    const registration = await DSAPartnerRegistration.findById(id)
      .populate('reviewedBy', 'name username')
      .populate('contactAttempts.contactedBy', 'name username');

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'DSA partner registration not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'DSA partner registration retrieved successfully',
      registration
    });

  } catch (error) {
    console.error('Get DSA partner registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching registration'
    });
  }
};

/**
 * Update DSA partner registration status (Admin only)
 * PUT /api/dsa-partner-registration/:id/status
 */
export const updateDSAPartnerRegistrationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rejectionReason, adminNotes, priority, followUpDate } = req.body;

    // Verify admin access
    const adminId = getIdFromAdmin(req);
    if (!adminId) {
      return res.status(401).json({ 
        success: false,
        message: 'Unauthorized - Admin access required' 
      });
    }

    const admin = await usermodel.findOne({ 
      _id: adminId, 
      userType: 'admin' 
    });
    
    if (!admin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied - Admin privileges required'
      });
    }

    const registration = await DSAPartnerRegistration.findById(id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'DSA partner registration not found'
      });
    }

    // Validate status
    const validStatuses = ['Pending', 'Under Review', 'Approved', 'Rejected'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
      });
    }

    // Update registration
    const updateData = {};
    if (status) updateData.status = status;
    if (rejectionReason) updateData.rejectionReason = rejectionReason;
    if (adminNotes) updateData.adminNotes = adminNotes;
    if (priority) updateData.priority = priority;
    if (followUpDate) updateData.followUpDate = new Date(followUpDate);
    
    if (status && status !== 'Pending') {
      updateData.reviewedBy = adminId;
      updateData.reviewDate = new Date();
    }

    const updatedRegistration = await DSAPartnerRegistration.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate('reviewedBy', 'name username');

    // Send SMS notification if status changed
    if (status && status !== registration.status) {
      try {
        const smsResult = await sendStatusUpdateSMS(
          registration.mobileNumber,
          status,
          registration.fullName,
          rejectionReason || adminNotes
        );
        
        console.log('Status update SMS notification result:', smsResult);
      } catch (smsError) {
        console.error('Failed to send status update SMS notification:', smsError);
        // Don't fail the update process if SMS fails
      }
    }

    res.status(200).json({
      success: true,
      message: 'DSA partner registration status updated successfully',
      registration: updatedRegistration
    });

  } catch (error) {
    console.error('Update DSA partner registration status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during status update'
    });
  }
};

/**
 * Add contact attempt to DSA partner registration (Admin only)
 * POST /api/dsa-partner-registration/:id/contact-attempt
 */
export const addContactAttempt = async (req, res) => {
  try {
    const { id } = req.params;
    const { method, notes } = req.body;

    // Verify admin access
    const adminId = getIdFromAdmin(req);
    if (!adminId) {
      return res.status(401).json({ 
        success: false,
        message: 'Unauthorized - Admin access required' 
      });
    }

    const admin = await usermodel.findOne({ 
      _id: adminId, 
      userType: 'admin' 
    });
    
    if (!admin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied - Admin privileges required'
      });
    }

    const registration = await DSAPartnerRegistration.findById(id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'DSA partner registration not found'
      });
    }

    // Validate method
    const validMethods = ['Call', 'Email', 'SMS', 'WhatsApp'];
    if (!method || !validMethods.includes(method)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact method. Must be one of: ' + validMethods.join(', ')
      });
    }

    // Add contact attempt
    const contactAttempt = {
      method,
      notes: notes || '',
      contactedBy: adminId
    };

    registration.contactAttempts.push(contactAttempt);
    await registration.save();

    res.status(200).json({
      success: true,
      message: 'Contact attempt added successfully',
      contactAttempt: {
        ...contactAttempt,
        date: contactAttempt.date,
        contactedBy: admin.name
      }
    });

  } catch (error) {
    console.error('Add contact attempt error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while adding contact attempt'
    });
  }
};

/**
 * Get DSA partner registration statistics (Admin only)
 * GET /api/dsa-partner-registration/stats
 */
export const getDSAPartnerRegistrationStats = async (req, res) => {
  try {
    // Verify admin access
    const adminId = getIdFromAdmin(req);
    if (!adminId) {
      return res.status(401).json({ 
        success: false,
        message: 'Unauthorized - Admin access required' 
      });
    }

    const admin = await usermodel.findOne({ 
      _id: adminId, 
      userType: 'admin' 
    });
    
    if (!admin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied - Admin privileges required'
      });
    }

    // Get statistics
    const totalRegistrations = await DSAPartnerRegistration.countDocuments();
    const pendingRegistrations = await DSAPartnerRegistration.countDocuments({ status: 'Pending' });
    const underReviewRegistrations = await DSAPartnerRegistration.countDocuments({ status: 'Under Review' });
    const approvedRegistrations = await DSAPartnerRegistration.countDocuments({ status: 'Approved' });
    const rejectedRegistrations = await DSAPartnerRegistration.countDocuments({ status: 'Rejected' });

    // Get registrations by city
    const registrationsByCity = await DSAPartnerRegistration.aggregate([
      { $group: { _id: '$city', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Get registrations by experience
    const registrationsByExperience = await DSAPartnerRegistration.aggregate([
      { $group: { _id: '$experience', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get registrations by objective
    const registrationsByObjective = await DSAPartnerRegistration.aggregate([
      { $group: { _id: '$objective', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get recent registrations (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentRegistrations = await DSAPartnerRegistration.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    res.status(200).json({
      success: true,
      message: 'DSA partner registration statistics retrieved successfully',
      stats: {
        total: totalRegistrations,
        pending: pendingRegistrations,
        underReview: underReviewRegistrations,
        approved: approvedRegistrations,
        rejected: rejectedRegistrations,
        recent: recentRegistrations,
        byCity: registrationsByCity,
        byExperience: registrationsByExperience,
        byObjective: registrationsByObjective
      }
    });

  } catch (error) {
    console.error('Get DSA partner registration stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching statistics'
    });
  }
};
