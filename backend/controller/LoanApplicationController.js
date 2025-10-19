import LoanApplication from '../model/LoanApplication.js';
import usermodel from '../model/usermodel.js';

// DSA submits a loan application
export const submitLoanApplication = async (req, res) => {
  try {
    const dsaId = req.user?.id;
    
    if (!dsaId) {
      return res.status(401).json({ message: 'DSA ID not found' });
    }

    // Get DSA details
    const dsa = await usermodel.findById(dsaId);
    if (!dsa || dsa.userType !== 'dsa') {
      return res.status(401).json({ message: 'Invalid DSA' });
    }

    // Get referring employee details
    const employee = await usermodel.findById(dsa.refferdBy);
    if (!employee) {
      return res.status(400).json({ message: 'Referring employee not found' });
    }

    const {
      applicantName,
      bankName,
      loanType,
      loanAmount,
      appliedDate,
      branchName,
      applicantPhone,
      applicantEmail,
      applicantAddress,
      accountNumber,
      ifscCode,
      panCard,
      aadharNumber,
      monthlyIncome,
      employmentType,
      companyName,
      remarks
    } = req.body;

    // Validate required fields
    if (!applicantName || !bankName || !loanType || !loanAmount || !branchName || 
        !applicantPhone || !applicantEmail || !accountNumber || !ifscCode || 
        !panCard || !aadharNumber || !monthlyIncome || !employmentType) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    // Create loan application
    const loanApplication = new LoanApplication({
      applicantName,
      bankName,
      loanType,
      loanAmount,
      appliedDate: appliedDate ? new Date(appliedDate) : new Date(),
      branchName,
      applicantPhone,
      applicantEmail,
      applicantAddress,
      accountNumber,
      ifscCode,
      panCard,
      aadharNumber,
      monthlyIncome,
      employmentType,
      companyName: companyName || '',
      remarks: remarks || '',
      submittedByDSA: dsaId,
      dsaName: dsa.name,
      dsaId: dsa.wittywealth || dsa.username,
      referredByEmployee: employee._id,
      employeeName: employee.name,
      employeeId: employee.employeeId || employee.username
    });

    await loanApplication.save();

    res.status(201).json({
      message: 'Loan application submitted successfully',
      applicationId: loanApplication._id,
      applicantName: loanApplication.applicantName,
      loanAmount: loanApplication.loanAmount
    });

  } catch (error) {
    console.error('Submit loan application error:', error);
    res.status(500).json({ message: 'Internal server error while submitting loan application' });
  }
};

// Get loan applications submitted by a DSA
export const getMyLoanApplications = async (req, res) => {
  try {
    const dsaId = req.user?.id;
    
    if (!dsaId) {
      return res.status(401).json({ message: 'DSA ID not found' });
    }

    const applications = await LoanApplication.find({ submittedByDSA: dsaId })
      .sort({ submittedAt: -1 })
      .select('-__v');

    res.status(200).json({
      applications,
      count: applications.length
    });

  } catch (error) {
    console.error('Get my loan applications error:', error);
    res.status(500).json({ message: 'Internal server error while fetching loan applications' });
  }
};

// Get loan applications for an employee (submitted by their DSAs)
export const getEmployeeLoanApplications = async (req, res) => {
  try {
    const employeeId = req.user?.id;
    
    console.log('Fetching loan applications for employee:', employeeId);
    
    if (!employeeId) {
      return res.status(401).json({ message: 'Employee ID not found' });
    }

    const applications = await LoanApplication.find({ referredByEmployee: employeeId })
      .populate('submittedByDSA', 'name wittywealth username')
      .sort({ submittedAt: -1 })
      .select('-__v');

    console.log('Found loan applications:', applications.length);

    res.status(200).json({
      applications,
      count: applications.length
    });

  } catch (error) {
    console.error('Get employee loan applications error:', error);
    res.status(500).json({ message: 'Internal server error while fetching loan applications' });
  }
};

