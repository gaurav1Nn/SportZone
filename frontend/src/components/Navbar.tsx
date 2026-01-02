import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, Trophy } from 'lucide-react';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 bg-dark-950/80 backdrop-blur-lg border-b border-dark-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-accent-400 to-accent-600 rounded-lg flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-md transition-shadow duration-300">
                            <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-white">
                                SportZone
                            </span>
                            <span className="text-[10px] text-dark-400 -mt-1 tracking-wider uppercase">
                                Live Matches
                            </span>
                        </div>
                    </Link>

                    {/* Right Section */}
                    <div className="flex items-center gap-3">
                        {isAuthenticated ? (
                            <>
                                {/* User Info */}
                                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-dark-800/50 rounded-lg border border-dark-700/50">
                                    <div className="w-7 h-7 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-sm text-dark-200 font-medium">{user?.name}</span>
                                </div>

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 text-dark-400 hover:text-white hover:bg-dark-800/50 rounded-lg transition-all duration-200"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="hidden sm:inline text-sm">Logout</span>
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-sm font-medium text-dark-300 hover:text-white transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link to="/register" className="btn-primary text-sm py-2">
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
