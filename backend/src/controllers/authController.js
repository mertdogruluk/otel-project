const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');

class AuthController {
  /**
   * Kullanıcı kaydı
   * @param {Object} req - Express request objesi
   * @param {Object} res - Express response objesi
   */
  async register(req, res) {
    try {
      const { email, password, firstName, lastName, role, phone } = req.body;

      // Gerekli alanları kontrol et
      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({
          success: false,
          error: 'Email, şifre, ad ve soyad alanları zorunludur'
        });
      }

      // Email formatını kontrol et
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: 'Geçerli bir email adresi giriniz'
        });
      }

      // Şifre uzunluğunu kontrol et
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          error: 'Şifre en az 6 karakter olmalıdır'
        });
      }

      // Kullanıcıyı oluştur
      const user = await UserModel.createUser({
        email,
        password,
        firstName,
        lastName,
        role: role || 'USER',
        phone
      });

      // JWT token oluştur
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          role: user.role 
        },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      // Şifreyi response'dan çıkar
      const { password: _, ...userWithoutPassword } = user;

      res.status(201).json({
        success: true,
        message: 'Kullanıcı başarıyla oluşturuldu',
        data: {
          user: userWithoutPassword,
          token
        }
      });

    } catch (error) {
      console.error('Register error:', error);
      
      if (error.message === 'Bu email zaten kullanılıyor') {
        return res.status(409).json({
          success: false,
          error: 'Bu email adresi zaten kullanılıyor'
        });
      }

      res.status(500).json({
        success: false,
        error: 'Kayıt işlemi başarısız',
        details: process.env.NODE_ENV === 'development' ? error.message : 'Bir hata oluştu'
      });
    }
  }

  /**
   * Kullanıcı girişi
   * @param {Object} req - Express request objesi
   * @param {Object} res - Express response objesi
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Gerekli alanları kontrol et
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email ve şifre alanları zorunludur'
        });
      }

      // Kullanıcıyı bul
      const user = await UserModel.findUserByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Geçersiz email veya şifre'
        });
      }

      // Şifreyi kontrol et
      const isValidPassword = await UserModel.verifyPassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          error: 'Geçersiz email veya şifre'
        });
      }

      // JWT token oluştur
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          role: user.role 
        },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      // Şifreyi response'dan çıkar
      const { password: _, ...userWithoutPassword } = user;

      res.json({
        success: true,
        message: 'Giriş başarılı',
        data: {
          user: userWithoutPassword,
          token
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        error: 'Giriş işlemi başarısız',
        details: process.env.NODE_ENV === 'development' ? error.message : 'Bir hata oluştu'
      });
    }
  }

  /**
   * Kullanıcı profilini getir
   * @param {Object} req - Express request objesi
   * @param {Object} res - Express response objesi
   */
  async getProfile(req, res) {
    try {
      const user = await UserModel.findUserById(req.user.userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Kullanıcı bulunamadı'
        });
      }

      // Şifreyi response'dan çıkar
      const { password: _, ...userWithoutPassword } = user;

      res.json({
        success: true,
        data: {
          user: userWithoutPassword
        }
      });

    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        error: 'Profil bilgileri alınamadı',
        details: process.env.NODE_ENV === 'development' ? error.message : 'Bir hata oluştu'
      });
    }
  }

  /**
   * Kullanıcı profilini güncelle
   * @param {Object} req - Express request objesi
   * @param {Object} res - Express response objesi
   */
  async updateProfile(req, res) {
    try {
      const { firstName, lastName, phone } = req.body;

      // Güncellenecek verileri hazırla
      const updateData = {};
      if (firstName) updateData.firstName = firstName;
      if (lastName) updateData.lastName = lastName;
      if (phone !== undefined) updateData.phone = phone;

      // En az bir alan güncellenmelidir
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Güncellenecek alan bulunamadı'
        });
      }

      const updatedUser = await UserModel.updateUser(req.user.userId, updateData);

      // Şifreyi response'dan çıkar
      const { password: _, ...userWithoutPassword } = updatedUser;

      res.json({
        success: true,
        message: 'Profil başarıyla güncellendi',
        data: {
          user: userWithoutPassword
        }
      });

    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({
        success: false,
        error: 'Profil güncellenemedi',
        details: process.env.NODE_ENV === 'development' ? error.message : 'Bir hata oluştu'
      });
    }
  }

  /**
   * Şifre değiştir
   * @param {Object} req - Express request objesi
   * @param {Object} res - Express response objesi
   */
  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;

      // Gerekli alanları kontrol et
      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          error: 'Mevcut şifre ve yeni şifre alanları zorunludur'
        });
      }

      // Yeni şifre uzunluğunu kontrol et
      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          error: 'Yeni şifre en az 6 karakter olmalıdır'
        });
      }

      const user = await UserModel.findUserById(req.user.userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Kullanıcı bulunamadı'
        });
      }

      // Mevcut şifreyi kontrol et
      const isValidPassword = await UserModel.verifyPassword(currentPassword, user.password);
      if (!isValidPassword) {
        return res.status(400).json({
          success: false,
          error: 'Mevcut şifre yanlış'
        });
      }

      // Yeni şifreyi güncelle
      await UserModel.updateUser(req.user.userId, { password: newPassword });

      res.json({
        success: true,
        message: 'Şifre başarıyla değiştirildi'
      });

    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json({
        success: false,
        error: 'Şifre değiştirilemedi',
        details: process.env.NODE_ENV === 'development' ? error.message : 'Bir hata oluştu'
      });
    }
  }

  /**
   * Kullanıcı çıkışı (token blacklist için hazır)
   * @param {Object} req - Express request objesi
   * @param {Object} res - Express response objesi
   */
  async logout(req, res) {
    try {
      // Burada token blacklist işlemi yapılabilir
      // Şimdilik sadece başarılı response döndürüyoruz
      
      res.json({
        success: true,
        message: 'Başarıyla çıkış yapıldı'
      });

    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({
        success: false,
        error: 'Çıkış işlemi başarısız',
        details: process.env.NODE_ENV === 'development' ? error.message : 'Bir hata oluştu'
      });
    }
  }

  /**
   * Token yenileme (refresh token)
   * @param {Object} req - Express request objesi
   * @param {Object} res - Express response objesi
   */
  async refreshToken(req, res) {
    try {
      const { userId } = req.user;
      
      const user = await UserModel.findUserById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Kullanıcı bulunamadı'
        });
      }

      // Yeni token oluştur
      const newToken = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          role: user.role 
        },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      res.json({
        success: true,
        message: 'Token yenilendi',
        data: {
          token: newToken
        }
      });

    } catch (error) {
      console.error('Refresh token error:', error);
      res.status(500).json({
        success: false,
        error: 'Token yenilenemedi',
        details: process.env.NODE_ENV === 'development' ? error.message : 'Bir hata oluştu'
      });
    }
  }
}

module.exports = new AuthController();
