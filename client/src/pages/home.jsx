// src/pages/Home.jsx
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import SearchedUser from '../components/SearchedUser';
import '../styles/home.css';

const Home = () => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        if (user) {
            try {
                const token = sessionStorage.getItem('userToken');
                const response = await fetch(`http://localhost:8080/users/searchUsers?userId=${user.id}&searchTerm=${searchTerm}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setSearchResults(data);
                } else {
                    console.error('Failed to fetch search results:', response.statusText);
                }
            } catch (error) {
                console.error('Failed to fetch search results:', error);
            }
        }
    };

    return (
        <div className="home">
            <h1>Welcome to Our App!</h1>
            <p>Discover the features that help you with [main app purpose].</p>

            {isAuthenticated ? (
                <>
                    <p>Thanks for logging in! Check out your <Link to="/profile">Profile</Link>.</p>
                    <div className="search">
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                    <div className="search-results">
                        {searchResults.length === 0 ? (
                            <p>No users found.</p>
                        ) : (
                            <ul>
                                {searchResults.map(user => (
                                    <SearchedUser key={user.id} user={user} />
                                ))}
                            </ul>
                        )}
                    </div>
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
