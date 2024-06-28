import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalMealCountForMess } from "../../../features/meal/mealCountSlice";
import { getTotalGroceryCost } from "../../../features/groceryCost/gorceryCostSlice";
import { getApprovedUsers, getTotalSeatRentForApprovedUsers } from "../../../features/mess/messSlice";
import { getTotalUtilityForMess } from "../../../features/utilityBill/utilityBillSclice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faHome, faListNumeric, faUtensils } from "@fortawesome/free-solid-svg-icons";
import MemberDetails from "../../../components/MemberDetails/MemberDetails";

const AdminPanel = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const [totalMealForMess, setTotalMealForMess] = useState(0);

    const [totalGroceryCost, setTotalGroceryCost] = useState(0);

    const [totalFlatRentForMess, setTotalFlatRentForMess] = useState(0);

    const [totalUtilityBillCost, setTotalUtilityBillCost] = useState(0);

    const [members, setMembers] = useState([]);

    const dispatch = useDispatch();

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

    // total meal for mess
    useEffect(() => {
        const fetchTotalMealForMess = async () => {
            const response = await dispatch(getTotalMealCountForMess({
                messId: user.user.currentMessId,
                month: selectedMonth,
                year: selectedYear
            }));
            setTotalMealForMess(response.payload.totalMeals || 0);
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

    // total flat rent mess
    useEffect(() => {
        const fetchTotalSeatRent = async () => {
            try {
                const response = await dispatch(getTotalSeatRentForApprovedUsers({
                    messId: user.user.currentMessId,
                }));
                console.log(response.payload);
                setTotalFlatRentForMess(response.payload.totalSeatRent || 0)
            } catch (error) {
                console.error('Failed to fetch total seat rent:', error.message);
            }
        };

        if (user.user.currentMessId) {
            fetchTotalSeatRent();
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
            setTotalUtilityBillCost(response.payload.totalUtilityCost || 0);
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
        <div className=" bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto  p-6 rounded-lg ">
                <p className="pt-5 pb-5 font-bold">Mess Id: {user?.user?.currentMessId}</p>
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
                <h2 className="font-bold text-2xl mt-5 mb-5">Mess Cost Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
                    <div className="card bg-green-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-green-700">
                                <FontAwesomeIcon icon={faHome} className="mr-2" />Total Flat Rent
                            </h2>
                            <p className="text-green-700">{totalFlatRentForMess} Taka</p>
                        </div>
                    </div>
                    <div className="card bg-blue-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-blue-700">
                                <FontAwesomeIcon icon={faBolt} className="mr-2" />Total Utility Bill
                            </h2>
                            <p className="text-blue-700">{totalUtilityBillCost} Taka</p>
                        </div>
                    </div>
                    <div className="card bg-yellow-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-yellow-700">
                                <FontAwesomeIcon icon={faListNumeric} className="mr-2" /> Total Meals
                            </h2>
                            <p className="text-yellow-700">{totalMealForMess}</p>
                        </div>
                    </div>
                    <div className="card bg-purple-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-yellow-700">
                                <FontAwesomeIcon icon={faListNumeric} className="mr-2" /> Total Grocery Cost
                            </h2>
                            <p className="text-yellow-700">{totalGroceryCost}</p>
                        </div>
                    </div>
                    <div className="card bg-yellow-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-yellow-700">
                                <FontAwesomeIcon icon={faUtensils} className="mr-2" /> Meal Rate
                            </h2>
                            <p className="text-yellow-700">{parseInt(totalGroceryCost / totalMealForMess) || 0} Taka</p>
                        </div>
                    </div>
                </div>
                <h2 className="font-bold text-2xl mt-5 mb-5">Individual Mess Members Cost</h2>
                <div>
                    {
                        members.map(member => (
                            <MemberDetails
                                key={member._id}
                                fullName={member.fullName}
                                userId={member._id}
                                messId={user.user.currentMessId}
                                selectedMonth={selectedMonth}
                                selectedYear={selectedYear}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;