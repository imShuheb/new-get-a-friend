import React, { useEffect, useState } from 'react';

const AdminFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [error, setError] = useState('');

    // Fetch feedbacks on component load
    useEffect(() => {
        fetch('/api/admin/feedback')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch feedback');
                }
                return response.json();
            })
            .then((data) => setFeedbacks(data.feedbacks))
            .catch((err) => setError(err.message));
    }, []);

    // Mark feedback as reviewed
    const markAsReviewed = async (id) => {
        try {
            const response = await fetch(`/api/admin/feedback/review/${id}`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to mark feedback as reviewed');
            }

            // Remove the reviewed feedback from the state
            setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-8 max-w-screen-lg mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800">Pending Feedback</h2>
            {feedbacks.length === 0 ? (
                <p className="text-gray-600 mt-4">No pending feedback available.</p>
            ) : (
                <ul className="mt-6">
                    {feedbacks.map((feedback) => (
                        <li key={feedback._id} className="mb-4 p-4 bg-gray-100 rounded-md">
                            <p>
                                <strong>Rating:</strong> {feedback.rating}
                            </p>
                            <p>
                                <strong>Feedback:</strong> {feedback.feedbackText || 'No additional comments'}
                            </p>
                            <p>
                                <strong>Misbehavior:</strong> {feedback.isMisbehavior ? 'Yes' : 'No'}
                            </p>
                            <button
                                onClick={() => markAsReviewed(feedback._id)}
                                className="px-4 py-2 bg-green-500 text-white rounded-md mt-2"
                            >
                                Mark as Reviewed
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminFeedback;
