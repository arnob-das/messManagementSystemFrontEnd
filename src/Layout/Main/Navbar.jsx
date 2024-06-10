// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 px-6 md:px-28">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">Mess Management</a>
            </div>
            <div className="navbar-end">
                <ul className="menu menu-horizontal px-1 md:flex">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/user-dashboard">User Dashboard</Link></li>
                    <li><Link to="/manager-dashboard">Manager Dashboard</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
