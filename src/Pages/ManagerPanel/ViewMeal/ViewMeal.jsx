import { useEffect, useState } from "react";
import { getAllMessMembersMeals } from "../../../features/meal/mealCountSlice";
import { useDispatch, useSelector } from "react-redux";

const ViewMeal = () => {

    const [meals,setMeals] = useState([]);
    const [error,setError] = useState("");

    const dispatch = useDispatch();
    const user = useSelector((state)=>state.auth.user);
    const currentMessId = user.currentMessId;

    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const fetchMeals = async () => {
        try {
            const response = await dispatch(getAllMessMembersMeals({ currentMessId,month,year }));
            setMeals(response.payload);
        } catch (error) {
            setError(error.message);
        }
    }
    useEffect(()=>{
        fetchMeals();
    },[month,year,dispatch,currentMessId])

    const calculateTotals = (meals) => {
        return meals.reduce(
            (totals, meal) => {
                totals.breakfast += meal.breakfast || 0;
                totals.lunch += meal.lunch || 0;
                totals.dinner += meal.dinner || 0;
                return totals;
            },
            { breakfast: 0, lunch: 0, dinner: 0 }
        );
    };

    const grandTotals = meals.reduce(
        (grand, user) => {
            const userTotals = calculateTotals(user.meals);
            grand.breakfast += userTotals.breakfast;
            grand.lunch += userTotals.lunch;
            grand.dinner += userTotals.dinner;
            return grand;
        },
        { breakfast: 0, lunch: 0, dinner: 0 }
    );

    console.log(meals)
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">View Meals</h1>
            {error && <p className="text-red-500">{error}</p>}
            <div className="overflow-x-auto">
                <table className="table w-full table-zebra">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="text-left p-2 font-bold">Full Name</th>
                            <th className="text-left p-2 font-bold">Date</th>
                            <th className="text-left p-2 font-bold">Breakfast</th>
                            <th className="text-left p-2 font-bold">Lunch</th>
                            <th className="text-left p-2 font-bold">Dinner</th>
                            <th className="text-left p-2 font-bold">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meals.map((user) => (
                            <>
                                {user.meals.map((meal) => (
                                    <tr key={meal._id}>
                                        <td className="p-2">{user.userFullName}</td>
                                        <td className="p-2">{new Date(meal.mealDate).toLocaleDateString()}</td>
                                        <td className="p-2">{meal.breakfast || 0}</td>
                                        <td className="p-2">{meal.lunch || 0}</td>
                                        <td className="p-2">{meal.dinner || 0}</td>
                                        <td className="p-2">
                                            {meal.breakfast + meal.lunch + meal.dinner}
                                        </td>
                                    </tr>
                                ))}
                                <tr className="font-bold bg-gray-100">
                                    <td className="p-2" colSpan="2">Total for {user.userFullName}</td>
                                    <td className="p-2">{calculateTotals(user.meals).breakfast}</td>
                                    <td className="p-2">{calculateTotals(user.meals).lunch}</td>
                                    <td className="p-2">{calculateTotals(user.meals).dinner}</td>
                                    <td className="p-2">
                                        {calculateTotals(user.meals).breakfast +
                                            calculateTotals(user.meals).lunch +
                                            calculateTotals(user.meals).dinner}
                                    </td>
                                </tr>
                            </>
                        ))}
                        <tr className="font-bold bg-gray-300">
                            <td className="p-2" colSpan="2">Grand Total</td>
                            <td className="p-2">{grandTotals.breakfast}</td>
                            <td className="p-2">{grandTotals.lunch}</td>
                            <td className="p-2">{grandTotals.dinner}</td>
                            <td className="p-2">
                                {grandTotals.breakfast + grandTotals.lunch + grandTotals.dinner}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewMeal;