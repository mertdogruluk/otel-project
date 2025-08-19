/*import prisma from "../config/db.js";
import { saveMessage, getMessagesByChatId } from "../services/messageService.js";
import { findOrCreateDirectChat } from "../services/chatService.js";

let userA, userB, chat;

beforeAll(async () => {
  // Aynı e-posta varsa sil
  await prisma.user.deleteMany({
    where: { email: { in: ["ali@test.com", "veli@test.com"] } }
  });

  // Test kullanıcıları
  userA = await prisma.user.create({
    data: { name: "Ali", email: "ali@test.com", password: "123456" }
  });
  userB = await prisma.user.create({
    data: { name: "Veli", email: "veli@test.com", password: "123456" }
  });

  // Test chat oluştur veya getir
  chat = await findOrCreateDirectChat(userA.user_id, userB.user_id);
});

afterAll(async () => {
  // Mesajları temizle
  await prisma.message.deleteMany({ where: { chat_id: chat.chat_id } });
  await prisma.chatParticipant.deleteMany({ where: { chat_id: chat.chat_id } });
  await prisma.chat.deleteMany({ where: { chat_id: chat.chat_id } });
  await prisma.user.deleteMany({
    where: { email: { in: ["ali@test.com", "veli@test.com"] } }
  });

  await prisma.$disconnect();
});

describe("Mesaj testi", () => {
  test("kullanıcı mesaj gönderir", async () => {
    const msg = await saveMessage({
      chatId: chat.chat_id,
      senderId: userA.user_id,
      text: "Merhaba!"
    });

    expect(msg).toHaveProperty("message_id");
    expect(msg.content).toBe("Merhaba!");
  });

  test("chat mesajlarını sıralı olarak döner", async () => {
    await saveMessage({
      chatId: chat.chat_id,
      senderId: userB.user_id,
      text: "Selam!"
    });

    const msgs = await getMessagesByChatId(chat.chat_id);
    expect(msgs.length).toBeGreaterThanOrEqual(2);
    expect(msgs[0].content).toBe("Merhaba!");
    expect(msgs[1].content).toBe("Selam!");
  });
});
*/