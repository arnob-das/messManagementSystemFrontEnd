import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateGroceryCost, getGroceryCost } from '../../../features/groceryCost/gorceryCostSlice';
import { toast } from "react-toastify";
import { useEffect } from 'react';

const EditGroceryForm = ({ currentMessId, month, year, editItem, setEditItem }) => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        if (editItem) {
            setValue('groceryDetails', editItem.groceryDetails);
            setValue('price', editItem.price);
            setValue('date', editItem.date.split('T')[0]);
        }
    }, [editItem, setValue]);

    const onSubmit = async (data) => {
        data.messId = currentMessId;
        data.month = month;
        data.year = year;
        data.groceryId = editItem._id;
        try {
            await dispatch(updateGroceryCost(data));
            setEditItem(null);
            reset();
            toast.success('Grocery cost updated successfully');
            dispatch(getGroceryCost({ messId: currentMessId, month, year }));
        } catch (error) {
            toast.error('Failed to update grocery cost');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Grocery Details</label>
                <input
                    type="text"
                    {...register('groceryDetails', { required: true })}
                    className="input input-bordered w-full"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                    type="number"
                    step="0.01"
                    {...register('price', { required: true })}
                    className="input input-bordered w-full"
                />
            </div>
            <div className="modal-action">
                <button type="submit" className="btn btn-primary">Update</button>
                <button type="button" className="btn" onClick={() => setEditItem(null)}>Cancel</button>
            </div>
        </form>
    );
};

export default EditGroceryForm;
