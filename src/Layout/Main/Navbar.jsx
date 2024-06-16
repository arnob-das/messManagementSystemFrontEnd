import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {
    const user = useSelector((state) => state.auth);

    const dispatch = useDispatch();


    const handleLogOut = ()=>{
        dispatch(logout());
        toast.success("Log Out successful");
    }  

    return (
        <div className="navbar bg-base-100 px-6 md:px-28">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">Mess Management</a>
            </div>
            <div className="navbar-end">
                <ul className="menu menu-horizontal px-1 md:flex">
                    <li><Link to="/">Home</Link></li>
                    {
                        user.isAuthenticated && (user.user.role === "user" || user.user.role === "manager") && <li><Link to="/user-dashboard">User Dashboard</Link></li>
                    }
                    {
                        user.isAuthenticated && user.user.role === "manager" && <li><Link to="/manager-dashboard">Manager Dashboard</Link></li>
                    }
                    {
                        user.isAuthenticated && user.user.email && <li><Link to="/profile">{user.user.fullName}</Link></li>
                    }
                    {
                        !user.isAuthenticated ? <li><Link to="/login">Login</Link></li> :
                            <li><button onClick={handleLogOut}>Log Out</button></li>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
