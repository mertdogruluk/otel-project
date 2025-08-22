// routes/hotelRoutes.js
import express from "express";
import prisma from "../config/db.js";
import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * 🔹 Şehir listesi (otel olan şehirler)
 * NOTE: Bunu /:id’den önce tanımlamalıyız yoksa çakışır
 */
router.get("/cities/list", async (_req, res) => {
  try {
    const cities = await prisma.hotel.findMany({
      distinct: ["city"],
      select: { city: true },
      orderBy: { city: "asc" },
    });

    res.json({
      success: true,
      data: cities.map((c) => c.city),
    });
  } catch (err) {
    console.error("Get cities error:", err);
    res.status(500).json({
      success: false,
      error: "Şehir listesi getirilirken hata oluştu",
    });
  }
});

/**
 * 🔹 Tüm oteller (filtreleme, sıralama, sayfalama)
 */
router.get("/", async (req, res) => {
  try {
    const {
      city,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      sortBy = "created_at",
      sortOrder = "desc",
    } = req.query;

    // Güvenli sıralama
    const allowedSortFields = ["created_at", "name", "city", "rating"];
    const safeSortBy = allowedSortFields.includes(sortBy)
      ? sortBy
      : "created_at";
    const safeSortOrder = sortOrder === "asc" ? "asc" : "desc";

    // Filtre koşulları
    const where = {};
    if (city) {
      where.city = { contains: city, mode: "insensitive" };
    }
    if (minPrice || maxPrice) {
      where.rooms = { some: {} };
      if (minPrice) {
        where.rooms.some.price = { gte: parseFloat(minPrice) };
      }
      if (maxPrice) {
        where.rooms.some.price = {
          ...where.rooms.some.price,
          lte: parseFloat(maxPrice),
        };
      }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const hotels = await prisma.hotel.findMany({
      where,
      include: {
        rooms: true,
        owner: { select: { user_id: true, name: true, email: true } },
        images: true,
        _count: { select: { rooms: true, reservations: true } },
      },
      orderBy: { [safeSortBy]: safeSortOrder },
      skip,
      take: parseInt(limit),
    });

    const totalHotels = await prisma.hotel.count({ where });
    const totalPages = Math.ceil(totalHotels / parseInt(limit));

    res.json({
      success: true,
      data: hotels,
      pagination: {
        current: parseInt(page),
        total: totalPages,
        count: hotels.length,
        limit: parseInt(limit),
      },
    });
  } catch (err) {
    console.error("Get hotels error:", err);
    res.status(500).json({
      success: false,
      error: "Oteller getirilirken hata oluştu",
    });
  }
});

/**
 * 🔹 Belirli otel getir
 */
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const hotel = await prisma.hotel.findUnique({
      where: { hotel_id: id },
      include: {
        rooms: {
          include: {
            reservations: {
              where: { status: { in: ["PENDING", "CONFIRMED"] } },
              select: { start_date: true, end_date: true },
            },
          },
        },
        owner: { select: { user_id: true, name: true, email: true, phone: true } },
        images: true,
        reservations: {
          include: { user: { select: { user_id: true, name: true, email: true } } },
          take: 5,
          orderBy: { created_at: "desc" },
        },
      },
    });

    if (!hotel) {
      return res.status(404).json({ success: false, error: "Otel bulunamadı" });
    }

    res.json({ success: true, data: hotel });
  } catch (err) {
    console.error("Get hotel error:", err);
    res.status(500).json({
      success: false,
      error: "Otel getirilirken hata oluştu",
    });
  }
});

/**
 * 🔹 Yeni otel ekle (HOTEL_OWNER + SUPPORT)
 */
router.post(
  "/",
  authenticateToken,
  authorizeRoles(["HOTEL_OWNER", "SUPPORT"]),
  async (req, res) => {
    try {
      const { name, city, address, description, owner_id } = req.body;
      const { user_id, role } = req.user;

      const actualOwnerId =
        role === "SUPPORT" ? Number(owner_id || user_id) : Number(user_id);

      if (!name || !city || !address) {
        return res.status(400).json({
          success: false,
          error: "Otel adı, şehir ve adres zorunludur",
        });
      }

      const hotel = await prisma.hotel.create({
        data: { name, city, address, description, owner_id: actualOwnerId },
        include: { owner: { select: { user_id: true, name: true, email: true } } },
      });

      res.status(201).json({
        success: true,
        message: "Otel başarıyla oluşturuldu",
        data: hotel,
      });
    } catch (err) {
      console.error("Create hotel error:", err);
      if (err.code === "P2002") {
        return res.status(400).json({
          success: false,
          error: "Bu isimde bir otel zaten mevcut",
        });
      }
      res.status(500).json({
        success: false,
        error: "Otel oluşturulurken hata oluştu",
      });
    }
  }
);

/**
 * 🔹 Otel güncelle (owner veya SUPPORT)
 */
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { user_id, role } = req.user;

    const hotel = await prisma.hotel.findUnique({ where: { hotel_id: id } });
    if (!hotel) {
      return res.status(404).json({ success: false, error: "Otel bulunamadı" });
    }

    if (hotel.owner_id !== user_id && role !== "SUPPORT") {
      return res.status(403).json({
        success: false,
        error: "Bu oteli düzenleme yetkiniz yok",
      });
    }

    const updatedHotel = await prisma.hotel.update({
      where: { hotel_id: id },
      data: {
        name: req.body.name,
        city: req.body.city,
        address: req.body.address,
        description: req.body.description,
        rating: req.body.rating ? parseFloat(req.body.rating) : undefined,
      },
      include: {
        owner: { select: { user_id: true, name: true, email: true } },
        rooms: true,
        images: true,
      },
    });

    res.json({
      success: true,
      message: "Otel başarıyla güncellendi",
      data: updatedHotel,
    });
  } catch (err) {
    console.error("Update hotel error:", err);
    res.status(500).json({
      success: false,
      error: "Otel güncellenirken hata oluştu",
    });
  }
});

/**
 * 🔹 Otel sil (owner veya SUPPORT, aktif rezervasyon olmamalı)
 */
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { user_id, role } = req.user;

    const hotel = await prisma.hotel.findUnique({ where: { hotel_id: id } });
    if (!hotel) {
      return res.status(404).json({ success: false, error: "Otel bulunamadı" });
    }

    if (hotel.owner_id !== user_id && role !== "SUPPORT") {
      return res.status(403).json({
        success: false,
        error: "Bu oteli silme yetkiniz yok",
      });
    }

    const activeReservations = await prisma.reservation.count({
      where: { hotel_id: id, status: { in: ["PENDING", "CONFIRMED"] } },
    });
    if (activeReservations > 0) {
      return res.status(400).json({
        success: false,
        error: "Aktif rezervasyonu olan bir otel silinemez",
      });
    }

    await prisma.hotel.delete({ where: { hotel_id: id } });
    res.json({ success: true, message: "Otel başarıyla silindi" });
  } catch (err) {
    console.error("Delete hotel error:", err);
    res.status(500).json({
      success: false,
      error: "Otel silinirken hata oluştu",
    });
  }
});

export default router;
