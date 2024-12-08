import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LocationDetails = () => {
    const { state } = useLocation();
    const location = state?.location || 'HSR'; // Default to HSR if location is not passed

    const navigate = useNavigate();
    const locationDescriptions = {
        Bomanahalli: {
            description: `Bomanahalli is a bustling locality located in the southern part of Bangalore, strategically close to major IT hubs like Electronic City. This area features a balanced mix of residential complexes, commercial offices, and a variety of food outlets.`,
            image: "https://assets-news.housing.com/news/wp-content/uploads/2016/11/23154118/Bommanahalli.jpg",
            meetingPlace: "Bomanahalli Metro Station, near the main entrance.",
            timeSlots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"],
        },
        HSR: {
            description: `HSR Layout, one of the most popular localities in Bangalore, offers a dynamic atmosphere with its commercial spaces, restaurants, and cafes.`,
            image: "https://imgmedia.lbb.in/media/2022/04/626000a3ec940b4984642bd1_1650458787006.png",
            meetingPlace: "HSR Layout Park, near the central fountain.",
            timeSlots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"],
        },
        Kudlugate: {
            description: `Kudlugate is a serene neighborhood that offers a peaceful escape from the busy city life.`,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Kudlu_Gate_metro_station_%28Apr_%2724%29.jpg/1200px-Kudlu_Gate_metro_station_%28Apr_%2724%29.jpg",
            meetingPlace: "Kudlugate Park, near the main entrance.",
            timeSlots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"],
        },
        "Electronic City": {
            description: `Electronic City is a prime hub for IT companies and startups, making it one of the most dynamic areas in Bangalore.`,
            image: "https://i.ytimg.com/vi/570lPS_Cf5E/sddefault.jpg",
            meetingPlace: "Electronic City Metro Station, near the south exit.",
            timeSlots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"],
        },
    };

    const [selectedLocation, setSelectedLocation] = useState(locationDescriptions[location]);
    const [selectedTime, setSelectedTime] = useState('');
    const [availableTimes, setAvailableTimes] = useState(selectedLocation.timeSlots);
    const [message, setMessage] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    useEffect(() => {
        setSelectedLocation(locationDescriptions[location]);
        setAvailableTimes(locationDescriptions[location].timeSlots);
    }, [location]);

    const handleTimeSlotChange = (event) => {
        const time = event.target.value;
        setSelectedTime(time);

        if (availableTimes.includes(time)) {
            const updatedTimes = availableTimes.filter(t => t !== time);
            setAvailableTimes(updatedTimes);
            setMessage(`You have selected ${time}. This time slot is now reserved for your meeting.`);
        } else {
            setMessage(`Sorry, ${time} is already taken. Please choose another time.`);
        }
    };

    const sendOtp = () => {
        if (!/^\d{10}$/.test(mobileNumber)) {
            setMessage('Please enter a valid 10-digit mobile number.');
            return;
        }
        setOtpSent(true);
        setMessage('OTP sent to your mobile number. Please enter the OTP below.');
    };

    const verifyOtp = () => {
        if (otp === '1234') { // Replace with actual OTP verification logic
            setOtpVerified(true);
            setMessage('OTP verified successfully. You can now proceed.');
        } else {
            setMessage('Invalid OTP. Please try again.');
        }
    };

    const handleFeedback = () => {
        navigate('/feedback');
    };

    return (
        <div className="p-8 max-w-screen-lg mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800">{location}</h2>
            <div className="mt-4 relative flex overflow-x-auto space-x-4">
                <div className="flex-shrink-0 w-1/3">
                    <img
                        src={selectedLocation.image}
                        alt={location}
                        className="w-full h-72 object-cover rounded-lg shadow-lg"
                    />
                </div>
                <div className="flex-grow">
                    <p className="text-lg text-gray-700 mt-4">{selectedLocation.description}</p>
                    <h3 className="text-2xl font-semibold text-gray-800 mt-6">Where to meet:</h3>
                    <p className="text-lg text-gray-700 mt-2">{selectedLocation.meetingPlace}</p>
                </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800">Terms and Conditions:</h3>
                <ul className="list-disc pl-5 mt-2 text-gray-700 text-lg">
                    <li>Do not share personal contact details such as phone numbers, addresses, or emails during the meeting.</li>
                    <li>Avoid discussing sensitive topics or private information.</li>
                    <li>Meet only at the designated public location specified.</li>
                    <li>Ensure to confirm your booking time slot to avoid overlaps.</li>
                    <li>Maintain professional and respectful communication at all times.</li>
                </ul>
            </div>

            {/* Mobile Number and OTP Verification */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-gray-800">Mobile Number Verification:</h3>
                <input
                    type="text"
                    className="border-2 border-gray-300 p-3 rounded-md mt-2 w-full"
                    placeholder="Enter your 10-digit mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                />
                <button
                    className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                    onClick={sendOtp}
                    disabled={otpSent}
                >
                    {otpSent ? 'OTP Sent' : 'Send OTP'}
                </button>
                {otpSent && (
                    <>
                        <input
                            type="text"
                            className="border-2 border-gray-300 p-3 rounded-md mt-4 w-full"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button
                            className="mt-4 px-6 py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
                            onClick={verifyOtp}
                        >
                            Verify OTP
                        </button>
                    </>
                )}
            </div>

            {/* Time Slot Selection */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-gray-800">Select a Time Slot:</h3>
                <select
                    className="border-2 border-gray-300 p-3 rounded-md mt-2 w-full"
                    value={selectedTime}
                    onChange={handleTimeSlotChange}
                    disabled={!otpVerified}
                >
                    <option value="">Select a time</option>
                    {availableTimes.map((time, index) => (
                        <option key={index} value={time}>
                            {time}
                        </option>
                    ))}
                </select>
                {message && <p className="text-lg text-gray-700 mt-4">{message}</p>}
            </div>

            {selectedTime && (
                <div className="mt-6 p-4 bg-blue-50 rounded-md shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800">Confirmation:</h3>
                    <p className="text-lg text-gray-700 mt-2">
                        You have successfully reserved the time slot: <strong>{selectedTime}</strong>. Your meeting
                        will be held at the selected location.
                    </p>
                </div>
            )}

            {/* Feedback button */}
            <div className="mt-8 flex justify-center">
                <button
                    className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                    onClick={handleFeedback}
                >
                    Give Feedback
                </button>
            </div>
        </div>
    );
};

export default LocationDetails;

