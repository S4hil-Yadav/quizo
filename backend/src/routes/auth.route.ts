import express from "express";
import { signup, login, getAuthUser, logout, updateUser } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import upload from "../lib/multer.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("", protectRoute, getAuthUser);
router.put("", protectRoute, upload.single("profilePicture"), updateUser);

export default router;
