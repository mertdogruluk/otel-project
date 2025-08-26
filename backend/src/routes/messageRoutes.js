import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { getChatMessages, sendMessage,deleteMessage } from "../controllers/messagesController.js";

const router = express.Router();

// Mesajları getir
router.get("/:chatId/messages", authenticateToken, getChatMessages);

// Mesaj gönder
router.post("/:chatId/messages", authenticateToken, sendMessage);
//mesaj silme için
router.delete("/:messageId", authenticateToken, deleteMessage);

export default router;
