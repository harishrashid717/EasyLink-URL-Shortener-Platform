import { compareHashedPassword } from "../utils/bcryptPasswordHash.js";
import { findUserByEmail, findHashedPasswordByEmail } from "../models/userModel.js";
import { generateToken } from "../utils/jwtToken.js"; 
const loginUser = async(email, password)=>{

    const hashedPassword = await findHashedPasswordByEmail(email);
    if(!hashedPassword){
        const error = new Error('Email or Password is Incorrect');
        error.statusCode = 401;
        throw error;
    }

    const isMatch = await compareHashedPassword(password, hashedPassword);
   
    if(!isMatch){
        const error = new Error('Email or Password is Incorrect');
        error.statusCode = 401;
        throw error;
    }

    const user = await findUserByEmail(email); // only give the id, username, full_name
    const token = generateToken(user, process.env.JWT_SECRET, { expiresIn: '1h' });
    return {user, token};

}
export default loginUser;