 import { findOrCreateDirectChat, isUserParticipantOfChat, getCounterpartIds } from "../services/chatService.js";

/**
 * 1-1 chat başlatır veya mevcut chat’i döner
 * POST /api/chats/start
 * body: { targetUserId }
 */
export const startDirectChat = async (req, res) => {
  try {
    const userId = req.user.user_id; // auth middleware ile socket veya JWT'den geliyor
    const { targetUserId } = req.body;
    
if (!targetUserId || Number.isNaN(Number(targetUserId))) {
  return res.status(400).json({ ok: false, error: "Geçerli bir targetUserId gerekli" });
}
    const chat = await findOrCreateDirectChat(userId, Number(targetUserId));
    return res.json({ ok: true, chat });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

/**
 * Kullanıcının chat katılımcısı olup olmadığını kontrol eder
 * GET /api/chats/:chatId/verify
 */
export const verifyParticipation = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const chatId = Number(req.params.chatId);

    const allowed = await isUserParticipantOfChat(userId, chatId);
    return res.json({ ok: true, allowed });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

/**
 * Bir chattaki diğer katılımcıları döner
 * GET /api/chats/:chatId/counterparts
 */
export const getCounterparts = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const chatId = Number(req.params.chatId);

    const participants = await getCounterpartIds(chatId, userId);
    return res.json({ ok: true, counterparts: participants });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};
