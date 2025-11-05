import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple health check route
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Doora backend is running!");
});

// Environment variables
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Check required env vars
if (!MONGO_URI) {
  console.error("❌ MONGODB_URI not set in environment");
  process.exit(1);
}
if (!JWT_SECRET) {
  console.error("❌ JWT_SECRET not set in environment");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

export default app;
