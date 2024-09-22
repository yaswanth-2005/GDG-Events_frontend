import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/login', { username, password })
            .then(response => {
                if (response.data.message === "login success") {
                    navigate('/admin')
                }
            })
            .catch(error => {
                console.error('Login failed:', error);
                alert('Invalid credentials');
            });
    };

    return (
        <div className="container">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
