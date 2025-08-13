const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

class UserModel {
  /**
   * Yeni kullanıcı oluştur
   * @param {Object} userData - Kullanıcı bilgileri
   * @returns {Promise<Object>} Oluşturulan kullanıcı
   */
  async createUser(userData) {
    try {
      const { email, password, firstName, lastName, role = 'USER', phone } = userData;
      
      // Email kontrolü
      const existingUser = await this.findUserByEmail(email);
      if (existingUser) {
        throw new Error('Bu email zaten kullanılıyor');
      }
      
      // Şifreyi hash'le
      const hashedPassword = await bcrypt.hash(password, 12);
      
      // Kullanıcıyı oluştur
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          role,
          phone
        }
      });
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Email ile kullanıcı bul
   * @param {string} email - Kullanıcı email'i
   * @returns {Promise<Object|null>} Bulunan kullanıcı veya null
   */
  async findUserByEmail(email) {
    try {
      return await prisma.user.findUnique({
        where: { email }
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * ID ile kullanıcı bul
   * @param {string} id - Kullanıcı ID'si
   * @returns {Promise<Object|null>} Bulunan kullanıcı veya null
   */
  async findUserById(id) {
    try {
      return await prisma.user.findUnique({
        where: { id }
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Kullanıcı bilgilerini güncelle
   * @param {string} id - Kullanıcı ID'si
   * @param {Object} updateData - Güncellenecek veriler
   * @returns {Promise<Object>} Güncellenmiş kullanıcı
   */
  async updateUser(id, updateData) {
    try {
      // Eğer şifre güncelleniyorsa hash'le
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 12);
      }
      
      return await prisma.user.update({
        where: { id },
        data: updateData
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Kullanıcıyı sil
   * @param {string} id - Kullanıcı ID'si
   * @returns {Promise<Object>} Silinen kullanıcı
   */
  async deleteUser(id) {
    try {
      return await prisma.user.delete({
        where: { id }
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Tüm kullanıcıları listele (şifre hariç)
   * @returns {Promise<Array>} Kullanıcı listesi
   */
  async getAllUsers() {
    try {
      return await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          phone: true,
          createdAt: true,
          updatedAt: true
        }
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Rol bazında kullanıcıları listele
   * @param {string} role - Kullanıcı rolü
   * @returns {Promise<Array>} Kullanıcı listesi
   */
  async getUsersByRole(role) {
    try {
      return await prisma.user.findMany({
        where: { role },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          phone: true,
          createdAt: true
        }
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Şifre doğrulama
   * @param {string} password - Girilen şifre
   * @param {string} hashedPassword - Hash'lenmiş şifre
   * @returns {Promise<boolean>} Şifre doğru mu?
   */
  async verifyPassword(password, hashedPassword) {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Kullanıcı sayısını getir
   * @returns {Promise<number>} Toplam kullanıcı sayısı
   */
  async getUserCount() {
    try {
      return await prisma.user.count();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Kullanıcı arama (ad, soyad veya email ile)
   * @param {string} searchTerm - Arama terimi
   * @returns {Promise<Array>} Bulunan kullanıcılar
   */
  async searchUsers(searchTerm) {
    try {
      return await prisma.user.findMany({
        where: {
          OR: [
            { firstName: { contains: searchTerm, mode: 'insensitive' } },
            { lastName: { contains: searchTerm, mode: 'insensitive' } },
            { email: { contains: searchTerm, mode: 'insensitive' } }
          ]
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          phone: true,
          createdAt: true
        }
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserModel();
