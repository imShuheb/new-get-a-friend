import React from 'react'
import { BounceLoader } from 'react-spinners'

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <BounceLoader />
        </div>
    )
}

export default Loading