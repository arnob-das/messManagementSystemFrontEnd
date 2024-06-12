import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MealTable from '../../../components/MealTable/MealTable';
import MealModal from '../../../components/MealModal/MealModal';
import { addMeal } from '../../../features/meal/mealCountSlice';

const Meal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const mealCount = useSelector((state) => state.mealCount.mealCount);
    console.log(mealCount);

   

    // useEffect(() => {
    //     if (user) {
    //         const currentMonth = new Date().getMonth() + 1;
    //         const currentYear = new Date().getFullYear();
    //         // dispatch(fetchMealsByMonth({ userId: user._id, month: currentMonth, year: currentYear }));
    //     }
    // }, [user, dispatch]);

    

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Manage Meals</h1>
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Add Meal</button>
            </div>
            <MealModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default Meal;