import {getUserByEmail, userCreate, getHashedPasswordByEmail} from '../dao/userDao.js'
export const findUserByEmail= async (email)=>{
    return await getUserByEmail(email);
}

export const createUser = async (username, full_name, email, hashedPassword)=>{
    const user = await userCreate(username, full_name, email, hashedPassword);
    return user; // value can be user or null
}

export const findHashedPasswordByEmail = async(email)=>{
    const hashedPassword = getHashedPasswordByEmail(email);
    return hashedPassword; // value can be hashed password or null
}