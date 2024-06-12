// components/MealModal.js
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addMeal } from '../../features/meal/mealCountSlice';

const MealModal = ({ isOpen, onClose }) => {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const handleAddMeal = (data) => {
        const { mealDate } = data;
        const dateObj = new Date(mealDate);

        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();

        const meal = {
            ...data,
            userId: user._id,
        };
        const mealData = {
            meal,
            currentMessId: user.currentMessId,
            month,
            year

        }
        console.log(mealData);
        dispatch(addMeal(mealData)).then(()=>{
            reset();
            onClose();
        })

        
    };

    return (
        <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
            <div className="modal-box">
                <h2 className="font-bold text-lg">Add Meal</h2>
                <form onSubmit={handleSubmit(handleAddMeal)}>
                    <div className="form-control">
                        <label className="label">Date</label>
                        <input type="date" className="input input-bordered" {...register('mealDate', { required: true })} />
                    </div>
                    <div className="form-control">
                        <label className="label">Breakfast</label>
                        <input type="number" className="input input-bordered" {...register('breakfast', { required: true })} />
                    </div>
                    <div className="form-control">
                        <label className="label">Lunch</label>
                        <input type="number" className="input input-bordered" {...register('lunch', { required: true })} />
                    </div>
                    <div className="form-control">
                        <label className="label">Dinner</label>
                        <input type="number" className="input input-bordered" {...register('dinner', { required: true })} />
                    </div>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Add Meal</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MealModal;
