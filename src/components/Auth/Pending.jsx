import React from 'react';

const Pending = () => {
    const rawUser = localStorage.getItem('user');
    const user = rawUser ? JSON.parse(rawUser) : null;

    console.log(user)

    return (
        <div className="flex items-center justify-center min-h-96  p-4">
            <div className="max-w-md mx-auto bg-gray-600 text-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-4">
                    Profile Under Review
                </h2>
                <p className=" text-center mb-6">
                    Thank you for your submission! Your profile is currently being reviewed by our admin team.
                </p>
                <p className=" text-center mb-4">
                    Once the review is complete, you will receive an update regarding your account status.
                </p>
                {user && user.approvalStatus === 'inactive' && (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded-md">
                        <p className="font-semibold">
                            Attention: Your account is currently inactive.
                        </p>
                        <p>
                            If you have any questions or need assistance, please contact our admin team for further information.
                        </p>
                    </div>
                )}
                <p className=" text-center">
                    If you have any questions, please feel free to reach out to our support team.
                </p>
            </div>
        </div>
    );
};

export default Pending;
