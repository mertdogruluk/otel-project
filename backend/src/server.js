import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";


import  prisma  from "./config/db.js";
import chatRoutes from "./routes/chatRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { findOrCreateDirectChat, isUserParticipantOfChat, getCounterpartIds } from "./services/chatService.js";
import { saveMessage } from "./services/messageService.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
const app = express();
const server = http.createServer(app);
 

// --- Middlewarez
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(",") || "*", credentials: true }));
app.use(express.json());

// --- REST
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (_req, res) => res.send("API çalışıyor"));
// --- Auth routes
app.use("/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/hotels", (await import("./routes/hotelRoutes.js")).default);
app.use("/api/reservations", (await import("./routes/reservationRoutes.js")).default);
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
    if (!decoded?.user_id || !decoded?.role) return next(new Error("UNAUTHORIZED"));

    // Kullanıcıyı şemaya uygun çek
    const user = await prisma.user.findUnique({
      where: { user_id: decoded.user_id }, 
      select: { user_id: true, role: true, name: true },
    });
    if (!user) return next(new Error("UNAUTHORIZED"));

    socket.user = { user_id: user.user_id, role: user.role, name: user.name || "User" };
    next();
  } catch (err) {
    next(new Error("UNAUTHORIZED"));
  }
});

// === Socket connection
io.on("connection", (socket) => {
  const { user_id: userId, role, name } = socket.user;
  console.log(`🔌 Connected: ${name} (${role}) #${userId}`);
   
  // Kullanıcı çevrimiçi oldu
  prisma.user.update({
    where: { user_id: userId },
    data: { is_online: true },
  }).catch(console.error);

  socket.join(`notify:${userId}`);

  // --- Chat join
  socket.on("chat:join", async ({ targetUserId }, ack) => {
    try {
      if (!targetUserId) throw new Error("targetUserId gerekli");
      if (String(targetUserId) === String(userId)) throw new Error("Kendinizle sohbet başlatamazsınız");

      const chat = await findOrCreateDirectChat(Number(userId), Number(targetUserId));
      const chatId = chat.chat_id;

      const allowed = await isUserParticipantOfChat(userId, chatId);
      if (!allowed) throw new Error("Sohbete erişim yetkiniz yok");

      socket.join(`chat:${chatId}`);
      ack?.({ ok: true, chatId });
    } catch (err) {
      console.error("chat:join error", err);
      ack?.({ ok: false, error: err.message });
    }
  });

// socket event
socket.on("message:send", async ({ chatId, content }, ack) => {
  try {
    if (!chatId || !content?.trim()) throw new Error("chatId ve content gerekli");

    const allowed = await isUserParticipantOfChat(userId, Number(chatId));
    if (!allowed) throw new Error("Bu sohbete mesaj gönderme yetkiniz yok");

    const saved = await saveMessage({ chatId: Number(chatId), senderId: userId, text: content.trim() });

    // Mesajı tüm chat odasına gönder
    io.to(`chat:${chatId}`).emit("message:new", saved);

    const others = await getCounterpartIds(Number(chatId), userId);

    // Notify gönder
    others.forEach((otherId) => {
      io.to(`notify:${otherId}`).emit("notify:new-message", {
        chatId: Number(chatId),
        messageId: saved.message_id,
        from: userId,
      });
    });

    // --- Offline kullanıcıları kontrol et ve Nodemailer ile mail gönder
    for (const otherId of others) {
      try {
        const user = await prisma.user.findUnique({
          where: { user_id: otherId },
          select: { email: true, is_online: true, name: true },
        });

        if (user && !user.is_online && user.email) {
          await sendEmail(
            user.email,
            `Yeni mesaj: ${content.slice(0, 30)}...`,
            `Merhaba ${user.name},\n\nYeni bir mesaj aldınız:\n\n"${content}"\n\nOtel Destek`
          );
          console.log(`Mail gönderildi: ${user.email}`);
        } else {
          console.log(`Mail gönderilmedi (online olabilir veya kullanıcı yok): ${user?.email || "bilinmiyor"}`);
        }
      } catch (err) {
        console.error("Mail gönderilemedi:", err);
      }
    }

    // Ack hemen dönüyor
    ack?.({ ok: true, message: saved });
  } catch (err) {
    console.error("message:send error", err);
    ack?.({ ok: false, error: err.message });
  }
});

   
  // --- Typing
  socket.on("typing", ({ chatId, typing }) => {
    if (!chatId) return;
    socket.to(`chat:${chatId}`).emit("typing", { userId, typing: !!typing });
  });

  // --- Disconnect
  socket.on("disconnect", () => {
    console.log(`❌ Disconnected: ${name} (${role}) #${userId}`);
      // Kullanıcı çevrimdışı oldu
      prisma.user.update({
        where: { user_id: userId },
        data: { is_online: false },
      }).catch(console.error);
    
  });
});

 
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`✅ Server http://localhost:${PORT} üzerinde çalışıyor`);
})
.on("error", (err) => {
  console.error("❌ Server başlatılamadı:", err);
});
