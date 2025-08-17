import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

import { prisma } from "./src/config/db.js";
import chatRoutes from "./src/routes/chatRoutes.js";
import { findOrCreateDirectChat, isUserParticipantOfChat, getCounterpartIds } from "./src/services/chatService.js";
import { saveMessage } from "./src/services/messageService.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// --- Middleware
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(",") || "*", credentials: true }));
app.use(express.json());

// --- REST
app.use("/api/chats", chatRoutes);
app.get("/", (_req, res) => res.send("API çalışıyor"));

// --- Socket.io
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_ORIGIN?.split(",") || "*", methods: ["GET", "POST"] },
});

// Io’yu REST tarafında da kullanmak istersen:
app.set("io", io);

// === Socket JWT doğrulama (handshake)
io.use(async (socket, next) => {
  try {
    const bearer = socket.handshake.auth?.token || socket.handshake.headers?.authorization || socket.handshake.query?.token;
    if (!bearer) return next(new Error("UNAUTHORIZED"));

    const token = bearer.startsWith?.("Bearer ") ? bearer.slice(7) : bearer;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.userId || !decoded?.role) return next(new Error("UNAUTHORIZED"));

    // Kullanıcı aktif mi kontrol
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, role: true, firstName: true, lastName: true, isActive: true },
    });
    if (!user || !user.isActive) return next(new Error("UNAUTHORIZED"));

    socket.user = { id: user.id, role: user.role, name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User" };
    next();
  } catch (err) {
    next(new Error("UNAUTHORIZED"));
  }
});

// === Socket connection
io.on("connection", (socket) => {
  const { id: userId, role, name } = socket.user;
  console.log(`🔌 Connected: ${name} (${role}) #${userId}`);

  // Kişiye özel bildirim odası
  socket.join(`notify:${userId}`);

  // --- Chat başlat/katıl (WhatsApp mantığı: 1↔2, 1↔3, 2↔3)
  // payload: { targetUserId } → hedef kişi (rol önemli değil)
  socket.on("chat:join", async ({ targetUserId }, ack) => {
    try {
      if (!targetUserId) throw new Error("targetUserId gerekli");
      if (String(targetUserId) === String(userId)) throw new Error("Kendinizle sohbet başlatamazsınız");

      const chat = await findOrCreateDirectChat(Number(userId), Number(targetUserId));
      const chatId = chat.id;

      // Güvenlik: katılımcı mı?
      const allowed = await isUserParticipantOfChat(userId, chatId);
      if (!allowed) throw new Error("Sohbete erişim yetkiniz yok");

      socket.join(`chat:${chatId}`);
      ack?.({ ok: true, chatId });
    } catch (err) {
      console.error("chat:join error", err);
      ack?.({ ok: false, error: err.message });
    }
  });

  // --- Mesaj gönder
  // payload: { chatId, content }
  socket.on("message:send", async ({ chatId, content }, ack) => {
    try {
      if (!chatId || !content?.trim()) throw new Error("chatId ve content gerekli");

      // Güvenlik: katılımcı mı?
      const allowed = await isUserParticipantOfChat(userId, Number(chatId));
      if (!allowed) throw new Error("Bu sohbete mesaj gönderme yetkiniz yok");

      const saved = await saveMessage({ chatId: Number(chatId), senderId: userId, text: content.trim() });

      // Odaya yayınla
      io.to(`chat:${chatId}`).emit("message:new", saved);

      // Karşı tarafa bildirim gönder
      const others = await getCounterpartIds(Number(chatId), userId);
      others.forEach((otherId) => {
        io.to(`notify:${otherId}`).emit("notify:new-message", {
          chatId: Number(chatId),
          messageId: saved.id,
          from: userId,
        });
      });

      ack?.({ ok: true, message: saved });
    } catch (err) {
      console.error("message:send error", err);
      ack?.({ ok: false, error: err.message });
    }
  });

  // --- Yazıyor (typing) bildirimi
  socket.on("typing", ({ chatId, typing }) => {
    if (!chatId) return;
    socket.to(`chat:${chatId}`).emit("typing", { userId, typing: !!typing });
  });

  // --- Ayrılma
  socket.on("disconnect", () => {
    console.log(`❌ Disconnected: ${name} (${role}) #${userId}`);
  });
});

// --- Server başlat
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server http://localhost:${PORT} üzerinde`));
