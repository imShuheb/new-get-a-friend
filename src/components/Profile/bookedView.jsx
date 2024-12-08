import React from 'react';

const BookedBy = ({ data }) => {
    console.log(data)

    return (
        <div className="bg-gray-50 px-4 h-full overflow-y-auto w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Booked By</h2>

        </div>
    );
};

export default BookedBy;
