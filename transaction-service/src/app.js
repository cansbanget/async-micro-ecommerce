require("dotenv").config({ path: __dirname + "/../.env" }); // Pastikan path benar
const express = require("express");
const app = express();
const transactionRoutes = require("./routes/transactionRoutes");
const { listenEvent } = require("./config/queue");
const CustomerModel = require("./models/customerModel");
const ProductModel = require("./models/productModel");

app.use(express.json());

listenEvent("CREATE_CUSTOMER", createCustomer);
listenEvent("UPDATE_CUSTOMER", updateCustomer);
listenEvent("CREATE_PRODUCT", createProduct);
listenEvent("UPDATE_PRODUCT", updateProduct);
listenEvent("UPDATE_PRODUCT_STOCK", updateProductStock);

app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send("User Service API");
});

const PORT = process.env.PORT || 3004; // Port unik
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});

async function createCustomer(data) {
  await CustomerModel.create(data.id, data.name, data.email);
}
async function updateCustomer(data) {
  await CustomerModel.update(data.id, data.name, data.email);
}

async function createProduct(data) {
  await ProductModel.create(
    data.id,
    data.name,
    data.imageUrl,
    data.stock,
    data.price
  );
}
async function updateProduct(data) {
  await ProductModel.update(
    data.id,
    data.name,
    data.imageUrl,
    data.stock,
    data.price
  );
}
async function updateProductStock(data) {
  await ProductModel.updateStock(data.id, data.stock);
}
