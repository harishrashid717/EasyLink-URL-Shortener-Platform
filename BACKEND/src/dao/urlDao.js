import pool from "../db/connections.js";


// SHORT CODE RELATED
export const getShortCodeByFullUrl = async (url) => {
  try {
    const sql = "SELECT short_code FROM short_url_table WHERE full_url = ?";
    const [rows] = await pool.query(sql, [url]);
    return rows.length > 0 ? rows[0].short_code : null;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

export const getFullUrlByShortCode = async (shortCode) => {
  try {
    const sql = "SELECT full_url FROM short_url_table WHERE short_code = ?";
    const [rows] = await pool.query(sql, [shortCode]);
    return rows.length > 0 ? rows[0].full_url : null;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

export const saveShortCodeFullUrl = async (shortCode, url) => {
  try {
    const sql = "INSERT INTO short_url_table (full_url, short_code) VALUES (?, ?)";
    const [result] = await pool.query(sql, [url, shortCode]);
    return result.insertId || null;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

export const updateClickByShortCode = async (shortCode) => {
  try {
    const sql = "UPDATE short_url_table SET clicks = clicks + 1 WHERE short_code = ?";
    const [result] = await pool.query(sql, [shortCode]);
    return result.affectedRows > 0 ? result.affectedRows : null;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

export const deleteShortCodeById = async(userId) =>{
  try{
      const sql = "DELETE FROM short_url_table WHERE id = ?";
      const [result] = await pool.query(sql, [userId]);
      return result.affectedRows > 0 ? result.affectedRows : null;
  }catch(error){
    error.statusCode = 500;
    throw error;
  }
}
export const getShortCodeId = async (shortCode) => {
  try {
    const sql = "SELECT id FROM short_url_table WHERE short_code = ?";
    const [rows] = await pool.query(sql, [shortCode]);
    return rows.length > 0 ? rows[0].id : null;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};


// USER RELATED
export const findUserById = async (id) => {
  try {
    const sql = "SELECT id FROM users WHERE id = ?";
    const [rows] = await pool.query(sql, [id]);
    return rows.length > 0 ? rows[0].id : null;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

export const insert_UrlShortCodeUserId = async (url, shortCode, id) => {
  try {
    const sql = "INSERT INTO short_url_table (full_url, short_code, user_id) VALUES (?, ?, ?)";
    const [result] = await pool.query(sql, [url, shortCode, id]);
    return result.insertId || null;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

export const getUserIdByShortCode = async(shortCode)=>{
    try{
      const sql = 'SELECT user_id FROM short_url_table WHERE short_code = ?';
      const [rows] = await pool.query(sql, [shortCode]);
      return (rows.length > 0 ) ? rows[0].user_id : null;
    }catch(error){  
      error.statusCode = 500;
      throw error;
    }
}

// ANALYTICS RELATED
export const getTopDateByClicks = async (urlId) => {
  try {
    const sql = `
      SELECT visited_date AS top_visit_date, COUNT(*) AS total_visit 
      FROM visited_logs 
      WHERE url_id = ? 
      GROUP BY top_visit_date 
      ORDER BY total_visit DESC 
      LIMIT 1
    `;
    const [rows] = await pool.query(sql, [urlId]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

export const getDeviceClicksCount = async (urlId) => {
  try {
    const sql = `
      SELECT device AS device_name, COUNT(*) AS device_count 
      FROM visited_logs 
      WHERE url_id = ? 
      GROUP BY device
    `;
    const [rows] = await pool.query(sql, [urlId]);
    return rows.length > 0 ? rows : [];
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

export const addUrlVisitLog = async (urlId, device) =>{
  try{
    const sql = `INSERT INTO visited_logs (url_id, device) 
    VALUES (? , ? )`;
    const [result] = await pool.query(sql, [urlId, device]);
    return result.insertId || null
  }catch(error){
    error.statusCode = 500;
    throw error;
  }

}