import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
import tasksRoutes from "./routes/tasksRoutes.js"
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // Allow frontend requests
  credentials: true, // Allow cookies to be sent & received
}));

app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/todo", tasksRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
  
});
