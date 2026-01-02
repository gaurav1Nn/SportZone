import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

interface TokenPayload {
    userId: string;
    email: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
    // @ts-expect-error - expiresIn type mismatch with jsonwebtoken types
    return jwt.sign({ ...payload }, config.jwt.accessSecret, {
        expiresIn: config.jwt.accessExpiry,
    });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
    // @ts-expect-error - expiresIn type mismatch with jsonwebtoken types
    return jwt.sign({ ...payload }, config.jwt.refreshSecret, {
        expiresIn: config.jwt.refreshExpiry,
    });
};

export const verifyAccessToken = (token: string): TokenPayload => {
    return jwt.verify(token, config.jwt.accessSecret) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
    return jwt.verify(token, config.jwt.refreshSecret) as TokenPayload;
};

export const generateTokenPair = (payload: TokenPayload) => {
    return {
        accessToken: generateAccessToken(payload),
        refreshToken: generateRefreshToken(payload),
    };
};
