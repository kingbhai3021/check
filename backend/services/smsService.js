import twilio from 'twilio';

// Initialize Twilio client (you can replace with other SMS providers)
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * Send DSA credentials via SMS
 * @param {string} phoneNumber - Recipient's phone number (with country code)
 * @param {string} username - Generated DSA username
 * @param {string} password - Generated DSA password
 * @param {string} dsaName - DSA's name for personalization
 * @returns {Promise<Object>} SMS delivery status
 */
export const sendCredentialsSMS = async (phoneNumber, username, password, dsaName = 'DSA') => {
  try {
    // Format phone number to include country code if not present
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
    
    const message = `Dear ${dsaName},

Welcome to Witty Wealth! Your DSA account has been approved.

Login Credentials:
Username: ${username}
Password: ${password}

Please login at: https://wittywealth.com/dsa-login

Important: Please change your password after first login for security.

Best regards,
Witty Wealth Team`;

    // Send SMS using Twilio
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
      to: formattedPhone
    });

    console.log(`SMS sent successfully to ${formattedPhone}. SID: ${result.sid}`);
    
    return {
      success: true,
      messageId: result.sid,
      status: result.status,
      to: formattedPhone
    };

  } catch (error) {
    console.error('SMS sending failed:', error);
    
    // Fallback: Log to console for development
    console.log(`\n=== SMS NOTIFICATION (Development Mode) ===`);
    console.log(`To: ${phoneNumber}`);
    console.log(`Message: ${message}`);
    console.log(`==========================================\n`);
    
    return {
      success: false,
      error: error.message,
      fallback: true
    };
  }
};

/**
 * Send application status update SMS
 * @param {string} phoneNumber - Recipient's phone number
 * @param {string} status - Application status (Approved/Rejected)
 * @param {string} dsaName - DSA's name
 * @param {string} reason - Rejection reason (if applicable)
 * @returns {Promise<Object>} SMS delivery status
 */
export const sendStatusUpdateSMS = async (phoneNumber, status, dsaName, reason = null) => {
  try {
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
    
    let message;
    if (status === 'Approved') {
      message = `Dear ${dsaName},

Congratulations! Your DSA application has been approved by Witty Wealth.

You will receive your login credentials shortly via SMS.

Welcome to the team!

Best regards,
Witty Wealth Team`;
    } else if (status === 'Rejected') {
      message = `Dear ${dsaName},

Thank you for your interest in joining Witty Wealth.

Unfortunately, your DSA application has been rejected.

Reason: ${reason || 'Not specified'}

You may reapply after addressing the mentioned concerns.

Best regards,
Witty Wealth Team`;
    }

    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedPhone
    });

    console.log(`Status update SMS sent to ${formattedPhone}. SID: ${result.sid}`);
    
    return {
      success: true,
      messageId: result.sid,
      status: result.status,
      to: formattedPhone
    };

  } catch (error) {
    console.error('Status update SMS failed:', error);
    
    // Fallback logging
    console.log(`\n=== STATUS UPDATE SMS (Development Mode) ===`);
    console.log(`To: ${phoneNumber}`);
    console.log(`Status: ${status}`);
    console.log(`Message: ${message}`);
    console.log(`==========================================\n`);
    
    return {
      success: false,
      error: error.message,
      fallback: true
    };
  }
};

/**
 * Send reminder SMS for pending applications
 * @param {string} phoneNumber - Recipient's phone number
 * @param {string} dsaName - DSA's name
 * @param {string} submittedDate - When application was submitted
 * @returns {Promise<Object>} SMS delivery status
 */
export const sendReminderSMS = async (phoneNumber, dsaName, submittedDate) => {
  try {
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
    
    const message = `Dear ${dsaName},

This is a reminder that your DSA application submitted on ${submittedDate} is still under review.

We appreciate your patience and will notify you once the review is complete.

For any queries, contact us at support@wittywealth.com

Best regards,
Witty Wealth Team`;

    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedPhone
    });

    console.log(`Reminder SMS sent to ${formattedPhone}. SID: ${result.sid}`);
    
    return {
      success: true,
      messageId: result.sid,
      status: result.status,
      to: formattedPhone
    };

  } catch (error) {
    console.error('Reminder SMS failed:', error);
    
    return {
      success: false,
      error: error.message,
      fallback: true
    };
  }
};

export default {
  sendCredentialsSMS,
  sendStatusUpdateSMS,
  sendReminderSMS
};
