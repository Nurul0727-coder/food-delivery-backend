import express, { Request, Response } from "express";
import { config, configDotenv } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { foodCategoryRouter } from "./router/food.category";
import { foodRouter } from "./router/models/food";

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());

configDotenv();

const connectMongoDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (MONGODB_URI) {
    await mongoose.connect(MONGODB_URI);
  }
};
connectMongoDB();

app.use("/food-category/", foodCategoryRouter);

app.use("/food/", foodRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
