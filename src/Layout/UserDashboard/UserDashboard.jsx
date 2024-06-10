import { Outlet, useLocation } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import UserPanel from "../../Pages/userPanel/UserPanel/UserPanel";
// import { generateBreadcrumbs } from "../../utils/GenerateBreadcrumbs/generateBreadcrumbs";

const Dashboard = () => {
    const { pathname } = useLocation();    

    return (
        <div className="flex h-screen">
            <UserSidebar />
            <div className="flex-1 flex flex-col p-4 overflow-y-auto bg-gray-100">
                {/* {generateBreadcrumbs(pathname)} */}
                {
                    pathname === '/user-dashboard' ? <UserPanel/>
                        : <Outlet />
                }
            </div>
        </div>
    );
};

export default Dashboard;
