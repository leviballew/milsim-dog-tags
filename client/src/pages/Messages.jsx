// src/pages/Messages.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/pages/Messages.css';

const Messages = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            if (user) {
                try {
                    const token = sessionStorage.getItem('userToken');
                    const response = await fetch(`http://localhost:8080/requests?userId=${user.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setRequests(data);
                    } else {
                        console.error('Failed to fetch requests:', response.statusText);
                    }
                } catch (error) {
                    console.error('Failed to fetch requests:', error);
                }
            }
        };

        fetchRequests();
    }, [user]);

    const handleReleaseDogtags = async (requestId) => {
      try {
        const response = await fetch(`http://localhost:8080/requests/${requestId}/release`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          alert(data.message);
        } else {
          alert(data.error || 'Something went wrong.');
        }
      } catch (error) {
        console.error('Error releasing dogtags:', error);
      }
    };


    return (
        <div className="messages">
            <h1>Messages</h1>
            {requests.length === 0 ? (
                <p>No requests found.</p>
            ) : (
                <ul>
                    {requests.map(request => (
                        <li key={request.id}>
                            <p>{request.senderUsername} wants to collect your dogtags.</p>
                            <button onClick={() => handleReleaseDogtags(request.id)}>Release Dogtags</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Messages;
