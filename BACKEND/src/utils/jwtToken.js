import jsonwebtoken from "jsonwebtoken";

// Generate JWT Token
export const generateToken = (payload, secret, optionsObj) => {
    try {
        const token = jsonwebtoken.sign(payload, secret, optionsObj);
        return token;
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }
};

// Verify JWT Token
export const verifyToken = (token, secret) => {
    try {
        const decoded = jsonwebtoken.verify(token, secret);
        return decoded;
    } catch (error) {
        error.statusCode = 401; 
        throw error;
    }
};
