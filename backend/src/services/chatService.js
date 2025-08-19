 import  prisma  from "../config/db.js";

/**
 * İki kullanıcı arasında 1-1 chat bulur veya oluşturur.
 * 3 rol (CUSTOMER, HOTEL_OWNER, SUPPORT) fark etmeksizin çalışır.
 * Aynı ikili için tekrar chat açmaz (varsa döner).
 * @param {number} userIdA 
 * @param {number} userIdB 
 * @returns {Promise<Object>} chat
 */
export const findOrCreateDirectChat = async (userIdA, userIdB) => {
  if (String(userIdA) === String(userIdB)) {
    throw new Error("Kendinizle sohbet başlatamazsınız");
  }

  //  Önce bu iki kullanıcının katılımcı olduğu bir chat var mı kontrol et
  const existing = await prisma.chat.findFirst({
    where: {
      AND: [
        { participants: { some: { user_id: userIdA } } },
        { participants: { some: { user_id: userIdB } } },
      ],
    },
    select: { chat_id: true },
  });

  if (existing) return existing;

  //  Yoksa kullanıcıları DB'den çek
  const [userA, userB] = await Promise.all([
    prisma.user.findUnique({ where: { user_id: userIdA }, select: { user_id: true, role: true } }),
    prisma.user.findUnique({ where: { user_id: userIdB }, select: { user_id: true, role: true } }),
  ]);

  if (!userA || !userB) throw new Error("Kullanıcı(lar) bulunamadı");

  //  Chat oluştur ve katılımcıları ekle
  const chat = await prisma.chat.create({
    data: {
      participants: {
        create: [
          { user_id: userA.user_id },
          { user_id: userB.user_id },
        ],
      },
    },
    select: { chat_id: true },
  });

  return chat;
};

/**
 * Kullanıcı chat katılımcısı mı kontrolü
 * @param {number} userId 
 * @param {number} chatId 
 * @returns {Promise<boolean>}
 */
export const isUserParticipantOfChat = async (userId, chatId) => {
  const count = await prisma.chatParticipant.count({
    where: { chat_id: chatId, user_id: userId },
  });
  return count > 0;
};

/**
 * Bir chattaki "diğer" katılımcıların id'lerini döndürür
 * @param {number} chatId 
 * @param {number} requesterId 
 * @returns {Promise<number[]>}
 */
export const getCounterpartIds = async (chatId, requesterId) => {
  const parts = await prisma.chatParticipant.findMany({
    where: { chat_id: chatId },
    select: { user_id: true },
  });
  return parts.map(p => p.user_id).filter(id => String(id) !== String(requesterId));
};
