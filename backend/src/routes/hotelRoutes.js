import express from "express";
import prisma from "../config/db.js";

const router = express.Router();

// Tüm oteller
router.get("/", async (req, res) => {
  const hotels = await prisma.hotel.findMany({ include: { rooms: true } });
  res.json(hotels);
});

// Yeni otel ekle
router.post("/", async (req, res) => {
  const { name, city, address, owner_id } = req.body;
  try {
    const hotel = await prisma.hotel.create({
      data: { name, city, address, owner_id },
    });
    res.status(201).json(hotel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
