import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ManagerPrivateRoute = ({children}) => {
    const user = useSelector(state=>state.auth.user);
    const { pathname } = useLocation();


    if(user.role !="manager"){
        return <Navigate to ='/' state={{path:pathname}} />
    }

    return children;
    
};

export default ManagerPrivateRoute;