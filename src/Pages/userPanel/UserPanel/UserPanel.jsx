import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMessById } from "../../../features/mess/messSlice";
import { getMeals } from "../../../features/meal/mealCountSlice";

const UserPanel = () => {
    const user = useSelector((state) => state.auth);
    const mess = useSelector((state) => state.mess);
    const dispatch = useDispatch();

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        if (user.user.currentMessId) {
            dispatch(getMessById({ id: user.user.currentMessId }));
            dispatch(getMeals({ userId: user.user._id, month: currentMonth, year: currentYear, currentMessId: user.user.currentMessId }));
        }
    }, [currentMonth, currentYear, dispatch, user.user._id, user.user.currentMessId]);

    return (
        <div>
            <p>{user?.user?.fullName}</p>
            <p>{mess.mess?.messName}</p>
        </div>
    );
};

export default UserPanel;
