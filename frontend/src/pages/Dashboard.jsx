import  { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';

const Dashboard = () => {

    const { user, setUser } = useContext(UserDataContext);

    return (
        <div className="dashboard-container p-6">
            <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
            <div className="user-info">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                <div className="info-group mb-4">
                    <strong>Full Name:</strong> {user.fullName.firstName + " " + user.fullName.lastName}
                </div>
                <div className="info-group mb-4">
                    <strong>Email:</strong> {user.email}
                </div>
                <div className="info-group mb-4">
                    <strong>Phone Number:</strong> {user.phoneNo}
                </div>
                <div className="info-group mb-4">
                    <strong>Date of Birth:</strong> {user.dob}
                </div>
                <div className="info-group mb-4">
                    <strong>Gender:</strong> {user.gender}
                </div>
                <div className="info-group mb-4">
                    <strong>Aadhar ID:</strong> {user.aadhar_id}
                </div>
              
                <div className="info-group mb-4">
                    <strong>Address:</strong> {user.address ? `${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.zip}, ${user.address.country}` : 'N/A'}
                </div>
                <div className="info-group mb-4">
                    <strong>Marital Status:</strong> {user.maritalStatus}
                </div>
                <div className="info-group mb-4">
                    <strong>Occupation:</strong> {user.occupation}
                </div>
                <div className="info-group mb-4">
                    <strong>Nationality:</strong> {user.nationality}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
