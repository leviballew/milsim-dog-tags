import React, { createContext, useContext, useState, useEffect } from 'react';
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
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (token && isTokenValid(token)) {
                const decoded = jwtDecode(token);
                try {
                    const response = await fetch(`http://localhost:8080/users/${decoded.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
                    } else {
                        console.error('Failed to fetch user data:', response.statusText);
                    }
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                }
            }
        };

        fetchUserData();
    }, [token]);

    const login = async (username, password) => {
        try {
            const response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok) {
                const { token, id } = data;
                sessionStorage.setItem('userToken', token);
                setIsAuthenticated(true);

                // Fetch user data from the server
                try {
                    const userResponse = await fetch(`http://localhost:8080/users/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (userResponse.ok) {
                        const userData = await userResponse.json();
                        setUser(userData);
                    } else {
                        console.error('Failed to fetch user data:', userResponse.statusText);
                    }
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                }
            } else {
                console.error('Login failed:', data.error);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
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
