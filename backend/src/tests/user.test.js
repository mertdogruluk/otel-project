// src/routes/testRoute.js
import express from "express";
import prisma from "../config/db.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Bir hata oluştu" });
  }
});

export default router;
