import bcrypt from 'bcryptjs';

// Hash the password
export const passwordHash = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
};

// Compare raw password with hashed password
export const compareHashedPassword = async (password, hashedPassword) => {
    const isCorrect = await bcrypt.compare(password, hashedPassword);
    return isCorrect;
};
