
import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoute from "../routes/PrivateRoute";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../Layout/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import TrackParcel from "../Pages/Dashboard/TrackParcel/TrackParcel";
import BeARider from "../Pages/Dashboard/BeARider/BeARider";
import PendingRiders from "../Pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../Pages/Dashboard/ActiveRiders/ActiveRiders";
import MakeAdmins from "../Pages/Dashboard/MakeAdmins/MakeAdmins";
import Forbidden from "../Pages/Forbidden/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import AssignRider from "../Pages/Dashboard/AssignRider/AssignRider";
import RiderRoute from "../routes/RiderRoute";
import PendingDeliveries from "../Pages/Dashboard/PendingDeliveries/PendingDeliveries";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import MyEarning from "../Pages/Dashboard/MyEarning/MyEarning";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import UpdateProfile from "../components/UpdateProfile";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'coverage',
        Component: Coverage,
        loader: () => fetch('./serviceCenter.json')
      },
      {
        path: 'forbidden',
        Component: Forbidden
      },
      {
        path: 'beARider',
        element: <PrivateRoute><BeARider></BeARider></PrivateRoute>,
        loader: () => fetch('./serviceCenter.json')
      },
      {
        path: 'sendParcel',
        element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
        loader: () => fetch('./serviceCenter.json')
      }
    ]
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      },
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        index: true,
        Component: DashboardHome
      },
      {
        path: 'myParcels',
        Component: MyParcels
      },
      {
        path: 'payment/:parcelId',
        Component: Payment
      },
      {
        path: 'paymentHistory',
        Component: PaymentHistory
      },
      {
        path: 'track',
        Component: TrackParcel
      },
      {
        path: 'updateProfile',
        Component: UpdateProfile
      },
      // Rider-router

      {
        path: 'pendingDeliveries',
        element: <RiderRoute><PendingDeliveries></PendingDeliveries></RiderRoute>
      },
      {
        path: 'completedDeliveries',
        element: <RiderRoute><CompletedDeliveries></CompletedDeliveries></RiderRoute>
      },
      {
        path: 'myEarning',
        element: <RiderRoute><MyEarning></MyEarning></RiderRoute>
      },


      // Admin-router
      {
        path: 'assignRider',
        element: <AdminRoute><AssignRider></AssignRider></AdminRoute>
      },
      {
        path: 'pendingRiders',
        element: <AdminRoute><PendingRiders></PendingRiders></AdminRoute>
      },
      {
        path: 'activeRiders',
        element: <AdminRoute><ActiveRiders></ActiveRiders></AdminRoute>
      },
      {
        path: 'makeAdmins',
        element: <AdminRoute><MakeAdmins></MakeAdmins></AdminRoute>
      }

    ]
  }
]);
