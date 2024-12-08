import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Bookview = ({ data }) => {
    const navigate = useNavigate();
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showBill, setShowBill] = useState(false);
    const [selectedLocations, setSelectedLocations] = useState({}); // Track selected locations for each booking

    useEffect(() => {
        if (data) {
            console.log('Received data:', data);
        }
    }, [data]);

    const handleComplete = async (bookingId, totalAmount) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/bookings/${bookingId}`, { completed: true });
            if (response.data.success) {
                setSelectedBooking({ bookingId, totalAmount });
                setShowBill(true);
            } else {
                alert('Error: Booking could not be marked as completed.');
            }
        } catch (error) {
            console.error("Error completing the booking", error);
            alert('Error completing the booking. Please try again later.');
        }
    };

    const handleLocationChange = (bookingId, location) => {
        setSelectedLocations((prevState) => ({
            ...prevState,
            [bookingId]: location,
        }));
    };

    const handleViewLocationDetails = (location) => {
        navigate('/location-details', { state: { location } }); // Navigate to location details page
    };

    if (!data || !data.bookings || data.bookings.length === 0) {
        return <p>No bookings available or invalid data provided.</p>;
    }

    return (
        <div className="bg-gray-50 px-4 h-full overflow-y-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Bookings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.bookings.map((booking, index) => {
                    const { booked_person = {}, status, payment_status, total_amount, start_time, end_time, completed, _id } = booking;
                    const { userPic, name, email } = booked_person;

                    return (
                        <div key={index} className={`p-6 ${completed ? 'bg-green-100' : 'bg-white'} rounded-lg shadow-md mb-6`}>
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-gray-800">Booking Details</h3>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                                    {status || "N/A"}
                                </span>
                            </div>

                            <div className="flex items-center mt-4">
                                {userPic ? (
                                    <img
                                        src={userPic}
                                        alt={`${name || "User"}'s profile`}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">No Image</span>
                                    </div>
                                )}
                                <div className="ml-4">
                                    <h4 className="text-xl font-semibold text-gray-900">{name || "No Name"}</h4>
                                    <p className="text-sm text-gray-500">{email || "No Email Available"}</p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-2">
                                <p className="text-gray-600">
                                    <span className="font-medium">Payment Status:</span>
                                    <span className={`ml-2 px-2 py-1 rounded text-sm ${payment_status === 'paid' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                        {payment_status || "N/A"}
                                    </span>
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-medium">Total Amount:</span> ${total_amount || "0"}
                                </p>
                            </div>

                            <div className="flex justify-between mt-4">
                                <div className="flex items-center space-x-4">
                                    <select
                                        value={selectedLocations[_id] || ""}
                                        onChange={(e) => handleLocationChange(_id, e.target.value)}
                                        className="px-4 py-2 rounded-lg border bg-white"
                                    >
                                        <option value="">Select Location</option>
                                        <option value="Bomanahalli">Bomanahalli</option>
                                        <option value="HSR">HSR</option>
                                        <option value="Kudlugate">Kudlugate</option>
                                        <option value="Electronic City">Electronic City</option>
                                    </select>
                                </div>

                                <button
                                    onClick={() => handleViewLocationDetails(selectedLocations[_id])}
                                    className="my-4 px-4 py-2 rounded text-white bg-blue-400 hover:bg-blue-500"
                                >
                                    View Details
                                </button>
                            </div>

                            {showBill && (
                                <div className="mt-6">
                                    <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-500">
                                        <h3 className="text-lg font-semibold text-yellow-700">Important Warning</h3>
                                        <p className="text-sm text-yellow-600 mt-2">
                                            Any form of misbehavior or breach of our code of conduct during or after the session will result in the immediate deactivation of your account.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Bookview;
