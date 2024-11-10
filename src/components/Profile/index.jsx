import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../utils/Loading';
import ProfielView from './ProfielView';
import Bookview from './Bookview';
import { ImProfile } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";
import { CiEdit } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import EditProfileModal from './EditProfileModal'; // Import the modal component

const Profile = () => {
    const rawUser = localStorage.getItem('user');
    const user = rawUser ? JSON.parse(rawUser) : null;

    const [formData, setFormData] = useState({
        aadharBack: '',
        aadharFront: '',
        panFront: '',
        userPic: '',
        name: '',
        email: '',
        profession: '',
        interests: [],
        available_to_hang: '',
        rate_per_hour: 0,
        description: '',
        location: '',
        phoneNumber: '',
        available_times: {}
    });

    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const fetchUserData = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/${user.id}`);
                    setFormData({
                        ...response.data,
                        interests: response.data.interests || [],
                    });
                } catch (error) {
                    console.error('Error fetching user data:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchUserData();
        }
    }, []);

    if (formData.status !== 'active') {
        navigate('/pending');
    }

    if (loading) return <Loading />;

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    return (
        <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
            <div className="mt-20 md:mt-0 w-[80rem] h-[550px] mx-auto p-6 bg-white rounded-lg shadow md:flex md:flex-row flex-col">
                {/* User Information and Image */}
                <div className="w-2/6 flex flex-col items-center justify-center gap-5">
                    {formData.userPic && (
                        <img
                            src={formData.userPic}
                            alt="User Pic"
                            className="w-44 h-44 rounded-full border-2 border-gray-300 text-center"
                        />
                    )}
                    <div className='flex flex-col justify-center items-center gap-1'>
                        <h2 className="text-2xl font-bold text-center capitalize">{formData.name}</h2>
                        <p className="text-base text-gray-600 font-semibold">{formData?.email || "N/A"}</p>
                        <p className="text-sm text-gray-600 font-semibold">{formData?.phoneNumber || "N/A"}</p>
                        <p className="text-sm text-gray-600 font-semibold">{formData?.profession || "N/A"}</p>

                    </div>
                </div>

                {/* Tabbed Content */}
                <div className="flex justify-between items-center col-span-8 mt-6 space-y-4 w-full mx-10">
                    {/* Conditionally Render Views */}
                    {activeTab === 'profile' && <ProfielView formData={formData} />}
                    {activeTab === 'bookings' && <Bookview data={formData} />}
                </div>

                {/* Sidebar for Tabs */}
                <div>
                    <div className="flex flex-col gap-4 mb-4 ">
                        <button
                            className={`px-4 py-2 rounded w-fit ${activeTab === 'profile' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            <ImProfile />
                        </button>
                        <button
                            className={`px-4 py-2 rounded w-fit ${activeTab === 'bookings' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setActiveTab('bookings')}
                        >
                            <IoBookSharp />
                        </button>
                        <button
                            className={`px-4 py-2 rounded w-fit ${isModalOpen ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={openModal} // Open modal on click
                        >
                            <CiEdit />
                        </button>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <EditProfileModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                formData={formData}
                setFormData={setFormData}
            />
        </div>
    );
};

export default Profile;
