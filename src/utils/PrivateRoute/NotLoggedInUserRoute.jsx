import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const NotLoggedInUserRoute = ({ children }) => {

    const { isAuthenticated } = useSelector(state => state.auth);

    if (isAuthenticated) {
        return <Navigate to='/user-dashboard' />;
    }   

    return children;
};

export default NotLoggedInUserRoute;