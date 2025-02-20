import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBolt, faUtensils, faMoneyBill, faWallet, faReceipt, faListNumeric } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getApprovedUsers, getMessById, getSeatRentForSingleMember } from '../../../features/mess/messSlice';
import { getMeals, getTotalMealCountForMess, getTotalMealCountForUser } from '../../../features/meal/mealCountSlice';
import { getGroceryCost, getTotalGroceryCost, getTotalGroceryCostForUser } from '../../../features/groceryCost/gorceryCostSlice';
import { getTotalUtilityForMess } from '../../../features/utilityBill/utilityBillSclice';

const Dashboard = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const [members, setMembers] = useState([]);
    const [roomRent, setRoomRent] = useState(0);
    const [totalMealForUser, setTotalMealForUser] = useState(0);
    const [totalMealForMess, setTotalMealForMess] = useState(0);
    const [totalGroceryCost, setTotalGroceryCost] = useState(0);
    const [totalGroceryCostForUser, setTotalGroceryCostForUser] = useState(0);
    const [totalUtilityBillCost, setTotalUtilityBillCost] = useState(0);


    const months = [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
        { value: 4, label: 'April' },
        { value: 5, label: 'May' },
        { value: 6, label: 'June' },
        { value: 7, label: 'July' },
        { value: 8, label: 'August' },
        { value: 9, label: 'September' },
        { value: 10, label: 'October' },
        { value: 11, label: 'November' },
        { value: 12, label: 'December' },
    ];

    const user = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        if (user.user.currentMessId) {
            dispatch(getMessById({ id: user.user.currentMessId }));
            dispatch(getMeals({ userId: user.user._id, month: currentMonth, year: currentYear, currentMessId: user.user.currentMessId }));
            dispatch(getGroceryCost({ messId: user.user.currentMessId, month: currentMonth, year: currentYear }));
        }
    }, [currentMonth, currentYear, dispatch, user.user._id, user.user.currentMessId]);

    // roomRent
    useEffect(() => {
        const fetchRoomRent = async () => {
            const response = await dispatch(getSeatRentForSingleMember({
                messId: user.user.currentMessId,
                userId: user.user._id
            }));
            setRoomRent(response.payload?.seatRent ?? 0);
        };

        if (user.user.currentMessId) {
            fetchRoomRent();
        }
    }, [dispatch, user.user.currentMessId, user.user._id, selectedMonth, selectedYear]);

    // total meal for user
    useEffect(() => {
        const fetChTotalMealForUser = async () => {
            const response = await dispatch(getTotalMealCountForUser({
                messId: user.user.currentMessId,
                userId: user.user._id,
                month: selectedMonth,
                year: selectedYear
            }));
            setTotalMealForUser(response.payload?.totalMeals ?? 0);
        };

        if (user.user.currentMessId) {
            fetChTotalMealForUser();
        }
    }, [dispatch, user.user.currentMessId, user.user._id, selectedMonth, selectedYear]);

    // total meal for mess
    useEffect(() => {
        const fetchTotalMealForMess = async () => {
            const response = await dispatch(getTotalMealCountForMess({
                messId: user.user.currentMessId,
                month: selectedMonth,
                year: selectedYear
            }));
            setTotalMealForMess(response.payload?.totalMeals ?? 0);
        };

        if (user.user.currentMessId) {
            fetchTotalMealForMess();
        }
    }, [dispatch, user.user.currentMessId, user.user._id, selectedMonth, selectedYear]);

    // total grocery cost for mess
    useEffect(() => {
        const fetchTotalGroceryCostForMess = async () => {
            const response = await dispatch(getTotalGroceryCost({
                messId: user.user.currentMessId,
                month: selectedMonth,
                year: selectedYear
            }));
            setTotalGroceryCost(response.payload?.totalCost ?? 0);
        };

        if (user.user.currentMessId) {
            fetchTotalGroceryCostForMess();
        }
    }, [dispatch, user.user.currentMessId, user.user._id, selectedMonth, selectedYear]);

    // total grocery cost by user
    useEffect(() => {
        const fetchTotalGroceryCostForUser = async () => {
            const response = await dispatch(getTotalGroceryCostForUser({
                messId: user.user.currentMessId,
                month: selectedMonth,
                year: selectedYear,
                userId: user.user._id
            }));
            setTotalGroceryCostForUser(response.payload?.totalCost ?? 0);
        };

        if (user.user.currentMessId) {
            fetchTotalGroceryCostForUser();
        }
    }, [dispatch, user.user.currentMessId, user.user._id, selectedMonth, selectedYear]);

    // total utility bill for mess
    useEffect(() => {
        const fetchTotalUtilityBillCost = async () => {
            const response = await dispatch(getTotalUtilityForMess({
                messId: user.user.currentMessId,
                month: selectedMonth,
                year: selectedYear,
            }));
            setTotalUtilityBillCost(response.payload?.totalUtilityCost ?? 0);
        };

        if (user.user.currentMessId) {
            fetchTotalUtilityBillCost();
        }
    }, [dispatch, user.user.currentMessId, user.user._id, selectedMonth, selectedYear]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await dispatch(getApprovedUsers({ messId: user.user.currentMessId }));
                setMembers(response.payload);
            } catch (error) {
                console.log(error);
            }
        }

        fetchMembers();
    }, [dispatch, user.user.currentMessId, user.user._id, selectedMonth, selectedYear]);


    return (
        <div className="min-h-screen bg-gray-100 p-4">
            {/* user is not approved and user has not a current mess id */}
            {
                (user.user.approved != true && user.user.currentMessId == null) &&
                <div role="alert" className="alert alert-error">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>You have not joined in a mess.</span>
                </div>
            }

            {/* user is not approved but user has a current mess id */}
            {
                (user.user.approved != true && user.user.currentMessId) &&
                <div role="alert" className="alert alert-warning">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Please wait for manager's approval.</span>
                </div>
            }

            <div className="max-w-7xl mx-auto  p-6 rounded-lg ">
                {/* user is approved and user has a current mess id */}
                {
                    user.user.approved == true &&
                    <>
                        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                            <div className="flex flex-col md:flex-row items-center w-full">
                                <div className="mr-4 mb-2 md:mb-0 w-full md:w-auto">
                                    <label className="block text-sm font-medium text-gray-700">Month</label>
                                    <select
                                        className="select select-bordered w-full"
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(e.target.value)}
                                    >
                                        {months.map((month) => (
                                            <option key={month.value} value={month.value}>
                                                {month.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mr-4 mb-2 md:mb-0 w-full md:w-auto">
                                    <label className="block text-sm font-medium text-gray-700">Year</label>
                                    <select
                                        className="select select-bordered w-full"
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                    >
                                        {[2023, 2024, 2025].map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="card bg-green-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-green-700">
                                        <FontAwesomeIcon icon={faHome} className="mr-2" /> Room Rent
                                    </h2>
                                    <p className="text-green-700">{roomRent} Taka</p>
                                </div>
                            </div>
                            <div className="card bg-blue-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-blue-700">
                                        <FontAwesomeIcon icon={faBolt} className="mr-2" /> Utility Bill
                                    </h2>
                                    <p className="text-blue-700">{members?.length ? parseInt(totalUtilityBillCost / members.length) : 0} Taka</p>
                                </div>
                            </div>
                            <div className="card bg-yellow-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-yellow-700">
                                        <FontAwesomeIcon icon={faUtensils} className="mr-2" /> Meal Rate
                                    </h2>
                                    <p className="text-yellow-700">{totalMealForMess ? parseInt(totalGroceryCost / totalMealForMess) : 0} Taka</p>
                                </div>
                            </div>
                            <div className="card bg-yellow-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-yellow-700">
                                        <FontAwesomeIcon icon={faListNumeric} className="mr-2" /> Total Meals
                                    </h2>
                                    <p className="text-yellow-700">{totalMealForUser || 0}</p>
                                </div>
                            </div>
                            <div className="card bg-red-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-red-700">
                                        <FontAwesomeIcon icon={faMoneyBill} className="mr-2" /> Meal Cost
                                    </h2>
                                    <p className="text-red-700">{parseInt(totalMealForUser * (totalGroceryCost / totalMealForMess)) || 0} Taka</p>
                                </div>
                            </div>
                            <div className="card bg-purple-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-purple-700">
                                        <FontAwesomeIcon icon={faWallet} className="mr-2" /> Grocery Cost By You
                                    </h2>
                                    <p className="text-purple-700">{totalGroceryCostForUser} Taka</p>
                                </div>
                            </div>
                            <div className="card bg-teal-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-teal-700">
                                        <FontAwesomeIcon icon={faReceipt} className="mr-2" /> Total Payable
                                    </h2>
                                    <p className="text-teal-700">{
                                        parseInt(
                                            roomRent +
                                            (members?.length ? totalUtilityBillCost / members?.length : 0) +
                                            (totalMealForMess ? totalMealForUser * (totalGroceryCost / totalMealForMess) : 0) -
                                            totalGroceryCostForUser
                                        )
                                    } Taka</p>

                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default Dashboard;
