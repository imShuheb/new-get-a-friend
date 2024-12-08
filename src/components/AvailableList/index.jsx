import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AvailableList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const raw = localStorage.getItem('user');
  const loggedinuser = JSON.parse(raw);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvailableUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/available`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching available users:', error);
        setError('Failed to fetch available users.');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableUsers();
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleBooking = async (data) => {
    console.log(data);

    if (data.rate_per_hour <= 2) {
      return alert('User has not set their price for spending time. Please wait until they add the price.');
    }

    // Terms and Conditions Confirmation
    const userConfirmed = window.confirm(
      `Please read the following terms and conditions before booking:\n\n` +
      `1. Bookings are non-refundable once confirmed.\n` +
      `2. Ensure you are available during the selected time slot.\n` +
      `3. The platform is not liable for cancellations by the user.\n` +
      `4. Any disputes must be resolved directly between the users.\n\n` +
      `Click "OK" if you have read and agree to these terms.`
    );

    if (!userConfirmed) {
      return; // Exit the booking process if the user does not agree.
    }

    try {
      const amount = data.rate_per_hour * 100;
      const orderResponse = await axios.post(`${import.meta.env.VITE_SERVER_URL}/create-order`, { amount });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: orderResponse.data.amount,
        currency: "INR",
        name: "Booking Payment",
        description: "Complete your booking payment",
        order_id: orderResponse.data.order_id,
        handler: async function (response) {
          await finalizeBooking(response, data);
        },
        prefill: {
          name: loggedinuser.name,
          email: loggedinuser.email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error("Error initiating payment:", error);
      setError("Payment failed. Please try again.");
    }
  };

  const finalizeBooking = async (paymentResponse, selectedUser) => {
    try {
      const bookingData = {
        user: loggedinuser.id,
        booked_person: selectedUser._id,
        start_time: new Date(),
        end_time: new Date(Date.now() + 1 * 60 * 60 * 1000),
        total_amount: selectedUser.rate_per_hour,
        payment_status: 'paid',
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        status: 'confirmed',
      };
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/bookings`, bookingData);

      navigate('/profile');
      alert("Booking successful and saved!");

    } catch (error) {
      console.error("Error saving booking:", error);
      setError("Booking failed. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg max-w-4xl mt-6">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Available Users</h2>

      <div className="h-[calc(100vh-15rem)] overflow-y-auto space-y-6 px-6">
        {users.length > 0 ? (
          users.map((user, index) => {
            if (user._id === loggedinuser.id) return null;
            return (
              <div key={user._id} className="bg-white shadow-lg rounded-lg">
                {/* User Info Header */}
                <div className="flex items-center justify-between p-6 border-b">
                  <div className='flex items-center'>
                    <img
                      src={user.userPic || 'https://via.placeholder.com/150'}
                      alt={user.name}
                      className="w-20 h-20 rounded-full object-cover mr-6"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.profession}</p>
                      <p className="text-sm text-gray-600">Rate: ${user.rate_per_hour}/hr</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBooking(user)}
                    className='bg-blue-500 hover:bg-blue-600 text-white py-1 px-6 rounded-lg text-lg font-medium shadow-lg transition duration-300 ease-in-out'
                  >
                    Book
                  </button>
                </div>

                {/* Accordion Button */}
                <button
                  className="w-full bg-blue-500 text-white py-3 px-4 text-left flex justify-between items-center transition-colors hover:bg-blue-600 focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                >
                  <span>More Info</span>
                  <span
                    className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                  >
                    ▼
                  </span>
                </button>

                {/* Accordion Content */}
                {openIndex === index && (
                  <div className="p-6 text-gray-700">
                    <p>
                      <strong>Location:</strong> {user.location || 'Unknown'}
                    </p>
                    <p>
                      <strong>Description:</strong> {user.description || 'No description provided.'}
                    </p>

                    {/* Available Times */}
                    <div className="mt-4">
                      <h4 className="font-semibold">Available Times:</h4>
                      <ul className="ml-4 list-disc">
                        {user.available_times && user.available_times.length > 0 ? (
                          user.available_times.map((time, idx) => (
                            <li key={idx}>
                              {time.day}: {time.from} - {time.to}
                            </li>
                          ))
                        ) : (
                          <li>No available times listed</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-gray-500 text-center">No users available</div>
        )}
      </div>
    </div>
  );
};

export default AvailableList;
