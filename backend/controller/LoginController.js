
import usermodel from "../model/usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


// Here Client Login
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Please provide both username and password' });
        }

        // Hardcoded Call Centre login check
        if (username === 'callcentre@wittywealth.com' && password === 'CallCentrePassword123') {
            const token = jwt.sign({ role: 'call_centre', id: 'hardcoded_callcentre' }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.cookie('token', token, { httpOnly: true });
            return res.status(200).json({ 
                message: 'Call Centre Login successful', 
                redirect: 'CALL_CENTRE',
                token,
                user: { role: 'call_centre' }
            });
        }

        // Try to find user by username first, then by wittywealth
        let user = await usermodel.findOne({ username: username });
        if (!user) {
            user = await usermodel.findOne({ wittywealth: username });
        }
        if (!user) {
            console.log('Login attempt - User not found for username:', username);
            return res.status(401).json({ message: 'Invalid username or password.' });
        }
        
        console.log('Login attempt - User found:', {
            id: user._id,
            username: user.username,
            wittywealth: user.wittywealth,
            userType: user.userType,
            isActive: user.isActive
        });

        // Check password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password validation result:', isPasswordValid);
        if (!isPasswordValid) {
            console.log('Login attempt - Invalid password for user:', username);
            return res.status(401).json({ message: 'Invalid username or password.' });
        }
        // console.log(user);
        const id = user?._id;
        const Status = user?.kycStatus;

        if (Status === 'Pending' && user?.isActive && user?.userType !== 'dsa') {
            return res.status(401).json({ message: 'Complete your KYC Go to SignUp page' });
        } else {
            const userType = user?.userType;
            switch (userType) {
                case "admin":
                    const token = jwt.sign({ id }, process.env.JWT_SECRET_ADMIN, { expiresIn: '1h' });
                    await usermodel.findByIdAndUpdate(id, { loginAt: Date.now(), token });
                    res.cookie('token', token, { httpOnly: true });
                    return res.status(200).json({ message: 'Admin Login successful', redirect: 'ADMIN' });
                case "employee":
                    const token2 = jwt.sign({ id }, process.env.JWT_SECRET_EMPLOYEE, { expiresIn: '1h' });
                    await usermodel.findByIdAndUpdate(id, { loginAt: Date.now(), token: token2 });
                    res.cookie('token', token2, { httpOnly: true });
                    return res.status(200).json({ message: 'employee Login successful', redirect: 'EMPLOYEE' });
                case "sub_employee":
                    const token3 = jwt.sign({ id }, process.env.JWT_SECRET_SUB_EMPLOYEE, { expiresIn: '1h' });
                    await usermodel.findByIdAndUpdate(id, { loginAt: Date.now(), token: token3 });
                    res.cookie('token', token3, { httpOnly: true });
                    return res.status(200).json({ message: 'sub_employee Login successful', redirect: 'SUB_EMPLOYEE' });
                case "dsa":
                    console.log('DSA login attempt - JWT_SECRET_DSA exists:', !!process.env.JWT_SECRET_DSA);
                    const dsaSecret = process.env.JWT_SECRET_DSA || process.env.JWT_SECRET_ADMIN || 'fallback-dsa-secret';
                    const token4 = jwt.sign({ id }, dsaSecret, { expiresIn: '1h' });
                    await usermodel.findByIdAndUpdate(id, { loginAt: Date.now(), token: token4 });
                    res.cookie('token', token4, { httpOnly: true });
                    console.log('DSA login successful for:', username);
                    return res.status(200).json({ message: 'dsa Login successful', redirect: 'DSA' });
                case "sub_dsa":
                    const token5 = jwt.sign({ id }, process.env.JWT_SECRET_SUB_DSA, { expiresIn: '1h' });
                    await usermodel.findByIdAndUpdate(id, { loginAt: Date.now(), token: token5 });
                    res.cookie('token', token5, { httpOnly: true });
                    return res.status(200).json({ message: 'sub_dsa Login successful', redirect: 'SUB_DSA' });
                case "Client":
                    const token6 = jwt.sign({ id }, process.env.JWT_SECRET_CLIENT, { expiresIn: '1h' });
                    const userCheck = await usermodel.findById(id);
                    if (userCheck?.loginAt && userCheck.loginAt.length > 0) {
                        return res.status(401).json({ message: "!Reset Password First Time" });
                    }
                    await usermodel.findByIdAndUpdate(id, { loginAt: Date.now(), token: token6 });
                    res.cookie('token', token6, { httpOnly: true });
                    return res.status(200).json({ message: 'Client Login successful', redirect: 'CLIENT' });
                case "call_centre":
                    const token7 = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                    await usermodel.findByIdAndUpdate(id, { loginAt: Date.now(), token: token7 });
                    res.cookie('token', token7, { httpOnly: true });
                    return res.status(200).json({ message: 'Call Centre Login successful', redirect: 'CALL_CENTRE' });
                default:
                    return res.status(401).json({ message: 'Invalid user type' });
            }
        }
    } catch (error) {
        console.log("Login", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Validate token and return user data
export const validateToken = async (req, res) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Try to verify with different JWT secrets based on user type
        let decoded;
        let user;

        try {
            // Try admin token first
            decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
            user = await usermodel.findById(decoded.id);
            if (user && user.userType === 'admin') {
                return res.status(200).json({
                    id: user._id,
                    wittywealth: user.wittywealth,
                    userType: user.userType,
                    kycStatus: user.kycStatus,
                    isActive: user.isActive
                });
            }
        } catch (err) {
            // Not admin token, continue to next
        }

        try {
            // Try employee token
            decoded = jwt.verify(token, process.env.JWT_SECRET_EMPLOYEE);
            user = await usermodel.findById(decoded.id);
            if (user && user.userType === 'employee') {
                return res.status(200).json({
                    id: user._id,
                    wittywealth: user.wittywealth,
                    userType: user.userType,
                    kycStatus: user.kycStatus,
                    isActive: user.isActive
                });
            }
        } catch (err) {
            // Not employee token, continue to next
        }

        try {
            // Try DSA token
            decoded = jwt.verify(token, process.env.JWT_SECRET_DSA);
            user = await usermodel.findById(decoded.id);
            if (user && user.userType === 'dsa') {
                return res.status(200).json({
                    id: user._id,
                    wittywealth: user.wittywealth,
                    userType: user.userType,
                    kycStatus: user.kycStatus,
                    isActive: user.isActive
                });
            }
        } catch (err) {
            // Not DSA token, continue to next
        }

        try {
            // Try client token
            decoded = jwt.verify(token, process.env.JWT_SECRET_CLIENT);
            user = await usermodel.findById(decoded.id);
            if (user && user.userType === 'Client') {
                return res.status(200).json({
                    id: user._id,
                    wittywealth: user.wittywealth,
                    userType: user.userType,
                    kycStatus: user.kycStatus,
                    isActive: user.isActive
                });
            }
        } catch (err) {
            // Not client token
        }


        try {
            // Try general JWT_SECRET (for signup-created users and Call Centre)
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Check if it's a Call Centre token
            if (decoded.role === 'call_centre' && decoded.id === 'hardcoded_callcentre') {
                return res.status(200).json({
                    id: 'hardcoded_callcentre',
                    role: 'call_centre',
                    userType: 'call_centre',
                    kycStatus: 'Completed',
                    isActive: true
                });
            }
            
            // Check for regular users
            user = await usermodel.findOne({ referenceId: decoded.referenceId });
            if (user) {
                return res.status(200).json({
                    id: user._id,
                    wittywealth: user.wittywealth,
                    userType: user.userType,
                    kycStatus: user.kycStatus,
                    isActive: user.isActive,
                    employeeId: user.employeeId
                });
            }
        } catch (err) {
            // Not general token
        }

        // If we get here, token is invalid
        return res.status(401).json({ message: 'Invalid token' });

    } catch (error) {
        console.log("Token validation error:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
