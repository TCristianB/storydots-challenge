import React from 'react'

const Notification = ({ message }: { message: string}) => {
    return (
        <div>
            <p className="text-danger">{message}</p>
        </div>
    )
}

export default Notification