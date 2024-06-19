import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { addMealDeposit, getMessMealDeposits } from "../../../features/meal/mealDepositSlice";

const MealDeposit = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const mealDeposit = useSelector((state) => state.mealDeposit.mealDeposit);

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (user && user._id && user.currentMessId) {
            dispatch(getMessMealDeposits({ currentMessId: user.currentMessId, date: new Date() }));
        }
    }, [user, dispatch]);

    const onSubmit = (data) => {
        const { date, depositAmount } = data;
        dispatch(addMealDeposit({ date, depositAmount, userFullName: user.fullName, userId: user._id, currentMessId: user.currentMessId }));
        reset();
    };

    let deposits;

    if (mealDeposit.deposits) {
        deposits = mealDeposit.deposits.filter((deposit) => deposit.userId === user._id && deposit.status === "approved"); // Filter approved deposits
    }

    const totalApprovedAmount = deposits?.reduce((acc, deposit) => acc + deposit.depositAmount, 0) || 0; // Calculate total approved amount

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Manage Meal Deposit</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="md:order-1">
                    <div className="card bg-base-100 shadow-sm mb-4">
                        <div className="card-body">
                            <h2 className="card-title">Total Approved Amount</h2>
                            <p className="text-3xl font-bold">{totalApprovedAmount}</p>
                        </div>
                    </div>

                    <div className="card w-full bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Deposit Amount Form</h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control mb-4">
                                    <label className="label">Date</label>
                                    <input
                                        type="date"
                                        {...register("date", { required: true })}
                                        className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control mb-4">
                                    <label className="label">Deposit Amount</label>
                                    <input
                                        type="number"
                                        {...register("depositAmount", { required: true })}
                                        className="input input-bordered"
                                    />
                                </div>
                                {
                                    user.approved &&
                                    <div className="card-actions justify-start">
                                        <button type="submit" className="btn btn-primary">
                                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                            Add Deposit
                                        </button>
                                    </div>
                                }
                            </form>
                        </div>
                    </div>
                </div>

                <div className="md:order-2">
                    <h2 className="text-2xl font-bold mt-4 mb-4 text-center md:hidden">Meal Deposits</h2>
                    <div className="overflow-x-auto">
                        <table className="table w-full table-zebra">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="text-left p-2">Date</th>
                                    <th className="text-left p-2">Depositor</th>
                                    <th className="text-left p-2">Deposit Amount</th>
                                    <th className="text-left p-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deposits ? (
                                    deposits.map((deposit) => (
                                        <tr key={deposit._id}>
                                            <td>{new Date(deposit.depositDate).toLocaleDateString()}</td>
                                            <td className="p-2">{user.fullName}</td>
                                            <td className="p-2">{deposit.depositAmount}</td>
                                            <td className="p-2">{deposit.status}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <p>No Deposit Found</p>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealDeposit;