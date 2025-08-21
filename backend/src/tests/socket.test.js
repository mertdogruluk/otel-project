/*import { io } from "socket.io-client";
import dotenv from "dotenv";

// Ortam değişkenlerini yükle
dotenv.config();

describe("Socket.io connection", () => {
  it("should connect with real token from login", (done) => {
    // Postman'den aldığın gerçek JWT'yi buraya yapıştır
    const tokenFromLogin =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYwLCJlbWFpbCI6InRlc3R1c2VyQGV4YW1wbGUuY29tIiwicm9sZSI6IkNVU1RPTUVSIiwiaWF0IjoxNzU1NjIxNDU0LCJleHAiOjE3NTYyMjYyNTR9.b6FOhSoqedOxuM6_IWoU96PaIqEvNAOlsOP1zpmozq8";

    const socket = io("http://localhost:3000", {
      auth: { token: tokenFromLogin }, // Bearer eklemeye gerek yok, socket.io auth kendi kurallarına göre alır
      transports: ["websocket"],       // websocket kullan
    });

    socket.on("connect", () => {
      console.log(" Gerçek JWT ile bağlandı, ID:", socket.id);
      socket.disconnect();
      done();
    });

    socket.on("connect_error", (err) => {
      console.error("Bağlantı hatası:", err.message);
      done(err);
    });
  });
});
*/