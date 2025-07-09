import pool from "../db/connections.js";

// Summary Cards (Single Short URL Analytics without Date Filter)
export const SingleURLSummaryCard = async (shortCode) => {
  try {
    const sql = `
      SELECT
        full_url,
        clicks AS total_clicks,
        DATE_FORMAT(created_at, '%b %e, %Y') AS created_on
      FROM short_url_table
      WHERE short_code = ?
    `;
    const [rows] = await pool.query(sql, [shortCode]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

// Clicks Over Time (Single Short URL Analytics)

export const SingleURLClicksOverTime = async (shortCode, startDate, endDate) => {
  try {
    const sql = `
      SELECT
        vl.visited_date AS date,
        COUNT(*) AS clicks
      FROM visited_logs vl
      JOIN short_url_table su ON vl.url_id = su.id
      WHERE su.short_code = ?
      AND vl.visited_date BETWEEN ? AND ?
      GROUP BY vl.visited_date
      ORDER BY vl.visited_date
    `;
    const [rows] = await pool.query(sql, [shortCode, startDate, endDate]);
    return rows;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

// Device Breakdown (Single Short URL Analytics)
export const SingleURLDeviceBreakdown = async (shortCode, startDate, endDate) => {
  try {
    const sql = `
      SELECT
        vl.device,
        COUNT(*) AS visits
      FROM visited_logs vl
      JOIN short_url_table su ON vl.url_id = su.id
      WHERE su.short_code = ?
      AND vl.visited_date BETWEEN ? AND ?
      GROUP BY vl.device
    `;
    const [rows] = await pool.query(sql, [shortCode, startDate, endDate]);
    return rows;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};
