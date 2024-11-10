import React from 'react';

const Card = ({ data }) => {
    if (!data) {
        return <p className="text-sm text-gray-700">Invalid booking data provided.</p>;
    }

    const {
        booked_person = {},
        status,
        payment_status,
        total_amount,
        start_time,
        end_time
    } = data;

    const { userPic, name, email } = booked_person;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md mb-6 transition transform hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Booking Details</h3>
                <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                        }`}
                >
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
                    <span
                        className={`ml-2 px-2 py-1 rounded text-sm ${payment_status === 'paid' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                            }`}
                    >
                        {payment_status || "N/A"}
                    </span>
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">Total Amount:</span> ${total_amount || "0"}
                </p>
            </div>

            <div className="mt-4 border-t pt-4">
                <p className="text-gray-600">
                    <span className="font-medium">Start Time:</span> {start_time ? new Date(start_time).toLocaleString() : "N/A"}
                </p>
                <p className="text-gray-600">
                    <span className="font-medium">End Time:</span> {end_time ? new Date(end_time).toLocaleString() : "N/A"}
                </p>
            </div>
        </div>
    );
};

const Bookview = ({ data }) => {
    return (
        <div className="bg-gray-50 px-4 h-full w-[calc(100vw-50rem)] overflow-y-hidden overflow-x-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Bookings</h2>
            {data?.bookings?.length > 0 ? (
                <div className="flex gap-5">
                    {data.bookings.map((ele, index) => (
                        <Card key={index} data={ele} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No bookings available yet.</p>
            )}
        </div>
    );
};

export default Bookview;
