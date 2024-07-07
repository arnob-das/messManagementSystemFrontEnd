import React, { useEffect, useState } from 'react';
import { faBolt, faHome, faListNumeric, faMoneyBill, faReceipt, faUtensils, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { getApprovedUsers, getSeatRentForSingleMember } from '../../features/mess/messSlice';
import { getTotalMealCountForMess, getTotalMealCountForUser } from '../../features/meal/mealCountSlice';
import { getTotalGroceryCost, getTotalGroceryCostForUser } from '../../features/groceryCost/gorceryCostSlice';
import { getTotalUtilityForMess } from '../../features/utilityBill/utilityBillSclice';



const MemberDetails = ({ fullName, userId, messId, selectedMonth, selectedYear }) => {

    console.log(fullName)
    console.log(userId)
    console.log(messId)
    console.log(selectedMonth)
    console.log(selectedYear)
    
    const [roomRent, setRoomRent] = useState(0);

    const [totalMealForUser, setTotalMealForUser] = useState(0);
    const [totalMealForMess, setTotalMealForMess] = useState(0);

    const [totalGroceryCost, setTotalGroceryCost] = useState(0);
    const [totalGroceryCostForUser, setTotalGroceryCostForUser] = useState(0);

    const [totalUtilityBillCost, setTotalUtilityBillCost] = useState(0);

    const [members, setMembers] = useState([]);

    const dispatch = useDispatch();

    // roomRent
    useEffect(() => {
        const fetchRoomRent = async () => {
            const response = await dispatch(getSeatRentForSingleMember({
                messId: messId,
                userId: userId
            }));
            setRoomRent(response.payload?.seatRent ?? 0);
        };

        if (messId) {
            fetchRoomRent();
        }
    }, [dispatch, messId, userId, selectedMonth, selectedYear]);

    // total meal for user
    useEffect(() => {
        const fetChTotalMealForUser = async () => {
            const response = await dispatch(getTotalMealCountForUser({
                messId: messId,
                userId: userId,
                month: selectedMonth,
                year: selectedYear
            }));
            setTotalMealForUser(response.payload?.totalMeals ?? 0);
        };

        if (messId) {
            fetChTotalMealForUser();
        }
    }, [dispatch, messId, userId, selectedMonth, selectedYear]);

    // total meal for mess
    useEffect(() => {
        const fetchTotalMealForMess = async () => {
            const response = await dispatch(getTotalMealCountForMess({
                messId: messId,
                month: selectedMonth,
                year: selectedYear
            }));
            setTotalMealForMess(response.payload?.totalMeals ?? 0);
        };

        if (messId) {
            fetchTotalMealForMess();
        }
    }, [dispatch, messId, userId, selectedMonth, selectedYear]);

    // total grocery cost for mess
    useEffect(() => {
        const fetchTotalGroceryCostForMess = async () => {
            const response = await dispatch(getTotalGroceryCost({
                messId: messId,
                month: selectedMonth,
                year: selectedYear
            }));
            setTotalGroceryCost(response.payload?.totalCost ?? 0);
        };

        if (messId) {
            fetchTotalGroceryCostForMess();
        }
    }, [dispatch, messId, userId, selectedMonth, selectedYear]);

    // total grocery cost by user
    useEffect(() => {
        const fetchTotalGroceryCostForUser = async () => {
            const response = await dispatch(getTotalGroceryCostForUser({
                messId: messId,
                month: selectedMonth,
                year: selectedYear,
                userId: userId
            }));
            setTotalGroceryCostForUser(response.payload?.totalCost ?? 0);
        };

        if (messId) {
            fetchTotalGroceryCostForUser();
            console.log(totalGroceryCostForUser);
        }
    }, [dispatch, messId, userId, selectedMonth, selectedYear]);

    // total utility bill for mess
    useEffect(() => {
        const fetchTotalUtilityBillCost = async () => {
            const response = await dispatch(getTotalUtilityForMess({
                messId: messId,
                month: selectedMonth,
                year: selectedYear,
            }));
            setTotalUtilityBillCost(response.payload?.totalUtilityCost ?? 0);
        };

        if (messId) {
            fetchTotalUtilityBillCost();
            console.log(totalUtilityBillCost);
        }
    }, [dispatch, messId, userId, selectedMonth, selectedYear]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await dispatch(getApprovedUsers({ messId: messId }));
                setMembers(response.payload);
            } catch (error) {
                console.log(error);
            }
        }

        fetchMembers();
    }, [dispatch, messId, userId, selectedMonth, selectedYear]);

    console.log(members)


    return (
        <div className=" mt-5 mb-5">
            <div className='bg-white pt-2 pb-2 rounded mt-10 mb-2'>
                <h2 className='text-xl font-bold'>{fullName}</h2>
            </div>
            <div className="max-w-7xl mx-autorounded-lg ">
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
                            <p className="text-blue-700">{parseInt(totalUtilityBillCost / members.length)} Taka</p>
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
                                    ((totalUtilityBillCost / members.length) || 0) +
                                    ((totalMealForUser * (totalGroceryCost / totalMealForMess)) || 0) -
                                    (totalGroceryCostForUser || 0)
                                )

                            } Taka</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberDetails;