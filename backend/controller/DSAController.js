import usermodel from '../model/usermodel.js';
import bcrypt from 'bcryptjs';

/**
 * Create a new DSA by an employee
 */
export const createDSA = async (req, res) => {
  try {
    const {
      name,
      phone,
      password,
      email,
      address,
      createdBy // Employee ID who created this DSA
    } = req.body;

    // Validate required fields
    if (!name || !phone || !password || !email || !createdBy) {
      return res.status(400).json({
        message: 'Missing required fields: name, phone, password, email, createdBy'
      });
    }

    // Check if phone already exists
    const existingPhone = await usermodel.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({
        message: 'Phone number already registered'
      });
    }

    // Check if email already exists
    const existingEmail = await usermodel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        message: 'Email already registered'
      });
    }

    // Get the employee who is creating the DSA
    let employee = await usermodel.findOne({ 
      employeeId: createdBy, 
      userType: 'employee' 
    });
    
    if (!employee && createdBy.match(/^[0-9a-fA-F]{24}$/)) {
      // Try finding by _id if it's a valid ObjectId
      employee = await usermodel.findOne({ 
        _id: createdBy, 
        userType: 'employee' 
      });
    }
    
    if (!employee) {
      return res.status(400).json({
        message: 'Invalid employee ID or employee not found'
      });
    }

    // Generate DSA ID using current date
    const dsaId = await generateDSAId();

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create DSA object
    const dsaData = {
      name,
      phone,
      email,
      password: hashedPassword,
      wittywealth: dsaId, // Use DSA ID as wittywealth username
      username: dsaId, // Set the generated DSA ID as username
      referenceId: dsaId, // Use DSA ID as reference ID
      userType: 'dsa',
      kycStatus: 'Pending', // DSAs need to complete KYC
      kycStep: '1', // Start with step 1
      isActive: true,
      address: address || '',
      refferdBy: employee._id, // Track who created this DSA
      dsaDetails: {
        createdBy: employee._id,
        createdDate: new Date(),
        status: 'active',
        commissionRate: 0.05, // Default 5% commission
        totalClients: 0,
        totalCommission: 0
      }
    };

    // Create DSA
    const newDSA = new usermodel(dsaData);
    await newDSA.save();

    // Return success response (without password)
    const { password: _, ...dsaResponse } = newDSA.toObject();
    
    res.status(201).json({
      message: 'DSA created successfully',
      username: dsaId,
      password: password, // Return the original password for display
      dsa: dsaResponse
    });

  } catch (error) {
    console.error('DSA creation error:', error);
    res.status(500).json({
      message: 'Internal server error during DSA creation'
    });
  }
};

/**
 * Get all DSAs created by a specific employee
 */
export const getDSAsByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    
    console.log('Getting DSAs for employee ID:', employeeId);

    // Try multiple fields to find the employee
    let employee = null;
    
    // 1. Try by employeeId field (like "emp001")
    employee = await usermodel.findOne({ 
      employeeId: employeeId, 
      userType: 'employee' 
    });
    
    // 2. If not found, try by username (like "ww5")
    if (!employee) {
      employee = await usermodel.findOne({ 
        username: employeeId, 
        userType: 'employee' 
      });
    }
    
    // 3. If not found, try by _id (if it's a valid ObjectId)
    if (!employee && employeeId.match(/^[0-9a-fA-F]{24}$/)) {
      employee = await usermodel.findOne({ 
        _id: employeeId, 
        userType: 'employee' 
      });
    }
    
    if (!employee) {
      console.log('Employee not found for ID:', employeeId);
      return res.status(400).json({
        message: 'Invalid employee ID or employee not found'
      });
    }
    
    console.log('Employee found:', employee.name, 'ID:', employee._id);

    // Get DSAs created by this employee using the actual employee's _id
    const dsas = await usermodel.find(
      { 
        userType: 'dsa',
        refferdBy: employee._id 
      },
      { password: 0, token: 0 } // Exclude hashed password but keep temporaryPassword
    ).sort({ createdAt: -1 });

    res.status(200).json({
      dsas,
      count: dsas.length
    });

  } catch (error) {
    console.error('Get DSAs by employee error:', error);
    res.status(500).json({
      message: 'Internal server error while fetching DSAs'
    });
  }
};

/**
 * Get all DSAs (admin only)
 */
export const getAllDSAs = async (req, res) => {
  try {
    const dsas = await usermodel.find(
      { userType: 'dsa' },
      { password: 0, token: 0 }
    ).populate('refferdBy', 'name employeeId').sort({ createdAt: -1 });

    res.status(200).json({
      dsas,
      count: dsas.length
    });

  } catch (error) {
    console.error('Get all DSAs error:', error);
    res.status(500).json({
      message: 'Internal server error while fetching DSAs'
    });
  }
};

/**
 * Update DSA status
 */
export const updateDSAStatus = async (req, res) => {
  try {
    const { dsaId } = req.params;
    const { status } = req.body;

    if (!['active', 'inactive', 'suspended'].includes(status)) {
      return res.status(400).json({
        message: 'Invalid status. Must be active, inactive, or suspended'
      });
    }

    const dsa = await usermodel.findOneAndUpdate(
      { _id: dsaId, userType: 'dsa' },
      { 
        isActive: status === 'active',
        'dsaDetails.status': status,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!dsa) {
      return res.status(404).json({
        message: 'DSA not found'
      });
    }

    res.status(200).json({
      message: 'DSA status updated successfully',
      dsa: {
        id: dsa._id,
        name: dsa.name,
        wittywealth: dsa.wittywealth,
        status: dsa.dsaDetails?.status,
        isActive: dsa.isActive
      }
    });

  } catch (error) {
    console.error('Update DSA status error:', error);
    res.status(500).json({
      message: 'Internal server error while updating DSA status'
    });
  }
};

// DSA ID Generator function - date-based with sequential counter
const generateDSAId = async () => {
  try {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const dateString = `${year}${month}${day}`;
    
    // Count existing DSAs created today
    const startOfDay = new Date(currentDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(currentDate);
    endOfDay.setHours(23, 59, 59, 999);
    
    const todayDSAs = await usermodel.countDocuments({
      userType: 'dsa',
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });
    
    // Generate sequential number for today (01, 02, 03, etc.)
    const sequentialNumber = (todayDSAs + 1).toString().padStart(2, '0');
    
    return `ww${dateString}${sequentialNumber}`;
  } catch (error) {
    console.error('Error generating DSA ID:', error);
    throw new Error('Failed to generate DSA ID');
  }
};
