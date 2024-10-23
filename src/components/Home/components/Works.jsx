import React from 'react';
import setUpProfile from '../../../../public/cards/setUpProfile.jpg'
import findmatch from '../../../../public/cards/findmatch.jpg'
import planning from '../../../../public/cards/planning.jpg'

const Works = () => {
    const steps = [
        {
            title: 'Set Up Your Profile',
            description: 'Tell us about your hobbies, interests, and preferences. This helps us create a personalized experience just for you, making it easier to find friends who share similar passions and activities.',
            image: setUpProfile,
            animation: 'fade-up'
        },
        {
            title: 'Find Matches',
            description: 'We’ll connect you with like-minded individuals based on your interests. Our advanced matching algorithm takes into account your profile details to suggest friends who are a great fit for you.',
            image: findmatch,
            animation: 'fade-up'
        },
        {
            title: 'Plan Activities',
            description: 'Once you have found your matches, you can suggest meetups or fun activities to enjoy together. Whether it’s a coffee date, a hike, or attending an event, we make it easy to organize and connect with your new friends.',
            image: planning,
            animation: 'fade-up'
        },
    ];

    return (
        <div className="bg-gray-900 text-white py-16 h-auto flex justify-center items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center mb-10">How It Works</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                            data-aos={step.animation}
                            data-aos-delay={index * 600}
                        >
                            <div className="relative mb-4">
                                <img
                                    src={step.image}
                                    alt={step.title}
                                    className="w-full h-48 object-cover rounded-lg filter grayscale transition duration-300 ease-in-out hover:grayscale-0"
                                />
                            </div>
                            <h3 className="text-2xl font-semibold mb-4 text-center">{step.title}</h3>
                            <p className="text-gray-300 text-justify">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Works;
