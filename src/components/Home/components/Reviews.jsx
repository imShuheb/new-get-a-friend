import React, { useState } from 'react';

const reviewsData = [
    {
        name: 'John Doe',
        text: 'I’ve met some amazing friends through this platform! The activities organized are always fun and engaging.',
        rating: 5,
    },
    {
        name: 'Jane Smith',
        text: 'A fantastic way to connect with like-minded individuals. I love the focus on real-world interactions!',
        rating: 4,
    },
    {
        name: 'Alice Johnson',
        text: 'The matching feature is spot on! I’ve made some great connections based on shared interests.',
        rating: 5,
    },
    {
        name: 'Mark Brown',
        text: 'I appreciate the safety measures in place. It feels secure to connect with new friends here.',
        rating: 4,
    },
];

const Reviews = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextReview = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviewsData.length);
    };

    const prevReview = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + reviewsData.length) % reviewsData.length);
    };

    return (
        <div className="bg-gray-900 text-white py-16 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center mb-10">What Our Users Say</h2>
                <div className="relative flex items-center justify-center ">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition transform hover:scale-105 max-w-md h-60 flex flex-col justify-center items-center" >
                        <p className="text-gray-300 italic text-center mb-4">"{reviewsData[currentIndex].text}"</p>
                        <h4 className="font-semibold text-center">{reviewsData[currentIndex].name}</h4>
                        <div className="flex justify-center items-center mt-2">
                            {Array.from({ length: reviewsData[currentIndex].rating }, (_, i) => (
                                <svg
                                    key={i}
                                    className="h-5 w-5 text-yellow-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 15.27L16.18 18l-1.64-7.03L18 7.24l-7.19-.61L10 .25 9.19 6.63 2 7.24l5.46 3.73L5.82 18z" />
                                </svg>
                            ))}
                        </div>
                    </div>
                    <button
                        className="absolute left-0 p-2 w-10 bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300 font-bold"
                        onClick={prevReview}
                    >
                        &lt;
                    </button>
                    <button
                        className="absolute right-0 p-2 w-10 bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300 font-bold"
                        onClick={nextReview}
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reviews;
