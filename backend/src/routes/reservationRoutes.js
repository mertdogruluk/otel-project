import express from "express";
import prisma from "../config/db.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * Rezervasyonları listele
 * SUPPORT → tüm rezervasyonlar
 * HOTEL_OWNER → sadece kendi otellerinin rezervasyonları
 * CUSTOMER → sadece kendi rezervasyonları
 */
router.get("/", authenticateToken, async (req, res) => {
  try {
    const { user_id, role } = req.user;
    let reservations;

    if (role === "SUPPORT") {
      reservations = await prisma.reservation.findMany({
        include: {
          user: { select: { user_id: true, name: true, email: true } },
          hotel: true,
          room: true,
        },
        orderBy: { created_at: "desc" },
      });
    } else if (role === "HOTEL_OWNER") {
      const userHotels = await prisma.hotel.findMany({
        where: { owner_id: Number(user_id) },
        select: { hotel_id: true },
      });
      const hotelIds = userHotels.map((h) => h.hotel_id);

      reservations = await prisma.reservation.findMany({
        where: { hotel_id: { in: hotelIds } },
        include: {
          user: { select: { user_id: true, name: true, email: true } },
          hotel: true,
          room: true,
        },
        orderBy: { created_at: "desc" },
      });
    } else {
      reservations = await prisma.reservation.findMany({
        where: { user_id: Number(user_id) },
        include: { hotel: true, room: true },
        orderBy: { created_at: "desc" },
      });
    }

    res.json({ success: true, data: reservations });
  } catch (err) {
    console.error("Get reservations error:", err);
    res.status(500).json({ success: false, error: "Rezervasyonlar getirilirken hata oluştu" });
  }
});

/**
 * Yeni rezervasyon oluştur
 * quantity dikkate alınıyor → aynı odadan en fazla quantity kadar rezervasyon yapılabilir
 * special_requests → opsiyonel, kullanıcı özel not bırakabilir
 */
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { hotel_id, room_id, start_date, end_date, special_requests } = req.body;
    const user_id = Number(req.user.user_id);

    if (!hotel_id || !room_id || !start_date || !end_date) {
      return res.status(400).json({ success: false, error: "Tüm alanlar zorunludur" });
    }

    // Oda bilgisi
    const room = await prisma.room.findUnique({
      where: { room_id: Number(room_id) },
      include: { hotel: true },
    });
    if (!room) {
      return res.status(404).json({ success: false, error: "Oda bulunamadı" });
    }

    // Aynı tarih aralığında çakışan rezervasyon kontrolü
    const overlappingReservations = await prisma.reservation.count({
      where: {
        room_id: Number(room_id),
        start_date: { lte: new Date(end_date) },
        end_date: { gte: new Date(start_date) },
        status: { in: ["PENDING", "CONFIRMED"] },
      },
    });

    if (overlappingReservations >= room.quantity) {
      return res.status(400).json({ success: false, error: "Seçilen tarihlerde oda dolu" });
    }

    // Gece sayısı & toplam fiyat
    const nights = Math.max(
      1,
      Math.ceil((new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24))
    );
    const total_price = room.price * nights;

    // Rezervasyon kaydı
    const reservation = await prisma.reservation.create({
      data: {
        user_id,
        hotel_id: Number(hotel_id),
        room_id: Number(room_id),
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        total_price,
        status: "PENDING",
        special_requests: special_requests || null,
      },
      include: { hotel: true, room: true },
    });

    res.status(201).json({ success: true, data: reservation });
  } catch (err) {
    console.error("Create reservation error:", err);
    res.status(500).json({ success: false, error: "Rezervasyon oluşturulurken hata oluştu" });
  }
});

/**
 * Rezervasyon durum güncelle
 * - CUSTOMER kendi rezervasyonunu CANCEL edebilir
 * - HOTEL_OWNER kendi otelindeki rezervasyonu CONFIRM / CANCEL edebilir
 * - SUPPORT her şeyi güncelleyebilir
 */
router.patch("/:id/status", authenticateToken, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;
    const { user_id, role } = req.user;

    const allowedStatuses = ["PENDING", "CONFIRMED", "CANCELED"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: "Geçersiz rezervasyon durumu" });
    }

    const reservation = await prisma.reservation.findUnique({
      where: { reservation_id: id },
      include: { hotel: true },
    });
    if (!reservation) {
      return res.status(404).json({ success: false, error: "Rezervasyon bulunamadı" });
    }

    const isOwner = reservation.user_id === user_id;
    const isHotelOwner = role === "HOTEL_OWNER" && reservation.hotel.owner_id === user_id;
    const isSupport = role === "SUPPORT";

    if (!isOwner && !isHotelOwner && !isSupport) {
      return res.status(403).json({ success: false, error: "Bu işlem için yetkiniz yok" });
    }

    // CUSTOMER sadece CANCEL yapabilsin
    if (role === "CUSTOMER" && status !== "CANCELED") {
      return res.status(403).json({ success: false, error: "Kullanıcı sadece iptal edebilir" });
    }

    const updated = await prisma.reservation.update({
      where: { reservation_id: id },
      data: { status },
      include: {
        user: { select: { user_id: true, name: true, email: true } },
        hotel: true,
        room: true,
      },
    });

    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("Update reservation status error:", err);
    res.status(500).json({ success: false, error: "Durum güncellenirken hata oluştu" });
  }
});

/**
 * Rezervasyon detay
 */
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { user_id, role } = req.user;

    const reservation = await prisma.reservation.findUnique({
      where: { reservation_id: id },
      include: {
        user: { select: { user_id: true, name: true, email: true } },
        hotel: true,
        room: true,
      },
    });

    if (!reservation) {
      return res.status(404).json({ success: false, error: "Rezervasyon bulunamadı" });
    }

    const isOwner = reservation.user_id === user_id;
    const isHotelOwner = role === "HOTEL_OWNER" && reservation.hotel.owner_id === user_id;
    const isSupport = role === "SUPPORT";

    if (!isOwner && !isHotelOwner && !isSupport) {
      return res.status(403).json({ success: false, error: "Bu rezervasyonu görüntüleme yetkiniz yok" });
    }

    res.json({ success: true, data: reservation });
  } catch (err) {
    console.error("Get reservation error:", err);
    res.status(500).json({ success: false, error: "Rezervasyon getirilirken hata oluştu" });
  }
});

export default router;
