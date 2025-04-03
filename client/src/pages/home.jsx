// src/pages/Home.jsx
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import SearchedUser from '../components/SearchedUser';
import '../styles/pages/home.css';

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
            <h1>Welcome to Milsim DogTags</h1>
            {isAuthenticated ? (
                <>
                    <p><Link to="/profile">Check out your Profile</Link></p>
                    <div className="search">
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                    <div className="search">
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
        </div>
    );
};

export default Home;
