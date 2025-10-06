import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import { 
  FaUserCircle, 
  FaBiking, 
  FaBox, 
  FaCheckCircle, 
  FaShippingFast, 
  FaHourglassHalf, 
  FaMoneyBillWave, 
  FaWallet 
} from "react-icons/fa";

const COLORS = ["#10B981", "#3B82F6", "#FACC15", "#EF4444"];

const RiderDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["riderDashboard", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/dashboard/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;

  const chartData = [
    { name: "Delivered", value: stats.delivered || 0 },
    { name: "In Transit", value: stats.inTransit || 0 },
    { name: "Pending", value: stats.pending || 0 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* Rider Profile Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 mb-6 md:mb-8 text-center sm:text-left">
          <div className="flex items-center gap-4 mb-3 sm:mb-0">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Rider Avatar"
                className="w-16 h-16 rounded-full border-2 border-yellow-300"
              />
            ) : (
              <FaUserCircle className="text-yellow-500 text-5xl" />
            )}
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 flex items-center gap-2">
                <FaBiking className="text-yellow-500" />
                Welcome, {user?.displayName || "Rider"}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">{user?.email}</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Member since: <span className="text-gray-700 font-medium">2024</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-4 sm:p-5 text-center hover:shadow-md transition-transform hover:scale-[1.02] duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
              <FaBox className="text-blue-600 text-xl" />
            </div>
            <p className="text-gray-600 text-xs sm:text-sm mb-1">Assigned Parcels</p>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700">{stats.totalAssigned || 0}</h3>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-4 sm:p-5 text-center hover:shadow-md transition-transform hover:scale-[1.02] duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
              <FaCheckCircle className="text-green-600 text-xl" />
            </div>
            <p className="text-gray-600 text-xs sm:text-sm mb-1">Delivered</p>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700">{stats.delivered || 0}</h3>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-yellow-100 p-4 sm:p-5 text-center hover:shadow-md transition-transform hover:scale-[1.02] duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-3">
              <FaShippingFast className="text-yellow-600 text-xl" />
            </div>
            <p className="text-gray-600 text-xs sm:text-sm mb-1">In Transit</p>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-700">{stats.inTransit || 0}</h3>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-4 sm:p-5 text-center hover:shadow-md transition-transform hover:scale-[1.02] duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-3">
              <FaHourglassHalf className="text-red-600 text-xl" />
            </div>
            <p className="text-gray-600 text-xs sm:text-sm mb-1">Pending</p>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-700">{stats.pending || 0}</h3>
          </div>
        </div>

        {/* Earnings and Cashout */}
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-gradient-to-r from-green-100 to-green-50 border border-green-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-gray-700 font-medium mb-2 flex items-center gap-2">
              <FaMoneyBillWave className="text-green-500" />
              Total Earnings
            </h3>
            <p className="text-3xl font-bold text-green-600">
              ৳ {stats.totalEarnings?.toLocaleString() || 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">Total income from completed deliveries</p>
          </div>

          <div className="bg-gradient-to-r from-indigo-100 to-indigo-50 border border-indigo-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-gray-700 font-medium mb-2 flex items-center gap-2">
              <FaWallet className="text-indigo-500" />
              Cashout Status
            </h3>
            <p className="text-lg font-semibold text-indigo-700">
              {stats.cashoutStatus || "No Request"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Amount: ৳ {stats.cashoutAmount || 0}
            </p>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
            <FaBiking className="text-yellow-500" />
            Delivery Status Overview
          </h2>

          <div className="w-full h-[350px] md:h-[400px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboardHome;
