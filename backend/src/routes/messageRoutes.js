import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { getChatMessages, sendMessage } from "../controllers/messagesController.js";

const router = express.Router();

// Mesajları getir
router.get("/:chatId/messages", authenticateToken, getChatMessages);

// Mesaj gönder
router.post("/:chatId/messages", authenticateToken, sendMessage);

export default router;
