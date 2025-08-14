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
//test 
app.use("/api", testRoute);

app.get("/", (req, res) => {
  res.send("API Çalışıyor ");
});




const PORT = process.env.PORT || 5000;

export default app;
