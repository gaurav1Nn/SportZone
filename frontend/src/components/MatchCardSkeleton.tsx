const MatchCardSkeleton = () => {
    return (
        <div className="bg-dark-900/60 border border-dark-800 rounded-xl p-5">
            {/* Top Section */}
            <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-3 skeleton rounded" />
                <div className="flex items-center gap-2">
                    <div className="w-16 h-6 skeleton rounded-md" />
                    <div className="w-8 h-8 skeleton rounded-lg" />
                </div>
            </div>

            {/* Sport & League */}
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 skeleton rounded-lg" />
                <div>
                    <div className="w-12 h-3 skeleton rounded mb-1" />
                    <div className="w-20 h-4 skeleton rounded" />
                </div>
            </div>

            {/* Teams */}
            <div className="bg-dark-800/50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex-1 flex justify-center">
                        <div className="w-24 h-5 skeleton rounded" />
                    </div>
                    <div className="px-3">
                        <div className="w-8 h-5 skeleton rounded" />
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="w-24 h-5 skeleton rounded" />
                    </div>
                </div>
            </div>

            {/* Time */}
            <div className="flex justify-center">
                <div className="w-32 h-4 skeleton rounded" />
            </div>
        </div>
    );
};

export default MatchCardSkeleton;
