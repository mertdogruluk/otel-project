import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * JWT Token doğrulama middleware'i
 * Bu middleware, gelen isteklerde Authorization header'dan JWT token'ını alır ve doğrular
 */
const authenticateToken = async (req, res, next) => {
  try {
    // Authorization header'dan token'ı al
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN" formatından token'ı çıkar

    // Token yoksa hata döndür
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Erişim token\'ı bulunamadı. Lütfen giriş yapın.'
      });
    }

    // JWT token'ını doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Token'dan kullanıcı ID'sini al
    const userId = decoded.userId;
    
    // Kullanıcıyı veritabanından bul
    const user = await prisma.user.findUnique({
      where: {user_id: userId },
      select: {
        user_id: true,
        email: true,
        name: true,          
        role: true,
        created_at: true
      }
    });

    // Kullanıcı bulunamadıysa hata döndür
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Geçersiz token. Kullanıcı bulunamadı.'
      });
    }


    // Kullanıcı bilgilerini request nesnesine ekle
    req.user = user;
    // Sonraki middleware'e geç
    next();

  } catch (error) {
    // JWT doğrulama hatası
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Geçersiz token. Lütfen tekrar giriş yapın.'
      });
    }

    // Token süresi dolmuş
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token süresi dolmuş. Lütfen tekrar giriş yapın.'
      });
    }

    // Diğer hatalar
    console.error('Auth middleware hatası:', error);
    return res.status(500).json({
      success: false,
      message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.'
    });
  }
};

/**
 * Belirli roller için yetkilendirme middleware'i
 * @param {string[]} allowedRoles - Prisma enum değerleri: CUSTOMER, HOTEL_OWNER, SUPPORT
 */
const authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    // Önce authenticateToken middleware'ini çalıştır
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Yetkilendirme gerekli. Lütfen giriş yapın.'
      });
    }

    // Kullanıcının rolü kontrol edilir
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Bu işlem için yetkiniz bulunmamaktadır.'
      });
    }

    next();
  };
};

/**
 * Sahiplik kontrolü
 * @param {string} resourceUserId - Erişilmek istenen kaynağın user_id'si
 */
const authorizeOwnResource = (resourceUserId, allowSupport = true) => {
  return (req, res, next) => {
    // Opsiyonel: SUPPORT rolü tüm kaynaklara erişebilir
    if (allowSupport && req.user.role === 'SUPPORT') {
      return next();
    }

    // Normal kullanıcılar sadece kendi verilerine erişebilir
    if (req.user.user_id !== resourceUserId) {
      return res.status(403).json({
        success: false,
        message: 'Bu kaynağa erişim yetkiniz bulunmamaktadır.'
      });
    }

    next();
  };
};

export { authenticateToken, authorizeRoles, authorizeOwnResource };
