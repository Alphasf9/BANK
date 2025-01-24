import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {

    return (
        <div className='flex h-screen'>
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 p-5 overflow-auto">
                <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
