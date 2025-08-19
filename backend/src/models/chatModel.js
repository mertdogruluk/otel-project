import prisma  from "../config/db.js";

// Chat ve ChatParticipant modellerini Prisma üzerinden direkt export ediyoruz
export const Chat = prisma.chat;
export const ChatParticipant = prisma.chatParticipant;
