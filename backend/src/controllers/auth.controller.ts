import { Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/database.js';
import { generateTokenPair, verifyRefreshToken } from '../utils/jwt.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { AuthRequest } from '../middleware/auth.middleware.js';

const SALT_ROUNDS = 12;

export const register = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });

        if (existingUser) {
            sendError(res, 'User with this email already exists', 409);
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });

        // Generate tokens
        const tokens = generateTokenPair({ userId: user.id, email: user.email });

        // Save refresh token
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: tokens.refreshToken },
        });

        sendSuccess(
            res,
            {
                user,
                ...tokens,
            },
            'Registration successful',
            201
        );
    } catch (error) {
        console.error('Registration error:', error);
        sendError(res, 'Registration failed', 500);
    }
};

export const login = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });

        if (!user) {
            sendError(res, 'Invalid email or password', 401);
            return;
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            sendError(res, 'Invalid email or password', 401);
            return;
        }

        // Generate tokens
        const tokens = generateTokenPair({ userId: user.id, email: user.email });

        // Save refresh token
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: tokens.refreshToken },
        });

        sendSuccess(
            res,
            {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                ...tokens,
            },
            'Login successful'
        );
    } catch (error) {
        console.error('Login error:', error);
        sendError(res, 'Login failed', 500);
    }
};

export const refreshToken = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { refreshToken: token } = req.body;

        if (!token) {
            sendError(res, 'Refresh token is required', 400);
            return;
        }

        // Verify refresh token
        let decoded;
        try {
            decoded = verifyRefreshToken(token);
        } catch {
            sendError(res, 'Invalid or expired refresh token', 401);
            return;
        }

        // Find user and verify refresh token matches
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
        });

        if (!user || user.refreshToken !== token) {
            sendError(res, 'Invalid refresh token', 401);
            return;
        }

        // Generate new tokens
        const tokens = generateTokenPair({ userId: user.id, email: user.email });

        // Save new refresh token
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: tokens.refreshToken },
        });

        sendSuccess(res, tokens, 'Token refreshed successfully');
    } catch (error) {
        console.error('Refresh token error:', error);
        sendError(res, 'Token refresh failed', 500);
    }
};

export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            sendError(res, 'User not authenticated', 401);
            return;
        }

        // Clear refresh token
        await prisma.user.update({
            where: { id: userId },
            data: { refreshToken: null },
        });

        sendSuccess(res, null, 'Logout successful');
    } catch (error) {
        console.error('Logout error:', error);
        sendError(res, 'Logout failed', 500);
    }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            sendError(res, 'User not authenticated', 401);
            return;
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });

        if (!user) {
            sendError(res, 'User not found', 404);
            return;
        }

        sendSuccess(res, user);
    } catch (error) {
        console.error('Get me error:', error);
        sendError(res, 'Failed to fetch user', 500);
    }
};
