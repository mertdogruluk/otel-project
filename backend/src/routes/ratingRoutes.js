import express from "express";
import prisma from "../config/db.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * POST /api/ratings/:hotelId
 * Kullanıcı otele puan verir (1-5 arası)
 * Body: { score: number }
 */
router.post("/:hotelId", authenticateToken, async (req, res) => {
  try {
    const hotelId = Number(req.params.hotelId);
    const userId = req.user.user_id;
    const { score } = req.body;

    if (!score || score < 1 || score > 5) {
      return res.status(400).json({ success: false, error: "Puan 1 ile 5 arasında olmalı" });
    }

    const existing = await prisma.rating.findUnique({
      where: { user_id_hotel_id: { user_id: userId, hotel_id: hotelId } },
    });

    let rating;
    if (existing) {
      rating = await prisma.rating.update({
        where: { user_id_hotel_id: { user_id: userId, hotel_id: hotelId } },
        data: { score },
      });
    } else {
      rating = await prisma.rating.create({
        data: { user_id: userId, hotel_id: hotelId, score },
      });
    }

    const stats = await prisma.rating.aggregate({
      where: { hotel_id: hotelId },
      _avg: { score: true },
      _count: { score: true },
    });

    await prisma.hotel.update({
      where: { hotel_id: hotelId },
      data: { rating_avg: stats._avg.score || 0, rating_count: stats._count.score },
    });

    res.json({ success: true, message: "Puan kaydedildi", data: rating });
  } catch (err) {
    console.error("Rating error:", err);
    res.status(500).json({ success: false, error: "Puan kaydedilemedi" });
  }
});

/**
 * GET /api/ratings/:hotelId
 * Bir otelin ortalama puanı + kaç kişi oy vermiş
 */
router.get("/:hotelId", async (req, res) => {
  try {
    const hotelId = Number(req.params.hotelId);

    const hotel = await prisma.hotel.findUnique({
      where: { hotel_id: hotelId },
      select: { rating_avg: true, rating_count: true },
    });

    if (!hotel) {
      return res.status(404).json({ success: false, error: "Otel bulunamadı" });
    }

    res.json({ success: true, data: hotel });
  } catch (err) {
    console.error("Get rating error:", err);
    res.status(500).json({ success: false, error: "Puan bilgisi alınamadı" });
  }
});

/**
 * GET /api/ratings/:hotelId/user
 * Kullanıcının bu otele verdiği puanı getirir
 */
router.get("/:hotelId/user", authenticateToken, async (req, res) => {
  try {
    const hotelId = Number(req.params.hotelId);
    const userId = req.user.user_id;

    const rating = await prisma.rating.findUnique({
      where: { user_id_hotel_id: { user_id: userId, hotel_id: hotelId } },
    });

    res.json({ success: true, data: rating || null });
  } catch (err) {
    console.error("Get user rating error:", err);
    res.status(500).json({ success: false, error: "Kullanıcı puanı alınamadı" });
  }
});

export default router;
