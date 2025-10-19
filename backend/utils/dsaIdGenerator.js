import usermodel from '../model/usermodel.js';

/**
 * Generates a unique DSA ID based on the BDE's username and approval date
 * Format: {BDE_ID}{DDMMYYYY}{LETTER}
 * Example: ww100127092025A, ww100127092025B, etc.
 * 
 * @param {string} bdeUsername - The BDE's username (e.g., 'ww1001')
 * @param {Date} approvalDate - The date when the DSA is approved
 * @returns {Promise<string>} The generated DSA ID
 */
export const generateDSAId = async (bdeUsername, approvalDate = new Date()) => {
  try {
    // Format the date as DDMMYYYY
    const day = approvalDate.getDate().toString().padStart(2, '0');
    const month = (approvalDate.getMonth() + 1).toString().padStart(2, '0');
    const year = approvalDate.getFullYear();
    const dateString = `${day}${month}${year}`;
    
    // Create the base DSA ID pattern
    const baseDSAId = `${bdeUsername}${dateString}`;
    
    // Count existing DSA users with the same base pattern
    const existingCount = await usermodel.countDocuments({
      userType: 'dsa',
      username: { $regex: `^${baseDSAId}` }
    });
    
    // Convert count to letter (0 -> A, 1 -> B, 2 -> C, etc.)
    const letter = String.fromCharCode(65 + existingCount); // 65 is ASCII for 'A'
    
    // Generate the final DSA ID
    const dsaId = `${baseDSAId}${letter}`;
    
    return dsaId;
  } catch (error) {
    console.error('Error generating DSA ID:', error);
    throw new Error('Failed to generate DSA ID');
  }
};

/**
 * Validates if a DSA ID is available
 * @param {string} dsaId - The DSA ID to check
 * @returns {Promise<boolean>} True if available, false if taken
 */
export const isDSAIdAvailable = async (dsaId) => {
  try {
    const existingUser = await usermodel.findOne({ 
      username: dsaId,
      userType: 'dsa'
    });
    return !existingUser;
  } catch (error) {
    console.error('Error checking DSA ID availability:', error);
    throw new Error('Failed to check DSA ID availability');
  }
};

/**
 * Generates a temporary password for new DSA
 * @param {string} dsaId - The DSA ID
 * @returns {string} A temporary password
 */
export const generateTemporaryPassword = (dsaId) => {
  // Generate a password based on DSA ID and current timestamp
  const timestamp = Date.now().toString().slice(-6);
  return `DSA${dsaId.slice(-4)}${timestamp}`;
};

/**
 * Extracts BDE information from a DSA ID
 * @param {string} dsaId - The DSA ID to parse
 * @returns {Object} Parsed information
 */
export const parseDSAId = (dsaId) => {
  try {
    // Expected format: ww100127092025A
    // BDE ID: ww1001, Date: 27092025, Letter: A
    
    // Find the pattern where date starts (8 digits)
    const dateMatch = dsaId.match(/(\d{8})([A-Z])$/);
    
    if (!dateMatch) {
      throw new Error('Invalid DSA ID format');
    }
    
    const [, dateString, letter] = dateMatch;
    const bdeId = dsaId.substring(0, dsaId.length - 9); // Remove date + letter
    
    // Parse date
    const day = dateString.substring(0, 2);
    const month = dateString.substring(2, 4);
    const year = dateString.substring(4, 8);
    const approvalDate = new Date(`${year}-${month}-${day}`);
    
    return {
      bdeId,
      approvalDate,
      letter,
      dateString
    };
  } catch (error) {
    console.error('Error parsing DSA ID:', error);
    throw new Error('Invalid DSA ID format');
  }
};

