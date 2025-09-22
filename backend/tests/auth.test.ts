import request from 'supertest';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import app from '../src/app';
import prisma from '@/config/database';

// Jest automatically mocks the prisma import due to setup.ts
const mockPrisma = prisma as any;

describe('Authentication Endpoints', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        phone: '1234567890',
      };

      const hashedPassword = await bcrypt.hash(userData.password, 4);
      const mockUser = {
        id: 'user-1',
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: null,
        role: 'CUSTOMER' as const,
        avatar: null,
        createdAt: new Date(),
      };

      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.user.create.mockResolvedValue({
        ...mockUser,
        password: hashedPassword,
        isActive: true,
        updatedAt: new Date(),
        refreshTokens: [],
        cart: null,
        orders: [],
        reviews: [],
        aiRecommendations: [],
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('User registered successfully');
      expect(response.body.data.user.email).toBe(userData.email);
      expect(response.body.data.tokens).toBeDefined();
      expect(response.body.data.tokens.accessToken).toBeDefined();
      expect(response.body.data.tokens.refreshToken).toBeDefined();
    });

    it('should return error if user already exists', async () => {
      const userData = {
        name: 'Test User',
        email: 'existing@example.com',
        password: 'password123',
      };

      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'existing-user',
        name: 'Existing User',
        email: userData.email,
        password: 'hashedpassword',
        phone: null,
        address: null,
        role: 'CUSTOMER',
        avatar: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        refreshTokens: [],
        cart: null,
        orders: [],
        reviews: [],
        aiRecommendations: [],
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('User with this email already exists');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          name: '',
          email: 'invalid-email',
          password: '123', // Too short
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Validation failed');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login user with valid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const hashedPassword = await bcrypt.hash(loginData.password, 4);
      const mockUser = {
        id: 'user-1',
        name: 'Test User',
        email: loginData.email,
        password: hashedPassword,
        phone: null,
        address: null,
        role: 'CUSTOMER' as const,
        avatar: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        refreshTokens: [],
        cart: null,
        orders: [],
        reviews: [],
        aiRecommendations: [],
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Login successful');
      expect(response.body.data.user.email).toBe(loginData.email);
      expect(response.body.data.tokens).toBeDefined();
    });

    it('should return error for invalid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      mockPrisma.user.findUnique.mockResolvedValue(null);

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid credentials');
    });

    it('should return error for inactive user', async () => {
      const loginData = {
        email: 'inactive@example.com',
        password: 'password123',
      };

      const mockUser = {
        id: 'user-1',
        name: 'Inactive User',
        email: loginData.email,
        password: await bcrypt.hash(loginData.password, 4),
        phone: null,
        address: null,
        role: 'CUSTOMER' as const,
        avatar: null,
        isActive: false, // Inactive user
        createdAt: new Date(),
        updatedAt: new Date(),
        refreshTokens: [],
        cart: null,
        orders: [],
        reviews: [],
        aiRecommendations: [],
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid credentials');
    });
  });

  describe('POST /api/auth/refresh', () => {
    it('should refresh access token with valid refresh token', async () => {
      const refreshTokenData = {
        refreshToken: 'valid-refresh-token',
      };

      const mockTokenRecord = {
        id: 'token-1',
        token: refreshTokenData.refreshToken,
        userId: 'user-1',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        user: {
          id: 'user-1',
          name: 'Test User',
          email: 'test@example.com',
          password: 'hashedpassword',
          phone: null,
          address: null,
          role: 'CUSTOMER' as const,
          avatar: null,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          refreshTokens: [],
          cart: null,
          orders: [],
          reviews: [],
          aiRecommendations: [],
        },
      };

      // Mock JWT verification
      jest.spyOn(jwt, 'verify').mockReturnValue({
        id: 'user-1',
        email: 'test@example.com',
        role: 'CUSTOMER',
      } as any);

      mockPrisma.refreshToken.findUnique.mockResolvedValue(mockTokenRecord);
      mockPrisma.refreshToken.update.mockResolvedValue({
        ...mockTokenRecord,
        token: 'new-refresh-token',
      });

      const response = await request(app)
        .post('/api/auth/refresh')
        .send(refreshTokenData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Token refreshed successfully');
      expect(response.body.data.tokens).toBeDefined();
      expect(response.body.data.tokens.accessToken).toBeDefined();
      expect(response.body.data.tokens.refreshToken).toBeDefined();
    });

    it('should return error for invalid refresh token', async () => {
      const refreshTokenData = {
        refreshToken: 'invalid-refresh-token',
      };

      mockPrisma.refreshToken.findUnique.mockResolvedValue(null);

      const response = await request(app)
        .post('/api/auth/refresh')
        .send(refreshTokenData)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid or expired refresh token');
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should logout user successfully', async () => {
      const logoutData = {
        refreshToken: 'valid-refresh-token',
      };

      mockPrisma.refreshToken.deleteMany.mockResolvedValue({ count: 1 });

      const response = await request(app)
        .post('/api/auth/logout')
        .send(logoutData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Logout successful');
    });
  });
});