import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMemo } from "react";

const MyEarning = () => {
  const axiosSecure = useAxiosSecure();

  const { data: earnings, isLoading } = useQuery({
    queryKey: ["riderEarnings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/rider/earnings");
      return res.data;
    },
  });

  const analysis = useMemo(() => {
    if (!earnings?.earningsByDate) return {};

    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const filterAndSum = (fromDate) =>
      earnings.earningsByDate
        .filter((e) => new Date(e.date) >= fromDate)
        .reduce((sum, e) => sum + e.amount, 0);

    return {
      today: filterAndSum(startOfDay),
      week: filterAndSum(startOfWeek),
      month: filterAndSum(startOfMonth),
      year: filterAndSum(startOfYear),
    };
  }, [earnings]);

  if (isLoading) return <p className="text-center py-10 text-gray-600">Loading earnings...</p>;

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">My Earnings</h2>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 shadow rounded-lg p-4 text-center">
          <h3 className="font-semibold text-gray-700">Total Earning</h3>
          <p className="text-2xl font-bold text-blue-700 mt-1">
            ${earnings.totalEarning.toFixed(2)}
          </p>
        </div>

        <div className="bg-green-100 shadow rounded-lg p-4 text-center">
          <h3 className="font-semibold text-gray-700">Total Cashout</h3>
          <p className="text-2xl font-bold text-green-700 mt-1">
            ${earnings.totalCashout.toFixed(2)}
          </p>
        </div>

        <div className="bg-yellow-100 shadow rounded-lg p-4 text-center">
          <h3 className="font-semibold text-gray-700">Pending Balance</h3>
          <p className="text-2xl font-bold text-yellow-700 mt-1">
            ${earnings.pendingBalance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Analysis */}
      <h3 className="text-lg font-bold mb-3 text-center sm:text-left">Earning Analysis</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { title: "Today", value: analysis.today },
          { title: "This Week", value: analysis.week },
          { title: "This Month", value: analysis.month },
          { title: "This Year", value: analysis.year },
        ].map((item, idx) => (
          <div key={idx} className="bg-base-200 rounded-lg p-3 text-center shadow">
            <div className="text-gray-600 font-medium">{item.title}</div>
            <div className="text-xl font-bold text-blue-600">${item.value?.toFixed(2)}</div>
          </div>
        ))}
      </div>

      {/* History Table */}
      <h3 className="text-lg font-bold mb-3 text-center sm:text-left">Completed Deliveries</h3>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="table w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Earning</th>
            </tr>
          </thead>
          <tbody>
            {earnings.earningsByDate.map((e, idx) => (
              <tr
                key={idx}
                className="hover:bg-blue-50 transition-colors duration-200 border-b"
              >
                <td className="p-3">{new Date(e.date).toLocaleString()}</td>
                <td className="p-3 font-semibold">${e.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEarning;
