// src/pages/Signup.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Simulate API signup
            const token = 'fake-jwt-token-from-signup'; // This should be replaced with actual signup logic
            login(token);  // Log in the user
            navigate('/'); // Redirect to home page or dashboard
        } catch (error) {
            console.error('Signup failed:', error);
            // Handle errors here
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
