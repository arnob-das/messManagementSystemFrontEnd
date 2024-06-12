import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMessById } from "../../../features/mess/messSlice";

const UserPanel = () => {
    const user = useSelector((state) => state.auth);
    const mess = useSelector((state) => state.mess);

    const dispatch = useDispatch();

    useEffect(() => {
        if (user.user.currentMessId) {
            dispatch(getMessById(user.user.currentMessId));
        }
    }, [dispatch, user.user.currentMessId]);

    return (
        <div>
            <p>{mess.mess?.messName}</p>
        </div>
    );
};

export default UserPanel;
