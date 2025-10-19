import mongoose from 'mongoose';
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

// Check admin users
const checkAdminUsers = async () => {
  try {
    console.log('\n=== Checking Admin Users ===\n');
    
    // Check all users
    const allUsers = await usermodel.find({});
    console.log(`Total users in database: ${allUsers.length}`);
    
    // Check admin users specifically
    const adminUsers = await usermodel.find({ userType: 'admin' });
    console.log(`Admin users found: ${adminUsers.length}`);
    
    if (adminUsers.length > 0) {
      console.log('\n=== Admin User Details ===');
      adminUsers.forEach((admin, index) => {
        console.log(`\nAdmin ${index + 1}:`);
        console.log(`  ID: ${admin._id}`);
        console.log(`  Username: ${admin.wittywealth}`);
        console.log(`  Password: ${admin.password}`);
        console.log(`  User Type: ${admin.userType}`);
        console.log(`  KYC Status: ${admin.kycStatus}`);
        console.log(`  KYC Step: ${admin.kycStep}`);
        console.log(`  Reference ID: ${admin.referenceId}`);
        console.log(`  Is Active: ${admin.isActive}`);
        console.log(`  Phone: ${admin.phone}`);
        console.log(`  Email: ${admin.email}`);
      });
    } else {
      console.log('\nNo admin users found in database.');
    }
    
    // Check for any user with username 'admin'
    const adminUsername = await usermodel.findOne({ wittywealth: 'admin' });
    if (adminUsername) {
      console.log('\n=== User with username "admin" ===');
      console.log(`  ID: ${adminUsername._id}`);
      console.log(`  Username: ${adminUsername.wittywealth}`);
      console.log(`  Password: ${adminUsername.password}`);
      console.log(`  User Type: ${adminUsername.userType}`);
      console.log(`  KYC Status: ${adminUsername.kycStatus}`);
      console.log(`  KYC Step: ${adminUsername.kycStep}`);
      console.log(`  Reference ID: ${adminUsername.referenceId}`);
      console.log(`  Is Active: ${adminUsername.isActive}`);
    }
    
  } catch (error) {
    console.error('Error checking admin users:', error);
  }
};

// Main function
const main = async () => {
  await connectDB();
  await checkAdminUsers();
  mongoose.connection.close();
  console.log('\nScript completed');
};

// Run the script
main().catch(console.error);
