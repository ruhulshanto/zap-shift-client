import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import { FaBox, FaMoneyBill, FaCheckCircle, FaShippingFast, FaUserCircle } from "react-icons/fa";

const UserDashboardHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch user dashboard summary
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ["userDashboard", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/dashboard/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) return <Loading />;

    const formatStatus = (status) =>
        status
            .split("_")
            .map((w) => w[0].toUpperCase() + w.slice(1))
            .join(" ");

    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered': return 'text-green-600 bg-green-50 border-green-200';
            case 'in_transit': return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'assigned': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'pending': return 'text-gray-600 bg-gray-50 border-gray-200';
            default: return 'text-purple-600 bg-purple-50 border-purple-200';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-3 sm:p-4 md:p-6">
            <div className="max-w-7xl mx-auto">

                {/* User Profile Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 mb-6 md:mb-8 text-center sm:text-left">
                    <div className="flex items-center gap-4 mb-3 sm:mb-0">
                        {user?.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt="User Avatar"
                                className="w-16 h-16 rounded-full border-2 border-blue-200"
                            />
                        ) : (
                            <FaUserCircle className="text-blue-500 text-5xl" />
                        )}
                        <div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
                                Welcome, {user?.displayName || "User"}
                            </h1>
                            <p className="text-gray-600 text-sm sm:text-base">{user?.email}</p>
                        </div>
                    </div>
                    <div className="text-sm text-gray-500">
                        Member since: <span className="text-gray-700 font-medium">2024</span>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-4 sm:p-5 text-center hover:shadow-md transition-transform hover:scale-[1.02] duration-300">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                            <FaBox className="text-blue-600 text-xl" />
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm mb-1">Total Parcels</p>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700">{stats.totalParcels || 0}</h3>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-yellow-100 p-4 sm:p-5 text-center hover:shadow-md transition-transform hover:scale-[1.02] duration-300">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-3">
                            <FaShippingFast className="text-yellow-600 text-xl" />
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm mb-1">In Transit</p>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-700">{stats.inTransit || 0}</h3>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-4 sm:p-5 text-center hover:shadow-md transition-transform hover:scale-[1.02] duration-300">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                            <FaCheckCircle className="text-green-600 text-xl" />
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm mb-1">Delivered</p>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700">{stats.delivered || 0}</h3>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-4 sm:p-5 text-center hover:shadow-md transition-transform hover:scale-[1.02] duration-300">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                            <FaMoneyBill className="text-purple-600 text-xl" />
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm mb-1">Total Spent</p>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-700">৳{stats.totalSpent || 0}</h3>
                    </div>
                </div>

                {/* Recent Parcels */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 sm:p-6 border-b border-gray-100">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
                            <FaBox className="text-blue-500" />
                            Recent Parcels
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                                <tr>
                                    <th className="p-3 sm:p-4 text-left font-medium">Tracking ID</th>
                                    <th className="p-3 sm:p-4 text-left font-medium hidden sm:table-cell">Title</th>
                                    <th className="p-3 sm:p-4 text-left font-medium">Status</th>
                                    <th className="p-3 sm:p-4 text-left font-medium">Cost</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {(stats.recentParcels || []).map((parcel) => (
                                    <tr key={parcel._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-3 sm:p-4 font-medium text-blue-600">{parcel.tracking_id}</td>
                                        <td className="p-3 sm:p-4 hidden sm:table-cell text-gray-700">{parcel.title}</td>
                                        <td className="p-3 sm:p-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(parcel.delivery_status)}`}>
                                                {formatStatus(parcel.delivery_status)}
                                            </span>
                                        </td>
                                        <td className="p-3 sm:p-4 font-semibold text-gray-900">৳{parcel.cost}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {(stats.recentParcels || []).length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <FaBox className="text-3xl mx-auto mb-2 text-gray-300" />
                                <p>No parcels found</p>
                                <p className="text-sm">Your recent parcels will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboardHome;
