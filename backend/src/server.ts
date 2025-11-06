// src/server.ts
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth"; // ✅ correct import path
import userRoutes from "./routes/users";


dotenv.config();

const app = express();


// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);


const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/doora";

// ✅ Database connection
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
