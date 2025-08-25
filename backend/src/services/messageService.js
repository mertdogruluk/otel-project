import prisma from "../config/db.js";

/**
 * Mesaj kaydet
 * @param {Object} param0
 * @param {number|string} param0.chatId - Mesajın ait olduğu chat ID
 * @param {number|string} param0.senderId - Mesajı gönderen kullanıcı ID
 * @param {string} param0.text - Mesaj içeriği
 * @returns {Promise<Object>} Kaydedilen mesaj objesi
 */
export const saveMessage = async ({ chatId, senderId, text }) => {
  // Tip güvenliği ve boş mesaj kontrolü
  chatId = Number(chatId);
  senderId = Number(senderId);
  text = text?.trim();

  if (isNaN(chatId) || isNaN(senderId) || !text) 
    throw new Error("Geçersiz chatId, senderId veya text");


  // Gönderen kullanıcıyı bul ve rolünü al
  const sender = await prisma.user.findUnique({
    where: { user_id: senderId },
    select: { role: true, name: true },
  });
  if (!sender) throw new Error("Gönderen kullanıcı bulunamadı");

  // Mesajı oluştur
  const msg = await prisma.message.create({
    data: {
      chat_id: chatId,
      sender_id: senderId,
      content: text,
    },
    include: {
      sender: {
        select: { user_id: true, name: true, role: true },
      },
    },
  });

  return msg;
};

/**
 * Chat mesajlarını getir (ASC)
 * @param {number|string} chatId - Mesajların ait olduğu chat ID
 * @param {Object} options
 * @param {number} options.take - Kaç mesaj alınacak (varsayılan: 100)
 * @param {number|string} options.cursor - Cursor ile sayfalama yapılacaksa mesaj ID
 * @returns {Promise<Object[]>} Mesaj listesi
 */
export const getMessagesByChatId = async (chatId, { take = 100, cursor } = {}) => {
  chatId = Number(chatId);
  cursor = cursor ? Number(cursor) : undefined;

  return prisma.message.findMany({
    where: { chat_id: chatId },
    orderBy: { created_at: "asc" },
    take,
    ...(cursor ? { cursor: { message_id: cursor }, skip: 1 } : {}),
    include: {
      sender: { select: { user_id: true, name: true, role: true } },
    },
  });
};
