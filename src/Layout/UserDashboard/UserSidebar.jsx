import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUtensils, faDollarSign, faUsers, faMoneyBill, faHistory, faSignInAlt, faUserPlus, faBars, faTimes, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`bg-gray-800 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} md:w-64 flex-shrink-0`}>
            <button className="p-4 focus:outline-none md:hidden" onClick={toggleSidebar}>
                {isOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
            </button>
            <nav className={`mt-4 ${isOpen ? 'block' : 'hidden'} md:block`}>
                <div className="mt-4 px-4">
                    <h2 className="text-lg font-bold text-center md:text-left mb-4">User-Panel</h2>
                </div>
                <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
                    <FontAwesomeIcon icon={faHome} className="mr-3" /> Home
                </Link>

                {
                    isAuthenticated && user.role === "user" && !user.approved && user.currentMessId == null ?
                        <>
                            <Link to="joinAMess" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
                                <FontAwesomeIcon icon={faSignInAlt} className="mr-3" /> Join Mess
                            </Link>
                            <Link to="createAMess" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
                                <FontAwesomeIcon icon={faUserPlus} className="mr-3" /> Create A Mess
                            </Link>
                        </>
                        :
                        <>
                            <Link to="/user-dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
                                <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" /> Dashboard
                            </Link>
                            <Link to="meal" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
                                <FontAwesomeIcon icon={faUtensils} className="mr-3" /> Meal
                            </Link>
                            <Link to="mealDeposit" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
                                <FontAwesomeIcon icon={faDollarSign} className="mr-3" /> Meal Deposit
                            </Link>
                            <Link to="mealDeposit" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
                                <FontAwesomeIcon icon={faDollarSign} className="mr-3" /> Meal Deposit
                            </Link>
                            <Link to="addInventory" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
                                <FontAwesomeIcon icon={faUsers} className="mr-3" /> Manage Grocery
                            </Link>
                            <Link to="payCost" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
                                <FontAwesomeIcon icon={faMoneyBill} className="mr-3" /> Pay Cost
                            </Link>
                            <Link to="user-paymentHistory" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
                                <FontAwesomeIcon icon={faHistory} className="mr-3" /> Payment History
                            </Link>
                        </>
                }
            </nav>
        </div>
    );
};

export default Sidebar;
