import pool from "../db/connections.js";
export const getShortCodeByFullUrl = async (url) => {
  try {
    const sql = "SELECT short_code FROM short_url_table WHERE full_url = ? ";
    const [rows] = await pool.query(sql, [url]);
    const shortCode = rows.length > 0 ? rows[0].short_code : null;
    return shortCode;
  } catch (error) {
    throw error;
  }
};

export const getFullUrlByShortCode = async(shortCode) =>{
    try{
    const sql = 'SELECT full_url FROM short_url_table WHERE short_code = ?';
    const [rows] = await pool.query(sql, [shortCode]);

    const fullUrl = (rows.length > 0) ? rows[0].full_url : null;
    return fullUrl;
    }catch(error){
        throw error;
    }
}

export const saveShortCodeFullUrl = async (shortCode, url) => {
  try {
    const sql = "INSERT INTO short_url_table (full_url, short_code) VALUES (?, ?)";
    await pool.query(sql, [url, shortCode]);
  } catch (error) {
    throw error;
  }
};

export const updateClickByShortCode = async(shortCode)=>{
    try{
    const sql = 'UPDATE short_url_table SET clicks = clicks + 1 WHERE short_code = ?';
    await pool.query(sql, [shortCode]);
    }catch(error){
        throw error;
    }
}
