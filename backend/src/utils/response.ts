import { Response } from 'express';

interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
    errors?: Array<{ field: string; message: string }>;
}

export const sendSuccess = <T>(
    res: Response,
    data: T,
    message?: string,
    statusCode = 200
): Response => {
    const response: ApiResponse<T> = {
        success: true,
        message,
        data,
    };
    return res.status(statusCode).json(response);
};

export const sendError = (
    res: Response,
    message: string,
    statusCode = 400,
    errors?: Array<{ field: string; message: string }>
): Response => {
    const response: ApiResponse = {
        success: false,
        error: message,
        errors,
    };
    return res.status(statusCode).json(response);
};

export const sendPaginatedSuccess = <T>(
    res: Response,
    data: T[],
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasMore: boolean;
    },
    message?: string
): Response => {
    return res.status(200).json({
        success: true,
        message,
        data,
        pagination,
    });
};
