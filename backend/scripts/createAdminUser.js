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

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Use MONGO_URL instead of MONGODB_URI to match the main config
    const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/wittywealth';
    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URL:', mongoUrl);
    
    await mongoose.connect(mongoUrl);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Generate a simple reference ID
const generateReferenceId = () => {
  return 'ADMIN' + Date.now().toString().slice(-6);
};

// Create admin user
const createAdminUser = async () => {
  try {
    // Check if admin user already exists
    const existingAdmin = await usermodel.findOne({ userType: 'admin' });
    
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.wittywealth);
      console.log('You can use these credentials to login:');
      console.log('Username:', existingAdmin.wittywealth);
      console.log('Password:', existingAdmin.password);
      return;
    }

    // Hash the password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash('admin123', saltRounds);

    // Create new admin user
    const adminUser = new usermodel({
      wittywealth: 'admin',
      username: 'admin', // Set username for RBAC
      password: hashedPassword,
      userType: 'admin',
      kycStatus: 'Approved',
      kycStep: '6', // Required field - KYC completed
      referenceId: generateReferenceId(), // Required field
      isActive: true,
      phone: '9999999999',
      email: 'admin@wittywealth.com',
      firstName: 'Admin',
      lastName: 'User',
      loginAt: Date.now()
    });

    await adminUser.save();
    console.log('Admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('Reference ID:', adminUser.referenceId);
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

// Main function
const main = async () => {
  await connectDB();
  await createAdminUser();
  mongoose.connection.close();
  console.log('Script completed');
};

// Run the script
main().catch(console.error);
