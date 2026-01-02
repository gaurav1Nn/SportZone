import { Response } from 'express';
import prisma from '../config/database.js';
import { sendSuccess, sendPaginatedSuccess, sendError } from '../utils/response.js';
import { AuthRequest } from '../middleware/auth.middleware.js';

export const getFavorites = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            sendError(res, 'User not authenticated', 401);
            return;
        }

        const { page = '1', limit = '10' } = req.query;

        const pageNum = Math.max(1, parseInt(page as string, 10));
        const limitNum = Math.min(50, Math.max(1, parseInt(limit as string, 10)));
        const skip = (pageNum - 1) * limitNum;

        const [favorites, total] = await Promise.all([
            prisma.favorite.findMany({
                where: { userId },
                skip,
                take: limitNum,
                include: {
                    match: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
            prisma.favorite.count({ where: { userId } }),
        ]);

        const matches = favorites.map((f) => ({
            ...f.match,
            favoriteId: f.id,
            favoritedAt: f.createdAt,
        }));

        const totalPages = Math.ceil(total / limitNum);
        const hasMore = pageNum < totalPages;

        sendPaginatedSuccess(res, matches, {
            page: pageNum,
            limit: limitNum,
            total,
            totalPages,
            hasMore,
        });
    } catch (error) {
        console.error('Get favorites error:', error);
        sendError(res, 'Failed to fetch favorites', 500);
    }
};

export const getFavoriteIds = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            sendError(res, 'User not authenticated', 401);
            return;
        }

        const favorites = await prisma.favorite.findMany({
            where: { userId },
            select: { matchId: true },
        });

        const matchIds = favorites.map((f) => f.matchId);

        sendSuccess(res, matchIds);
    } catch (error) {
        console.error('Get favorite ids error:', error);
        sendError(res, 'Failed to fetch favorite ids', 500);
    }
};

export const addFavorite = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const { matchId } = req.params;

        if (!userId) {
            sendError(res, 'User not authenticated', 401);
            return;
        }

        // Check if match exists
        const match = await prisma.match.findUnique({
            where: { id: matchId },
        });

        if (!match) {
            sendError(res, 'Match not found', 404);
            return;
        }

        // Check if already favorited
        const existingFavorite = await prisma.favorite.findUnique({
            where: {
                userId_matchId: {
                    userId,
                    matchId,
                },
            },
        });

        if (existingFavorite) {
            sendError(res, 'Match already in favorites', 409);
            return;
        }

        // Add to favorites
        const favorite = await prisma.favorite.create({
            data: {
                userId,
                matchId,
            },
            include: {
                match: true,
            },
        });

        sendSuccess(res, favorite, 'Match added to favorites', 201);
    } catch (error) {
        console.error('Add favorite error:', error);
        sendError(res, 'Failed to add favorite', 500);
    }
};

export const removeFavorite = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const { matchId } = req.params;

        if (!userId) {
            sendError(res, 'User not authenticated', 401);
            return;
        }

        // Check if favorite exists
        const favorite = await prisma.favorite.findUnique({
            where: {
                userId_matchId: {
                    userId,
                    matchId,
                },
            },
        });

        if (!favorite) {
            sendError(res, 'Match not in favorites', 404);
            return;
        }

        // Remove from favorites
        await prisma.favorite.delete({
            where: {
                userId_matchId: {
                    userId,
                    matchId,
                },
            },
        });

        sendSuccess(res, null, 'Match removed from favorites');
    } catch (error) {
        console.error('Remove favorite error:', error);
        sendError(res, 'Failed to remove favorite', 500);
    }
};
