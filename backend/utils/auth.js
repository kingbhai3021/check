import jwt from 'jsonwebtoken';

export const getReferenceIdFromToken = (req) => {
    try {
        const token = req.cookies?.token;
        if (!token) return null;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.referenceId; // or return entire decoded object
    } catch (err) {
        console.error('Invalid token:', err);
        return null;
    }
};



// Get Id From Admin
export const getIdFromAdmin = (req) => {
    try {
        const token = req.cookies?.token;
        if (!token) return null;

        const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
        return decoded.id; // or return entire decoded object
    } catch (err) {
        console.error('Invalid token:', err);
        return null;
    }
};


// Get Id from Users
export const getIdFromEmployee = (req) => {
    try {
        const token = req.cookies?.token;
        if (!token) return null;

        const decoded = jwt.verify(token, process.env.JWT_SECRET_EMPLOYEE);
        return decoded.id; // or return entire decoded object
    } catch (err) {
        console.error('Invalid token:', err);
        return null;
    }
};


// Get Id from Sub Employee
export const getIdFromSubEmployee = (req) => {
    try {
        const token = req.cookies?.token;
        if (!token) return null;

        const decoded = jwt.verify(token, process.env.JWT_SECRET_SUB_EMPLOYEE);
        return decoded.id; // or return entire decoded object
    } catch (err) {
        console.error('Invalid token:', err);
        return null;
    }
};


// Get Id from DSA
export const getIdFromDSA = (req) => {
    try {
        const token = req.cookies?.token;
        if (!token) return null;

        const decoded = jwt.verify(token, process.env.JWT_SECRET_DSA);
        return decoded.id; // or return entire decoded object
    } catch (err) {
        console.error('Invalid token:', err);
        return null;
    }
};


// Get Id from Sub DSA
export const getIdFromSubDsa = (req) => {
    try {
        const token = req.cookies?.token;
        if (!token) return null;

        const decoded = jwt.verify(token, process.env.JWT_SECRET_SUB_DSA);
        return decoded.id; // or return entire decoded object
    } catch (err) {
        console.error('Invalid token:', err);
        return null;
    }
};



// Get Id from Sub Client
export const getIdFromClient = (req) => {
    try {
        const token = req.cookies?.token;
        if (!token) return null;

        const decoded = jwt.verify(token, process.env.JWT_SECRET_CLIENT);
        return decoded.id; // or return entire decoded object
    } catch (err) {
        console.error('Invalid token:', err);
        return null;
    }
};