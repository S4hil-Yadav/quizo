import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { sql } from "../lib/db.js";

export async function protectRoute(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).json({ message: "Unauthorized - no token provided" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;

    if (!decoded.userId) {
      res.status(401).json({ message: "Unauthorized - invalid token" });
      return;
    }

    const users = await sql`
      SELECT id FROM users WHERE id = ${decoded.userId} LIMIT 1;
    `;

    if (!users[0]) {
      res.status(404).json({ message: "No auth user" });
      return;
    }

    req.userId = users[0].id;

    next();
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error in protectRoute middleware : ", err.message);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
