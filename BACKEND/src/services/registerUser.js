import dotenv from 'dotenv'
dotenv.config();

import {passwordHash} from '../utils/bcryptPasswordHash.js'
import {generateToken} from '../utils/jwtToken.js'
import {findUserByEmail, createUser} from '../models/userModel.js'
const registerUser = async (username, full_name, email, password) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        const error = new Error("Email already exists");
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await passwordHash(password);
    const newUser = await createUser(username, full_name, email, hashedPassword);
    
    const token = generateToken(newUser, process.env.JWT_SECRET, {expiresIn : '1h'})
    return {newUser, token}; // new user can be null
};
export default registerUser;
