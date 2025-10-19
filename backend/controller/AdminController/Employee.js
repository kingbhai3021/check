import ChildrenModel from "../../model/children.js";
import UserModel from "../../model/usermodel.js";
import Counter from "../../model/Counter.js";
import { GenReferance, CreatePassword, wittywealth } from "../signupcontroller.js";
import { getIdFromAdmin } from "../../utils/auth.js";
import bcrypt from 'bcryptjs';

export const CreateEmployee = async (req, res) => {
    try {
        console.log('CreateEmployee - Request body:', JSON.stringify(req.body, null, 2));
        
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
            department,
            designation,
            joiningDate,
            salary,
            workExperience,
            education,
            // Additional Information
            skills,
            languages,
            certifications
        } = req.body;

        // Validate required fields
        if (!name || !phone || !email || !department || !designation) {
            return res.status(400).json({
                message: "Missing required fields: name, phone, email, department, designation"
            });
        }

        // Here a Admin id 
        const id = getIdFromAdmin(req);
        console.log('Admin ID from token:', id);
        console.log('Cookies:', req.cookies);
        
        if(!id) {
            return res.status(401).json({ 
                message: "Unauthorized - Admin not logged in or invalid token", 
                user: null,
                debug: {
                    hasCookie: !!req.cookies?.token,
                    cookiePreview: req.cookies?.token ? req.cookies.token.substring(0, 20) + '...' : 'none'
                }
            });
        }

        // Check if phone or email already exists
        const existingUser = await UserModel.findOne({
            $or: [
                { phone },
                { email }
            ]
        });

        if (existingUser) {
            // Determine which field is conflicting
            let conflictField = '';
            if (existingUser.phone === phone) conflictField = 'phone number';
            if (existingUser.email === email) conflictField = conflictField ? 'phone and email' : 'email';
            
            return res.status(409).json({ 
                message: `User with this ${conflictField} already exists`, 
                conflictField,
                existingUser: {
                    username: existingUser?.username || existingUser?.wittywealth,
                    name: existingUser?.name,
                    userType: existingUser?.userType,
                    phone: existingUser?.phone,
                    email: existingUser?.email
                }
            });
        }

        // Generate BDE ID using atomic counter
        const bdeId = await generateBDEId();
        
        // Generate reference ID and password
        const refId = GenReferance();
        const randomPass = CreatePassword();
        
        // Hash the password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(randomPass, saltRounds);

        // Create the user with comprehensive details
        const Acnumber = wittywealth(phone);
        const newUser = await UserModel.create({
            name,
            wittywealth: Acnumber,
            username: bdeId, // Set the generated BDE ID as username
            phone,
            email,
            referenceId: refId,
            password: hashedPassword,
            userType: "employee",
            kycStatus: "Approved", // Employees are pre-verified
            kycStep: "Completed",
            isActive: true,
            refferdBy: id,
            employeeDetails: {
                department,
                designation,
                joiningDate: joiningDate ? new Date(joiningDate) : new Date(),
                salary: salary || 0,
                manager: id, // Admin is the manager initially
                permissions: ['view_clients', 'view_reports'], // Default permissions
                // Personal Information
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
                gender,
                maritalStatus,
                // Identity Documents
                panNumber: panNumber ? panNumber.toUpperCase() : '',
                aadharNumber: aadharNumber || '',
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
                // Compliance and Security
                backgroundCheckStatus: 'Pending',
                securityClearance: 'None'
            }
        });

        // Create children entry
        await ChildrenModel.create({
            _id: newUser._id,
            role: newUser.userType,
            parentId: id
        });

        return res.status(201).json({
            message: "Employee created successfully",
            userId: newUser._id,
            username: bdeId,
            password: randomPass,
            employeeDetails: {
                name: newUser.name,
                email: newUser.email,
                department: newUser.employeeDetails.department,
                designation: newUser.employeeDetails.designation
            }
        });

    } catch (error) {
        console.error("Error in Employee Creation:", error);
        console.error("Error stack:", error.stack);
        return res.status(500).json({ 
            message: "Internal Server Error", 
            error: error.message,
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

/**
 * Get all employees
 */
export const GetAllEmployees = async (req, res) => {
    try {
        // Get admin id for authorization
        const id = getIdFromAdmin(req);
        if(!id) {
            return res.status(401).json({ message: "Unauthorized", employees: [] });
        }

        // Fetch all employees
        const employees = await UserModel.find({ userType: "employee" })
            .select('-password') // Exclude password from response
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Employees fetched successfully",
            employees: employees
        });

    } catch (error) {
        console.error("Error fetching employees:", error);
        return res.status(500).json({ 
            message: "Internal Server Error",
            employees: []
        });
    }
};

/**
 * Update employee
 */
export const UpdateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Get admin id for authorization
        const adminId = getIdFromAdmin(req);
        if(!adminId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Update employee
        const updatedEmployee = await UserModel.findByIdAndUpdate(
            id,
            { 
                ...updateData,
                employeeDetails: {
                    ...updateData.employeeDetails,
                    // Convert skills and languages arrays if they're strings
                    skills: Array.isArray(updateData.skills) ? updateData.skills : 
                           (updateData.skills ? updateData.skills.split(',').map(s => s.trim()).filter(s => s) : []),
                    languages: Array.isArray(updateData.languages) ? updateData.languages : 
                              (updateData.languages ? updateData.languages.split(',').map(s => s.trim()).filter(s => s) : [])
                }
            },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        return res.status(200).json({
            message: "Employee updated successfully",
            employee: updatedEmployee
        });

    } catch (error) {
        console.error("Error updating employee:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

/**
 * Delete employee
 */
export const DeleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        // Get admin id for authorization
        const adminId = getIdFromAdmin(req);
        if(!adminId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Delete employee
        const deletedEmployee = await UserModel.findByIdAndDelete(id);

        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Also delete from Children collection
        await ChildrenModel.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Employee deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting employee:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

/**
 * Generate BDE ID using atomic counter
 */
const generateBDEId = async () => {
    try {
        // Use findOneAndUpdate for atomic operation
        const counter = await Counter.findOneAndUpdate(
            { _id: 'bde_counter' },
            { $inc: { sequence_value: 1 } },
            { 
                upsert: true, // Create if doesn't exist
                new: true,    // Return updated document
                setDefaultsOnInsert: true // Set default values on insert
            }
        );
        
        return `ww${counter.sequence_value}`;
    } catch (error) {
        console.error('Error generating BDE ID:', error);
        throw new Error('Failed to generate BDE ID');
    }
};
