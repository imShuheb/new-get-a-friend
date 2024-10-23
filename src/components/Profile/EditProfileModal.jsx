import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImagePreviewModal from '../Admin/Dashboard/Users/ImagePreviewModal';

const EditProfileModal = ({ isOpen, closeModal, formData, setFormData }) => {
    const initialAvailableTimes = [
        { day: 'Sunday', from: '12:30', to: '13:30' },
    ];

    const [editData, setEditData] = useState({
        ...formData,
        available_times: initialAvailableTimes,
    });
    const [errors, setErrors] = useState({});
    const [imagePreviews, setImagePreviews] = useState({
        userPic: null,
        aadharFront: null,
        aadharBack: null,
        panFront: null,
    });
    const [previewImageUrl, setPreviewImageUrl] = useState(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [availableTimes, setAvailableTimes] = useState(initialAvailableTimes);
    const [newTimeSlot, setNewTimeSlot] = useState({ day: '', from: '', to: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData({
            ...editData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            const file = files[0];
            setEditData({
                ...editData,
                [name]: file,
            });

            const reader = new FileReader();
            reader.onload = () => {
                setImagePreviews((prev) => ({
                    ...prev,
                    [name]: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInterestsChange = (e) => {
        setEditData({
            ...editData,
            interests: e.target.value.split(',').map((interest) => interest.trim()),
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!editData.name) newErrors.name = 'Name is required';
        if (!editData.phoneNumber || !/^\d+$/.test(editData.phoneNumber))
            newErrors.phoneNumber = 'Phone number is required and should contain only digits';
        if (!editData.profession) newErrors.profession = 'Profession is required';
        if (!editData.rate_per_hour || isNaN(editData.rate_per_hour))
            newErrors.rate_per_hour = 'Rate per hour should be a valid number';
        if (editData.interests.length === 0) newErrors.interests = 'Please enter at least one interest';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const formData = new FormData();
            Object.keys(editData).forEach((key) => {
                formData.append(key, editData[key]);
            });


            formData.append(`available_times`, JSON.stringify(availableTimes));


            // Log formData entries
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }


            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/users/upload/${editData._id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.data) {
                closeModal();
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };


    const handlePreviewOpen = (name) => {
        setPreviewImageUrl(imagePreviews[name]);
        setIsPreviewOpen(true);
    };

    const handlePreviewClose = () => {
        setIsPreviewOpen(false);
        setPreviewImageUrl(null);
    };

    const handleTimeSlotChange = (e) => {
        const { name, value } = e.target;
        setNewTimeSlot((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addTimeSlot = (e) => {
        e.preventDefault();
        if (newTimeSlot.day && newTimeSlot.from && newTimeSlot.to) {
            setAvailableTimes((prev) => [...prev, newTimeSlot]);
            setNewTimeSlot({ day: '', from: '', to: '' }); // Reset the new time slot
        } else {
            // Optionally handle error - maybe set an error state
        }
    };

    const removeTimeSlot = (index) => {
        setAvailableTimes((prev) => prev.filter((_, i) => i !== index));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[700px]">
                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

                <form onSubmit={handleSubmit}>
                    <div className='h-[calc(100vh-12rem)] overflow-auto px-2'>
                        {/* User Pic */}
                        <div className="mb-4">
                            <label className="block text-gray-700">User Picture</label>
                            <input
                                type="file"
                                name="userPic"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full p-2 border rounded"
                            />
                            {imagePreviews.userPic && (
                                <button
                                    type="button"
                                    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded"
                                    onClick={() => handlePreviewOpen('userPic')}
                                >
                                    Preview
                                </button>
                            )}
                        </div>

                        {/* Aadhar Front */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Aadhar Front</label>
                            <input
                                type="file"
                                name="aadharFront"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full p-2 border rounded"
                            />
                            {imagePreviews.aadharFront && (
                                <button
                                    type="button"
                                    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded"
                                    onClick={() => handlePreviewOpen('aadharFront')}
                                >
                                    Preview
                                </button>
                            )}
                        </div>

                        {/* Aadhar Back */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Aadhar Back</label>
                            <input
                                type="file"
                                name="aadharBack"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full p-2 border rounded"
                            />
                            {imagePreviews.aadharBack && (
                                <button
                                    type="button"
                                    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded"
                                    onClick={() => handlePreviewOpen('aadharBack')}
                                >
                                    Preview
                                </button>
                            )}
                        </div>

                        {/* PAN Front */}
                        <div className="mb-4">
                            <label className="block text-gray-700">PAN Front</label>
                            <input
                                type="file"
                                name="panFront"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full p-2 border rounded"
                            />
                            {imagePreviews.panFront && (
                                <button
                                    type="button"
                                    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded"
                                    onClick={() => handlePreviewOpen('panFront')}
                                >
                                    Preview
                                </button>
                            )}
                        </div>

                        {/* Name */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={editData.name}
                                onChange={handleChange}
                                className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={editData.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                disabled
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={editData.phoneNumber}
                                onChange={handleChange}
                                className={`w-full p-2 border rounded ${errors.phoneNumber ? 'border-red-500' : ''}`}
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                        </div>

                        {/* Profession */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Profession</label>
                            <input
                                type="text"
                                name="profession"
                                value={editData.profession}
                                onChange={handleChange}
                                className={`w-full p-2 border rounded ${errors.profession ? 'border-red-500' : ''}`}
                            />
                            {errors.profession && <p className="text-red-500 text-xs mt-1">{errors.profession}</p>}
                        </div>

                        {/* Rate per Hour */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Rate per Hour</label>
                            <input
                                type="text"
                                name="rate_per_hour"
                                value={editData.rate_per_hour}
                                onChange={handleChange}
                                className={`w-full p-2 border rounded ${errors.rate_per_hour ? 'border-red-500' : ''}`}
                            />
                            {errors.rate_per_hour && <p className="text-red-500 text-xs mt-1">{errors.rate_per_hour}</p>}
                        </div>

                        {/* Interests */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Interests (comma separated)</label>
                            <input
                                type="text"
                                value={editData.interests.join(', ')}
                                onChange={handleInterestsChange}
                                className={`w-full p-2 border rounded ${errors.interests ? 'border-red-500' : ''}`}
                            />
                            {errors.interests && <p className="text-red-500 text-xs mt-1">{errors.interests}</p>}
                        </div>

                        {/* Available Times */}
                        <div className="mb-4">
                            <h3 className="text-gray-700">Available Times</h3>
                            {availableTimes.map((time, index) => (
                                <div key={index} className="flex items-center justify-between mb-2">
                                    <span>{`${time.day}: ${time.from} - ${time.to}`}</span>
                                    <button
                                        type="button"
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => removeTimeSlot(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    name="day"
                                    placeholder="Day"
                                    value={newTimeSlot.day}
                                    onChange={handleTimeSlotChange}
                                    className="p-2 border rounded flex-1"
                                />
                                <input
                                    type="time"
                                    name="from"
                                    value={newTimeSlot.from}
                                    onChange={handleTimeSlotChange}
                                    className="p-2 border rounded flex-1"
                                />
                                <input
                                    type="time"
                                    name="to"
                                    value={newTimeSlot.to}
                                    onChange={handleTimeSlotChange}
                                    className="p-2 border rounded flex-1"
                                />
                                <button
                                    type="button"
                                    onClick={addTimeSlot}
                                    className="bg-green-500 hover:bg-green-700 text-white py-1 px-4 rounded"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="mr-2 bg-gray-400 hover:bg-gray-600 text-white py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>

                {isPreviewOpen && (
                    <ImagePreviewModal
                        imageUrl={previewImageUrl}
                        onClose={handlePreviewClose}
                    />
                )}
            </div>
        </div>
    );
};

export default EditProfileModal;
