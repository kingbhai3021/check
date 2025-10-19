import LoanEligibility from '../model/LoanEligibility.js';

/**
 * Submit a new loan eligibility form
 * POST /api/loan-eligibility/submit
 */
export const submitLoanEligibility = async (req, res) => {
    try {
        const eligibilityData = req.body;

        // Basic validation
        if (!eligibilityData.fullName || !eligibilityData.email || !eligibilityData.phone || !eligibilityData.loanType) {
            return res.status(400).json({ 
                success: false, 
                message: 'Required fields are missing.' 
            });
        }

        // Validate email format
        if (!/^\S+@\S+\.\S+$/.test(eligibilityData.email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email format.' 
            });
        }

        // Validate phone format
        if (!/^[6-9]\d{9}$/.test(eligibilityData.phone)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid Indian mobile number format.' 
            });
        }

        // Calculate eligibility score (basic calculation)
        let eligibilityScore = 0;
        
        // Income-based scoring
        if (eligibilityData.monthlyIncome >= 50000) eligibilityScore += 30;
        else if (eligibilityData.monthlyIncome >= 30000) eligibilityScore += 20;
        else if (eligibilityData.monthlyIncome >= 20000) eligibilityScore += 15;
        else eligibilityScore += 10;

        // Experience-based scoring
        if (eligibilityData.workExperience >= 5) eligibilityScore += 25;
        else if (eligibilityData.workExperience >= 3) eligibilityScore += 20;
        else if (eligibilityData.workExperience >= 1) eligibilityScore += 15;
        else eligibilityScore += 10;

        // Employment type scoring
        if (eligibilityData.employmentType === 'Salaried') eligibilityScore += 20;
        else if (eligibilityData.employmentType === 'Self-Employed') eligibilityScore += 15;
        else if (eligibilityData.employmentType === 'Business Owner') eligibilityScore += 10;
        else eligibilityScore += 5;

        // Credit score scoring (if provided)
        if (eligibilityData.creditScore) {
            if (eligibilityData.creditScore >= 750) eligibilityScore += 25;
            else if (eligibilityData.creditScore >= 700) eligibilityScore += 20;
            else if (eligibilityData.creditScore >= 650) eligibilityScore += 15;
            else eligibilityScore += 10;
        } else {
            eligibilityScore += 10; // Default score if not provided
        }

        // Calculate max eligible amount (basic calculation)
        let maxEligibleAmount = 0;
        if (eligibilityData.loanType === 'Personal Loan') {
            maxEligibleAmount = eligibilityData.monthlyIncome * 12; // 12 months salary
        } else if (eligibilityData.loanType === 'Home Loan') {
            maxEligibleAmount = eligibilityData.monthlyIncome * 60; // 5 years salary
        } else if (eligibilityData.loanType === 'Car Loan') {
            maxEligibleAmount = eligibilityData.monthlyIncome * 24; // 2 years salary
        } else if (eligibilityData.loanType === 'Business Loan') {
            maxEligibleAmount = eligibilityData.monthlyIncome * 36; // 3 years salary
        } else {
            maxEligibleAmount = eligibilityData.monthlyIncome * 18; // 1.5 years salary
        }

        // Calculate interest rate based on eligibility score
        let interestRate = 0;
        if (eligibilityScore >= 80) interestRate = 8.5;
        else if (eligibilityScore >= 70) interestRate = 9.5;
        else if (eligibilityScore >= 60) interestRate = 10.5;
        else if (eligibilityScore >= 50) interestRate = 12.0;
        else interestRate = 14.0;

        const newEligibility = new LoanEligibility({
            ...eligibilityData,
            eligibilityScore,
            maxEligibleAmount,
            interestRate,
            status: 'Pending'
        });

        await newEligibility.save();

        res.status(201).json({ 
            success: true, 
            message: 'Loan eligibility form submitted successfully! We will contact you within 24 hours.',
            eligibility: {
                id: newEligibility._id,
                eligibilityScore,
                maxEligibleAmount,
                interestRate,
                status: 'Pending'
            }
        });

    } catch (error) {
        console.error('Error submitting loan eligibility:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error during form submission.' 
        });
    }
};

