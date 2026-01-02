import { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, Filter, Heart, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import matchService from '../services/match.service';
import favoriteService from '../services/favorite.service';
import MatchCard from '../components/MatchCard';
import MatchCardSkeleton from '../components/MatchCardSkeleton';
import Navbar from '../components/Navbar';
import { Match, MatchFilters } from '../types';
import toast from 'react-hot-toast';

const LIMIT = 15;

const MatchesPage = () => {
    const queryClient = useQueryClient();
    const [filters, setFilters] = useState<MatchFilters>({
        sport: 'all',
        status: 'all',
        search: '',
        page: 1,
        limit: LIMIT,
    });
    const [allMatches, setAllMatches] = useState<Match[]>([]);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const loadMoreRef = useRef<HTMLDivElement>(null);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            setFilters(prev => ({ ...prev, search: searchInput, page: 1 }));
            setAllMatches([]);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchInput]);

    // Fetch matches
    const { data: matchesData, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['matches', filters],
        queryFn: () => matchService.getMatches(filters),
        enabled: !showFavoritesOnly,
    });

    // Fetch favorites
    const { data: favoritesData, isLoading: isFavoritesLoading } = useQuery({
        queryKey: ['favorites'],
        queryFn: () => favoriteService.getFavorites(1, 100),
        enabled: showFavoritesOnly,
    });

    // Fetch favorite IDs for marking
    const { data: favoriteIds = [] } = useQuery({
        queryKey: ['favoriteIds'],
        queryFn: () => favoriteService.getFavoriteIds(),
    });

    // Fetch sports for filter
    const { data: sports = [] } = useQuery({
        queryKey: ['sports'],
        queryFn: () => matchService.getSports(),
    });

    // Add to matches when new data arrives
    useEffect(() => {
        if (matchesData?.data && matchesData.data.length > 0) {
            if (filters.page === 1) {
                setAllMatches(matchesData.data);
            } else {
                // Deduplicate when adding new matches
                setAllMatches(prev => {
                    const existingIds = new Set(prev.map(m => m.id));
                    const newMatches = matchesData.data.filter(m => !existingIds.has(m.id));
                    return [...prev, ...newMatches];
                });
            }
        }
    }, [matchesData?.data, filters.page]);

    // Add favorite mutation
    const addFavoriteMutation = useMutation({
        mutationFn: favoriteService.addFavorite,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favoriteIds'] });
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
            toast.success('Added to favorites');
        },
        onError: () => {
            toast.error('Failed to add to favorites');
        },
    });

    // Remove favorite mutation
    const removeFavoriteMutation = useMutation({
        mutationFn: favoriteService.removeFavorite,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favoriteIds'] });
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
            toast.success('Removed from favorites');
        },
        onError: () => {
            toast.error('Failed to remove from favorites');
        },
    });

    const handleToggleFavorite = useCallback((matchId: string) => {
        if (favoriteIds.includes(matchId)) {
            removeFavoriteMutation.mutate(matchId);
        } else {
            addFavoriteMutation.mutate(matchId);
        }
    }, [favoriteIds, addFavoriteMutation, removeFavoriteMutation]);

    const handleFilterChange = (key: keyof MatchFilters, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
        setAllMatches([]);
    };

    // Infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && matchesData?.pagination.hasMore && !isLoading) {
                    setFilters(prev => ({ ...prev, page: (prev.page || 1) + 1 }));
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [matchesData?.pagination.hasMore, isLoading]);

    const displayedMatches = showFavoritesOnly
        ? (favoritesData?.data || [])
        : (allMatches.length > 0 ? allMatches : (matchesData?.data || []));
    const isLoadingState = showFavoritesOnly ? isFavoritesLoading : (isLoading && filters.page === 1);

    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-1">
                        Live Matches
                    </h1>
                    <p className="text-dark-400">Discover and follow your favorite sports events</p>
                </div>

                {/* Filters & Search */}
                <div className="bg-dark-900/60 border border-dark-800 rounded-xl p-5 mb-8">
                    {/* Search - Full Width Row */}
                    <div className="mb-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Search by team name or league..."
                                className="w-full px-4 py-3 pl-12 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/30 transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Filter Row */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Sport Filter */}
                        <div className="relative flex-1">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                            <select
                                value={filters.sport}
                                onChange={(e) => handleFilterChange('sport', e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-dark-200 appearance-none cursor-pointer focus:outline-none focus:border-accent-500/50 transition-all duration-200"
                            >
                                <option value="all">All Sports</option>
                                {sports.map(sport => (
                                    <option key={sport} value={sport}>{sport}</option>
                                ))}
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div className="flex-1">
                            <select
                                value={filters.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                className="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-dark-200 appearance-none cursor-pointer focus:outline-none focus:border-accent-500/50 transition-all duration-200"
                            >
                                <option value="all">All Status</option>
                                <option value="UPCOMING">Upcoming</option>
                                <option value="LIVE">🔴 Live</option>
                                <option value="COMPLETED">Completed</option>
                            </select>
                        </div>

                        {/* Favorites Toggle */}
                        <button
                            onClick={() => {
                                setShowFavoritesOnly(!showFavoritesOnly);
                                setAllMatches([]);
                                setFilters(prev => ({ ...prev, page: 1 }));
                            }}
                            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${showFavoritesOnly
                                ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                                : 'bg-dark-800 text-dark-300 border border-dark-700 hover:border-dark-600 hover:text-dark-200'
                                }`}
                        >
                            <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                            <span>Favorites</span>
                            {favoriteIds.length > 0 && (
                                <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${showFavoritesOnly ? 'bg-rose-500/20' : 'bg-dark-700'}`}>
                                    {favoriteIds.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Error State */}
                {isError && (
                    <div className="card p-8 text-center mb-8">
                        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">Failed to load matches</h3>
                        <p className="text-gray-400 mb-4">{(error as Error)?.message || 'Something went wrong'}</p>
                        <button onClick={() => refetch()} className="btn-primary inline-flex items-center gap-2">
                            <RefreshCw className="w-4 h-4" />
                            Try Again
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {isLoadingState && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <MatchCardSkeleton key={i} />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!isLoadingState && displayedMatches.length === 0 && (
                    <div className="card p-12 text-center">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            {showFavoritesOnly ? (
                                <Heart className="w-10 h-10 text-gray-500" />
                            ) : (
                                <Search className="w-10 h-10 text-gray-500" />
                            )}
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                            {showFavoritesOnly ? 'No favorites yet' : 'No matches found'}
                        </h3>
                        <p className="text-gray-400">
                            {showFavoritesOnly
                                ? 'Start adding matches to your favorites!'
                                : 'Try adjusting your search or filters'}
                        </p>
                    </div>
                )}

                {/* Matches Grid */}
                {!isLoadingState && displayedMatches.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayedMatches.map(match => (
                                <MatchCard
                                    key={match.id}
                                    match={match}
                                    isFavorite={favoriteIds.includes(match.id)}
                                    onToggleFavorite={handleToggleFavorite}
                                    isTogglingFavorite={
                                        addFavoriteMutation.isPending || removeFavoriteMutation.isPending
                                    }
                                />
                            ))}
                        </div>

                        {/* Load More Button */}
                        {!showFavoritesOnly && displayedMatches.length < (matchesData?.pagination.total || 0) && (
                            <div className="flex flex-col items-center py-8 gap-4">
                                {isLoading ? (
                                    <Loader2 className="w-6 h-6 animate-spin text-accent-500" />
                                ) : (
                                    <button
                                        onClick={() => setFilters(prev => ({ ...prev, page: (prev.page || 1) + 1 }))}
                                        className="px-6 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-dark-300 hover:text-white hover:border-dark-600 transition-all duration-200"
                                    >
                                        Load More ({(matchesData?.pagination.total || 0) - displayedMatches.length} remaining)
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Pagination Info */}
                        <div className="text-center text-dark-400 text-sm mt-6">
                            Showing {displayedMatches.length} of{' '}
                            {showFavoritesOnly
                                ? favoritesData?.pagination.total || 0
                                : matchesData?.pagination.total || 0}{' '}
                            matches
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default MatchesPage;
