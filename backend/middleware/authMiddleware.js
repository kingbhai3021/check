import jwt from 'jsonwebtoken';
import userSchema from '../model/usermodel.js';


// Signup For Middleware this used to every route
export const authenticateUser = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) return res.status(401).json({ message: 'No token provided' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach user data to request
        const CheckIsExist = await userSchema.findOne({ referenceId: decoded.referenceId });

        if (CheckIsExist?.token === token) {
            next();
        } else {
            res.status(401).json({ message: 'Login is Expired' });
        }
    } catch (err) {
        console.error('Token error:', err);
        return res.status(401).json({ message: 'Invalid token' });
    }
};


// Client Login for Middleware this used to every route
export const LoginUser = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) return res.status(401).json({ message: 'No token provided' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET_LOGIN);
        req.user = decoded;
        const CheckIsExist = await userSchema.findOne({ _id: decoded.id });
        if (CheckIsExist?.token === token) {
            next();
        } else {
            res.status(401).json({ message: 'Login is Expired' });
        }

    } catch (err) {
        console.error('Token error:', err);
        return res.status(401).json({ message: 'Invalid token' });
    }
};


// Admin For middleware this used to every route
export const AdminAccess = async (req,res,next) =>{
    try {
        const token = req.cookies?.token;
        console.log('AdminAccess - Token:', token ? 'Present' : 'Missing');
        console.log('AdminAccess - All cookies:', req.cookies);
        
        if (!token) {
            console.log('AdminAccess - No token provided');
            return res.status(401).json({ message: 'No token provided - Admin not logged in' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
        console.log('AdminAccess - Decoded token:', decoded);
        
        req.user = decoded;
        const CheckIsExist = await userSchema.findOne({ _id: decoded.id });
        console.log('AdminAccess - User exists:', !!CheckIsExist, 'Token match:', CheckIsExist?.token === token);
        
        if (CheckIsExist?.token === token) {
            console.log('AdminAccess - Authentication successful');
            next();
        } else {
            console.log('AdminAccess - Login expired');
            res.status(401).json({ message: 'Login is Expired - Please login again'});
        }

    } catch (err) {
        console.error('AdminAccess - Token error:', err.message);
        res.status(401).json({ message: 'Invalid token - Please login again' });
    }
}

// DSA for middleware this used to every route
export const DSAAccess = async (req,res,next) =>{
    try {
        const token = req.cookies?.token;
        if (!token) return res.status(401).json({ message: 'No token provided' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET_DSA);
        req.user = decoded;
        const CheckIsExist = await userSchema.findOne({ _id: decoded.id });
        if (CheckIsExist?.token === token) {
            next();
        } else {
            res.status(401).json({ message: 'Login is Expired' });
        }

    } catch (err) {
        console.error('Token error:', err);
        return res.status(401).json({ message: 'Invalid token' });
    }
}


// Agent for middleware this used to every route
export const AgentAccess = async (req,res,next) =>{
    try {
        const token = req.cookies?.token;
        if (!token) return res.status(401).json({ message: 'No token provided' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET_AGENT);
        req.user = decoded;
        const CheckIsExist = await userSchema.findOne({ _id: decoded.id });
        if (CheckIsExist?.token === token) {
            next();
        } else {
            res.status(401).json({ message: 'Login is Expired' });
        }

    } catch (err) {
        console.error('Token error:', err);
        return res.status(401).json({ message: 'Invalid token' });
    }
}

// KYC Authentication Middleware - handles both cookie and header tokens
export const kycAuthMiddleware = async (req, res, next) => {
    try {
        let token = req.cookies?.token;
        
        // If no cookie token, try Authorization header
        if (!token) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }

        console.log('KYC Auth - Token received:', token ? 'Yes' : 'No');
        console.log('KYC Auth - Token preview:', token ? token.substring(0, 20) + '...' : 'None');
        console.log('KYC Auth - JWT_SECRET:', process.env.JWT_SECRET ? 'Exists' : 'Missing');
        console.log('KYC Auth - JWT_SECRET_CLIENT:', process.env.JWT_SECRET_CLIENT ? 'Exists' : 'Missing');
        console.log('KYC Auth - All available JWT secrets:');
        console.log('  - JWT_SECRET:', process.env.JWT_SECRET ? 'Exists' : 'Missing');
        console.log('  - JWT_SECRET_ADMIN:', process.env.JWT_SECRET_ADMIN ? 'Exists' : 'Missing');
        console.log('  - JWT_SECRET_EMPLOYEE:', process.env.JWT_SECRET_EMPLOYEE ? 'Exists' : 'Missing');
        console.log('  - JWT_SECRET_DSA:', process.env.JWT_SECRET_DSA ? 'Exists' : 'Missing');
        console.log('  - JWT_SECRET_CLIENT:', process.env.JWT_SECRET_CLIENT ? 'Exists' : 'Missing');
        console.log('KYC Auth - Request headers:', JSON.stringify(req.headers, null, 2));

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Simplified: Just verify with JWT_SECRET
        let decoded;
        let user;

        try {
            console.log('Verifying token with JWT_SECRET...');
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Token verified successfully, decoded:', decoded);
            
            // Find user by referenceId
            user = await userSchema.findOne({ referenceId: decoded.referenceId });
            console.log('User found with referenceId:', user ? 'Yes' : 'No');
            
            if (user) {
                console.log('User authenticated successfully');
                req.user = decoded;
                return next();
            } else {
                console.log('User not found in database');
                return res.status(401).json({ message: 'User not found' });
            }
        } catch (err) {
            console.log('Token verification failed:', err.message);
            return res.status(401).json({ message: 'Invalid token' });
        }

        // If we get here, token is invalid
        return res.status(401).json({ message: 'Invalid token' });

    } catch (error) {
        console.error('KYC Auth error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Employee for middleware this used to every route
export const EmployeeAccess = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        console.log('EmployeeAccess - Token exists:', !!token);
        if (!token) return res.status(401).json({ message: 'No token provided' });
        
        let decoded;
        let user;
        
        // Try JWT_SECRET_EMPLOYEE first (for employee login)
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET_EMPLOYEE);
            user = await userSchema.findOne({ _id: decoded.id, userType: 'employee' });
            if (user && user.token === token) {
                req.user = { id: user._id, userType: user.userType };
                console.log('EmployeeAccess - User authenticated:', req.user);
                return next();
            }
        } catch (err) {
            console.log('EmployeeAccess - JWT_SECRET_EMPLOYEE failed:', err.message);
            // Not employee token, continue to next
        }
        
        // Try JWT_SECRET (for signup-created employees)
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            user = await userSchema.findOne({ referenceId: decoded.referenceId, userType: 'employee' });
            if (user && user.token === token) {
                req.user = { id: user._id, userType: user.userType };
                console.log('EmployeeAccess - User authenticated:', req.user);
                return next();
            }
        } catch (err) {
            console.log('EmployeeAccess - JWT_SECRET failed:', err.message);
            // Not valid token
        }
        
        console.log('EmployeeAccess - All token verification failed');
        return res.status(401).json({ message: 'Invalid token or user not found' });

    } catch (err) {
        console.error('Token error:', err);
        return res.status(401).json({ message: 'Invalid token' });
    }
}
