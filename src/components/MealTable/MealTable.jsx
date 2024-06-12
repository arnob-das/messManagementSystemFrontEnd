const MealTable = ({ meals }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Breakfast</th>
                        <th>Lunch</th>
                        <th>Dinner</th>
                    </tr>
                </thead>
                <tbody>
                    {meals.map((meal) => (
                        <tr key={meal._id}>
                            <td>{new Date(meal.mealDate).toLocaleDateString()}</td>
                            <td>{meal.breakfast}</td>
                            <td>{meal.lunch}</td>
                            <td>{meal.dinner}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MealTable;
