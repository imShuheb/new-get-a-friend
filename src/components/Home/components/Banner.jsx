import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    const rawUser = localStorage.getItem('user');
    const user = rawUser ? JSON.parse(rawUser) : null;


    return (
        <div className="bg-gray-900 text-white h-[700px] flex items-center justify-center flex-col gap-8 p-10 ">
            <h2 className="text-5xl lg:text-6xl font-bold text-center" data-aos="fade-up">Connect with New Friends...</h2>
            <p className="text-lg lg:text-xl text-center max-w-7xl" data-aos="fade-up" data-aos-delay="600">
                Meet people who share your interests and passions. Whether you're looking for new friends to explore the city, join a hobby group, or simply chat about your favorite shows, we’ve got you covered.
                Our platform makes it easy to connect with like-minded individuals who are eager to make meaningful connections without the distractions of endless conversations.
            </p>

            {!user && (
                <Link
                    to="/register"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-medium shadow-lg transition duration-300 ease-in-out"
                    data-aos="fade-up" data-aos-delay="1000"
                >
                    Join Now
                </Link>
            )}
        </div>
    );
};

export default Banner;
