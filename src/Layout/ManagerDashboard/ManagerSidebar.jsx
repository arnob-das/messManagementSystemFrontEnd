import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTachometerAlt, faUserCheck, faMoneyCheckAlt, faFileInvoice, faUtensils, faHandHoldingUsd, faHistory, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const ManagerSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`bg-blue-900 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} md:w-64 flex-shrink-0`}>
            <button className="p-4 focus:outline-none md:hidden" onClick={toggleSidebar}>
                {isOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
            </button>
            <div className="mt-4 px-4">
                <h2 className="text-lg font-bold text-center md:text-left mb-4">Admin-Panel</h2>
            </div>
            <nav className={`mt-4 ${isOpen ? 'block' : 'hidden'} md:block`}>
                <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 flex items-center">
                    <FontAwesomeIcon icon={faHome} className="mr-3" /> Home
                </Link>
                <Link to="/manager-dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 flex items-center">
                    <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" /> Dashboard
                </Link>
                <Link to="approveUsers" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 flex items-center">
                    <FontAwesomeIcon icon={faUserCheck} className="mr-3" /> Approve Users
                </Link>
                <Link to="approveDeposits" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 flex items-center">
                    <FontAwesomeIcon icon={faMoneyCheckAlt} className="mr-3" /> Approve Deposits
                </Link>
                <Link to="assignBills" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 flex items-center">
                    <FontAwesomeIcon icon={faFileInvoice} className="mr-3" /> Assign Bills
                </Link>
                <Link to="viewMeal" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 flex items-center">
                    <FontAwesomeIcon icon={faUtensils} className="mr-3" /> View Meal
                </Link>
                <Link to="receiveBills" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 flex items-center">
                    <FontAwesomeIcon icon={faHandHoldingUsd} className="mr-3" /> Receive Bills
                </Link>
                <Link to="mess-paymentHistory" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 flex items-center">
                    <FontAwesomeIcon icon={faHistory} className="mr-3" /> Payment History
                </Link>
            </nav>
        </div>
    );
};

export default ManagerSidebar;
