import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true); // State to toggle sidebar

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const menuItems = [
        { name: "User Details", icon: "fa-solid fa-user", path: "/dashboard/user-details" },
        { name: "Account Details", icon: "fa-solid fa-file-invoice", path: "/dashboard/account-details" },
        { name: "Cards", icon: "fa-solid fa-credit-card", path: "/dashboard/cards" },
        { name: "Transactions", icon: "fa-solid fa-money-check-dollar", path: "/dashboard/transactions" },
        { name: "Loans", icon: "fa-solid fa-building-columns", path: "/dashboard/loans" },
        { name: "Bank Statements", icon: "fa-solid fa-file-alt", path: "/dashboard/bank-statements" },
    ];

    return (
        <div className={`h-screen mt-1 bg-blue-500 text-white ${isOpen ? "w-64" : "w-20"} duration-300`}>
            {/* Toggle Button */}
            <button onClick={toggleSidebar} className="p-3 focus:outline-none">
                <i className={`fa-solid ${isOpen ? "fa-angle-left" : "fa-angle-right"}`}></i>
            </button>

            {/* Menu Items */}
            <ul className="mt-7 space-y-4">
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => navigate(item.path)}
                        className="flex items-center gap-4 p-3 cursor-pointer hover:bg-blue-600 rounded"
                    >
                        <i className={`${item.icon} text-lg`}></i>
                        {isOpen && <span>{item.name}</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
