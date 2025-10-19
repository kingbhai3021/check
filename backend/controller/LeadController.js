import MutualFundLead from '../model/leads/MutualFundLead.js';
import CreditCardLead from '../model/leads/CreditCardLead.js';
import LoanLead from '../model/leads/LoanLead.js';
import InsuranceLead from '../model/leads/InsuranceLead.js';
import LoanEligibilityLead from '../model/leads/LoanEligibilityLead.js';
import CreditCardApplicationLead from '../model/leads/CreditCardApplicationLead.js';
import DSAPartnerLead from '../model/leads/DSAPartnerLead.js';

// Mutual Fund Lead Controllers
export const saveMutualFundLead = async (req, res) => {
  try {
    const leadData = {
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      referrer: req.get('Referer')
    };
    
    const lead = new MutualFundLead(leadData);
    await lead.save();
    
    res.status(201).json({
      success: true,
      message: 'Mutual Fund lead saved successfully',
      leadId: lead._id
    });
  } catch (error) {
    console.error('Error saving Mutual Fund lead:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving lead',
      error: error.message
    });
  }
};

export const getMutualFundLeads = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    const leads = await MutualFundLead.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await MutualFundLead.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      data: leads,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Error fetching Mutual Fund leads:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching leads',
      error: error.message
    });
  }
};

// Credit Card Lead Controllers
export const saveCreditCardLead = async (req, res) => {
  try {
    const leadData = {
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      referrer: req.get('Referer')
    };
    
    const lead = new CreditCardLead(leadData);
    await lead.save();
    
    res.status(201).json({
      success: true,
      message: 'Credit Card lead saved successfully',
      leadId: lead._id
    });
  } catch (error) {
    console.error('Error saving Credit Card lead:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving lead',
      error: error.message
    });
  }
};

export const getCreditCardLeads = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    const leads = await CreditCardLead.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await CreditCardLead.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      data: leads,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Error fetching Credit Card leads:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching leads',
      error: error.message
    });
  }
};

// Loan Lead Controllers
export const saveLoanLead = async (req, res) => {
  try {
    const leadData = {
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      referrer: req.get('Referer')
    };
    
    const lead = new LoanLead(leadData);
    await lead.save();
    
    res.status(201).json({
      success: true,
      message: 'Loan lead saved successfully',
      leadId: lead._id
    });
  } catch (error) {
    console.error('Error saving Loan lead:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving lead',
      error: error.message
    });
  }
};

export const getLoanLeads = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    const leads = await LoanLead.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await LoanLead.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      data: leads,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Error fetching Loan leads:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching leads',
      error: error.message
    });
  }
};

// Insurance Lead Controllers
export const saveInsuranceLead = async (req, res) => {
  try {
    const leadData = {
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      referrer: req.get('Referer')
    };
    
    const lead = new InsuranceLead(leadData);
    await lead.save();
    
    res.status(201).json({
      success: true,
      message: 'Insurance lead saved successfully',
      leadId: lead._id
    });
  } catch (error) {
    console.error('Error saving Insurance lead:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving lead',
      error: error.message
    });
  }
};

export const getInsuranceLeads = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    const leads = await InsuranceLead.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await InsuranceLead.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      data: leads,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Error fetching Insurance leads:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching leads',
      error: error.message
    });
  }
};

// Loan Eligibility Lead Controllers
export const saveLoanEligibilityLead = async (req, res) => {
  try {
    const leadData = {
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      referrer: req.get('Referer')
    };
    
    const lead = new LoanEligibilityLead(leadData);
    await lead.save();
    
    res.status(201).json({
      success: true,
      message: 'Loan Eligibility lead saved successfully',
      leadId: lead._id
    });
  } catch (error) {
    console.error('Error saving Loan Eligibility lead:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving lead',
      error: error.message
    });
  }
};

export const getLoanEligibilityLeads = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    const leads = await LoanEligibilityLead.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await LoanEligibilityLead.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      data: leads,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Error fetching Loan Eligibility leads:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching leads',
      error: error.message
    });
  }
};

// Credit Card Application Lead Controllers
export const saveCreditCardApplicationLead = async (req, res) => {
  try {
    const leadData = {
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      referrer: req.get('Referer')
    };
    
    const lead = new CreditCardApplicationLead(leadData);
    await lead.save();
    
    res.status(201).json({
      success: true,
      message: 'Credit Card Application lead saved successfully',
      leadId: lead._id
    });
  } catch (error) {
    console.error('Error saving Credit Card Application lead:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving lead',
      error: error.message
    });
  }
};

export const getCreditCardApplicationLeads = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    const leads = await CreditCardApplicationLead.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await CreditCardApplicationLead.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      data: leads,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Error fetching Credit Card Application leads:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching leads',
      error: error.message
    });
  }
};

// DSA Partner Lead Controllers
export const saveDSAPartnerLead = async (req, res) => {
  try {
    const leadData = {
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      referrer: req.get('Referer')
    };
    
    const lead = new DSAPartnerLead(leadData);
    await lead.save();
    
    res.status(201).json({
      success: true,
      message: 'DSA Partner lead saved successfully',
      leadId: lead._id
    });
  } catch (error) {
    console.error('Error saving DSA Partner lead:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving lead',
      error: error.message
    });
  }
};

export const getDSAPartnerLeads = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    const leads = await DSAPartnerLead.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await DSAPartnerLead.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      data: leads,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Error fetching DSA Partner leads:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching leads',
      error: error.message
    });
  }
};

// Dashboard Statistics
export const getDashboardStats = async (req, res) => {
  try {
    const [
      mutualFundCount,
      creditCardCount,
      loanCount,
      insuranceCount,
      loanEligibilityCount,
      creditCardApplicationCount,
      dsaPartnerCount
    ] = await Promise.all([
      MutualFundLead.countDocuments(),
      CreditCardLead.countDocuments(),
      LoanLead.countDocuments(),
      InsuranceLead.countDocuments(),
      LoanEligibilityLead.countDocuments(),
      CreditCardApplicationLead.countDocuments(),
      DSAPartnerLead.countDocuments()
    ]);

    const totalLeads = mutualFundCount + creditCardCount + loanCount + insuranceCount + 
                      loanEligibilityCount + creditCardApplicationCount + dsaPartnerCount;

    res.status(200).json({
      success: true,
      data: {
        totalLeads,
        categories: {
          mutualFund: mutualFundCount,
          creditCard: creditCardCount,
          loan: loanCount,
          insurance: insuranceCount,
          loanEligibility: loanEligibilityCount,
          creditCardApplication: creditCardApplicationCount,
          dsaPartner: dsaPartnerCount
        }
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics',
      error: error.message
    });
  }
};
