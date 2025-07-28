import pool from "../db/connections.js";
export const getUserName = async(userId) =>{
    try{
        const sqlSelect = 'SELECT full_name FROM users WHERE id = ?';
        const [rows] = await pool.query(sqlSelect, [userId]);
        return (rows.length > 0) ? rows[0] : null;
    }catch(error){
        error.statusCode = 500;
        throw error;
    }
}
export const getUserByEmail = async (email) =>{
    try{
        const sqlSelect = 'SELECT id, username, full_name FROM users WHERE email = ?';
        const [rows] = await pool.query(sqlSelect, [email]);
        return (rows.length > 0) ? rows[0] : null;
    }catch(error){
        error.statusCode = 500;
        throw error;
    }
}

export const userCreate = async(username, full_name, email, hashedPassword)=>{
    try{
        const sqlInsert = 'INSERT INTO users(username, full_name, email, password) VALUES (? , ? , ? , ? )';

        const [result] = await pool.query(sqlInsert, [username, full_name, email, hashedPassword]);
        if (result.affectedRows === 1){
            const insertedId = result.insertId;
            const sqlSelect = 'SELECT id, username, full_name FROM users WHERE id = ?'

            const [rows] = await pool.query(sqlSelect, [insertedId]);
            return (rows.length > 0) ? rows[0] : null;
        }else{
            return null;
        }
    }catch(error){
        error.statusCode = 500;
        throw error;
    }

}

export const getHashedPasswordByEmail = async (email) => {
  try {
    const sqlSelect = 'SELECT password FROM users WHERE email = ?';
    const [rows] = await pool.query(sqlSelect, [email]);

    return rows.length > 0 ? rows[0].password : null; 
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};
