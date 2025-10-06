import { NavLink, Outlet, useNavigate } from 'react-router';
import ProFastLogo from '../Pages/shared/ProFastLogo/ProFastLogo';
import {
    FaHome,
    FaBox,
    FaCreditCard,
    FaSearchLocation,
    FaUserEdit,
    FaUserCheck,
    FaUserClock,
    FaUserShield,
    FaUserPlus,
    FaClock,
    FaCheckCircle,
    FaDollarSign,
    FaSignOutAlt,
    FaBars,
} from 'react-icons/fa';
import useUserRole from '../hooks/useUserRole';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';

const DashboardLayout = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    const { role, roleLoading } = useUserRole();
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logOut()
            .then(() => navigate("/login"))
            .catch(console.error);
    };

    // Active button class
    const navButtonClass = ({ isActive }) =>
        `flex items-center gap-3 justify-start px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 transform  ${isActive ? 'bg-green-600 text-white shadow-md scale-105' : 'text-gray-700 hover:bg-gray-100 hover:scale-105'}`;

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col justify-between transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
            >
                <div className="p-5">
                    {/* Logo */}
                    <div className="mb-6 flex justify-center">
                        <ProFastLogo />
                    </div>

                    <div className="flex flex-col gap-2">
                        <NavLink to="/" end className={navButtonClass}>
                            <FaHome className="text-lg" />
                            <span>Home</span>
                        </NavLink>

                        <NavLink to="/dashboard" end className={navButtonClass}>
                            <FaHome className="text-lg" />
                            <span>
                                {user && role === 'user' && 'My Dashboard'}
                                {
                                    user && (role === 'admin' || role === 'rider') && (
                                        <div className="flex gap-1 items-center">
                                            <span>My Dashboard</span>
                                            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">
                                                {role.charAt(0).toUpperCase() + role.slice(1)}
                                            </span>
                                        </div>
                                    )
                                }
                            </span>
                        </NavLink>

                        <NavLink to="/dashboard/myParcels" className={navButtonClass}>
                            <FaBox className="text-lg" />
                            <span>My Parcels</span>
                        </NavLink>

                        <NavLink to="/dashboard/paymentHistory" className={navButtonClass}>
                            <FaCreditCard className="text-lg" />
                            <span>Payment History</span>
                        </NavLink>

                        <NavLink to="/dashboard/track" className={navButtonClass}>
                            <FaSearchLocation className="text-lg" />
                            <span>Track a Package</span>
                        </NavLink>

                        <NavLink to="/dashboard/updateProfile" className={navButtonClass}>
                            <FaUserEdit className="text-lg" />
                            <span>Update Profile</span>
                        </NavLink>

                        {/* Rider Links */}
                        {
                            !roleLoading && role === 'rider' && (
                                <>
                                    <NavLink to="/dashboard/pendingDeliveries" className={navButtonClass}>
                                        <FaClock className="text-lg" />
                                        <span>Pending Deliveries</span>
                                    </NavLink>

                                    <NavLink to="/dashboard/completedDeliveries" className={navButtonClass}>
                                        <FaCheckCircle className="text-lg" />
                                        <span>Completed Deliveries</span>
                                    </NavLink>

                                    <NavLink to="/dashboard/myEarning" className={navButtonClass}>
                                        <FaDollarSign className="text-lg" />
                                        <span>My Earning</span>
                                    </NavLink>
                                </>
                            )
                        }

                        {/* Admin Links */}
                        {
                            !roleLoading && role === 'admin' && (
                                <>
                                    <NavLink to="/dashboard/assignRider" className={navButtonClass}>
                                        <FaUserPlus className="text-lg" />
                                        <span>Assign Rider</span>
                                    </NavLink>

                                    <NavLink to="/dashboard/activeRiders" className={navButtonClass}>
                                        <FaUserCheck className="text-lg" />
                                        <span>Active Riders</span>
                                    </NavLink>

                                    <NavLink to="/dashboard/pendingRiders" className={navButtonClass}>
                                        <FaUserClock className="text-lg" />
                                        <span>Pending Riders</span>
                                    </NavLink>

                                    <NavLink to="/dashboard/makeAdmins" className={navButtonClass}>
                                        <FaUserShield className="text-lg" />
                                        <span>Make Admins</span>
                                    </NavLink>
                                </>
                            )
                        }
                    </div>
                </div>

                {/* Logout */}
                <div className="p-5 border-t">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-red-500 text-white font-semibold shadow-md
                       hover:bg-red-600 hover:scale-105 transition-all duration-200 transform active:scale-95"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Overlay (for mobile only) */}
            {
                isOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
                        onClick={() => setIsOpen(false)}
                    ></div>
                )
            }

            <main className="flex-1 lg:ml-64 overflow-y-auto p-6">
                {/* Top Bar (mobile only) */}
                <div className=" lg:hidden flex items-center justify-between bg-white p-4 shadow-md mb-4 rounded-md">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <FaBars className="text-xl" />
                    </button>
                    <h2 className="text-lg font-semibold">Dashboard</h2>
                </div>

                <Outlet></Outlet>

            </main>
        </div>
    );
};

export default DashboardLayout;
