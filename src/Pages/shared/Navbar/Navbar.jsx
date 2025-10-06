import { Link, NavLink } from "react-router";
import ProFastLogo from "../ProFastLogo/ProFastLogo";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { FaUserCircle, FaChevronDown, FaSignOutAlt, FaBars, FaTimes, FaUserShield } from "react-icons/fa";
import useUserRole from "../../../hooks/useUserRole";
import Loading from "../../../components/Loading";

// Active button
const navButtonClass = ({ isActive }) =>
    `flex items-center gap-3 w-full px-4 rounded-lg transition-all duration-200 transform
     ${isActive
        ? 'bg-yellow-400 text-gray-900 font-semibold shadow-md scale-105'
        : 'text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105'
    }`;

const Navbar = () => {
    const { role, roleLoading } = useUserRole();
    const { user, logOut } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    if (roleLoading) {
        return <Loading></Loading>
    }

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log("Logged out successfully");
                setIsDropdownOpen(false);
            })
            .catch(err => console.log(err.message))
    }

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeAllMenus = () => {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
    };

    const navItems = (
        <>
            <li><NavLink to="/" end className={navButtonClass}>Home</NavLink></li>
            <li><NavLink to="/sendParcel" className={navButtonClass}>Send A Parcel</NavLink></li>
            <li><NavLink to="/coverage" className={navButtonClass}>Coverage</NavLink></li>
            <li><NavLink to="/beARider" className={navButtonClass}>Be A Rider</NavLink></li>
            {
                user && (
                    <li><NavLink to="/dashboard" end className={navButtonClass}>Dashboard</NavLink></li>
                )
            }
        </>
    );

    return (
        <div className="navbar z-30 bg-gradient-to-r from-gray-500 via-gray-700 to-gray-800 text-white shadow-lg mt-2 w-full transition-all duration-300">
            {/* Mobile Menu Button */}
            <div className="navbar-start px-4 lg:px-8">
                <div className="flex items-center justify-between w-full lg:w-auto">
                    <ProFastLogo />
                    <button
                        className="lg:hidden text-white p-2 rounded-md hover:bg-gray-700 hover:scale-105 transition-all duration-200"
                        onClick={toggleMobileMenu}
                    >
                        {isMobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Desktop Navigation */}
            <div className="navbar-center hidden lg:flex px-8">
                <ul className="menu menu-horizontal text-[16px] font-medium space-x-2">
                    {navItems}
                </ul>
            </div>

            {/* User Profile & Login */}
            <div className="navbar-end px-4 lg:px-8">
                {
                    user ? (
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 hover:scale-105 transition-all duration-200"
                            >
                                {
                                    user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName || "User"}
                                            className="h-8 w-8 rounded-full border-2 border-yellow-400 object-cover"
                                        />

                                    ) : (
                                        <FaUserCircle className="h-8 w-8 text-yellow-400" />
                                    )
                                }
                                <span className="hidden sm:block text-white font-medium">
                                    {user.displayName || "User"}
                                </span>
                                <FaChevronDown className={`h-3 w-3 text-white transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 text-black transition-all duration-200 transform origin-top scale-100">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900">{user.displayName || "User"}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                        {
                                            user && (role === 'admin' || role === 'rider') && (
                                                <div className="mt-2 inline-flex items-center gap-2 text-xs font-semibold px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full shadow-sm">
                                                    <FaUserShield className="text-yellow-600" />
                                                    {role.charAt(0).toUpperCase() + role.slice(1)} {/* Capitalize first letter */}
                                                </div>
                                            )
                                        }

                                    </div>
                                    <Link
                                        to="/dashboard"
                                        onClick={closeAllMenus}
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:scale-105 transition-all duration-200"
                                    >
                                        <FaUserCircle className="mr-2 h-4 w-4 text-gray-400" />
                                       My Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogOut}
                                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 hover:scale-105 transition-all duration-200"
                                    >
                                        <FaSignOutAlt className="mr-2 h-4 w-4" />
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="btn bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded transition-all duration-200 transform hover:scale-105 active:scale-95"
                        >
                            Login
                        </Link>
                    )
                }
            </div>

            {/* Mobile Menu */}
            {
                isMobileMenuOpen && (
                    <div className="lg:hidden bg-gray-800/95 w-full absolute top-16 left-0 z-40 shadow-lg transition-all duration-300 transform origin-top scale-100">
                        <ul className="flex flex-col p-4 space-y-2 text-white" onClick={closeAllMenus}>
                            {navItems}
                            {user && (
                                <div className="px-4 py-3 border-t border-gray-700 mt-2">
                                    <div className="flex items-center space-x-3 mb-2">
                                        {user.photoURL ? (
                                            <img src={user.photoURL} alt={user.displayName} className="h-8 w-8 rounded-full object-cover" />
                                        ) : (
                                            <FaUserCircle className="h-8 w-8 text-yellow-400" />
                                        )}
                                        <p className="text-sm font-medium">{user.displayName || "User"}</p>
                                    </div>
                                    <button
                                        onClick={handleLogOut}
                                        className="flex items-center w-full px-2 py-1 text-sm text-red-500 hover:bg-gray-700 hover:scale-105 rounded transition-all duration-200"
                                    >
                                        <FaSignOutAlt className="mr-2 h-4 w-4" />
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </ul>
                    </div>
                )
            }

            {/* Overlay for closing menus when clicking outside */}
            {
                (isDropdownOpen || isMobileMenuOpen) && (
                    <div className="fixed inset-0 z-30 lg:hidden" onClick={closeAllMenus}></div>
                )
            }
        </div>
    );
};

export default Navbar;
