import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { isAuthenticated, user } = useContext(AuthContext);

    useEffect(() => {
        console.log('User data in Profile:', user); // Add this line
    }, [user]);

    if (!isAuthenticated) {
        return (
            <div>
                <h1>Unauthorized</h1>
                <p>You need to <Link to="/login">login</Link> to view this page.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Profile</h1>
            {user ? (
                <>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
