import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken, generateTokenPair } from '../src/utils/jwt';

// Mock the config module
jest.mock('../src/config/index', () => ({
    config: {
        jwt: {
            accessSecret: 'test-access-secret-32-characters-min',
            refreshSecret: 'test-refresh-secret-32-characters-min',
            accessExpiry: '15m',
            refreshExpiry: '7d',
        },
    },
}));

describe('JWT Utilities', () => {
    const testPayload = {
        userId: 'test-user-id-123',
        email: 'test@example.com',
    };

    describe('generateAccessToken', () => {
        it('should generate a valid access token', () => {
            const token = generateAccessToken(testPayload);
            expect(token).toBeDefined();
            expect(typeof token).toBe('string');
            expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
        });
    });

    describe('generateRefreshToken', () => {
        it('should generate a valid refresh token', () => {
            const token = generateRefreshToken(testPayload);
            expect(token).toBeDefined();
            expect(typeof token).toBe('string');
            expect(token.split('.')).toHaveLength(3);
        });
    });

    describe('verifyAccessToken', () => {
        it('should verify a valid access token', () => {
            const token = generateAccessToken(testPayload);
            const decoded = verifyAccessToken(token);
            expect(decoded.userId).toBe(testPayload.userId);
            expect(decoded.email).toBe(testPayload.email);
        });

        it('should throw error for invalid token', () => {
            expect(() => verifyAccessToken('invalid-token')).toThrow();
        });
    });

    describe('verifyRefreshToken', () => {
        it('should verify a valid refresh token', () => {
            const token = generateRefreshToken(testPayload);
            const decoded = verifyRefreshToken(token);
            expect(decoded.userId).toBe(testPayload.userId);
            expect(decoded.email).toBe(testPayload.email);
        });

        it('should throw error for invalid token', () => {
            expect(() => verifyRefreshToken('invalid-token')).toThrow();
        });
    });

    describe('generateTokenPair', () => {
        it('should generate both access and refresh tokens', () => {
            const tokens = generateTokenPair(testPayload);
            expect(tokens.accessToken).toBeDefined();
            expect(tokens.refreshToken).toBeDefined();
            expect(tokens.accessToken).not.toBe(tokens.refreshToken);
        });
    });
});
