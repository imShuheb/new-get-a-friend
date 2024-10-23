import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate()

    const ignorePaths = ['/login', '/register', '/on-boarding'];

    const navLinks = [
        // { name: 'Home', href: '/' },
        // { name: 'About', href: '/about' },
        // { name: 'Services', href: '/services' },
        // { name: 'Contact', href: '/contact' },
    ];

    const rawUser = localStorage.getItem('user');
    const user = rawUser ? JSON.parse(rawUser) : null;

    const handleLogout = () => {
        localStorage.clear();
        setDropdownOpen(false)
        navigate('/login')
    };

    if (location.pathname.includes('/admin')) return;


    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-white text-2xl font-bold font-montserrat">
                            Get A Friend
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        {!ignorePaths.includes(location.pathname) && navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md"
                                >
                                    <FaUserCircle className="h-6 w-6 mr-2" />
                                    <span className="text-sm font-medium capitalize">{user.name}</span>
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-10">
                                        <Link
                                            to={`${user && user.admin ? '/admin' : '/profile' || '/profile'}`}
                                            className="block px-4 py-2 text-gray-300 hover:bg-gray-600"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            View Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-600"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            !ignorePaths.includes(location.pathname) && (
                                <Link to="/login" className="text-white bg-blue-500 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                    Login
                                </Link>)
                        )}
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {!ignorePaths.includes(location.pathname) && navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md"
                                >
                                    <FaUserCircle className="h-6 w-6 mr-2 capitalize" />
                                    {user.name}
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute left-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-10">
                                        <Link
                                            to={`/profile`}
                                            className="block px-4 py-2 text-gray-300 hover:bg-gray-600"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            View Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-600"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            !ignorePaths.includes(location.pathname) && (
                                <Link
                                    to="/login"
                                    className="block text-gray-300 bg-indigo-600 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Login
                                </Link>)
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
