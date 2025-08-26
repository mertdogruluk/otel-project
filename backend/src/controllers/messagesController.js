import { saveMessage, getMessagesByChatId } from "../services/messageService.js";
import { isUserParticipantOfChat } from "../services/chatService.js";
import prisma from "../config/db.js";

/**
 * Chat mesajlarını getir
 */
export const getChatMessages = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const chatId = Number(req.params.chatId);
    if (!Number.isFinite(chatId)) {
      return res.status(400).json({ ok: false, error: "Geçersiz chatId" });
    }
    // Chat katılımcısı mı kontrol
    const allowed = await isUserParticipantOfChat(userId, chatId);
    if (!allowed) {
      return res.status(403).json({ ok: false, error: "Bu sohbete erişim yetkiniz yok" });
    }

    const messages = await getMessagesByChatId(chatId);
    return res.json({ ok: true, messages });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

/**
 * Mesaj gönder
 */
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user.user_id;
    const chatId = Number(req.params.chatId); // URL parametresinden alıyoruz
    const { content } = req.body;

    if (!Number.isFinite(chatId) || !content?.trim()) {
      return res.status(400).json({ ok: false, error: "Geçersiz chatId veya boş içerik" });
    }

    // Chat katılımcısı mı kontrol
    const allowed = await isUserParticipantOfChat(senderId, Number(chatId));
    if (!allowed) {
      return res.status(403).json({ ok: false, error: "Bu sohbete mesaj gönderme yetkiniz yok" });
    }

    // --- Rol bazlı kontrol
    const participants = await prisma.chatParticipant.findMany({
      where: { chat_id: Number(chatId) },
      select: { user_id: true },
    });

    const otherParticipantIds = participants.map(p => p.user_id).filter(id => id !== senderId);
    const otherUsers = await prisma.user.findMany({
      where: { user_id: { in: otherParticipantIds } },
      select: { role: true },
    });

    const allowedRoles = {
      CUSTOMER: ["SUPPORT", "HOTEL_OWNER"],
      HOTEL_OWNER: ["CUSTOMER", "SUPPORT"],
      SUPPORT: ["CUSTOMER", "HOTEL_OWNER"]
    };

    for (const other of otherUsers) {
      if (!allowedRoles[req.user.role]?.includes(other.role)) {
        return res.status(403).json({ ok: false, error: "Bu kullanıcı ile mesaj gönderemezsiniz" });
      }
    }

    // Mesajı kaydet
    const message = await saveMessage({ chatId: Number(chatId), senderId, text: content.trim() });

    return res.json({ ok: true, message });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};
export const deleteMessage = async (req, res) => {
  try {
    const messageId = Number(req.params.messageId);
    if (!messageId) return res.status(400).json({ ok: false, error: "Geçersiz messageId" });

    const deleted = await prisma.message.delete({
      where: { message_id: messageId }
    });

    return res.json({ ok: true, deleted });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};