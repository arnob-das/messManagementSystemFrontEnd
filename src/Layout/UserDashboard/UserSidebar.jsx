import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`bg-gray-800 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} md:w-64 flex-shrink-0`}>
            <button className="p-4 focus:outline-none md:hidden" onClick={toggleSidebar}>
                {isOpen ? '✖️' : '☰'}
            </button>
            <div className="mt-4 px-4">
                <h2 className="text-lg font-bold text-center md:text-left mb-4">User-Panel</h2>
            </div>
            <nav className={`mt-4 ${isOpen ? 'block' : 'hidden'} md:block`}>
                <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                    Home
                </Link>
                <Link to="/user-dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                    Dashboard
                </Link>
                <Link to="joinAMess" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                    Join Mess
                </Link>
                <Link to="createAMess" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                    Create A Mess
                </Link>
                <Link to="addMeal" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                    Add Meal
                </Link>
                <Link to="addDeposit" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                    Add Deposit
                </Link>
                <Link to="messMembers" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                    Mess Members
                </Link>
                <Link to="payCost" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                    Pay Cost
                </Link>
                <Link to="user-paymentHistory" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                    Payment History
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
