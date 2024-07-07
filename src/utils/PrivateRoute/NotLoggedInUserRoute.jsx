import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NotLoggedInUserRoute = ({ children }) => {

    const { isAuthenticated } = useSelector(state => state.auth);

    if (isAuthenticated) {
        return <Navigate to='/' />;
    }   

    return children;
};

export default NotLoggedInUserRoute;