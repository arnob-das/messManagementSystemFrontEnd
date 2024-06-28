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

    const [roomRent, setRoomRent] = useState(0);

    const [totalMealForUser, setTotalMealForUser] = useState(0);
    const [totalMealForMess, setTotalMealForMess] = useState(0);

    const [totalGroceryCost, setTotalGroceryCost] = useState(0);
    const [totalGroceryCostForUser, setTotalGroceryCostForUser] = useState(0);

    const [totalUtilityBillCost, setTotalUtilityBillCost] = useState(0);

    const [members, setMembers] = useState([]);


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
    const mess = useSelector((state) => state.mess);
    const groceryCost = useSelector((state) => state.groceryCosts.groceryCost);

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
            setRoomRent(response.payload.seatRent);
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
            setTotalMealForUser(response.payload.totalMeals);
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
            setTotalMealForMess(response.payload.totalMeals);
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
            setTotalGroceryCost(response.payload.totalCost || 0);
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
            setTotalGroceryCostForUser(response.payload.totalCost);
        };

        if (user.user.currentMessId) {
            fetchTotalGroceryCostForUser();
            console.log(totalGroceryCostForUser);
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
            setTotalUtilityBillCost(response.payload.totalUtilityCost);
        };

        if (user.user.currentMessId) {
            fetchTotalUtilityBillCost();
            console.log(totalUtilityBillCost);
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
            <div className="max-w-7xl mx-auto  p-6 rounded-lg ">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="mr-4 mb-2 md:mb-0">
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
                        <div className="mr-4 mb-2 md:mb-0">
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
                {
                    user.user.approved
                        ?
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="card bg-green-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-green-700">
                                        <FontAwesomeIcon icon={faHome} className="mr-2" /> Room Rent
                                    </h2>
                                    <p className="text-green-700">+ {roomRent} Taka</p>
                                </div>
                            </div>
                            <div className="card bg-blue-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-blue-700">
                                        <FontAwesomeIcon icon={faBolt} className="mr-2" /> Utility Bill
                                    </h2>
                                    <p className="text-blue-700">+ {parseInt(totalUtilityBillCost / members.length)} Taka</p>
                                </div>
                            </div>
                            <div className="card bg-yellow-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-yellow-700">
                                        <FontAwesomeIcon icon={faUtensils} className="mr-2" /> Meal Rate
                                    </h2>
                                    <p className="text-yellow-700">{parseInt(totalGroceryCost / totalMealForMess)} Taka</p>
                                </div>
                            </div>
                            <div className="card bg-yellow-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-yellow-700">
                                        <FontAwesomeIcon icon={faListNumeric} className="mr-2" /> Total Meals
                                    </h2>
                                    <p className="text-yellow-700">{totalMealForUser}</p>
                                </div>
                            </div>
                            <div className="card bg-red-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-red-700">
                                        <FontAwesomeIcon icon={faMoneyBill} className="mr-2" /> Meal Cost
                                    </h2>
                                    <p className="text-red-700">+ {parseInt(totalMealForUser * (totalGroceryCost / totalMealForMess))} Taka</p>
                                </div>
                            </div>
                            <div className="card bg-purple-100 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title text-purple-700">
                                        <FontAwesomeIcon icon={faWallet} className="mr-2" /> Grocery Cost By You
                                    </h2>
                                    <p className="text-purple-700">- {totalGroceryCostForUser} Taka</p>
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
                                            (totalUtilityBillCost / members.length) +
                                            (totalMealForUser * (totalGroceryCost / totalMealForMess)) -
                                            totalGroceryCostForUser
                                        )

                                    } Taka</p>
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            <p>Wait for approval to see dashboard</p>
                        </div>
                }
            </div>
        </div>
    );
};

export default Dashboard;
