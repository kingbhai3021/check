// DSA ID Generator Utility
// Format: WW(employee_onboarding_date)(unique two digit number)(any alphabet)
// Example: WW0809202544A

// Store used IDs to ensure uniqueness (in production, this would be in a database)
const usedIds = new Set();

// Generate a random two-digit number
const generateRandomTwoDigit = () => {
  return Math.floor(Math.random() * 100).toString().padStart(2, '0');
};

// Generate a random alphabet
const generateRandomAlphabet = () => {
  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return alphabets[Math.floor(Math.random() * alphabets.length)];
};

// Generate unique DSA ID based on employee onboarding date
export const generateDSAId = (employeeOnboardingDate = null) => {
  let dateToUse;
  
  if (employeeOnboardingDate) {
    // Use provided employee onboarding date
    dateToUse = new Date(employeeOnboardingDate);
  } else {
    // Fallback to current date if no onboarding date provided
    dateToUse = new Date();
  }
  
  const month = (dateToUse.getMonth() + 1).toString().padStart(2, '0');
  const day = dateToUse.getDate().toString().padStart(2, '0');
  const year = dateToUse.getFullYear();
  
  let uniqueId;
  let attempts = 0;
  const maxAttempts = 100; // Prevent infinite loop
  
  do {
    const randomTwoDigit = generateRandomTwoDigit();
    const randomAlphabet = generateRandomAlphabet();
    uniqueId = `WW${month}${day}${year}${randomTwoDigit}${randomAlphabet}`;
    attempts++;
  } while (usedIds.has(uniqueId) && attempts < maxAttempts);
  
  if (attempts >= maxAttempts) {
    throw new Error('Unable to generate unique DSA ID after maximum attempts');
  }
  
  // Add to used IDs set
  usedIds.add(uniqueId);
  
  return uniqueId;
};

// Validate DSA ID format
export const validateDSAId = (dsaId) => {
  const pattern = /^WW\d{8}\d{2}[A-Z]$/;
  return pattern.test(dsaId);
};

// Extract date from DSA ID
export const extractDateFromDSAId = (dsaId) => {
  if (!validateDSAId(dsaId)) {
    return null;
  }
  
  const month = dsaId.substring(2, 4);
  const day = dsaId.substring(4, 6);
  const year = dsaId.substring(6, 10);
  
  return new Date(year, month - 1, day);
};

// Get DSA ID info
export const getDSAIdInfo = (dsaId) => {
  if (!validateDSAId(dsaId)) {
    return null;
  }
  
  const month = dsaId.substring(2, 4);
  const day = dsaId.substring(4, 6);
  const year = dsaId.substring(6, 10);
  const uniqueNumber = dsaId.substring(10, 12);
  const alphabet = dsaId.substring(12, 13);
  
  return {
    year,
    month,
    day,
    uniqueNumber,
    alphabet,
    createdAt: new Date(year, month - 1, day)
  };
};
