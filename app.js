import express from "express";
import dotenv from "dotenv";

import connectDB from "./db/index.js";
import balanceRoutes from "./routes/balanceRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use("/", balanceRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});