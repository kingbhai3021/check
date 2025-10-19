import InsuranceApplication from '../model/InsuranceApplication.js';

/**
 * Submit a new insurance application
 * POST /api/insurance/submit
 */
export const submitInsuranceApplication = async (req, res) => {
    try {
        const applicationData = req.body;

        // Basic validation
        if (!applicationData.fullName || !applicationData.email || !applicationData.phone || !applicationData.insuranceType) {
            return res.status(400).json({ 
                success: false, 
                message: 'Required fields are missing.' 
            });
        }

        // Validate email format
        if (!/^\S+@\S+\.\S+$/.test(applicationData.email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email format.' 
            });
        }

        // Validate phone format
        if (!/^[6-9]\d{9}$/.test(applicationData.phone)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid Indian mobile number format.' 
            });
        }

        const newApplication = new InsuranceApplication({
            ...applicationData,
            status: 'Pending'
        });

        await newApplication.save();

        res.status(201).json({ 
            success: true, 
            message: 'Insurance application submitted successfully! We will contact you within 24 hours.',
            application: {
                id: newApplication._id,
                insuranceType: newApplication.insuranceType,
                status: 'Pending'
            }
        });

    } catch (error) {
        console.error('Error submitting insurance application:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error during application submission.' 
        });
    }
};

/**
 * Get all insurance applications (Call Centre/Admin only)
 * GET /api/insurance
 */
export const getAllInsuranceApplications = async (req, res) => {
    try {
        const { insuranceType, status, page = 1, limit = 10, search } = req.query;
        
        let filter = {};
        let query = {};

        if (insuranceType && insuranceType !== 'all') {
            filter.insuranceType = insuranceType;
        }

        if (status && status !== 'all') {
            filter.status = status;
        }

        if (search) {
            query.$or = [
                { fullName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
                { policyNumber: { $regex: search, $options: 'i' } }
            ];
        }

        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            sort: { createdAt: -1 }
        };

        const applications = await InsuranceApplication.paginate({ ...filter, ...query }, options);

        res.status(200).json({ 
            success: true, 
            ...applications 
        });

    } catch (error) {
        console.error('Error fetching insurance applications:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error while fetching applications.' 
        });
    }
};

/**
 * Get insurance application statistics (Call Centre/Admin only)
 * GET /api/insurance/stats
 */
export const getInsuranceStats = async (req, res) => {
    try {
        const totalApplications = await InsuranceApplication.countDocuments();
        const pendingApplications = await InsuranceApplication.countDocuments({ status: 'Pending' });
        const approvedApplications = await InsuranceApplication.countDocuments({ status: 'Approved' });
        const rejectedApplications = await InsuranceApplication.countDocuments({ status: 'Rejected' });
        const policyIssued = await InsuranceApplication.countDocuments({ status: 'Policy Issued' });

        // Group by insurance type
        const applicationsByType = await InsuranceApplication.aggregate([
            { $group: { _id: '$insuranceType', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Group by status
        const applicationsByStatus = await InsuranceApplication.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Recent applications (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentApplications = await InsuranceApplication.countDocuments({
            createdAt: { $gte: sevenDaysAgo }
        });

        res.status(200).json({
            success: true,
            totalApplications,
            pendingApplications,
            approvedApplications,
            rejectedApplications,
            policyIssued,
            recentApplications,
            applicationsByType,
            applicationsByStatus
        });

    } catch (error) {
        console.error('Error fetching insurance stats:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error while fetching statistics.' 
        });
    }
};

/**
 * Update insurance application status (Call Centre/Admin only)
 * PUT /api/insurance/:id/status
 */
export const updateInsuranceApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, remarks, policyNumber, assignedTo } = req.body;

        const application = await InsuranceApplication.findById(id);

        if (!application) {
            return res.status(404).json({ 
                success: false, 
                message: 'Insurance application not found.' 
            });
        }

        application.status = status || application.status;
        application.remarks = remarks || application.remarks;
        application.policyNumber = policyNumber || application.policyNumber;
        application.assignedTo = assignedTo || application.assignedTo;
        application.reviewedBy = req.user?.id;
        application.reviewDate = new Date();

        if (status === 'Policy Issued') {
            application.policyIssueDate = new Date();
        }

        await application.save();

        res.status(200).json({ 
            success: true, 
            message: 'Insurance application status updated successfully.',
            application 
        });

    } catch (error) {
        console.error('Error updating insurance application status:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error.' 
        });
    }
};

/**
 * Get a single insurance application (Call Centre/Admin only)
 * GET /api/insurance/:id
 */
export const getInsuranceApplicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await InsuranceApplication.findById(id);

        if (!application) {
            return res.status(404).json({ 
                success: false, 
                message: 'Insurance application not found.' 
            });
        }

        res.status(200).json({ 
            success: true, 
            application 
        });

    } catch (error) {
        console.error('Error fetching insurance application by ID:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error.' 
        });
    }
};

/**
 * Get applications by insurance type (Call Centre/Admin only)
 * GET /api/insurance/type/:type
 */
export const getApplicationsByType = async (req, res) => {
    try {
        const { type } = req.params;
        const { status, page = 1, limit = 10 } = req.query;

        let filter = { insuranceType: type };
        if (status && status !== 'all') {
            filter.status = status;
        }

        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            sort: { createdAt: -1 }
        };

        const applications = await InsuranceApplication.paginate(filter, options);

        res.status(200).json({ 
            success: true, 
            ...applications 
        });

    } catch (error) {
        console.error('Error fetching applications by type:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error.' 
        });
    }
};
