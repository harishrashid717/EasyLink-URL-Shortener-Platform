import pool from "../db/connections.js";

// First and Last URL date 
export const getFirstAndLastURLDates = async (userId) => {
  try {
    const sql = `
      SELECT
        DATE(MIN(created_at)) AS first_url_date,
        DATE(MAX(created_at)) AS last_url_date
      FROM short_url_table
      WHERE user_id = ?;
    `;
    const [rows] = await pool.query(sql, [userId]);
    return {
      firstUrlDate: rows[0].first_url_date || null,
      lastUrlDate: rows[0].last_url_date || null
    };
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

// Summary Cards (Always Filtered)
export const SummaryCards = async (userId, startDate, endDate) => {
  try {
    let sql = `
      SELECT
        COUNT(*) AS total_urls,
        COALESCE(ROUND(SUM(clicks), 2), 0) AS total_clicks,
        COALESCE(ROUND(AVG(clicks), 2), 0) AS avg_clicks_per_url
      FROM short_url_table
      WHERE user_id = ?
    `;

    const params = [userId];

    if (startDate && endDate) {
      sql += ` AND DATE(created_at) BETWEEN ? AND ?`;
      params.push(startDate, endDate);
    }

    const [rows] = await pool.query(sql, params);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};


// Top URLs by Clicks (Always Filtered)
export const TopURLsByClicks = async (userId, startDate, endDate) => {
  try {
    const sql = `
      SELECT
        id,
        short_code,
        full_url,
        clicks,
        DATE_FORMAT(created_at, '%b %e, %Y') AS created
      FROM short_url_table
      WHERE user_id = ?
      AND DATE(created_at) BETWEEN ? AND ?
      ORDER BY clicks DESC
    `;
    const [rows] = await pool.query(sql, [userId, startDate, endDate]);
    return rows;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

// Clicks Per Day (Always Filtered)
export const ClicksPerDay = async (userId, startDate, endDate) => {
  try {
    const sql = `
      SELECT
        DATE_FORMAT(vl.visited_date, '%Y-%m-%d') AS date,
        COUNT(*) AS clicks
      FROM visited_logs vl
      JOIN short_url_table su ON vl.url_id = su.id
      WHERE su.user_id = ?
      AND vl.visited_date BETWEEN ? AND ?
      GROUP BY vl.visited_date
      ORDER BY vl.visited_date
    `;
    const [rows] = await pool.query(sql, [userId, startDate, endDate]);
    return rows;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

// Device Breakdown (Always Filtered)
export const DeviceBreakdown = async (userId, startDate, endDate) => {
  try {
    const sql = `
      SELECT
        vl.device,
        COUNT(*) AS visits
      FROM visited_logs vl
      JOIN short_url_table su ON vl.url_id = su.id
      WHERE su.user_id = ?
      AND vl.visited_date BETWEEN ? AND ?
      GROUP BY vl.device
    `;
    const [rows] = await pool.query(sql, [userId, startDate, endDate]);
    return rows;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

// URL Creation Trend (Always Filtered)
export const URLCreationTrend = async (userId, startDate, endDate) => {
  try {
    const sql = `
      SELECT
        DATE(created_at) AS date,
        COUNT(*) AS created_count
      FROM short_url_table
      WHERE user_id = ?
      AND created_at BETWEEN ? AND ?
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at)
    `;
    const [rows] = await pool.query(sql, [userId, startDate, endDate]);
    return rows;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

// Detailed Visit Logs (Always Filtered)
export const DetailedVisitLogs = async (userId, startDate, endDate) => {
  try {
    const sql = `
      SELECT
        vl.visited_date AS date,
        su.short_code,
        vl.device,
        COUNT(*) AS clicks
      FROM visited_logs vl
      JOIN short_url_table su ON vl.url_id = su.id
      WHERE su.user_id = ?
      AND vl.visited_date BETWEEN ? AND ?
      GROUP BY vl.visited_date, su.short_code, vl.device
      ORDER BY vl.visited_date DESC, clicks DESC
    `;
    const [rows] = await pool.query(sql, [userId, startDate, endDate]);
    return rows;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};
