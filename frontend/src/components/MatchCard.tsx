/**
 * MatchCard Component
 * 
 * Displays a single sports match with:
 * - Sport-specific color gradients (green/cricket, blue/football, yellow/tennis)
 * - Match status badge (Live, Upcoming, Completed)
 * - Team names, league, and start time
 * - Favorite toggle button
 */

import { Match } from '../types';
import { Heart, Clock, MapPin, Radio } from 'lucide-react';
import { format } from '../utils/date';

/** Props for MatchCard component */
interface MatchCardProps {
    match: Match;                              // Match data to display
    isFavorite: boolean;                       // Whether match is in user's favorites
    onToggleFavorite: (matchId: string) => void; // Callback when favorite button clicked
    isTogglingFavorite?: boolean;              // Loading state for favorite toggle
}

/**
 * Renders a match card with details and favorite functionality
 */
const MatchCard = ({ match, isFavorite, onToggleFavorite, isTogglingFavorite }: MatchCardProps) => {
    // Get status badge based on match status
    const getStatusBadge = () => {
        switch (match.status) {
            case 'LIVE':
                return (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 text-red-400 rounded-md text-xs font-medium border border-red-500/20">
                        <Radio className="w-3 h-3 animate-pulse" />
                        LIVE
                    </span>
                );
            case 'COMPLETED':
                return (
                    <span className="px-2.5 py-1 bg-dark-700/50 text-dark-400 rounded-md text-xs font-medium">
                        Completed
                    </span>
                );
            default:
                return (
                    <span className="px-2.5 py-1 bg-accent-500/10 text-accent-400 rounded-md text-xs font-medium border border-accent-500/20">
                        Upcoming
                    </span>
                );
        }
    };

    const getSportIcon = () => {
        switch (match.sport.toLowerCase()) {
            case 'cricket':
                return '🏏';
            case 'football':
                return '⚽';
            case 'tennis':
                return '🎾';
            default:
                return '🏆';
        }
    };

    const getSportColor = () => {
        switch (match.sport.toLowerCase()) {
            case 'cricket':
                return 'from-green-500/10 to-emerald-500/5 border-green-500/20';
            case 'football':
                return 'from-blue-500/10 to-indigo-500/5 border-blue-500/20';
            case 'tennis':
                return 'from-yellow-500/10 to-orange-500/5 border-yellow-500/20';
            default:
                return 'from-accent-500/10 to-accent-600/5 border-accent-500/20';
        }
    };

    return (
        <div className={`bg-gradient-to-br ${getSportColor()} backdrop-blur-sm border rounded-xl p-5 hover:scale-[1.01] transition-all duration-200 animate-fade-in group`}>
            {/* Top Section - ID & Status */}
            <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] text-dark-500 font-mono uppercase tracking-wide">
                    #{match.id.slice(0, 8)}
                </span>
                <div className="flex items-center gap-2">
                    {getStatusBadge()}
                    <button
                        onClick={() => onToggleFavorite(match.id)}
                        disabled={isTogglingFavorite}
                        className={`p-2 rounded-lg transition-all duration-200 ${isFavorite
                            ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30'
                            : 'bg-dark-800/50 text-dark-400 hover:bg-dark-700/50 hover:text-rose-400'
                            } ${isTogglingFavorite ? 'opacity-50 cursor-not-allowed' : ''}`}
                        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Sport & League */}
            <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{getSportIcon()}</span>
                <div>
                    <p className="text-xs text-dark-400 uppercase tracking-wider font-medium">{match.sport}</p>
                    <div className="flex items-center gap-1 text-sm text-dark-300">
                        <MapPin className="w-3 h-3" />
                        <span>{match.league}</span>
                    </div>
                </div>
            </div>

            {/* Teams */}
            <div className="bg-dark-900/40 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex-1 text-center">
                        <p className="font-semibold text-white text-base leading-tight">{match.teamA}</p>
                    </div>
                    <div className="px-3">
                        <span className="text-[10px] font-bold text-dark-500 bg-dark-800 px-2 py-1 rounded">
                            VS
                        </span>
                    </div>
                    <div className="flex-1 text-center">
                        <p className="font-semibold text-white text-base leading-tight">{match.teamB}</p>
                    </div>
                </div>
            </div>

            {/* Time */}
            <div className="flex items-center justify-center gap-2 text-xs text-dark-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{format(new Date(match.startTime), 'PPp')}</span>
            </div>
        </div>
    );
};

export default MatchCard;
