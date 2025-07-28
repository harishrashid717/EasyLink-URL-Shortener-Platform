import pool from "../db/connections.js";
// Get Short Code ID by short code
export const getShortCodeId = async (shortCode) => {
  try {
    const sql = `
      SELECT id FROM short_url_table 
      WHERE short_code = ?
    `;
    const [rows] = await pool.query(sql, [shortCode]);
    return rows.length > 0 ? rows[0].id : null;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

// Get Clicks and Created Info
export const CreatedClicksInfo = async (userId, urlId) => {
  try {
    const sql = `
      SELECT 
        clicks, 
        DATE_FORMAT(created_at, '%M %d, %Y') AS created_date 
      FROM short_url_table 
      WHERE user_id = ? AND id = ?
    `;
    const [rows] = await pool.query(sql, [userId, urlId]);
    console.log(rows);
    
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

// Get Clicks Per Day
export const ClicksPerDay = async (userId, urlId, startDate, endDate) => {
  try {
    const sql = `
      SELECT
        DATE_FORMAT(vl.visited_date, '%Y-%m-%d') AS date,
        COUNT(*) AS clicks
      FROM visited_logs vl
      JOIN short_url_table su ON vl.url_id = su.id
      WHERE su.user_id = ? AND su.id = ?
      AND vl.visited_date BETWEEN ? AND ?
      GROUP BY vl.visited_date
      ORDER BY vl.visited_date
    `;
    const [rows] = await pool.query(sql, [userId, urlId, startDate, endDate]);
    return rows;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

// Get Device Breakdown
export const DeviceBreakdown = async (userId, urlId, startDate, endDate) => {
  try {
    const sql = `
      SELECT
        vl.device,
        COUNT(*) AS visits
      FROM visited_logs vl
      JOIN short_url_table su ON vl.url_id = su.id
      WHERE su.user_id = ? AND su.id = ?
      AND vl.visited_date BETWEEN ? AND ?
      GROUP BY vl.device
    `;
    const [rows] = await pool.query(sql, [userId, urlId, startDate, endDate]);
    return rows;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};