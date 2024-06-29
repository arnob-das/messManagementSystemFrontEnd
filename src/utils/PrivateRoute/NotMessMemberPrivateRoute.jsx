import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const NotMessMemberPrivateRoute = ({ children }) => {
    const { pathname } = useLocation();

    const { isAuthenticated,user} = useSelector(state => state.auth);

    if ( isAuthenticated && user.currentMessId !=null && user.approved==true) {
        return <Navigate to='/user-dashboard' state={{ path: pathname }} />;
    }

    return children;
};

export default NotMessMemberPrivateRoute;