import api from './api';
import { AuthResponse, LoginCredentials, RegisterCredentials, ApiResponse } from '../types';

export const authService = {
    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', credentials);
        return response.data.data!;
    },

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
        return response.data.data!;
    },

    async refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
        const response = await api.post<ApiResponse<{ accessToken: string; refreshToken: string }>>(
            '/auth/refresh',
            { refreshToken }
        );
        return response.data.data!;
    },

    async logout(): Promise<void> {
        await api.post('/auth/logout');
    },

    async getMe(): Promise<AuthResponse['user']> {
        const response = await api.get<ApiResponse<AuthResponse['user']>>('/auth/me');
        return response.data.data!;
    },
};

export default authService;
