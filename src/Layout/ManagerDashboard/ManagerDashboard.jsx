import { Outlet, useLocation } from "react-router-dom";
import ManagerSidebar from "./ManagerSidebar";
import ManagerPanel from "../../Pages/ManagerPanel/ManagerPanel/ManagerPanel";

const ManagerDashboard = () => {
    const { pathname } = useLocation();
    return (
        <div className="flex h-screen">
            <ManagerSidebar />
            <div className="flex-1 flex flex-col p-4 overflow-y-auto">
                {
                    pathname == '/manager-dashboard' ? <ManagerPanel/>
                        : <Outlet />
                }
            </div>
        </div>
    );
};

export default ManagerDashboard;