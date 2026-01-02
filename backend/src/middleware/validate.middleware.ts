import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { sendError } from '../utils/response.js';

export const validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map((error) => ({
            field: 'path' in error ? error.path : 'unknown',
            message: error.msg,
        }));

        sendError(res, 'Validation failed', 400, formattedErrors);
        return;
    }

    next();
};
