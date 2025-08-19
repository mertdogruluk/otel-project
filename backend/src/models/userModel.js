import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

class UserModel {
  /**
   * Yeni kullanıcı oluştur
   */
  async createUser(userData) {
    try {
      const { email, password, name, role = 'CUSTOMER' } = userData;

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
          name,
          role
        }
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Email ile kullanıcı bul
   */
  async findUserByEmail(email) {
    try {
      return await prisma.user.findUnique({ where: { email } });
    } catch (error) {
      throw error;
    }
  }

  /**
   * ID ile kullanıcı bul
   */
  async findUserById(user_id) {
    try {
      return await prisma.user.findUnique({ where: { user_id } });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Kullanıcı bilgilerini güncelle
   */
  async updateUser(user_id, updateData) {
    try {
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 12);
      }

      return await prisma.user.update({
        where: { user_id },
        data: updateData
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Kullanıcıyı sil
   */
  async deleteUser(user_id) {
    try {
      return await prisma.user.delete({ where: { user_id } });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Tüm kullanıcıları listele
   */
  async getAllUsers() {
    try {
      return await prisma.user.findMany({
        select: {
          user_id: true,
          name: true,
          email: true,
          role: true,
          created_at: true
        }
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Rol bazında kullanıcıları listele
   */
  async getUsersByRole(role) {
    try {
      return await prisma.user.findMany({
        where: { role },
        select: {
          user_id: true,
          name: true,
          email: true,
          role: true,
          created_at: true
        }
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Şifre doğrulama
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
   */
  async getUserCount() {
    try {
      return await prisma.user.count();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Kullanıcı arama (name veya email ile)
   */
  async searchUsers(searchTerm) {
    try {
      return await prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: searchTerm, mode: 'insensitive' } },
            { email: { contains: searchTerm, mode: 'insensitive' } }
          ]
        },
        select: {
          user_id: true,
          name: true,
          email: true,
          role: true,
          created_at: true
        }
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new UserModel();
