import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { useState } from "react";

const Navbar = () => {
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogOut = () => {
        dispatch(logout());
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="navbar bg-base-100 px-6 lg:px-28">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">Mess Management</a>
            </div>
            <div className="navbar-end w-full lg:w-auto">
                <div className="flex items-center lg:hidden">
                    <button onClick={toggleMenu} className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
                <ul className={`menu menu-compact ${isOpen ? "block" : "hidden"} lg:menu-horizontal lg:flex px-1`}>
                    <li>
                        <Link className="font-bold" to="/">Home</Link>
                    </li>
                    {
                        user.isAuthenticated && (user.user.role === "user" || user.user.role === "manager") && <li><Link className="font-bold" to="/user-dashboard">User Dashboard</Link></li>
                    }
                    {
                        user.isAuthenticated && user.user.role === "manager" && <li><Link className="font-bold" to="/manager-dashboard">Manager Dashboard</Link></li>
                    }
                    {
                        user.isAuthenticated && user.user.email && <li><Link className="font-bold" to="/profile">{user.user.fullName}</Link></li>
                    }
                    {
                        !user.isAuthenticated ? <li><Link className="font-bold" to="/login">Login</Link></li> :
                            <li><button className="font-bold" onClick={handleLogOut}>Log Out</button></li>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Navbar;