// Update loan application status (by employee or admin)
export const updateLoanApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, remarks } = req.body;
    const userId = req.user?.id;

    if (!applicationId || !status) {
      return res.status(400).json({ message: 'Application ID and status are required' });
    }

    const validStatuses = ['Submitted', 'Under Review', 'Approved', 'Rejected', 'Disbursed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const application = await LoanApplication.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Loan application not found' });
    }

    // Update application
    application.status = status;
    application.remarks = remarks || application.remarks;
    application.lastUpdated = new Date();

    await application.save();

    res.status(200).json({
      message: 'Loan application status updated successfully',
      application: {
        id: application._id,
        applicantName: application.applicantName,
        status: application.status,
        remarks: application.remarks
      }
    });

  } catch (error) {
    console.error('Update loan application status error:', error);
    res.status(500).json({ message: 'Internal server error while updating loan application' });
  }
};

// Forward loan application to admin (by employee)
export const forwardToAdmin = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const employeeId = req.user?.id;

    console.log('Forward to admin - Employee ID:', employeeId);

    if (!employeeId) {
      return res.status(401).json({ message: 'Employee ID not found' });
    }

    const application = await LoanApplication.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Loan application not found' });
    }

    console.log('Application referredByEmployee:', application.referredByEmployee.toString());
    console.log('Employee ID from request:', employeeId);
    console.log('Employee ID type:', typeof employeeId);
    console.log('referredByEmployee type:', typeof application.referredByEmployee);

    // Check if the employee owns this application
    const referredById = application.referredByEmployee.toString();
    const currentEmployeeId = employeeId.toString();
    
    if (referredById !== currentEmployeeId) {
      console.log('Permission denied - IDs do not match');
      return res.status(403).json({ 
        message: 'You do not have permission to forward this application',
        debug: { referredById, currentEmployeeId }
      });
    }

    // Update application
    application.status = 'Forwarded to Admin';
    application.forwardedToAdmin = true;
    application.forwardedAt = new Date();
    application.forwardedBy = employeeId;
    application.lastUpdated = new Date();

    await application.save();

    res.status(200).json({
      message: 'Loan application forwarded to admin successfully',
      application: {
        id: application._id,
        applicantName: application.applicantName,
        status: application.status
      }
    });

  } catch (error) {
    console.error('Forward to admin error:', error);
    res.status(500).json({ message: 'Internal server error while forwarding loan application' });
  }
};

// Get all loan applications (admin only)
export const getAllLoanApplications = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let query = {};
    if (status) {
      query.status = status;
    }

    const applications = await LoanApplication.find(query)
      .populate('submittedByDSA', 'name wittywealth username')
      .populate('referredByEmployee', 'name employeeId username')
      .sort({ submittedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await LoanApplication.countDocuments(query);

    res.status(200).json({
      applications,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error('Get all loan applications error:', error);
    res.status(500).json({ message: 'Internal server error while fetching loan applications' });
  }
};

// Get loan applications forwarded to admin
export const getAdminLoanApplications = async (req, res) => {
  try {
    const { status } = req.query;
    
    let query = { forwardedToAdmin: true };
    if (status) {
      query.status = status;
    }

    const applications = await LoanApplication.find(query)
      .populate('submittedByDSA', 'name wittywealth username phone email')
      .populate('referredByEmployee', 'name employeeId username')
      .populate('forwardedBy', 'name employeeId username')
      .sort({ forwardedAt: -1 })
      .select('-__v');

    res.status(200).json({
      applications,
      count: applications.length
    });

  } catch (error) {
    console.error('Get admin loan applications error:', error);
    res.status(500).json({ message: 'Internal server error while fetching admin loan applications' });
  }
};

// Admin approve/reject loan application
export const adminReviewLoanApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, remarks } = req.body;
    const adminId = req.user?.id;

    if (!adminId) {
      return res.status(401).json({ message: 'Admin ID not found' });
    }

    const validStatuses = ['Admin Approved', 'Admin Rejected', 'Disbursed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Must be Admin Approved, Admin Rejected, or Disbursed' });
    }

    const application = await LoanApplication.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Loan application not found' });
    }

    // Update application
    application.status = status;
    application.remarks = remarks || application.remarks;
    application.adminReviewedBy = adminId;
    application.adminReviewedAt = new Date();
    application.lastUpdated = new Date();

    await application.save();

    res.status(200).json({
      message: `Loan application ${status.toLowerCase()} successfully`,
      application: {
        id: application._id,
        applicantName: application.applicantName,
        status: application.status,
        remarks: application.remarks
      }
    });

  } catch (error) {
    console.error('Admin review loan application error:', error);
    res.status(500).json({ message: 'Internal server error while reviewing loan application' });
  }
};
