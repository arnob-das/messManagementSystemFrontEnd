import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMeals, editMeal, deleteMeal } from "../../features/meal/mealCountSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const MealTable = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const mealCount = useSelector((state) => state.mealCount.mealCount);
    
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        if (user && user._id && user.currentMessId) {
            dispatch(getMeals({ userId: user._id, month: currentMonth, year: currentYear, currentMessId: user.currentMessId }));
        }
    }, [user, dispatch, currentMonth, currentYear]);

    const sortedMeals = mealCount?.meals?.slice().sort((a, b) => new Date(a.mealDate) - new Date(b.mealDate)) || [];
    const [editData, setEditData] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleEdit = (meal) => {
        setEditData(meal);
        setShowEditModal(true);
    };

    const handleDelete = (mealId) => {
        dispatch(deleteMeal({ mealId }));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        dispatch(editMeal({ mealId: editData._id, mealData: editData }));
        setShowEditModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({
            ...editData,
            [name]: value,
        });
    };

    const totalMeals = sortedMeals.reduce((totals, meal) => {
        totals.breakfast += meal.breakfast;
        totals.lunch += meal.lunch;
        totals.dinner += meal.dinner;
        totals.total += meal.breakfast + meal.lunch + meal.dinner;
        return totals;
    }, { breakfast: 0, lunch: 0, dinner: 0, total: 0 });

    const monthName = new Date(mealCount.year, mealCount.month - 1).toLocaleString('default', { month: 'long' });

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">{`${monthName}, ${currentYear}`}</h1>
            <div className="stats shadow mb-6 flex justify-center">
                <div className="stat">
                    <div className="stat-title">Total Breakfasts</div>
                    <div className="stat-value">{totalMeals.breakfast}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Total Lunches</div>
                    <div className="stat-value">{totalMeals.lunch}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Total Dinners</div>
                    <div className="stat-value">{totalMeals.dinner}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Total Meals</div>
                    <div className="stat-value">{totalMeals.total}</div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full table-zebra">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="text-left p-2">Date</th>
                            <th className="text-left p-2">Breakfast</th>
                            <th className="text-left p-2">Lunch</th>
                            <th className="text-left p-2">Dinner</th>
                            <th className="text-left p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortedMeals.map((meal) => (
                                <tr key={meal._id}>
                                    <td className="p-2">{new Date(meal.mealDate).toLocaleDateString()}</td>
                                    <td className="p-2">{meal.breakfast}</td>
                                    <td className="p-2">{meal.lunch}</td>
                                    <td className="p-2">{meal.dinner}</td>
                                    <td className="p-2">
                                        <button className="btn btn-primary btn-xs mr-2" onClick={() => handleEdit(meal)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button className="btn btn-danger btn-xs" onClick={() => handleDelete(meal._id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                        <tr className="font-bold bg-gray-100">
                            <td className="p-2">Total</td>
                            <td className="p-2">{totalMeals.breakfast}</td>
                            <td className="p-2">{totalMeals.lunch}</td>
                            <td className="p-2">{totalMeals.dinner}</td>
                            <td className="p-2"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {showEditModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Edit Meal</h3>
                        <form onSubmit={handleEditSubmit}>
                            <div className="form-control">
                                <label className="label">Breakfast</label>
                                <input
                                    type="number"
                                    name="breakfast"
                                    value={editData.breakfast}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">Lunch</label>
                                <input
                                    type="number"
                                    name="lunch"
                                    value={editData.lunch}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">Dinner</label>
                                <input
                                    type="number"
                                    name="dinner"
                                    value={editData.dinner}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">Save</button>
                                <button type="button" className="btn" onClick={() => setShowEditModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MealTable;