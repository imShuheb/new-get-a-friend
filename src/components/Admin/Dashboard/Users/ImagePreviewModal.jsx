import React from 'react';

const ImagePreviewModal = ({ imageUrl, onClose }) => {
    if (!imageUrl) return null;

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-70 ">
            <div className="bg-white rounded-lg p-4 max-w-lg mx-auto">
                <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full  rounded h-[calc(100vh-15rem)]"
                />
                <button
                    onClick={onClose}
                    className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

export default ImagePreviewModal;
