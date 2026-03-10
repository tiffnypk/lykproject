import db from "../config/db.js";

export const MessageModel = {
  async getAll() {
    const result = await db.query(
      "SELECT * FROM messages ORDER BY created_at DESC",
    );
    return result.rows;
  },

  async findById(id) {
    const result = await db.query("SELECT * FROM messages WHERE id = $1", [id]);
    return result.rows[0];
  },

  async create({ recipient_name, content, sender_id }) {
    const result = await db.query(
      `
      INSERT INTO messages (recipient_name, content, sender_id)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [recipient_name, content, sender_id],
    );
    return result.rows[0];
  },

  async delete(messageId) {
    const result = await db.query("DELETE FROM messages WHERE id = $1", [
      messageId,
    ]);
    return result.rowCount;
  },
};
