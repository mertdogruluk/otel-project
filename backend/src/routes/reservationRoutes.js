import express from "express";
import prisma from "../config/db.js";

const router = express.Router();

// Rezervasyon listesi
router.get("/", async (req, res) => {
  const reservations = await prisma.reservation.findMany({
    include: { user: true, hotel: true, room: true },
  });
  res.json(reservations);
});

// Yeni rezervasyon ekle
router.post("/add", async (req, res) => {
  const { user_id, hotel_id, room_id, start_date, end_date } = req.body;
  try {
    const reservation = await prisma.reservation.create({
      data: { user_id, hotel_id, room_id, start_date: new Date(start_date), end_date: new Date(end_date) },
    });
    res.status(201).json(reservation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
