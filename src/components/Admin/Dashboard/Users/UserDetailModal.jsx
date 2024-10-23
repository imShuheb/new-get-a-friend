import React, { useState } from 'react';
import ImagePreviewModal from './ImagePreviewModal';

const UserDetailModal = ({ user, onClose }) => {
    const [imagePreview, setImagePreview] = useState(null);

    if (!user) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[600px] h-screen overflow-auto mx-auto transition-transform transform scale-95 ">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">User Details</h2>
                <div className="mb-4  gap-3 ">
                    <div className='flex justify-center items-center my-3'>
                        <img
                            src={user.userPic}
                            alt="User"
                            className=" h-28 w-28 object-cover rounded-full shadow-md mb-2"
                        />
                    </div>
                    <div className='space-y-3'>
                        <p className="text-gray-700"><strong>Name:</strong> {user.name}</p>
                        <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
                        <p className="text-gray-700"><strong>Phone:</strong> {user.phoneNumber}</p>
                        <p className="text-gray-700"><strong>Status:</strong> {user.status}</p>
                        <p className="text-gray-700"><strong>Profession:</strong> {user.profession}</p>
                        <p className="text-gray-700"><strong>Location:</strong> {user.location}</p>
                        <p className="text-gray-700"><strong>Description:</strong> {user.description}</p>
                        <p className="text-gray-700"><strong>Interests:</strong> {user.interests.join(', ')}</p>
                    </div>
                </div>

                <h3 className="text-lg font-semibold mb-2 text-gray-800">Documents</h3>
                <div className="flex flex-col mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Aadhar Front</span>
                        {user.aadharFront ? (
                            <button
                                onClick={() => setImagePreview(user.aadharFront)}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded transition duration-200">
                                Preview
                            </button>
                        ) : (
                            <span className="text-red-500">Detials Not uploaded</span>
                        )}
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Aadhar Back</span>
                        {user.aadharBack ? (
                            <button
                                onClick={() => setImagePreview(user.aadharBack)}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded transition duration-200">
                                Preview
                            </button>
                        ) : (
                            <span className="text-red-500">Detials Not uploaded</span>
                        )}
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">PAN Front</span>
                        {user.panFront ? (
                            <button
                                onClick={() => setImagePreview(user.panFront)}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded transition duration-200">
                                Preview
                            </button>
                        ) : (
                            <span className="text-red-500">Detials Not uploaded</span>
                        )}
                    </div>
                </div>


                <button
                    onClick={onClose}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Close
                </button>
            </div>

            {/* Image Preview Modal */}
            {imagePreview && (
                <ImagePreviewModal
                    imageUrl={imagePreview}
                    onClose={() => setImagePreview(null)}
                />
            )}
        </div>
    );
};

export default UserDetailModal;
