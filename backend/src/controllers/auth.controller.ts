import bcrypt from "bcryptjs";
import generateToken from "../lib/utils.js";
import errorHandler from "../lib/error.js";
import cloudinary from "../lib/cloudinary.js";
import { extractPublicId } from "cloudinary-build-url";
import { Request, Response, NextFunction } from "express";
import { sql } from "../lib/db.js";
import { TypeUser } from "../types/types.js";

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const userFields: TypeUser = req.body.userFields;

    const email = userFields.email.toLowerCase().replace(/\s+/g, ""),
      username = userFields.username.trim().replace(/\s+/g, ""),
      fullname = userFields.fullname.trim(),
      password = userFields.password.trim().replace(/\s+/g, "");

    if (!email || !username || !fullname || !password) {
      next(errorHandler(422, "All fields are required"));
      return;
    } else if (!/.+@.+\..+/.test(email)) {
      next(errorHandler(422, "Invalid email address"));
      return;
    } else if (username.length > 20) {
      next(errorHandler(422, "Maximum username length is 20"));
      return;
    } else if (fullname.length > 30) {
      next(errorHandler(422, "Minimun fullname length is 30"));
      return;
    } else if (password.length < 6) {
      next(errorHandler(422, "Minimun password length is 6"));
      return;
    } else if (password.length > 30) {
      next(errorHandler(422, "Maximum password length is 30"));
      return;
    } else if ((await sql`SELECT 1 FROM users WHERE email = ${email} LIMIT 1`)[0]) {
      next(errorHandler(409, "Email already exists"));
      return;
    } else if ((await sql`SELECT 1 FROM users WHERE username = ${username} LIMIT 1`)[0]) {
      next(errorHandler(409, "Username already exists"));
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const users = await sql`
      INSERT INTO users (email, username, fullname, password) 
      VALUES (${email}, ${username}, ${fullname}, ${hashedPassword}) 
      RETURNING id;
    `;

    generateToken(users[0].id, res);
    res.status(204).end();
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error in signup controller :", err.message);
      next(errorHandler(500, "Internal Server Error"));
    }
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const userFields: TypeUser = req.body.userFields;

    const email = userFields.email.trim().toLowerCase(),
      password = userFields.password.trim();

    if (!email || !password) {
      next(errorHandler(400, "All fields are required"));
      return;
    }

    const users = await sql`
      SELECT id, password FROM users WHERE email = ${email} LIMIT 1;
    `;

    if (!users[0]) {
      next(errorHandler(400, "User not found (check email)"));
      return;
    } else if (!(await bcrypt.compare(password, users[0].password))) {
      next(errorHandler(400, "Password mismatch"));
      return;
    }
    console.log(1, users[0].id);
    console.log(2, generateToken(users[0].id, res));

    res.status(204).end();
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error in login controller :", err.message);
      next(errorHandler(500, "Internal Server Error"));
    }
  }
}

export function logout(_req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie("jwt");
    res.status(204).end();
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error in logout controller :", err.message);
      next(errorHandler(500, "Internal Server Error"));
    }
  }
}

export async function getAuthUser(req: Request, res: Response, next: NextFunction) {
  try {
    const users =
      await sql`SELECT id, username, fullname, email, profile_picture AS "profilePicture" FROM users WHERE id = ${req.userId} LIMIT 1`;
    res.status(200).json(users[0]);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error in getAuthUser controller :", err.message);
      next(errorHandler(500, "Internal Server Error"));
    }
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userFields: TypeUser = JSON.parse(req.body.userFields);

    const email = userFields.email.toLowerCase().replace(/\s+/g, ""),
      username = userFields.username.replace(/\s+/g, ""),
      fullname = userFields.fullname.trim(),
      newProfilePic = req.file;

    if (!username || !fullname || !email) {
      next(errorHandler(400, "All fields are required"));
      return;
    }

    const cloudinaryRes = newProfilePic?.mimetype.startsWith("image/")
      ? await cloudinary.uploader.upload(newProfilePic.path, { folder: `quizzo/${req.userId}/profilePicture` })
      : null;

    const authUser = await sql`
      UPDATE users SET email = ${email}, username = ${username}, fullname = ${fullname} WHERE id = ${req.userId}
      RETURNING profile_picture as "profilePicture"
    `;

    if (authUser[0].profilePicture !== userFields.profilePicture) {
      cloudinary.uploader.destroy(extractPublicId(authUser[0].profilePicture));
      await sql`UPDATE users SET profile_picture = ${cloudinaryRes?.secure_url} WHERE id = ${req.userId};`;
    }

    res.status(204).end();
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error in updateUser controller : ", err.message);
      next(errorHandler(500, "Internal Server Error"));
    }
  }
}
