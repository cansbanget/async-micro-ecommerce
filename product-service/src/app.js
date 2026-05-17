require("dotenv").config({ path: __dirname + "/../.env" }); // Pastikan path benar
const express = require("express");
const app = express();
const productRoutes = require("./routes/productRoutes");
const ProductModel = require("./models/productModel");
const { listenEvent } = require("./config/queue");

app.use(express.json());

app.use("/api/products", productRoutes);

listenEvent("UPDATE_PRODUCT_STOCK_TRANS", updateStock);

app.get("/", (req, res) => {
  res.send("User Service API");
});

const PORT = process.env.PORT || 3003; // Port unik
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});

async function updateStock(data) {
  await ProductModel.updateStock(data.id, data.stock);
}
