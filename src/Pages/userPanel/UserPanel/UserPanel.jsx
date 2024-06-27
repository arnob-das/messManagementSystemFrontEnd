import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBolt, faUtensils, faMoneyBill, faWallet, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getMessById } from '../../../features/mess/messSlice';
import { getMeals } from '../../../features/meal/mealCountSlice';
import { getGroceryCost } from '../../../features/groceryCost/gorceryCostSlice';

const Dashboard = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

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

    const selectedMonthLabel = months.find(month => month.value === parseInt(selectedMonth))?.label || 'Unknown Month';


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
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="mr-4 mb-2 md:mb-0">
                            <h2 className="text-xl font-bold">Name: John Doe</h2>
                        </div>
                        <div className="mr-4 mb-2 md:mb-0">
                            <h2 className="text-xl font-bold">Mess Name: Sunshine Mess</h2>
                        </div>
                        <div className="mr-4 mb-2 md:mb-0">
                            <h2 className="text-xl font-bold">Total Mess Members: 10</h2>
                        </div>
                        <div className="text-right">
                            <h2 className="text-xl font-bold">{selectedMonthLabel} / {selectedYear}</h2>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="card bg-green-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-green-700">
                                <FontAwesomeIcon icon={faHome} className="mr-2" /> Flat Rent
                            </h2>
                            <p className="text-green-700">10000 Taka</p>
                        </div>
                    </div>
                    <div className="card bg-blue-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-blue-700">
                                <FontAwesomeIcon icon={faBolt} className="mr-2" /> Utility Bill
                            </h2>
                            <p className="text-blue-700">3000 Taka</p>
                        </div>
                    </div>
                    <div className="card bg-yellow-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-yellow-700">
                                <FontAwesomeIcon icon={faUtensils} className="mr-2" /> Meal Rate
                            </h2>
                            <p className="text-yellow-700">50 Taka</p>
                        </div>
                    </div>
                    <div className="card bg-red-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-red-700">
                                <FontAwesomeIcon icon={faMoneyBill} className="mr-2" /> Meal Cost
                            </h2>
                            <p className="text-red-700">1500 Taka</p>
                        </div>
                    </div>
                    <div className="card bg-purple-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-purple-700">
                                <FontAwesomeIcon icon={faWallet} className="mr-2" /> Meal Deposit
                            </h2>
                            <p className="text-purple-700">1500 Taka</p>
                        </div>
                    </div>
                    <div className="card bg-teal-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-teal-700">
                                <FontAwesomeIcon icon={faReceipt} className="mr-2" /> Total Payable
                            </h2>
                            <p className="text-teal-700">14500 Taka</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
