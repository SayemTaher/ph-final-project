import React from 'react';
import UseAuth from '../Custom/cutomAuth/UseAuth';

const UserHome = () => {
    const {user} = UseAuth()
    return (
        <div>
            Welcome to the Dashboard, {user?.displayName}

            
        </div>
    );
};

export default UserHome;