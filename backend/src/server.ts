import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import quizRoute from "./routes/quiz.route.js";
import { initDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, parameterLimit: 100000, limit: "25mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: "*",
    allowedHeaders: "*",
  })
);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/quizes", quizRoute);

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
