// src/components/SearchedUser.jsx
import React from 'react';

const SearchedUser = ({ user }) => {
    return (
        <li>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
        </li>
    );
};

export default SearchedUser;
