import React, { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';

const UserDetails = () => {
    const { user } = useContext(UserDataContext); // Access user data

    return (
        <div className="p-8 bg-gray-50 rounded-lg shadow-md max-w-3xl mx-auto mt-8">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6 border-b-2 border-blue-200 pb-2">
                User Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <div className="flex flex-col items-start">
                    <p className="text-sm text-gray-500 mb-2">Photo</p>
                    <img
                        src={user.photo}
                        alt="User"
                        className="w-24 h-24 rounded-full border border-gray-300 shadow-sm object-cover"
                    />
                </div>

                <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="text-lg font-medium">{user.fullName.firstName} {user.fullName.lastName}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-lg font-medium">{user.email}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="text-lg font-medium">{user.phoneNo}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="text-lg font-medium">{user.dob}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="text-lg font-medium">{user.gender}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Marital Status</p>
                    <p className="text-lg font-medium">{user.maritalStatus}</p>
                </div>
                <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-lg font-medium">
                        {user.address.street}, {user.address.city}, {user.address.state}, {user.address.zip}, {user.address.country}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Occupation</p>
                    <p className="text-lg font-medium">{user.occupation}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Nationality</p>
                    <p className="text-lg font-medium">{user.nationality}</p>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
