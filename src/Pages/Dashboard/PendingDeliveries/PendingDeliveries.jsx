import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const PendingDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch rider tasks
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["riderTasks", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/rider/parcels?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Mutation to update status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      const res = await axiosSecure.patch(`/parcels/update-status/${id}`, {
        newStatus,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["riderTasks", user?.email]);
      refetch();
    },
  });

  const handleUpdateStatus = (id, newStatus) => {
    Swal.fire({
      title: newStatus === "in_transit" ? "Pick up this parcel?" : "Deliver this parcel?",
      text:
        newStatus === "in_transit"
          ? "Once picked up, this parcel will move to In Transit status."
          : "Once delivered, this parcel will move to Delivered status.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: newStatus === "in_transit" ? "#2563eb" : "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: newStatus === "in_transit" ? "Yes, Picked Up" : "Yes, Delivered",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate(
          { id, newStatus },
          {
            onSuccess: () => {
              Swal.fire({
                title: "Success!",
                text:
                  newStatus === "in_transit"
                    ? "Parcel marked as Picked Up."
                    : "Parcel marked as Delivered.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
            },
          }
        );
      }
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "assigned":
        return (
          <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
            Assigned
          </span>
        );
      case "in_transit":
        return (
          <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
            In Transit
          </span>
        );
      case "delivered":
        return (
          <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
            Delivered
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-16">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Pending Deliveries</h2>
      {parcels.length === 0 ? (
        <p className="text-gray-600">No pending deliveries found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="p-3 text-left">Tracking ID</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Receiver</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {parcels.map((parcel) => (
                <tr key={parcel._id} className="hover:bg-gray-50 transition">
                  <td className="p-3 font-medium text-gray-900">
                    {parcel.tracking_id}
                  </td>
                  <td className="p-3">{parcel.title}</td>
                  <td className="p-3">{parcel.receiverName}</td>
                  <td className="p-3">{getStatusBadge(parcel.delivery_status)}</td>
                  <td className="p-3">
                    {
                      parcel.delivery_status === "assigned" && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(parcel._id, "in_transit")
                          }
                          className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                          Mark as Picked Up
                        </button>
                      )
                    }
                    {
                      parcel.delivery_status === "in_transit" && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(parcel._id, "delivered")
                          }
                          className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                          Mark as Delivered
                        </button>
                      )
                    }
                    {
                      parcel.delivery_status === "delivered" && (
                        <span className="text-gray-500 text-xs">Completed</span>
                      )
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingDeliveries;
