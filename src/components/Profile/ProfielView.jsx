import { useCallback, useState } from "react";
import ImagePreviewModal from "../Admin/Dashboard/Users/ImagePreviewModal";

const ProfielView = ({ formData }) => {
    const [imagePreview, setImagePreview] = useState(null);

    const openImageModal = useCallback((imageUrl) => {
        setImagePreview(imageUrl);
    }, []);

    return (
        <div className="space-y-4">
            {/* Available to Hang */}
            <div className="flex items-center gap-5">
                <p className="text-gray-600 font-semibold">Available to Hang:</p>
                <p>{formData.available_to_hang ? "Yes" : "No"}</p>
            </div>

            {/* Rate per Hour */}
            <div className="flex items-center gap-5">
                <p className="text-gray-600 font-semibold">Rate per Hour:</p>
                <p>{formData.rate_per_hour ? `$${formData.rate_per_hour}` : "N/A"}</p>
            </div>

            {/* Description */}
            <div className="flex items-center gap-5">
                <p className="text-gray-600 font-semibold">Description:</p>
                <p>{formData.description || "N/A"}</p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-5">
                <p className="text-gray-600 font-semibold">Location:</p>
                <p>{formData.location || "N/A"}</p>
            </div>

            {/* Profession */}
            <div className="flex items-center gap-5">
                <p className="text-gray-600 font-semibold">Profession:</p>
                <p>{formData.profession || "N/A"}</p>
            </div>

            {/* Interests */}
            <div className="flex items-center gap-5">
                <p className="text-gray-600 font-semibold">Interests:</p>
                <p>{formData.interests.length ? formData.interests.join(', ') : "N/A"}</p>
            </div>

            {/* Phone Number */}
            <div className="flex items-center gap-5">
                <p className="text-gray-600 font-semibold">Phone Number:</p>
                <p>{formData.phoneNumber || "N/A"}</p>
            </div>

            {/* Email */}
            <div className="flex items-center gap-5">
                <p className="text-gray-600 font-semibold">Email:</p>
                <p>{formData.email || "N/A"}</p>
            </div>

            {/* Document Previews */}
            <div className="md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 space-y-5">

                <div className='flex w-[600px] justify-start gap-5 '>
                    Aadhar Card:
                    {formData.aadharFront && (
                        <button
                            onClick={() => openImageModal(formData.aadharFront)}
                            className="text-sm text-blue-500 underline"
                        >
                            Preview Aadhar Front
                        </button>
                    )}
                    {formData.aadharBack && (
                        <button
                            onClick={() => openImageModal(formData.aadharBack)}
                            className="text-sm text-blue-500 underline"
                        >
                            Preview Aadhar Back
                        </button>
                    )}
                </div>

                <div className='flex w-[600px] justify-start gap-5 '>
                    Pan Card:
                    {formData.panFront && (
                        <button
                            onClick={() => openImageModal(formData.panFront)}
                            className="text-sm text-blue-500 underline"
                        >
                            Preview PAN Front
                        </button>
                    )}
                </div>
            </div>
            {imagePreview && (
                <ImagePreviewModal
                    imageUrl={imagePreview}
                    onClose={() => setImagePreview(null)}
                />
            )}
        </div>
    );
};

export default ProfielView;