/**
 * Get all loan eligibility applications (Call Centre/Admin only)
 * GET /api/loan-eligibility
 */
export const getAllLoanEligibility = async (req, res) => {
    try {
        const { loanType, status, page = 1, limit = 10, search } = req.query;
        
        let filter = {};
        let query = {};

        if (loanType && loanType !== 'all') {
            filter.loanType = loanType;
        }

        if (status && status !== 'all') {
            filter.status = status;
        }

        if (search) {
            query.$or = [
                { fullName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
                { companyName: { $regex: search, $options: 'i' } }
            ];
        }

        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            sort: { createdAt: -1 }
        };

        const eligibilityApplications = await LoanEligibility.paginate({ ...filter, ...query }, options);

        res.status(200).json({ 
            success: true, 
            ...eligibilityApplications 
        });

    } catch (error) {
        console.error('Error fetching loan eligibility applications:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error while fetching applications.' 
        });
    }
};

/**
 * Get loan eligibility statistics (Call Centre/Admin only)
 * GET /api/loan-eligibility/stats
 */
export const getLoanEligibilityStats = async (req, res) => {
    try {
        const totalApplications = await LoanEligibility.countDocuments();
        const pendingApplications = await LoanEligibility.countDocuments({ status: 'Pending' });
        const approvedApplications = await LoanEligibility.countDocuments({ status: 'Approved' });
        const rejectedApplications = await LoanEligibility.countDocuments({ status: 'Rejected' });

        // Group by loan type
        const applicationsByLoanType = await LoanEligibility.aggregate([
            { $group: { _id: '$loanType', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Group by status
        const applicationsByStatus = await LoanEligibility.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Recent applications (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentApplications = await LoanEligibility.countDocuments({
            createdAt: { $gte: sevenDaysAgo }
        });

        res.status(200).json({
            success: true,
            totalApplications,
            pendingApplications,
            approvedApplications,
            rejectedApplications,
            recentApplications,
            applicationsByLoanType,
            applicationsByStatus
        });

    } catch (error) {
        console.error('Error fetching loan eligibility stats:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error while fetching statistics.' 
        });
    }
};

/**
 * Update loan eligibility status (Call Centre/Admin only)
 * PUT /api/loan-eligibility/:id/status
 */
export const updateLoanEligibilityStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, remarks, assignedTo } = req.body;

        const eligibility = await LoanEligibility.findById(id);

        if (!eligibility) {
            return res.status(404).json({ 
                success: false, 
                message: 'Loan eligibility application not found.' 
            });
        }

        eligibility.status = status || eligibility.status;
        eligibility.remarks = remarks || eligibility.remarks;
        eligibility.assignedTo = assignedTo || eligibility.assignedTo;
        eligibility.reviewedBy = req.user?.id;
        eligibility.reviewDate = new Date();

        await eligibility.save();

        res.status(200).json({ 
            success: true, 
            message: 'Loan eligibility status updated successfully.',
            eligibility 
        });

    } catch (error) {
        console.error('Error updating loan eligibility status:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error.' 
        });
    }
};

/**
 * Get a single loan eligibility application (Call Centre/Admin only)
 * GET /api/loan-eligibility/:id
 */
export const getLoanEligibilityById = async (req, res) => {
    try {
        const { id } = req.params;
        const eligibility = await LoanEligibility.findById(id);

        if (!eligibility) {
            return res.status(404).json({ 
                success: false, 
                message: 'Loan eligibility application not found.' 
            });
        }

        res.status(200).json({ 
            success: true, 
            eligibility 
        });

    } catch (error) {
        console.error('Error fetching loan eligibility by ID:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error.' 
        });
    }
};

