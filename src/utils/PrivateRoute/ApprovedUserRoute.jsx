import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ApprovedUserRoute = ({children}) => {
    const user = useSelector(state => state.auth.user);

    if (!user.approved) {
        return <Navigate to='/user-dashboard' />;
    }   

    return children;
};

export default ApprovedUserRoute;