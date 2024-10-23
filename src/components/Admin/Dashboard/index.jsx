import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { FaUsers } from "react-icons/fa";
import { MdReviews, MdOutlineLogout } from "react-icons/md";

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const navItems = [
        { to: 'users', label: 'Users', icon: <FaUsers /> },
        // { to: 'reviews', label: 'Reviews', icon: <MdReviews /> },
    ];

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className={`transition-transform duration-300 ease-in-out bg-gray-800 text-white p-4 ${isOpen ? 'w-44' : 'w-16'} shadow-lg`}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className={`text-lg font-bold ${isOpen ? 'block' : 'hidden'} transition-opacity duration-300`}>Dashboard</h2>
                    <button onClick={toggleSidebar} className="text-white focus:outline-none">
                        {isOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </div>
                <nav className="flex-grow">
                    <ul>
                        {navItems.map((item, index) => (
                            <li key={index} className={`mb-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                                <Link to={item.to} className="flex items-center hover:text-blue-300 text-sm">
                                    {isOpen && <span className="mr-2">{item.icon}</span>}
                                    {isOpen && item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                 
                {/* Logout Link at the Bottom */}
                <div className="mt-auto">
                    <button onClick={handleLogout} className="flex items-center hover:text-blue-300 text-sm">
                        {isOpen && <span className="mr-2"><MdOutlineLogout /></span>}
                        {isOpen && 'Logout'}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className={`flex-1 p-6 transition-margin duration-300 ${isOpen ? 'ml-5' : 'ml-1'}`}>
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;
