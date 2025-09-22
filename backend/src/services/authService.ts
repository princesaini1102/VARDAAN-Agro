import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import prisma from '@/config/database';
import { env } from '@/config/env';
import { ApiError } from '@/utils/ApiError';

export class AuthService {
  static async register(userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
  }) {
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email }
    });

    if (existingUser) {
      throw new ApiError(409, 'User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, env.BCRYPT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        role: true,
        avatar: true,
        createdAt: true
      }
    });

    const tokens = await this.generateTokens(user.id);

    return { user, tokens };
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        phone: true,
        address: true,
        role: true,
        avatar: true,
        isActive: true,
        createdAt: true
      }
    });

    if (!user || !user.isActive) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    const tokens = await this.generateTokens(user.id);

    return { user: userWithoutPassword, tokens };
  }

  static async refreshToken(refreshToken: string) {
    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true }
    });

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      throw new ApiError(401, 'Invalid or expired refresh token');
    }

    if (!tokenRecord.user.isActive) {
      throw new ApiError(401, 'User account is inactive');
    }

    // Delete old refresh token
    await prisma.refreshToken.delete({
      where: { id: tokenRecord.id }
    });

    // Generate new tokens
    const tokens = await this.generateTokens(tokenRecord.userId);

    return { tokens };
  }

  static async logout(refreshToken: string) {
    await prisma.refreshToken.deleteMany({
      where: { token: refreshToken }
    });
  }

  static async logoutAll(userId: string) {
    await prisma.refreshToken.deleteMany({
      where: { userId }
    });
  }

  static async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true }
    });

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw new ApiError(400, 'Current password is incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, env.BCRYPT_ROUNDS);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword }
    });

    // Logout from all devices for security
    await this.logoutAll(userId);
  }

  static async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        role: true,
        avatar: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    return user;
  }

  private static async generateTokens(userId: string) {
    const accessToken = jwt.sign(
      { userId },
      env.JWT_SECRET as jwt.Secret,
      { expiresIn: env.JWT_EXPIRES_IN } as jwt.SignOptions
    );

    const refreshTokenValue = uuidv4();
    const refreshTokenExpiry = new Date();
    refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 7); // 7 days

    await prisma.refreshToken.create({
      data: {
        token: refreshTokenValue,
        userId,
        expiresAt: refreshTokenExpiry
      }
    });

    return {
      accessToken,
      refreshToken: refreshTokenValue
    };
  }
}