import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { isAuthenticated,user }  = useSelector((state) => state.auth);


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`bg-gray-800 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} md:w-64 flex-shrink-0`}>
            <button className="p-4 focus:outline-none md:hidden" onClick={toggleSidebar}>
                {isOpen ? '✖️' : '☰'}
            </button>
            <nav className={`mt-4 ${isOpen ? 'block' : 'hidden'} md:block`}>
                <div className="mt-4 px-4">
                    <h2 className="text-lg font-bold text-center md:text-left mb-4">User-Panel</h2>
                </div>
                <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                    Home
                </Link>
                {
                    isAuthenticated && user.role === "user" && !user.approved && user.currentMessId == null ?
                        <>
                            <Link to="joinAMess" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                                Join Mess
                            </Link>
                            <Link to="createAMess" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                                Create A Mess
                            </Link>
                        </>
                        :
                        <>
                            <Link to="meal" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                                Meal
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
                        </>
                }

            </nav>
        </div>
    );
};

export default Sidebar;
