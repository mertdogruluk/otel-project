import express from "express";
import prisma from "../config/db.js";
import { authenticateToken, authorizeRoles, authorizeOwnResource } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Tüm kullanıcıları gösteren api (sadece admin kullanıcılar)
router.get("/", authenticateToken, authorizeRoles(['ADMIN']), async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    });
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Kullanıcı profilini görüntüleme (kendi profilini veya admin herkesi görebilir)
router.get("/profile/:userId", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Kendi profilini görüntüleme kontrolü
    if (req.user.role !== 'ADMIN' && req.user.id !== userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'Bu profili görüntüleme yetkiniz bulunmamaktadır.' 
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Kullanıcı bulunamadı.' 
      });
    }

    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Kullanıcı profilini güncelleme (sadece kendi profilini)
router.put("/profile/:userId", authenticateToken, (req, res, next) => authorizeOwnResource(req.params.userId)(req, res, next), async (req, res) => {
  // route içeriği
  try {
    const { userId } = req.params;
    const { name, email } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        updatedAt: true
      }
    });

    res.json({ success: true, data: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
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
