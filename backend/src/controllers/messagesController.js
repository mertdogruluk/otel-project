import { getMessagesByChatId, saveMessage } from "../services/messageService.js";
import { isUserParticipantOfChat } from "../services/chatService.js";

// Mesajları çek
export const getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const allowed = await isUserParticipantOfChat(req.user.user_id, Number(chatId));
    if (!allowed) {
      return res.status(403).json({ success: false, message: "Bu sohbete erişim yetkiniz yok" });
    }

    const messages = await getMessagesByChatId(Number(chatId), {
      take: req.query.take ? Number(req.query.take) : 100,
      cursor: req.query.cursor ? Number(req.query.cursor) : undefined,
    });

    res.json({ success: true, messages });
  } catch (err) {
    console.error("getChatMessages error", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Mesaj gönder
export const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, message: "Mesaj içeriği boş olamaz" });
    }

    const allowed = await isUserParticipantOfChat(req.user.user_id, Number(chatId));
    if (!allowed) {
      return res.status(403).json({ success: false, message: "Bu sohbete mesaj gönderme yetkiniz yok" });
    }

    const saved = await saveMessage({
      chatId: Number(chatId),
      senderId: req.user.user_id,
      text: content.trim(),
    });

    res.status(201).json({ success: true, message: saved });
  } catch (err) {
    console.error("sendMessage error", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
