import pool from "../db/connections.js";
export const getShortUrlByFullUrl = async (url) => {
  try {
    const sql = "SELECT short_url FROM short_url_table WHERE full_url = ? ";
    const [rows] = await pool.query(sql, [url]);
    const shortUrl = rows.length > 0 ? rows[0].short_url : null;
    return shortUrl;
  } catch (error) {
    throw error;
  }
};

export const getFullUrlByShortUrl = async(shortUrl) =>{
    try{
    const sql = 'SELECT full_url FROM short_url_table WHERE short_url = ?';
    const [rows] = await pool.query(sql, [shortUrl]);

    const fullUrl = (rows.length > 0) ? rows[0].full_url : null;
    return fullUrl;
    }catch(error){
        throw error;
    }
}

export const saveShortUrlFullUrl = async (shortUrl, url) => {
  try {
    const sql = "INSERT INTO short_url_table (full_url, short_url) VALUES (?, ?)";
    await pool.query(sql, [url, shortUrl]);
  } catch (error) {
    throw error;
  }
};

export const updateClickByShortUrl = async(shortUrl)=>{
    try{
    const sql = 'UPDATE short_url_table SET clicks = clicks + 1 WHERE short_url = ?';
    await pool.query(sql, [shortUrl]);
    }catch(error){
        throw error;
    }
}
