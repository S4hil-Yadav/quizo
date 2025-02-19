import jwt from "jsonwebtoken";
import { Response } from "express";

export default function generateToken(userId: string, res: Response) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    domain: process.env.CLIENT_URL,
  });

  console.log(3, res.cookie);
  return token;
}
