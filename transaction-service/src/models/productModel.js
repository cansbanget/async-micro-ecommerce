const pool = require("../config/db");

const ProductModel = {
  create: async (id, name, imageUrl, stock, price) => {
    const [result] = await pool.execute(
      "INSERT INTO products (id, name, image_url, stock, price) VALUES (?, ?, ?, ?, ?)",
      [id, name, imageUrl, stock, price]
    );
    return result.insertId;
  },

  findById: async (id) => {
    const [rows] = await pool.execute("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    return rows[0];
  },

  update: async (id, name, imageUrl, stock, price) => {
    const [result] = await pool.execute(
      "UPDATE products SET name = ?, image_url = ?, stock = ?, price = ? WHERE id = ?",
      [name, imageUrl, stock, price, id]
    );
    return result.affectedRows;
  },

  updateStock: async (id, stock) => {
    const [result] = await pool.execute(
      "UPDATE products SET stock = ? WHERE id = ?",
      [stock, id]
    );
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await pool.execute("DELETE FROM products WHERE id = ?", [
      id,
    ]);
    return result.affectedRows;
  },

  getAll: async () => {
    const [rows] = await pool.execute("SELECT * FROM products");
    return rows;
  },
};

module.exports = ProductModel;
