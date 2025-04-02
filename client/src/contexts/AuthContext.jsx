import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

const getToken = () => sessionStorage.getItem('userToken');

const isTokenValid = (token) => {
    try {
        const { exp } = jwtDecode(token);
        return Date.now() < exp * 1000; // convert to ms
    } catch {
        return false;
    }
};

export const AuthProvider = ({ children }) => {
    const token = getToken();
    const [isAuthenticated, setIsAuthenticated] = useState(() => token && isTokenValid(token));
    const [user, setUser] = useState(() => {
        return token && isTokenValid(token) ? jwtDecode(token) : null;
    });

    const login = (token) => {
        sessionStorage.setItem('userToken', token);
        const decoded = jwtDecode(token);
        setUser(decoded);
        setIsAuthenticated(true);
    };

    const logout = () => {
        sessionStorage.removeItem('userToken');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext };
