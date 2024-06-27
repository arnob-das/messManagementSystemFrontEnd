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
        element: <Login />,
      },
      {
        path: "/register",
        element: (
          <Registration />
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
        element: <JoinAMess />
      },
      {
        path: "createAMess",
        element: <CreateAMess />
      },
      {
        path: "meal",
        element: <Meal />
      },
      {
        path: "mealDeposit",
        element: <MealDeposit />
      },
      {
        path: "addInventory",
        element: <AddInventory />
      },
      {
        path: "messMembers",
        element: <MessMembers />
      },
      {
        path: "payCost",
        element: <PayCost />
      },
      {
        path: "user-paymentHistory",
        element: <UserPaymentHistory />
      },
    ]
  },
  // manager dashboard
  {
    path: "/manager-dashboard",
    element: (
      <LoggedInUserRoute>
        <ManagerDashboard />
      </LoggedInUserRoute>
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
    ]
  }
]);

export default routes;
