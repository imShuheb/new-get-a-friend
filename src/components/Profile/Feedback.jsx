import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Feedback = () => {
    const { state } = useLocation();

    const booking = state?.booking;
    const navigate = useNavigate()
    const [rating, setRating] = useState(0);
    const [feedbackText, setFeedbackText] = useState('');
    const [isMisbehavior, setIsMisbehavior] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRatingChange = (event) => {
        setRating(parseInt(event.target.value));
    };

    const handleFeedbackTextChange = (event) => {
        setFeedbackText(event.target.value);
    };

    const handleMisbehaviorChange = (event) => {
        setIsMisbehavior(event.target.checked);
    };

    const handleSubmitFeedback = async (event) => {
        event.preventDefault();
        if (rating === 0) {
            setMessage('Please select a rating.');
            return;
        }

        const feedbackData = {
            rating,
            feedbackText,
            isMisbehavior,
            user: booking._id,
            booked_person: booking.booked_person._id,
            submittedAt: new Date().toISOString(),
        };

        setIsLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(feedbackData),
            });

            if (response.ok) {
                navigate('/profile')

            } else {
                const error = await response.json();
                setMessage(`Error: ${error.message}`);
            }
        } catch (error) {
            setMessage('An error occurred while submitting feedback.');
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className="p-8 max-w-screen-lg mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800">We value your feedback!</h2>
            <form onSubmit={handleSubmitFeedback} className="mt-6">
                <div className="mb-4">
                    <label className="text-lg font-medium">Rating (1-5):</label>
                    <div className="flex space-x-2 mt-2">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <button
                                key={value}
                                type="button"
                                onClick={handleRatingChange}
                                value={value}
                                className={`px-3 py-1 border rounded-md ${rating === value ? 'bg-blue-500 text-white' : 'bg-gray-300'
                                    }`}
                            >
                                {value}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-medium">Additional Feedback (optional):</label>
                    <textarea
                        className="border-2 border-gray-300 p-3 rounded-md mt-2 w-full"
                        rows="4"
                        value={feedbackText}
                        onChange={handleFeedbackTextChange}
                        placeholder="Tell us more about your experience..."
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-medium">Is this feedback about misbehavior?</label>
                    <input
                        type="checkbox"
                        checked={isMisbehavior}
                        onChange={handleMisbehaviorChange}
                        className="mt-2"
                    />
                    <span className="ml-2">Yes, I am reporting misbehavior.</span>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-green-500 text-white rounded-md shadow-md transition duration-300 hover:bg-green-600 disabled:bg-gray-400"
                >
                    {isLoading ? 'Submitting...' : 'Submit Feedback'}
                </button>
            </form>

            {message && <p className="text-lg text-gray-700 mt-4">{message}</p>}
        </div>
    );
};

export default Feedback;
