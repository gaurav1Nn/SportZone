export interface User {
    id: string;
    name: string;
    email: string;
    createdAt?: string;
}

export interface Match {
    id: string;
    sport: string;
    league: string;
    teamA: string;
    teamB: string;
    startTime: string;
    status: 'UPCOMING' | 'LIVE' | 'COMPLETED';
    thumbnail: string | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
    errors?: Array<{ field: string; message: string }>;
}

export interface PaginatedResponse<T> {
    success: boolean;
    message?: string;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasMore: boolean;
    };
}

export interface MatchFilters {
    sport?: string;
    league?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}
