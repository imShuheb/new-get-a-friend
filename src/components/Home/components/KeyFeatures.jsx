import React from 'react';

const KeyFeatures = () => {
    const features = [
        {
            title: 'Match by Interest',
            description: 'Connect with others based on shared passions and hobbies. Whether you love painting, hiking, or gaming, our platform helps you find friends who share your interests, making it easier to form genuine connections.',
            animation: 'fade-up',
        },
        {
            title: 'No Chat Distractions',
            description: 'Focus on real-world connections without the distractions of endless chatting. Our platform encourages meaningful interactions that lead to lasting friendships and enjoyable experiences in person.',
            animation: 'fade-up',
        },
        {
            title: 'Fun Group Activities',
            description: 'Join or plan exciting events with friends. From outdoor adventures to creative workshops, our platform makes it easy to engage in group activities that foster connections and fun memories.',
            animation: 'fade-up',
        },
        {
            title: 'Safe and Secure',
            description: 'Your privacy is always our priority. We implement strict security measures to ensure your data is protected while you explore new friendships and activities. Enjoy peace of mind as you connect with others.',
            animation: 'fade-up',
        },
    ];

   
    return (
        <div className="bg-gray-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center mb-10">Key Features</h2>
                <ul className="space-y-4">
                    {features.map((feature, index) => (
                        <li
                            key={index}
                            className="flex items-center bg-gray-800 p-4 rounded-full transition transform hover:scale-105"
                            data-aos={feature.animation}
                            data-aos-delay={index * 300}
                        >
                            <span className="bg-blue-500 text-white font-bold rounded-full w-60 px-4 py-2 mr-3 text-center">
                                {feature.title}
                            </span>
                            <span className="text-gray-300">{feature.description}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default KeyFeatures;
