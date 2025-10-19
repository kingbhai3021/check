import usermodel from '../model/usermodel.js';

/**
 * Generates the next available employee ID in sequence (WW1001, WW1002, etc.)
 * @returns {Promise<string>} The next available employee ID
 */
export const generateNextEmployeeId = async () => {
  try {
    // Find the highest existing employee ID
    const lastEmployee = await usermodel.findOne(
      { 
        userType: { $in: ['employee', 'sub_employee'] },
        employeeId: { $exists: true, $ne: null }
      },
      { employeeId: 1 }
    ).sort({ employeeId: -1 });

    if (!lastEmployee || !lastEmployee.employeeId) {
      // No existing employees, start with WW1001
      return 'WW1001';
    }

    // Extract the number from the last employee ID
    const lastNumber = parseInt(lastEmployee.employeeId.substring(2));
    const nextNumber = lastNumber + 1;
    
    // Format the next ID (ensure it's always 4 digits)
    const nextId = `WW${nextNumber.toString().padStart(4, '0')}`;
    
    return nextId;
  } catch (error) {
    console.error('Error generating employee ID:', error);
    throw new Error('Failed to generate employee ID');
  }
};

/**
 * Validates if an employee ID is available
 * @param {string} employeeId - The employee ID to check
 * @returns {Promise<boolean>} True if available, false if taken
 */
export const isEmployeeIdAvailable = async (employeeId) => {
  try {
    const existingUser = await usermodel.findOne({ employeeId });
    return !existingUser;
  } catch (error) {
    console.error('Error checking employee ID availability:', error);
    throw new Error('Failed to check employee ID availability');
  }
};

/**
 * Reserves an employee ID for a new employee
 * @param {string} employeeId - The employee ID to reserve
 * @returns {Promise<boolean>} True if successfully reserved
 */
export const reserveEmployeeId = async (employeeId) => {
  try {
    // Check if ID is available
    const isAvailable = await isEmployeeIdAvailable(employeeId);
    if (!isAvailable) {
      throw new Error(`Employee ID ${employeeId} is already taken`);
    }
    
    // Create a temporary reservation (you could implement a reservation system here)
    return true;
  } catch (error) {
    console.error('Error reserving employee ID:', error);
    throw error;
  }
};

