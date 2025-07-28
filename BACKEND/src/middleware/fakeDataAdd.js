// fakeDataAdd.js
import { faker } from '@faker-js/faker';
import pool from '../db/connections.js';
const fakeDataAdd = async (req, res, next) => {
  const devices = ['Desktop', 'Mobile', 'Tablet', 'E-Reader', 'Unknown'];
  const usedCodes = new Set();
  const pad2 = n => n.toString().padStart(2, '0');

  const genUniqueCode = () => {
    let code;
    do {
      code = faker.string.alphanumeric(7);
    } while (usedCodes.has(code));
    usedCodes.add(code);
    return code;
  };

  try {
    for (let day = 1; day <= 31; day++) {
      const dateStr = `2025-07-${pad2(day)}`;
      const numUrls = faker.number.int({ min: 3, max: 6 });

      for (let i = 0; i < numUrls; i++) {
        const fullUrl   = faker.internet.url();
        const shortCode = genUniqueCode();
        const clicks    = faker.number.int({ min: 15, max: 20 });
        const hour      = faker.number.int({ min: 0, max: 23 });
        const minute    = faker.number.int({ min: 0, max: 59 });
        const createdAt = `${dateStr} ${pad2(hour)}:${pad2(minute)}:00`;

        // Insert into short_url_table
        const [insertResult] = await pool.execute(
          `INSERT INTO short_url_table
             (full_url, short_code, clicks, user_id, created_at)
           VALUES (?, ?, ?, ?, ?)`,
          [fullUrl, shortCode, clicks, 9, createdAt]
        );
        const urlId = insertResult.insertId;

        // Insert visited_logs entries
        for (let v = 0; v < clicks; v++) {
          const device = v < devices.length
            ? devices[v]
            : faker.helpers.arrayElement(devices);

          await pool.execute(
            `INSERT INTO visited_logs
               (url_id, visited_date, device)
             VALUES (?, ?, ?)`,
            [urlId, dateStr, device]
          );
        }
      }
    }

    console.log('✅ Fake data added for July 2025');
    next();
  } catch (err) {
    next(err);
  }
};

export default fakeDataAdd;
