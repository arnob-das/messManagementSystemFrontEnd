import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUtensils, faUsers, faSignInAlt, faUserPlus, faBars, faTimes, faShop, faHandHoldingDollar, faSignOut, faPerson } from '@fortawesome/free-solid-svg-icons';
import { leaveMessForUser } from '../../features/mess/messSlice';
import { toast } from 'react-toastify';
import { getUserById, logout } from '../../features/auth/authSlice';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    // console.log(user._id);

    // const fetchUser = async()=>{
    //     await dispatch(getUserById({ id: user._id }))
    // }

    // useEffect(()=>{
    //     if(isAuthenticated){
    //         fetchUser();
    //     }
    // },[dispatch])


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // const leaveMess = async () => {
    //     const result = await dispatch(leaveMessForUser({ userId: user._id, messId: user.currentMessId }));
    //     if (leaveMessForUser.fulfilled.match(result)) {
    //         toast.success("You have successfully left the mess");
    //         dispatch(logout())
    //     } else {
    //         toast.error("Failed to leave the mess");
    //     }
    // }

    const leaveMess = async () => {
        const result = await dispatch(leaveMessForUser({ userId: user._id, messId: user.currentMessId }));

        if (leaveMessForUser.fulfilled.match(result)) {
            toast.success("You have successfully left the mess");
            dispatch(logout());
        } else {
            toast.error(result.payload.message || "Failed to leave the mess");
        }
    };


    const handleLeaveMess = () => {
        setIsModalOpen(true);
    };

    const confirmLeaveMess = () => {
        setIsModalOpen(false);
        leaveMess();
    };

    const closeModal = () => {
        setIsModalOpen(false);
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

                {isAuthenticated && user.role === "user" && ((!user.approved && user.currentMessId == null) || (!user.approved && user.currentMessId != null)) ?
                    <>
                        {
                            user.currentMessId == null &&
                            <>
                                <Link to="joinAMess" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
                                    <FontAwesomeIcon icon={faSignInAlt} className="mr-3" /> Join Mess
                                </Link>
                                <Link to="createAMess" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
                                    <FontAwesomeIcon icon={faUserPlus} className="mr-3" /> Create A Mess
                                </Link>
                            </>
                        }
                    </>
                    :
                    <>
                        <Link to="/user-dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
                            <FontAwesomeIcon icon={faHome} className="mr-3" /> Dashboard
                        </Link>
                        {
                            user.role == "manager" &&
                            <Link to="/manager-dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
                                <FontAwesomeIcon icon={faPerson} className="mr-3" /> Manager Dashboard
                            </Link>
                        }
                        <Link to="meal" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
                            <FontAwesomeIcon icon={faUtensils} className="mr-3" /> Meal
                        </Link>
                        {/* <Link to="mealDeposit" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
                            <FontAwesomeIcon icon={faDollarSign} className="mr-3" /> Meal Deposit
                        </Link> */}
                        <Link to="addInventory" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
                            <FontAwesomeIcon icon={faShop} className="mr-3" /> Manage Grocery
                        </Link>
                        <Link to="utilityBill" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
                            <FontAwesomeIcon icon={faHandHoldingDollar} className="mr-3" /> Utility Bill
                        </Link>
                        <Link to="messMembers" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
                            <FontAwesomeIcon icon={faUsers} className="mr-3" /> Mess Members
                        </Link>
                        {/* <Link to="payCost" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
                            <FontAwesomeIcon icon={faMoneyBill} className="mr-3" /> Pay Cost
                        </Link>
                        <Link to="user-paymentHistory" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
                            <FontAwesomeIcon icon={faHistory} className="mr-3" /> Payment History
                        </Link> */}
                        <Link to="" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
                            <button className="" onClick={handleLeaveMess}>
                                <FontAwesomeIcon icon={faSignOut} className="mr-3" /> Leave Mess
                            </button>
                        </Link>
                    </>
                }
            </nav>
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-black">Confirm Leave Mess</h3>
                        <p className='text-black'>Are you sure you want to leave this mess?</p>
                        <div className="modal-action">
                            <button className="btn btn-error" onClick={confirmLeaveMess}>Leave</button>
                            <button className="btn" onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
