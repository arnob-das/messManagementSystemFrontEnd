import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { addMealDeposit, deleteMealDeposit, getMessMealDeposits } from '../../../features/meal/mealDepositSlice';

const MealDeposit = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const mealDeposit = useSelector((state) => state.mealDeposit.mealDeposit);
    console.log(mealDeposit);

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (user && user._id && user.currentMessId) {
            dispatch(getMessMealDeposits({ currentMessId: user.currentMessId, date: new Date() }));
        }
    }, [user, dispatch]);

    const onSubmit = (data) => {
        const { date, depositAmount } = data;
        console.log(date);
        dispatch(addMealDeposit({ date, depositAmount, userId: user._id, currentMessId: user.currentMessId }));
        reset();
    };
    const handleDelete = (depositId) => {
        dispatch(deleteMealDeposit({depositId}));
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Add Meal Deposit</h1>
            <div className="card w-full bg-base-100 shadow-xl">
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control mb-4">
                            <label className="label">Date</label>
                            <input
                                type="date"
                                {...register('date', { required: true })}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">Deposit Amount</label>
                            <input
                                type="number"
                                {...register('depositAmount', { required: true })}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="card-actions justify-start">
                            <button type="submit" className="btn btn-primary">
                                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                Add Deposit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-center">Meal Deposits</h2>
            <div className="overflow-x-auto">
                <table className="table w-full table-zebra">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="text-left p-2">Date</th>
                            <th className="text-left p-2">Deposit Amount</th>
                            <th className="text-left p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mealDeposit.deposits && mealDeposit.deposits.map((deposit) => (
                            <tr key={deposit._id}>
                                <td className="p-2">{new Date(deposit.depositDate).toLocaleDateString()}</td>
                                <td className="p-2">{deposit.depositAmount}</td>
                                <td className="p-2">
                                    <button onClick={() => { handleDelete(deposit._id) }} className="btn btn-danger btn-xs">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MealDeposit;