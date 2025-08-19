import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { getChatMessages } from "../controllers/messagesController.js";

const router = express.Router();

router.get("/:chatId/messages", authenticateToken, getChatMessages);

export default router;
