import api from './api';
import { Match, MatchFilters, PaginatedResponse, ApiResponse } from '../types';

export const matchService = {
    async getMatches(filters: MatchFilters = {}): Promise<PaginatedResponse<Match>> {
        const params = new URLSearchParams();

        if (filters.sport && filters.sport !== 'all') params.append('sport', filters.sport);
        if (filters.league && filters.league !== 'all') params.append('league', filters.league);
        if (filters.status && filters.status !== 'all') params.append('status', filters.status);
        if (filters.search) params.append('search', filters.search);
        if (filters.page) params.append('page', filters.page.toString());
        if (filters.limit) params.append('limit', filters.limit.toString());

        const response = await api.get<PaginatedResponse<Match>>(`/matches?${params.toString()}`);
        return response.data;
    },

    async getMatchById(id: string): Promise<Match> {
        const response = await api.get<ApiResponse<Match>>(`/matches/${id}`);
        return response.data.data!;
    },

    async getSports(): Promise<string[]> {
        const response = await api.get<ApiResponse<string[]>>('/matches/sports');
        return response.data.data!;
    },

    async getLeagues(sport?: string): Promise<string[]> {
        const params = sport && sport !== 'all' ? `?sport=${sport}` : '';
        const response = await api.get<ApiResponse<string[]>>(`/matches/leagues${params}`);
        return response.data.data!;
    },
};

export default matchService;
