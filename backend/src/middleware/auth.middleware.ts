import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt.js';
import { sendError } from '../utils/response.js';

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        email: string;
    };
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            sendError(res, 'Authorization header is required', 401);
            return;
        }

        if (!authHeader.startsWith('Bearer ')) {
            sendError(res, 'Invalid authorization format. Use: Bearer <token>', 401);
            return;
        }

        const token = authHeader.substring(7);

        if (!token) {
            sendError(res, 'Access token is required', 401);
            return;
        }

        const decoded = verifyAccessToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === 'TokenExpiredError') {
                sendError(res, 'Access token has expired', 401);
                return;
            }
            if (error.name === 'JsonWebTokenError') {
                sendError(res, 'Invalid access token', 401);
                return;
            }
        }
        sendError(res, 'Authentication failed', 401);
    }
};
