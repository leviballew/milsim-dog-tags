import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/home.css';

const Home = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div className="home">
            <h1>Welcome to Our App!</h1>
            <p>Discover the features that help you with [main app purpose].</p>

            {isAuthenticated ? (
                <>
                    <p>Thanks for logging in! Check out your <Link to="/profile">Profile</Link>.</p>
                </>
            ) : (
                <>
                    <p>To get the most out of our app, please <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link>.</p>
                </>
            )}

            <div className="features">
                <h2>Why Choose Us?</h2>
                <ul>
                    <li>Feature 1: Benefit to the user</li>
                    <li>Feature 2: Benefit to the user</li>
                    <li>Feature 3: Benefit to the user</li>
                </ul>
            </div>
        </div>
    );
};

export default Home;
