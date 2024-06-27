import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addGroceryCost, getGroceryCost } from '../../../features/groceryCost/gorceryCostSlice';
import { toast } from "react-toastify";

const AddGroceryForm = ({ currentMessId, month, year, userId }) => {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        data.messId = currentMessId;
        data.month = month;
        data.year = year;
        data.groceries = [{ groceryDetails: data.groceryDetails, price: parseFloat(data.price), date: data.date, userId: userId }];
        try {
            await dispatch(addGroceryCost(data));
            reset();
            toast.success('Grocery cost added successfully');
            dispatch(getGroceryCost({ messId: currentMessId, month, year }));
        } catch (error) {
            toast.error('Failed to add grocery cost');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <div className="form-control mb-4">
                    <label className="label">Date</label>
                    <input
                        type="date"
                        {...register("date", { required: true })}
                        className="input input-bordered"
                    />
                </div>
                <label className="block text-sm font-medium text-gray-700">Grocery Details</label>
                <input
                    type="text"
                    {...register('groceryDetails', { required: true })}
                    className="input input-bordered w-full"
                    placeholder="Enter grocery details"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                    type="number"
                    step="0.01"
                    {...register('price', { required: true })}
                    className="input input-bordered w-full"
                    placeholder="Enter price"
                />
            </div>
            <div>
                <button type="submit" className="btn btn-primary w-full">
                    Add Grocery Cost
                </button>
            </div>
        </form>
    );
};

export default AddGroceryForm;
