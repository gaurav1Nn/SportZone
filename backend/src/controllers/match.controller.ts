import { Response } from 'express';
import prisma from '../config/database.js';
import { sendSuccess, sendPaginatedSuccess, sendError } from '../utils/response.js';
import { AuthRequest } from '../middleware/auth.middleware.js';
import { Prisma, MatchStatus } from '@prisma/client';

export const getMatches = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const {
            page = '1',
            limit = '10',
            sport,
            league,
            status,
            search,
            sortBy = 'startTime',
            sortOrder = 'asc',
        } = req.query;

        const pageNum = Math.max(1, parseInt(page as string, 10));
        const limitNum = Math.min(50, Math.max(1, parseInt(limit as string, 10)));
        const skip = (pageNum - 1) * limitNum;

        // Build where clause
        const where: Prisma.MatchWhereInput = {};

        if (sport && sport !== 'all') {
            where.sport = sport as string;
        }

        if (league && league !== 'all') {
            where.league = league as string;
        }

        if (status && status !== 'all') {
            where.status = status as MatchStatus;
        }

        if (search) {
            const searchTerm = (search as string).toLowerCase();
            where.OR = [
                { teamA: { contains: searchTerm, mode: 'insensitive' } },
                { teamB: { contains: searchTerm, mode: 'insensitive' } },
                { league: { contains: searchTerm, mode: 'insensitive' } },
            ];
        }

        // Build order by clause
        const validSortFields = ['startTime', 'sport', 'league', 'createdAt'];
        const orderField = validSortFields.includes(sortBy as string) ? sortBy : 'startTime';
        const order = sortOrder === 'desc' ? 'desc' : 'asc';

        const orderBy: Prisma.MatchOrderByWithRelationInput = {
            [orderField as string]: order,
        };

        // Execute queries
        const [matches, total] = await Promise.all([
            prisma.match.findMany({
                where,
                skip,
                take: limitNum,
                orderBy,
            }),
            prisma.match.count({ where }),
        ]);

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
        console.error('Get matches error:', error);
        sendError(res, 'Failed to fetch matches', 500);
    }
};

export const getMatchById = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const match = await prisma.match.findUnique({
            where: { id },
        });

        if (!match) {
            sendError(res, 'Match not found', 404);
            return;
        }

        sendSuccess(res, match);
    } catch (error) {
        console.error('Get match by id error:', error);
        sendError(res, 'Failed to fetch match', 500);
    }
};

export const getSports = async (_req: AuthRequest, res: Response): Promise<void> => {
    try {
        const sports = await prisma.match.findMany({
            select: { sport: true },
            distinct: ['sport'],
            orderBy: { sport: 'asc' },
        });

        sendSuccess(res, sports.map((s) => s.sport));
    } catch (error) {
        console.error('Get sports error:', error);
        sendError(res, 'Failed to fetch sports', 500);
    }
};

export const getLeagues = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { sport } = req.query;

        const where: Prisma.MatchWhereInput = {};
        if (sport && sport !== 'all') {
            where.sport = sport as string;
        }

        const leagues = await prisma.match.findMany({
            where,
            select: { league: true },
            distinct: ['league'],
            orderBy: { league: 'asc' },
        });

        sendSuccess(res, leagues.map((l) => l.league));
    } catch (error) {
        console.error('Get leagues error:', error);
        sendError(res, 'Failed to fetch leagues', 500);
    }
};
