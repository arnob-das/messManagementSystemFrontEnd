import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const LoggedInUserRoute = ({ children }) => {
    const { pathname } = useLocation();

    const { isAuthenticated } = useSelector(state => state.auth);

    if (!isAuthenticated) {
        return <Navigate to='/login' state={{ path: pathname }} />;
    }

    return children;
};

export default LoggedInUserRoute;