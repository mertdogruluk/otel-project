import express from "express";
import prisma from "../config/db.js";

const router = express.Router();

// Tüm kullanıcıları gösteren api
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// kayıt olma role kısmı otel sahibi veya destek rolü vermek için
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { name, email, password, role },
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
