import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/connectdb.js";
const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
import userRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

app.use(cors());

connectDB(DATABASE_URL);

// JSON Middleware Configration
app.use(express.json());

// Load Routes
app.use("/api/auth", userRoutes);
app.use("/api/upload", uploadRoutes);

app.listen(port, () => {
  console.log(`Server Listing at port  ${port}`);
});
