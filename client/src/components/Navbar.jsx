import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/components/navbar.css';

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            {isAuthenticated ? (
                <>
                    <Link to="/profile">Profile</Link>
                    <Link to="/messages">Messages</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
                ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </>
                )}

        </nav>
    );
};

export default Navbar;
