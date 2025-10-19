import mongoose from 'mongoose';
import LoanEligibility from '../model/LoanEligibility.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const testLoanEligibility = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wittywealth');
        console.log('Connected to MongoDB');

        // Test data
        const testData = {
            fullName: 'Test User',
            email: 'test@example.com',
            phone: '9876543210',
            dateOfBirth: new Date('1990-01-01'),
            gender: 'Male',
            maritalStatus: 'Single',
            currentAddress: {
                address: 'Test Address',
                city: 'Mumbai',
                state: 'Maharashtra',
                pincode: '400001',
                country: 'India'
            },
            permanentAddress: {
                address: 'Test Address',
                city: 'Mumbai',
                state: 'Maharashtra',
                pincode: '400001',
                country: 'India'
            },
            employmentType: 'Salaried',
            companyName: 'Test Company',
            designation: 'Software Engineer',
            workExperience: 5,
            monthlyIncome: 50000,
            loanType: 'Personal Loan',
            loanAmount: 500000,
            loanTenure: 5,
            purpose: 'Personal use',
            existingLoans: 'No',
            existingLoanDetails: '',
            creditScore: 750,
            eligibilityScore: 85,
            maxEligibleAmount: 600000,
            interestRate: 8.5,
            status: 'Pending'
        };

        // Create test eligibility
        const newEligibility = new LoanEligibility(testData);
        await newEligibility.save();
        
        console.log('✅ Test loan eligibility created successfully!');
        console.log('   ID:', newEligibility._id);
        console.log('   Name:', newEligibility.fullName);
        console.log('   Loan Type:', newEligibility.loanType);
        console.log('   Amount:', newEligibility.loanAmount);
        console.log('   Eligibility Score:', newEligibility.eligibilityScore);

        // Test query
        const count = await LoanEligibility.countDocuments();
        console.log('   Total applications in database:', count);

    } catch (error) {
        console.error('❌ Error testing loan eligibility:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

// Run the script
testLoanEligibility();

