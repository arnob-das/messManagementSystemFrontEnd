import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const NotMessMemberPrivateRoute = ({ children }) => {
    const { pathname } = useLocation();
    console.log(pathname);

    const { isAuthenticated,user} = useSelector(state => state.auth);

    // if logged in user, then they can not go to login and register page.
    if ( isAuthenticated && user.currentMessId !=null) {
        return <Navigate to='/user-dashboard' state={{ path: pathname }} />;
    }

    return children;
};

export default NotMessMemberPrivateRoute;