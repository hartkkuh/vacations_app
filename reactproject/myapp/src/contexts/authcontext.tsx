import Cookies from 'js-cookie';
import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi, register as registerApi } from '../api/userapi';
import { myToken } from '../models';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
    token: string | null;
    is_admin: boolean;
    login: (email: string, password: string) => Promise<string>;
    logout: () => void;
    register: (first_name: string, last_name: string, email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider( { children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null)
    const [is_admin, setis_admin] = useState<boolean>(false)

    useEffect(() => {
        const storedToken = Cookies.get('token');
        if (storedToken && token !== storedToken) {
            setToken(storedToken);
        }
    }, []);
    
    useEffect(() => {
        if (token) {
            Cookies.set('token', token, { expires: 7, path: '/', domain: "127.0.0.1", sameSite: "Lax" });
        } else {
            Cookies.remove('token');
        }
    }, [token]);

    useEffect(() => {
            if (token) {
                try {
                    const decoded = jwtDecode<myToken>(token);
                    if (decoded) {
                        setis_admin(decoded.is_admin);
                    }
                } catch (error) {
                    console.error("Error decoding token:", error);
                    setis_admin(false);
                }
        };
        }, [token]);

    
    const login = async (email: string, password: string) => {
        try {
            const response = await loginApi(email, password);
            if (!response.access_token) {
                throw new Error('No access token received');
            }
            const newToken = response.access_token;
            setToken(newToken);
            return newToken;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (first_name: string, last_name: string, email: string, password: string) => {
        if (!email || !password || !first_name || !last_name) {
            return;
        }
        
        try {
            await registerApi({first_name, last_name, email, password});
        } catch (error) {
        }
    };

    const logout = () => {
        Cookies.remove('token')
        setToken(null);
        window.location.reload()
    };

    return (
        <AuthContext.Provider value={{ token, is_admin, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
