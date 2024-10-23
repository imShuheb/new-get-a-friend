import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ImagePreviewModal from '../../Admin/Dashboard/Users/ImagePreviewModal';

const OnboardingForm = () => {
    const rawUser = localStorage.getItem('user');
    const user = rawUser ? JSON.parse(rawUser) : null;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        location: '',
        phoneNumber: '',
        profession: 'Software Engineer',
        description: '',
        interests: [],
    });

    const [files, setFiles] = useState({
        aadharFront: null,
        aadharBack: null,
        panFront: null,
        userPic: null,
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [imagePreview, setImagePreview] = useState(null); // State for showing image preview
    const [currentSlide, setCurrentSlide] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/${user.id}`);
                    setFormData({
                        ...response.data,
                        interests: response.data.interests || [],
                    });
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };

            fetchUserData();
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files: newFiles } = e.target;
        setFiles((prev) => ({
            ...prev,
            [name]: newFiles[0],
        }));
    };

    const handleImagePreview = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const errors = {};
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'name' && !value) errors.name = 'Name is required';
            if (key === 'email' && !value) errors.email = 'Email is required';
        });

        if (!files.aadharFront) errors.aadharFront = 'Aadhar Front is required';
        if (!files.aadharBack) errors.aadharBack = 'Aadhar Back is required';
        if (!files.panFront) errors.panFront = 'PAN Front is required';
        if (!files.userPic) errors.userPic = 'User Picture is required';

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
        setFormErrors({});

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            return;
        }

        const formDataToSend = new FormData();

        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        Object.keys(files).forEach((key) => {
            if (files[key]) {
                formDataToSend.append(key, files[key]);
            }
        });

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/users/upload/${user.id}`,
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            if (response.status === 200) {
                setSuccessMessage('User data uploaded successfully!');
                navigate(`/pending`);
            } else {
                setErrorMessage('Something went wrong');
            }
        } catch (error) {
            console.error('Error uploading data:', error);
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || 'Error uploading data. Please try again.');
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        }
    };

    const textFields = [
        { label: 'Name', name: 'name', type: 'text', required: true },
        { label: 'Email', name: 'email', type: 'email', required: true },
        { label: 'Location', name: 'location', type: 'text' },
        { label: 'Phone Number', name: 'phoneNumber', type: 'text' },
        { label: 'Profession', name: 'profession', type: 'select', options: ['Software Engineer', 'Designer', 'Marketer', 'Other'] },
        { label: 'Description', name: 'description', type: 'textarea' },
        {
            label: 'Interests (comma separated)',
            name: 'interests',
            type: 'text',
            value: Array.isArray(formData.interests) ? formData.interests.join(', ') : '',
            onChange: (e) => handleChange({
                target: {
                    name: 'interests',
                    value: e.target.value.split(',').map(interest => interest.trim()), 
                }
            }),
        }

    ];

    const fileInputs = [
        { label: 'Upload Aadhar Front', name: 'aadharFront', required: true },
        { label: 'Upload Aadhar Back', name: 'aadharBack', required: true },
        { label: 'Upload PAN Front', name: 'panFront', required: true },
        { label: 'Upload Profile Picture', name: 'userPic', required: true },
    ];

    return (
        <div className='bg-gray-200 flex justify-center items-center h-[calc(100vh-4rem)]'>
            <div className="bg-gray-900 text-white p-10 rounded-lg shadow-lg max-w-3xl mx-auto ">
                <h2 className="text-3xl font-bold  text-center">Onboarding Form</h2>

                {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

                <Carousel showThumbs={false} infiniteLoop={false} showStatus={false} onChange={(index) => setCurrentSlide(index)} >
                    {/* First Slide */}
                    <div className='text-start '>
                        {textFields.slice(0, 4).map((field) => {
                            return (
                                <div key={field.name} className='my-8 px-10'>
                                    <label className="block text-sm font-medium mb-1">{field.label}</label>
                                    {formErrors[field.name] && <span className="text-red-500 text-sm">{formErrors[field.name]}</span>}
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={field.value || formData[field.name]}
                                        disabled={field.name === 'email'}
                                        onChange={field.onChange || handleChange}
                                        className="block w-full bg-gray-800 text-white p-3 rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed"
                                        placeholder={field.name}
                                    />
                                </div>
                            )
                        })}
                    </div>

                    {/* Second Slide */}
                    <div className='text-start'>
                        {textFields.slice(4).map((field) => (
                            <div key={field.name} className='my-8 px-10'>
                                <label className="block text-sm font-medium mb-1">{field.label}</label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={field.value || formData[field.name]}
                                    onChange={handleChange}
                                    className="block w-full bg-gray-800 text-white p-3 rounded-lg"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Third Slide for file uploads */}
                    <div className='text-start'>
                        {fileInputs.map((file) => (
                            <div key={file.name} className='pl-10 my-5 flex items-center justify-center gap-5'>
                                <div className='w-full'>
                                    <label className="block text-sm font-medium mb-1">{file.label}</label>
                                    {formErrors[file.name] && <span className="text-red-500 text-sm">{formErrors[file.name]}</span>}

                                    <input
                                        type="file"
                                        name={file.name}
                                        onChange={handleFileChange}
                                        className="block w-full bg-gray-800 text-white p-3 rounded-lg"
                                    />
                                </div>
                                {files[file.name] &&
                                    <div className='flex items-center'>
                                        <button
                                            type="button"
                                            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded"
                                            onClick={() => handleImagePreview(files[file.name])}
                                        >
                                            Preview
                                        </button>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                </Carousel>

                {imagePreview && (
                    <ImagePreviewModal
                        imageUrl={imagePreview}
                        onClose={() => setImagePreview(null)}
                    />
                )}

                {currentSlide === 2 && (
                    <button
                        type="submit"
                        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-medium shadow-lg transition duration-300 ease-in-out w-full"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
};

export default OnboardingForm;
