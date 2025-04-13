import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    // Initialize state from localStorage if available
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const savedAuth = localStorage.getItem('isAuthenticated');
        return savedAuth ? JSON.parse(savedAuth) : false;
    });

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Update localStorage when authentication state changes
    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        // Clear localStorage on logout
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
    };

    const value = {
        isAuthenticated,
        user,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 