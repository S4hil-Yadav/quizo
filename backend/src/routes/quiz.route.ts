import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createQuiz, deleteQuiz, getQuiz, getQuizes, editQuiz } from "../controllers/quiz.controller.js";

const router = express.Router();

router.post("", protectRoute, createQuiz);
router.get("", protectRoute, getQuizes);
router.get("/:quizId", protectRoute, getQuiz);
router.put("/:quizId", protectRoute, editQuiz);
router.delete("/:quizId", protectRoute, deleteQuiz);

export default router;
