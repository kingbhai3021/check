import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import the user model
import usermodel from '../model/usermodel.js';

// Test employees data
const testEmployees = [
  {
    name: "John Doe",
    phone: "9876543210",
    password: "emp123456",
    employeeId: "WW1001",
    referenceId: "WW1001",
    userType: "employee",
    kycStatus: "Approved",
    kycStep: "Completed",
    isActive: true,
    employeeDetails: {
      department: "IT",
      designation: "Senior Developer",
      joiningDate: new Date("2024-01-15"),
      salary: 75000,
      permissions: ["view_clients", "view_reports", "edit_clients", "manage_employees"]
    }
  },
  {
    name: "Jane Smith",
    phone: "9876543211",
    password: "emp123456",
    employeeId: "WW1002",
    referenceId: "WW1002",
    userType: "employee",
    kycStatus: "Approved",
    kycStep: "Completed",
    isActive: true,
    employeeDetails: {
      department: "HR",
      designation: "HR Manager",
      joiningDate: new Date("2024-03-01"),
      salary: 65000,
      permissions: ["view_clients", "view_reports", "manage_employees"]
    }
  },
  {
    name: "Mike Johnson",
    phone: "9876543212",
    password: "emp123456",
    employeeId: "WW1003",
    referenceId: "WW1003",
    userType: "employee",
    kycStatus: "Approved",
    kycStep: "Completed",
    isActive: true,
    employeeDetails: {
      department: "Finance",
      designation: "Financial Analyst",
      joiningDate: new Date("2024-06-01"),
      salary: 55000,
      permissions: ["view_clients", "view_reports", "financial_access"]
    }
  }
];

async function seedEmployees() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ Connected to MongoDB');

    // Clear existing test employees
    await usermodel.deleteMany({ employeeId: { $in: ["WW1001", "WW1002", "WW1003"] } });
    console.log('🧹 Cleared existing test employees');

    // Hash passwords and create employees
    const hashedEmployees = await Promise.all(
      testEmployees.map(async (employee) => {
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(employee.password, saltRounds);
        return {
          ...employee,
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date()
        };
      })
    );

    // Insert employees
    const result = await usermodel.insertMany(hashedEmployees);
    console.log(`✅ Successfully created ${result.length} test employees`);

    // Display created employees
    console.log('\n📋 Test Employees Created:');
    result.forEach(emp => {
      console.log(`   ${emp.employeeId}: ${emp.name} (${emp.employeeDetails.department})`);
      console.log(`   Login: ${emp.employeeId} / emp123456`);
    });

    console.log('\n🎯 You can now test the employee login system!');
    console.log('   Use any of the employee IDs above with password: emp123456');

  } catch (error) {
    console.error('❌ Error seeding employees:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
  }
}

// Run the seed function
seedEmployees();













