import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const CompletedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch completed deliveries with earnings
    const { data: deliveries = [], isLoading: loadingDeliveries } = useQuery({
        queryKey: ["completedDeliveries", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/rider/completed-deliveries?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // Fetch rider earnings summary
    const { data: earnings, isLoading: loadingEarnings } = useQuery({
        queryKey: ["riderEarnings", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/rider/earnings`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // Cashout mutation
    const cashoutMutation = useMutation({
        mutationFn: async (amount) => {
            return axiosSecure.post("/rider/cashout", {
                riderEmail: user.email,
                amount,
            });
        },
        onSuccess: () => {
            Swal.fire("Success", "Cashout request submitted!", "success");
            queryClient.invalidateQueries(["riderEarnings", user.email]);
            queryClient.invalidateQueries(["completedDeliveries", user.email]);
        },
        onError: () => {
            Swal.fire("Error", "Cashout failed", "error");
        },
    });

    if (loadingDeliveries || loadingEarnings) {
        return <p className="p-4">Loading data...</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Completed Deliveries & Earnings</h2>

            {/* Earnings summary */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-green-100 rounded shadow">
                    <h3 className="font-semibold">Total Earnings</h3>
                    <p className="text-2xl font-bold text-green-600">
                        ${earnings?.totalEarning?.toFixed(2) || 0}
                    </p>
                </div>
                <div className="p-4 bg-blue-100 rounded shadow">
                    <h3 className="font-semibold">Total Cashout</h3>
                    <p className="text-2xl font-bold text-blue-600">
                        ${earnings?.totalCashout?.toFixed(2) || 0}
                    </p>
                </div>
                <div className="p-4 bg-yellow-100 rounded shadow">
                    <h3 className="font-semibold">Pending Balance</h3>
                    <p className="text-2xl font-bold text-yellow-600">
                        ${earnings?.pendingBalance?.toFixed(2) || 0}
                    </p>
                </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-sm">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    {/* Balance Info */}
                    <div className="flex-1">
                        <p className="text-gray-600 text-xl font-bold mb-2">CASHOUT AVAILABLE</p>
                        <div className="flex items-baseline gap-3">
                            <span className="text-4xl text-green-600 font-bold">
                                ${earnings?.pendingBalance?.toFixed(2) || '0.00'}
                            </span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        className={`relative min-w-[140px] px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${!earnings || earnings.pendingBalance <= 0 || cashoutMutation.isPending
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed hover:scale-100'
                                : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl focus:ring-green-500'
                            }
      `}
                        disabled={!earnings || earnings.pendingBalance <= 0 || cashoutMutation.isPending}
                        onClick={() => cashoutMutation.mutate(earnings.pendingBalance)}
                    >
                        {cashoutMutation.isPending ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 6l2-3m-2 3l-2-3m2 3v2m0-6V6" />
                                </svg>
                                Cashout
                            </span>
                        )}
                    </button>
                </div>
            </div>


            {/* Deliveries table */}
            <div className="overflow-x-auto mt-8">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Tracking ID</th>
                            <th>Title</th>
                            <th>Sender</th>
                            <th>Receiver</th>
                            <th>Cost</th>
                            <th>Earning</th>
                            <th>Status</th>
                            <th>Delivered Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveries.length > 0 ? (
                            deliveries.map((parcel) => (
                                <tr key={parcel._id}>
                                    <td>{parcel.tracking_id}</td>
                                    <td>{parcel.title}</td>
                                    <td>{parcel.senderRegion}</td>
                                    <td>{parcel.receiverRegion}</td>
                                    <td>${parcel.cost}</td>
                                    <td className="font-semibold text-green-600">
                                        ${parcel.riderEarning?.toFixed(2)}
                                    </td>
                                    <td className="capitalize">{parcel.delivery_status}</td>
                                    <td>
                                        {parcel.delivered_date
                                            ? new Date(parcel.delivered_date).toLocaleString()
                                            : "N/A"}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center text-gray-500">
                                    No completed deliveries found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompletedDeliveries;
