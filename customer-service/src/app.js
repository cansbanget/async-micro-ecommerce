require("dotenv").config({ path: __dirname + "/../.env" }); // Pastikan path benar
const express = require("express");
const app = express();
const customerRoutes = require("./routes/customerRoutes");

app.use(express.json());

app.use("/api/customers", customerRoutes);

app.get("/", (req, res) => {
  res.send("User Service API");
});

const PORT = process.env.PORT || 3002; // Port unik
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
