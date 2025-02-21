// contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';

const AuthContext = createContext({
    token: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    checkAuth: () => {}
});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const { address, isConnected } = useAccount();
    const router = useRouter();

    // Use useCallback for performance and to prevent unnecessary re-renders
    const login = useCallback((newToken) => {
        Cookies.set('authToken', newToken, { expires: 1 / 24 }); // Store token in a cookie
        setToken(newToken);
        console.log("Token set in cookie:", newToken); // Log for debugging
    }, []);

    const logout = useCallback(() => {
        Cookies.remove('authToken'); // Remove token from cookie
        setToken(null);
        console.log("Logged out"); // Log for debugging
    }, []);

    const checkAuth = useCallback(() => {
        const storedToken = Cookies.get('authToken');
        console.log("Checking for existing token:", storedToken); // Log for debugging
        if (storedToken) {
            setToken(storedToken); // If token exists in cookie, set it in state
        }
    }, []);

    // Derived state: isAuthenticated is true if a token exists
    const isAuthenticated = !!token;

    // Handle disconnection
    useEffect(() => {
        if (!isConnected && token) {
            logout();
        }
    }, [isConnected, token, logout]);

    // Check for existing token on initial load
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);