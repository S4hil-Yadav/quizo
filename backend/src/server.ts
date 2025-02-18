import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import quizRoute from "./routes/quiz.route.js";
import { initDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

dotenv.config();
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, parameterLimit: 100000, limit: "25mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/quizes", quizRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (_req, res) => res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html")));
}

initDB().then(() =>
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  })
);

app.use((error: CustomError, _req: Request, res: any, _next: NextFunction) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";
  return res.status(statusCode).json({ success: false, statusCode, message });
});

interface CustomError extends Error {
  statusCode?: number;
}
