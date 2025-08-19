/*import prisma from "../config/db.js";
import { findOrCreateDirectChat, isUserParticipantOfChat, getCounterpartIds } from "../services/chatService.js";

let userA, userB;

beforeAll(async () => {
  await prisma.user.deleteMany({
    where: { email: { in: ["ali@test.com", "veli@test.com"] } }
  });

  userA = await prisma.user.create({
    data: { name: "Ali", email: "ali@test.com", password: "123456" }
  });
  userB = await prisma.user.create({
    data: { name: "Veli", email: "veli@test.com", password: "123456" }
  });
});

afterAll(async () => {
  await prisma.chatParticipant.deleteMany({});
  await prisma.chat.deleteMany({});
  await prisma.user.deleteMany({
    where: { email: { in: ["ali@test.com", "veli@test.com"] } }
  });

  await prisma.$disconnect();
});

describe("Chat testi", () => {
  test("iki kullanıcı arasında chat oluşturur veya mevcut chat'i döner", async () => {
    const chat = await findOrCreateDirectChat(userA.user_id, userB.user_id);
    expect(chat).toHaveProperty("chat_id");

    const chat2 = await findOrCreateDirectChat(userA.user_id, userB.user_id);
    expect(chat2.chat_id).toBe(chat.chat_id);
  });

  test("kullanıcı chat katılımcısı mı kontrol eder", async () => {
    const chat = await findOrCreateDirectChat(userA.user_id, userB.user_id);
    const katilimA = await isUserParticipantOfChat(userA.user_id, chat.chat_id);
    const katilimB = await isUserParticipantOfChat(userB.user_id, chat.chat_id);
    expect(katilimA).toBe(true);
    expect(katilimB).toBe(true);
  });

  test("diğer katılımcıların ID'lerini döner", async () => {
    const chat = await findOrCreateDirectChat(userA.user_id, userB.user_id);
    const digerler = await getCounterpartIds(chat.chat_id, userA.user_id);
    expect(digerler).toContain(userB.user_id);
  });
});
*/