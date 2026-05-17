// transaction-service/src/models/transactionModel.js
const pool = require("../config/db");

const TransactionModel = {
  createTransaction: async (customerId, totalAmount, status = "pending") => {
    const [result] = await pool.execute(
      "INSERT INTO transactionss (customer_id, total_amount, status) VALUES (?, ?, ?)",
      [customerId, totalAmount, status]
    );
    return result.insertId;
  },

  addTransactionItem: async (
    transactionId,
    productId,
    quantity,
    pricePerItem
  ) => {
    const [result] = await pool.execute(
      "INSERT INTO transaction_itemss (transaction_id, product_id, quantity, price_per_item) VALUES (?, ?, ?, ?)",
      [transactionId, productId, quantity, pricePerItem]
    );
    return result.insertId;
  },

  findById: async (id) => {
    const [rows] = await pool.execute(
      `SELECT t.id, t.customer_id, t.total_amount, t.status, t.transaction_date,
                    ci.id AS item_id, ci.product_id, ci.quantity, ci.price_per_item
             FROM transactionss t
             JOIN transaction_itemss ci ON t.id = ci.transaction_id
             WHERE t.id = ?`,
      [id]
    );
    return rows; // Akan mengembalikan array karena satu transaksi bisa memiliki banyak item
  },

  findByCustomerId: async (customerId) => {
    const [rows] = await pool.execute(
      `SELECT t.id, t.customer_id, t.total_amount, t.status, t.transaction_date,
                    ci.id AS item_id, ci.product_id, ci.quantity, ci.price_per_item
             FROM transactionss t
             JOIN transaction_itemss ci ON t.id = ci.transaction_id
             WHERE t.customer_id = ?
             ORDER BY t.transaction_date DESC`,
      [customerId]
    );
    return rows;
  },

  updateStatus: async (id, status) => {
    const [result] = await pool.execute(
      "UPDATE transactionss SET status = ? WHERE id = ?",
      [status, id]
    );
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await pool.execute(
      "DELETE FROM transactionss WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  },

  getAll: async () => {
    const [rows] = await pool.execute(
      `SELECT t.id, t.customer_id, t.total_amount, t.status, t.transaction_date,
                    ci.id AS item_id, ci.product_id, ci.quantity, ci.price_per_item
             FROM transactionss t
             JOIN transaction_itemss ci ON t.id = ci.transaction_id
             ORDER BY t.transaction_date DESC`
    );
    return rows;
  },
};

module.exports = TransactionModel;
