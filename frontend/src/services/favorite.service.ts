import api from './api';
import { Match, PaginatedResponse, ApiResponse } from '../types';

export const favoriteService = {
    async getFavorites(page = 1, limit = 10): Promise<PaginatedResponse<Match>> {
        const response = await api.get<PaginatedResponse<Match>>(
            `/favorites?page=${page}&limit=${limit}`
        );
        return response.data;
    },

    async getFavoriteIds(): Promise<string[]> {
        const response = await api.get<ApiResponse<string[]>>('/favorites/ids');
        return response.data.data!;
    },

    async addFavorite(matchId: string): Promise<void> {
        await api.post(`/favorites/${matchId}`);
    },

    async removeFavorite(matchId: string): Promise<void> {
        await api.delete(`/favorites/${matchId}`);
    },
};

export default favoriteService;
