import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { drizzlePool } from "../db/conn";
import { users } from "../db/schema";
import authRoutes from "./routes/authRoute";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Add CORS middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.get("/", async (req, res) => {
  try {
    const allUsers = await drizzlePool.query.users.findMany();
    res.json({ message: "Backend is running!", users: allUsers });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
