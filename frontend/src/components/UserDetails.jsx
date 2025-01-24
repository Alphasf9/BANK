import React, { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';

const UserDetails = () => {
    const { user } = useContext(UserDataContext); // Access user data

    return (
        <div className="p-5 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <p><strong>Full Name:</strong> {user.fullName.firstName} {user.fullName.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone Number:</strong> {user.phoneNo}</p>
            <p><strong>Date of Birth:</strong> {user.dob}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Address:</strong> {user.address.street}, {user.address.city}, {user.address.state}, {user.address.zip}, {user.address.country}</p>
            <p><strong>Marital Status:</strong> {user.maritalStatus}</p>
            <p><strong>Occupation:</strong> {user.occupation}</p>
            <p><strong>Nationality:</strong> {user.nationality}</p>
        </div>
    );
};

export default UserDetails;
