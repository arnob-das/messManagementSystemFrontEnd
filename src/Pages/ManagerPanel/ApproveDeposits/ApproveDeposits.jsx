import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessMealDeposits, editMealDepositStatus } from "../../../features/meal/mealDepositSlice";
import { toast } from "react-toastify";

const ApproveDeposits = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const mealDeposit = useSelector((state) => state.mealDeposit.mealDeposit);

    const [selectedDepositId, setSelectedDepositId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);

    useEffect(() => {
        if (user && user._id && user.currentMessId) {
            dispatch(getMessMealDeposits({ currentMessId: user.currentMessId, date: new Date() }));
        }
    }, [user, dispatch]);

    const deposits = mealDeposit.deposits?.filter((deposit) => deposit.status !== "approved");

    const handleSubmitStatusChange = async () => {
        if (selectedDepositId && selectedStatus) {
            const resultAction = await dispatch(editMealDepositStatus({ depositId: selectedDepositId, status: selectedStatus }));
            if (editMealDepositStatus.fulfilled.match(resultAction)) {
                toast.success("Updated Successfully");
            }
            setSelectedDepositId(null);
            setSelectedStatus(null);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mt-8 mb-4 text-center">Approve Meal Deposits</h2>
            <div className="overflow-x-auto">
                <table className="table w-full table-zebra">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="text-left p-2">Date</th>
                            <th className="text-left p-2">Depositor</th>
                            <th className="text-left p-2">Deposit Amount</th>
                            <th className="text-left p-2">Status</th>
                            <th className="text-left p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deposits?.length ? (
                            deposits.map((deposit) => (
                                <tr key={deposit._id}>
                                    <td className="p-2">{new Date(deposit.depositDate).toLocaleDateString()}</td>
                                    <td className="p-2">{user.fullName}</td>
                                    <td className="p-2">{deposit.depositAmount}</td>
                                    <td className="p-2">
                                        <select
                                            value={deposit.status}
                                            onChange={(e) => {
                                                setSelectedStatus(e.target.value)
                                                setSelectedDepositId(deposit._id)
                                            }}
                                        >
                                            <option value="rejected">Rejected</option>
                                            <option value="approved">Approved</option>
                                            <option value="pending">Pending</option>
                                        </select>
                                    </td>
                                    <td className="p-2">
                                        <button onClick={handleSubmitStatusChange}>Save</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <p>No Deposit Found</p>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveDeposits;
