import { compareHashedPassword } from "../utils/bcryptPasswordHash";
import { findUserByEmail, findHashedPasswordByEmail } from "../models/userModel";
import { generateToken } from "../utils/jwtToken"; 
const loginUser = async(email, password)=>{
    const hashedPassword = await findHashedPasswordByEmail(email);

    const isMatch = await compareHashedPassword(password, hashedPassword);
   
    if(!isMatch){
        const error = new Error('Password Incorrect');
        error.statusCode = 401;
        throw error;
    }

    const user = await findUserByEmail(email);
    const token = generateToken(user, process.env.JWT_SECRET, {expresIn :'1h'});
    return {user, token};

}
export default loginUser;