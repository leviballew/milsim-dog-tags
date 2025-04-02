// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, handleLogout }) => {
    return (
        <nav>
            <Link to="/">Home</Link>
            {isAuthenticated ? (
                <>
                    <Link to="/profile">Profile</Link>
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
