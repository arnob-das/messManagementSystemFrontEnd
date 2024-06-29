import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/Main/Main";
import Home from "../Pages/Home/Home";
import UserDashboard from "../Layout/UserDashboard/UserDashboard";
import Login from "../Pages/Authentication/Login/Login";
import Registration from "../Pages/Authentication/Registration/Registration";
import JoinAMess from "../Pages/JoinAMess/JoinAMess";
import CreateAMess from "../Pages/CreateAMess/CreateAMess";
import Meal from "../Pages/userPanel/Meal/Meal"
import MessMembers from "../Pages/userPanel/MessMembers/MessMembers";
import PayCost from "../Pages/userPanel/PayCost/PayCost";
import UserPaymentHistory from "../Pages/userPanel/UserPaymentHistory/UserPaymentHistory";
import ManagerDashboard from "../Layout/ManagerDashboard/ManagerDashboard";
import ApproveUsers from "../Pages/ManagerPanel/ApproveUsers/ApproveUsers"
import ApproveDeposits from "../Pages/ManagerPanel/ApproveDeposits/ApproveDeposits"
import AssignBills from "../Pages/ManagerPanel/AssignBills/AssignBills"
import ViewMeal from "../Pages/ManagerPanel/ViewMeal/ViewMeal"
import ReceiveBills from "../Pages/ManagerPanel/ReceiveBills/ReceiveBills"
import MessPaymentHistory from "../Pages/ManagerPanel/MessPaymentHistory/MessPaymentHistory";
import Profile from "../Pages/Profile/Profile";
import LoggedInUserRoute from "../utils/PrivateRoute/LoggedInUserRoute";
import MealDeposit from "../Pages/userPanel/MealDeposit/MealDeposit";
import SetRent from "../Pages/ManagerPanel/SetRent/SetRent";
import AddInventory from "../Pages/userPanel/AddInventory/AddInventory";
import UtilityBill from "../Pages/userPanel/UtilityBill/UtilityBill";
import RoleManagement from "../Pages/ManagerPanel/RoleManagement/RoleManagement";
import ManagerPrivateRoute from "../utils/PrivateRoute/ManagerPrivateRoute";
import NotMessMemberPrivateRoute from "../utils/PrivateRoute/NotMessMemberPrivateRoute";
import NotLoggedInUserRoute from "../utils/PrivateRoute/NotLoggedInUserRoute";
import ApprovedUserRoute from "../utils/PrivateRoute/ApprovedUserRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <NotLoggedInUserRoute>
            <Login />
          </NotLoggedInUserRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <NotLoggedInUserRoute>
            <Registration />
          </NotLoggedInUserRoute>
        ),
      },
      {
        path: "/profile",
        element:
          (<LoggedInUserRoute>
            <Profile />
          </LoggedInUserRoute>),
      }
    ],
  },
  // user dashboard
  {
    path: "/user-dashboard",
    element: (
      <LoggedInUserRoute>
        <UserDashboard />
      </LoggedInUserRoute>
    ),
    children: [
      {
        path: "joinAMess",
        element: (
          <NotMessMemberPrivateRoute>
            <JoinAMess />
          </NotMessMemberPrivateRoute>
        )
      },
      {
        path: "createAMess",
        element: (
          <NotMessMemberPrivateRoute>
            <CreateAMess />
          </NotMessMemberPrivateRoute>)
      },
      {
        path: "meal",
        element: (
          <ApprovedUserRoute>
            <Meal />
          </ApprovedUserRoute>)
      },
      {
        path: "mealDeposit",
        element: (
          <ApprovedUserRoute>
            <MealDeposit />
          </ApprovedUserRoute>
        )
      },
      {
        path: "addInventory",
        element: (
          <ApprovedUserRoute>
            <AddInventory />
          </ApprovedUserRoute>
        )
      },
      {
        path: "utilityBill",
        element: (
          <ApprovedUserRoute>
            <UtilityBill />
          </ApprovedUserRoute>
        )
      },
      {
        path: "messMembers",
        element: (
          <ApprovedUserRoute>
            <MessMembers />
          </ApprovedUserRoute>
        )
      },
      {
        path: "payCost",
        element: (
          <ApprovedUserRoute>
            <PayCost />
          </ApprovedUserRoute>)
      },
      {
        path: "user-paymentHistory",
        element: (
          <ApprovedUserRoute>
            <UserPaymentHistory />
          </ApprovedUserRoute>
        )
      },
    ]
  },
  // manager dashboard
  {
    path: "/manager-dashboard",
    element: (
      <ManagerPrivateRoute>
        <ManagerDashboard />
      </ManagerPrivateRoute>
    ),
    children: [
      {
        path: "approveUsers",
        element: <ApproveUsers />
      },
      {
        path: "approveDeposits",
        element: <ApproveDeposits />
      },
      {
        path: "setRent",
        element: <SetRent />
      },
      {
        path: "assignBills",
        element: <AssignBills />
      },
      {
        path: "viewMeal",
        element: <ViewMeal />
      },
      {
        path: "receiveBills",
        element: <ReceiveBills />
      },
      {
        path: "mess-paymentHistory",
        element: <MessPaymentHistory />
      },
      {
        path: "roleManagement",
        element: <RoleManagement />
      },
    ]
  }
]);

export default routes;
