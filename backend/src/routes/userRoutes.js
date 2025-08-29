import express from "express";
import prisma from "../config/db.js";
import bcrypt from "bcryptjs";
import {
  authenticateToken,
  authenticateTokenOptional,
  authorizeRoles,
  authorizeOwnResource,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Tüm kullanıcıları gösteren api (sadece support kullanıcılar)
router.get(
  "/",
  authenticateToken,
  authorizeRoles(["SUPPORT"]),
  async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          user_id: true,
          name: true,
          email: true,
          role: true,
          created_at: true,
        },
      });
      res.json({ success: true, data: users });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

// Kullanıcı profilini görüntüleme (kendi profilini veya support herkesi görebilir)
router.get("/profile/:userId", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const userIdInt = parseInt(userId, 10);

    // Kendi profilini görüntüleme kontrolü
    if (req.user.role !== "SUPPORT" && req.user.user_id !== userIdInt) {
      return res.status(403).json({
        success: false,
        message: "Bu profili görüntüleme yetkiniz bulunmamaktadır.",
      });
    }

    const user = await prisma.user.findUnique({
      where: { user_id: Number(userId) },  
      select: {
        user_id: true,
        name: true,
        email: true,
        role: true,
        created_at: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Kullanıcı bulunamadı.",
      });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Sunucu hatası.",
    });
  }
});
/**
 * Kullanıcı profilini güncelleme
 * - CUSTOMER → sadece kendi profilini güncelleyebilir
 * - SUPPORT → herkesin profilini güncelleyebilir
 */
router.put(
  "/profile/:userId",
  authenticateToken,
  async (req, res, next) => {
    if (req.user.role === "SUPPORT") {
      // SUPPORT herkesin profilini güncelleyebilir
      return next();
    }
    // Diğerleri sadece kendi profili için
    return authorizeOwnResource(parseInt(req.params.userId, 10))(req, res, next);
  },
  async (req, res) => {
    try {
      const { userId } = req.params;
      const { name, email } = req.body;

      const updatedUser = await prisma.user.update({


        where: { user_id: parseInt(userId, 10) },
        data: { name, email },
        select: {
          user_id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      res.json({ success: true, data: updatedUser });
    } catch (err) {
      if (err.code === "P2002") {
        return res.status(409).json({
          success: false,
          message: "Bu email zaten kullanımda.",
        });
      }
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

/**
 * Kullanıcı kaydı
 * - CUSTOMER → herkes serbestçe kayıt olabilir
 * - SUPPORT/HOTEL_OWNER → sadece SUPPORT rolündekiler kayıt edebilir
 * - Şifre bcrypt ile hashleniyor
 */
  router.post("/register", authenticateTokenOptional, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Email zaten kayıtlı mı kontrol et
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Bu email adresi zaten kayıtlı.",
      });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Varsayılan rol CUSTOMER
    let finalRole = "CUSTOMER";

    if (role && ["SUPPORT", "HOTEL_OWNER"].includes(role)) {
      // SUPPORT kullanıcıları özel rol verebilir
      if (!req.user || req.user.role !== "SUPPORT") {
        return res.status(403).json({
          success: false,
          message: "Bu rolü atamaya yetkiniz yok.",
        });
      }
      finalRole = role;
    }

    // Yeni kullanıcıyı oluştur
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // ✅ hashlenmiş şifre
        role: finalRole,
      },
      select: {
        user_id: true,
        name: true,
        email: true,
        role: true,
        created_at: true,
      },
    });

    res.status(201).json({ success: true, data: newUser });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});
export default router;
