import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
import tasksRoutes from "./routes/tasksRoutes.js"
import cookieParser from "cookie-parser";
import path from 'path';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with the correct frontend URL
  credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions));

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/todo", tasksRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
  
});
