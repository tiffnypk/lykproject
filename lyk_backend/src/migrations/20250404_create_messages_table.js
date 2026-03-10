import db from "../config/db.js";

export async function up() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        sender_id VARCHAR(225) NOT NULL,
        recipient_name VARCHAR(50) NOT NULL,
        content VARCHAR(200) NOT NULL,
        created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (error) {
    console.log(error);
  }
}

export async function down() {
  try {
    await db.query("DROP TABLE IF EXISTS messages");
  } catch (error) {
    console.log(error);
  }
}

down();
