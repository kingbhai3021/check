import usermodel from '../model/usermodel.js';
import { generateNextEmployeeId, isEmployeeIdAvailable } from '../utils/employeeIdGenerator.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Register a new employee
 */
export const registerEmployee = async (req, res) => {
  try {
    const {
      name,
      phone,
      password,
      department,
      designation,
      joiningDate,
      salary,
      address,
      managerId,
      permissions
    } = req.body;

    // Validate required fields
    if (!name || !phone || !password || !department || !designation) {
      return res.status(400).json({
        message: 'Missing required fields: name, phone, password, department, designation'
      });
    }

    // Check if phone already exists
    const existingPhone = await usermodel.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({
        message: 'Phone number already registered'
      });
    }

    // Generate unique employee ID
    const employeeId = await generateNextEmployeeId();
    
    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create employee object
    const employeeData = {
      name,
      phone,
      password: hashedPassword,
      employeeId,
      referenceId: employeeId, // Use employee ID as reference ID
      userType: 'employee',
      kycStatus: 'Approved', // Employees don't need KYC
      kycStep: 'Completed',
      isActive: true,
      address: address || '',
      employeeDetails: {
        department,
        designation,
        joiningDate: joiningDate ? new Date(joiningDate) : new Date(),
        salary: salary || 0,
        manager: managerId || null,
        permissions: permissions || ['view_clients', 'view_reports']
      }
    };

    // Create employee
    const newEmployee = new usermodel(employeeData);
    await newEmployee.save();

    // Return success response (without password)
    const { password: _, ...employeeResponse } = newEmployee.toObject();
    
    res.status(201).json({
      message: 'Employee registered successfully',
      employee: employeeResponse
    });

  } catch (error) {
    console.error('Employee registration error:', error);
    res.status(500).json({
      message: 'Internal server error during employee registration'
    });
  }
};

/**
 * Get all employees
 */
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await usermodel.find(
      { userType: { $in: ['employee', 'sub_employee'] } },
      { password: 0, token: 0 }
    ).populate('employeeDetails.manager', 'name employeeId');

    res.status(200).json({
      employees,
      count: employees.length
    });
  } catch (error) {
    console.error('Get employees error:', error);
    res.status(500).json({
      message: 'Internal server error while fetching employees'
    });
  }
};

/**
 * Get employee by ID
 */
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const employee = await usermodel.findById(id, { password: 0, token: 0 })
      .populate('employeeDetails.manager', 'name employeeId');

    if (!employee) {
      return res.status(404).json({
        message: 'Employee not found'
      });
    }

    res.status(200).json({
      employee
    });
  } catch (error) {
    console.error('Get employee error:', error);
    res.status(500).json({
      message: 'Internal server error while fetching employee'
    });
  }
};

/**
 * Update employee
 */
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove sensitive fields from update
    delete updateData.password;
    delete updateData.employeeId;
    delete updateData.userType;

    const updatedEmployee = await usermodel.findByIdAndUpdate(
      id,
      { 
        ...updateData,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    ).select('-password -token');

    if (!updatedEmployee) {
      return res.status(404).json({
        message: 'Employee not found'
      });
    }

    res.status(200).json({
      message: 'Employee updated successfully',
      employee: updatedEmployee
    });
  } catch (error) {
    console.error('Update employee error:', error);
    res.status(500).json({
      message: 'Internal server error while updating employee'
    });
  }
};

/**
 * Delete employee
 */
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedEmployee = await usermodel.findByIdAndDelete(id);
    
    if (!deletedEmployee) {
      return res.status(404).json({
        message: 'Employee not found'
      });
    }

    res.status(200).json({
      message: 'Employee deleted successfully'
    });
  } catch (error) {
    console.error('Delete employee error:', error);
    res.status(500).json({
      message: 'Internal server error while deleting employee'
    });
  }
};


