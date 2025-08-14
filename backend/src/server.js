import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

// DB bağlantısı
import prisma from "./config/db.js";

// REST API route’ları
import userRoutes from "./routes/userRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import testRoute from "./tests/user.test.js";

// Canlı destek servisleri
//import chatService from "./services/chatService.js";
//import messageService from "./services/messageService.js";
//import supportService from "./services/supportService.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// --- Middleware
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*", credentials: true }));
app.use(express.json());


// --- REST API rotaları
app.use("/api/users", userRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/reservations", reservationRoutes);

// Test route
app.use("/api", testRoute);

app.get("/", (req, res) => res.send("API Çalışıyor"));

// --- Socket.io kurulumu
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_ORIGIN || "*", credentials: true },
});

// Io’yu diğer modüllerde kullanmak için
app.set("io", io);

// === JWT handshake doğrulama
io.use((socket, next) => {
  try {
    const bearer = socket.handshake.auth?.token || socket.handshake.headers?.authorization;
    if (!bearer) return next(new Error("UNAUTHORIZED"));

    const token = bearer.startsWith("Bearer ") ? bearer.slice(7) : bearer;
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    socket.user = { id: payload.userId, role: payload.role || "user", name: payload.name || "Guest" };
    next();
  } catch (err) {
    next(new Error("UNAUTHORIZED"));
  }
});

// === Canlı destek / chat state
const onlineSupportSet = new Set();
const socketRoomsByUser = new Map();

// === Socket connection
io.on("connection", (socket) => {
  const { id: userId, role } = socket.user;

  if (role === "support") {
    socket.join("support:lobby");
    onlineSupportSet.add(userId);
    supportService.setStatus(userId, "online").catch(() => {});
    io.to("support:lobby").emit("support:online-list", Array.from(onlineSupportSet));
  } else {
    socket.join(`user:${userId}`);
  }

  socket.join(`notify:${userId}`);

  // --- Chat join
  socket.on("chat:join", async (payload = {}, ack) => {
    try {
      let { chatId, toSupport } = payload;
      if (!chatId) {
        const chat = await chatService.findOrCreateDirectSupportChat(userId, { toSupport: !!toSupport });
        chatId = chat.id;
      }
      socket.join(`chat:${chatId}`);
      if (!socketRoomsByUser.has(userId)) socketRoomsByUser.set(userId, new Set());
      socketRoomsByUser.get(userId).add(`chat:${chatId}`);
      io.to("support:lobby").emit("chat:active", { chatId });
      ack?.({ ok: true, chatId });
    } catch (err) {
      ack?.({ ok: false, error: err.message });
    }
  });

  // --- Mesaj gönder
  socket.on("message:send", async (payload = {}, ack) => {
    try {
      const { chatId, text, attachments } = payload;
      if (!chatId || !text?.trim()) throw new Error("chatId ve text gereklidir");
      const saved = await messageService.saveMessage({ chatId, senderId: userId, text: text.trim(), attachments: attachments || [] });
      io.to(`chat:${chatId}`).emit("message:new", saved);

      const counterpartIds = await chatService.getCounterpartIds(chatId, userId);
      counterpartIds.forEach(cid => io.to(`notify:${cid}`).emit("notify:new-message", { chatId, messageId: saved.id }));

      ack?.({ ok: true, message: saved });
    } catch (err) {
      ack?.({ ok: false, error: err.message });
    }
  });

  // --- Typing
  socket.on("typing", ({ chatId, typing }) => {
    if (!chatId) return;
    socket.to(`chat:${chatId}`).emit("typing", { userId, typing: !!typing });
  });

  // --- Chat leave
  socket.on("chat:leave", ({ chatId }) => {
    if (!chatId) return;
    socket.leave(`chat:${chatId}`);
    socketRoomsByUser.get(userId)?.delete(`chat:${chatId}`);
  });

  // --- Disconnect
  socket.on("disconnect", async () => {
    if (role === "support") {
      onlineSupportSet.delete(userId);
      await supportService.setStatus(userId, "offline").catch(() => {});
      io.to("support:lobby").emit("support:online-list", Array.from(onlineSupportSet));
    }
        console.log("Kullanıcı ayrıldı:", socket.id);
  });
});

// --- Server başlat
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));

export default app;
