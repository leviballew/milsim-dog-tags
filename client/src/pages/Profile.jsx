import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Dogtag from '../components/Dogtag';

const Profile = () => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const [dogtags, setDogtags] = useState([]);

    useEffect(() => {
        if (!user || !user.id) return;
        const fetchDogtags = async () => {
            try {
                const response = await fetch(`http://localhost:8080/dogtags/collected/${user.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setDogtags(data);
                } else {
                    console.error('Failed to fetch dogtags:', response.statusText);
                }
            } catch (error) {
                console.error('Failed to fetch dogtags:', error);
            }
        };

        fetchDogtags();
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
                <p>Loading user info...</p>
            )}

            <h2>Your Collected Dogtags</h2>
            {dogtags.length === 0 ? (
                <p>No dogtags collected yet.</p>
            ) : (
                <div className="dogtags">
                    {dogtags.map(dogtag => (
                        <Dogtag key={dogtag.id} dogtag={dogtag} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Profile;
