import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, LoginCredentials, RegisterCredentials } from '../types';
import authService from '../services/auth.service';
import toast from 'react-hot-toast';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check if user is already authenticated on mount
    useEffect(() => {
        const initAuth = async () => {
            const accessToken = localStorage.getItem('accessToken');
            const storedUser = localStorage.getItem('user');

            if (accessToken && storedUser) {
                try {
                    const userData = JSON.parse(storedUser);
                    setUser(userData);
                } catch {
                    // Invalid stored data, clear everything
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('user');
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = useCallback(async (credentials: LoginCredentials) => {
        try {
            const response = await authService.login(credentials);

            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('user', JSON.stringify(response.user));

            setUser(response.user);
            toast.success(`Welcome back, ${response.user.name}!`);
        } catch (error: unknown) {
            const err = error as { response?: { data?: { error?: string } } };
            const message = err.response?.data?.error || 'Login failed';
            toast.error(message);
            throw error;
        }
    }, []);

    const register = useCallback(async (credentials: RegisterCredentials) => {
        try {
            const response = await authService.register(credentials);

            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('user', JSON.stringify(response.user));

            setUser(response.user);
            toast.success('Account created successfully!');
        } catch (error: unknown) {
            const err = error as { response?: { data?: { error?: string } } };
            const message = err.response?.data?.error || 'Registration failed';
            toast.error(message);
            throw error;
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await authService.logout();
        } catch {
            // Ignore logout errors
        } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            setUser(null);
            toast.success('Logged out successfully');
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
