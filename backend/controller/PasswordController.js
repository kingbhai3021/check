import usermodel from '../model/usermodel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Change password for authenticated users
 */
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: 'Current password and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: 'New password must be at least 6 characters long'
      });
    }

    // Get user ID from JWT token
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        message: 'No authentication token provided'
      });
    }

    let userId;
    let userType;

    // Try to verify with different JWT secrets based on user type
    try {
      // Try admin token first
      const adminDecoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
      userId = adminDecoded.id;
      userType = 'admin';
    } catch (err) {
      try {
        // Try employee token
        const employeeDecoded = jwt.verify(token, process.env.JWT_SECRET_EMPLOYEE);
        userId = employeeDecoded.id;
        userType = 'employee';
      } catch (err) {
        try {
          // Try DSA token
          const dsaDecoded = jwt.verify(token, process.env.JWT_SECRET_DSA);
          userId = dsaDecoded.id;
          userType = 'dsa';
        } catch (err) {
          try {
            // Try client token
            const clientDecoded = jwt.verify(token, process.env.JWT_SECRET_CLIENT);
            userId = clientDecoded.id;
            userType = 'client';
          } catch (err) {
            return res.status(401).json({
              message: 'Invalid authentication token'
            });
          }
        }
      }
    }

    // Find user by ID
    const user = await usermodel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await usermodel.findByIdAndUpdate(userId, {
      password: hashedNewPassword,
      updatedAt: new Date()
    });

    res.status(200).json({
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({
      message: 'Internal server error during password change'
    });
  }
};
