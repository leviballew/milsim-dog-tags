// src/components/SearchedUser.jsx
import React from 'react';

const SearchedUser = ({ user }) => {
    const handleRequest = async () => {
        try {
            const token = sessionStorage.getItem('userToken');
            const response = await fetch(`http://localhost:8080/requests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ recipientId: user.id })
            });
            if (response.ok) {
                console.log('Request sent successfully');
            } else {
                console.error('Failed to send request:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to send request:', error);
        }
    };

    return (
        <li>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <button onClick={handleRequest}>Request Dogtags</button>
        </li>
    );
};

export default SearchedUser;
