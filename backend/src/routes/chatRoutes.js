import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { 
  startDirectChat, 
  verifyParticipation, 
  getCounterparts 
} from "../controllers/chatController.js";

const router = express.Router();

// 1-1 chat başlatır veya mevcut olanı döner
// POST /api/chats/start
router.post("/start", authenticateToken, startDirectChat);

// Kullanıcı chat katılımcısı mı kontrolü
// GET /api/chats/:chatId/verify
router.get("/:chatId/verify", authenticateToken, verifyParticipation);

// Chattaki diğer katılımcıların id'lerini döndürür
// GET /api/chats/:chatId/counterparts
router.get("/:chatId/counterparts", authenticateToken, getCounterparts);

export default router;

