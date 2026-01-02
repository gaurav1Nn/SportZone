import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response.js';

export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    console.error('Error:', err);

    // Prisma errors
    if (err.name === 'PrismaClientKnownRequestError') {
        sendError(res, 'Database operation failed', 400);
        return;
    }

    // Validation errors
    if (err.name === 'ValidationError') {
        sendError(res, err.message, 400);
        return;
    }

    // Default error
    sendError(
        res,
        process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message,
        500
    );
};

export const notFoundHandler = (_req: Request, res: Response): void => {
    sendError(res, 'Route not found', 404);
};
