import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import { 
  FaUserShield, 
  FaBox, 
  FaChartPie, 
  FaCheckCircle, 
  FaShippingFast, 
  FaHourglassHalf, 
  FaTimesCircle 
} from "react-icons/fa";

const COLORS = ["#3B82F6", "#10B981", "#FACC15", "#F87171", "#A78BFA"];

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: statusCounts = [], isLoading } = useQuery({
    queryKey: ["deliveryStatusCounts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/deliveries/status-count");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const totalParcels = statusCounts.reduce((sum, item) => sum + item.count, 0);

  const iconMap = {
    delivered: <FaCheckCircle className="text-green-600 text-xl" />,
    in_transit: <FaShippingFast className="text-blue-600 text-xl" />,
    pending: <FaHourglassHalf className="text-yellow-600 text-xl" />,
    cancelled: <FaTimesCircle className="text-red-600 text-xl" />,
    assigned: <FaBox className="text-purple-600 text-xl" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 mb-6 md:mb-8 text-center sm:text-left">
          <div className="flex items-center gap-4 mb-3 sm:mb-0">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Admin Avatar"
                className="w-16 h-16 rounded-full border-2 border-purple-300"
              />
            ) : (
              <FaUserShield className="text-purple-500 text-5xl" />
            )}
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 flex items-center gap-2">
                <FaUserShield className="text-purple-500" />
                Admin Dashboard
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">{user?.email || "admin@profast.com"}</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Member since: <span className="text-gray-700 font-medium">2023</span>
          </div>
        </div>

        {/* Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
          {statusCounts.map((item, index) => (
            <div
              key={item.status}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 text-center hover:shadow-md transition-transform hover:scale-[1.02] duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3"
                style={{ backgroundColor: COLORS[index % COLORS.length] + "20" }}
              >
                {iconMap[item.status] || <FaBox className="text-gray-400 text-xl" />}
              </div>
              <p className="text-gray-600 text-xs sm:text-sm mb-1 capitalize">
                {item.status.replace("_", " ")}
              </p>
              <h3
                className="text-xl sm:text-2xl md:text-3xl font-bold"
                style={{ color: COLORS[index % COLORS.length] }}
              >
                {item.count}
              </h3>
            </div>
          ))}

          {/* Total Parcels */}
          <div className="bg-green-50 rounded-2xl shadow-sm border border-green-200 p-4 sm:p-5 text-center hover:shadow-md transition-transform hover:scale-[1.02] duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
              <FaChartPie className="text-green-600 text-xl" />
            </div>
            <p className="text-gray-600 text-xs sm:text-sm mb-1">Total Parcels</p>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700">
              {totalParcels}
            </h3>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
            <FaChartPie className="text-purple-500" />
            Delivery Status Distribution
          </h2>

          <div className="w-full h-[350px] md:h-[400px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={statusCounts}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  label={({ name, percent }) =>
                    `${name.replace("_", " ")} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {statusCounts.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value}`, name.replace("_", " ")]}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
