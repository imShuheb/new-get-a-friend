import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError('');
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, credentials);

            if (response.status === 200) {
                const { user } = response.data;
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(user));

                if (user.onBoarding) {
                    navigate(user.admin ? '/admin' : '/on-boarding');
                } else if (user.approvalStatus !== 'active') {
                    navigate('/pending');
                } else {
                    navigate(user.admin ? '/admin' : '/profile');
                }
            } else {
                alert('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            if (error.response) {
                setError('Login failed. Please check your credentials.');
            } else if (error.request) {
                setError('Network error. Please check your connection.');
            } else {
                setError('Error setting up request: ' + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const rawUser = localStorage.getItem('user');
        const user = rawUser ? JSON.parse(rawUser) : null;

        if (user) {
            navigate(user.admin ? '/admin' : '/profile');
        }
    }, [navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center capitalize">Login to get a friend</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {error && <div className="mb-4 text-red-500">{error}</div>}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="mt-5 text-center">
                    <p>Don't have an account? <Link to="/register" className='hover:text-blue-500 hover:underline'>Register here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
