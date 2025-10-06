import { useState } from "react";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [riders, setRiders] = useState([]);

  // ✅ Fetch parcels using TanStack Query
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?payment_status=paid&delivery_status=not_collected"
      );
      return res.data;
    },
  });

  // ✅ Fetch riders for modal (simple fetch, no need for query since it's per-parcel)
  const fetchRiders = async (district) => {
    const res = await axiosSecure.get(`/riders?district=${district}`);
    setRiders(res.data);
  };

  // ✅ Assign rider mutation
  const assignMutation = useMutation({
    mutationFn: async ({ parcelId, rider }) => {
      return axiosSecure.patch(`/parcels/assign-rider/${parcelId}`, {
        riderId: rider._id,
      });
    },
    onSuccess: (_, { rider }) => {
      Swal.fire("Assigned!", `${rider.name} assigned successfully`, "success");
      // 🔄 Refetch parcels list so UI is updated
      queryClient.invalidateQueries(["assignableParcels"]);
      document.getElementById("assignModal").close();
    },
    onError: () => {
      Swal.fire("Error", "Failed to assign rider", "error");
    },
  });

  // Open modal
  const handleAssignClick = (parcel) => {
    setSelectedParcel(parcel);
    fetchRiders(parcel.senderServiceCenter); // using service center as district
    document.getElementById("assignModal").showModal();
  };

  if (isLoading) {
    return <p className="p-4">Loading parcels...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Assign Riders to Parcels</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Title</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Cost</th>
              <th>Assigned Rider</th>
              <th>Rider Email</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td>{parcel.tracking_id}</td>
                <td>{parcel.title}</td>
                <td>{parcel.senderName}</td>
                <td>{parcel.receiverName}</td>
                <td>${parcel.cost}</td>
                <td>{parcel.assignedRiderName || "Not assigned"}</td>
                <td>{parcel.assignedRiderEmail || "Not assigned"}</td>
                <td>{new Date(parcel.creation_date).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleAssignClick(parcel)}
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog id="assignModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Assign Rider for {selectedParcel?.title}
          </h3>
          <div className="mt-4 space-y-2">
            {riders.length > 0 ? (
              riders.map((rider) => (
                <div
                  key={rider._id}
                  className="flex justify-between items-center border p-2 rounded"
                >
                  <span>
                    {rider.name} ({rider.email})
                  </span>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() =>
                      assignMutation.mutate({ parcelId: selectedParcel._id, rider })
                    }
                    disabled={assignMutation.isPending}
                  >
                    {assignMutation.isPending ? "Assigning..." : "Assign"}
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No riders available in this district
              </p>
            )}
          </div>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => document.getElementById("assignModal").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRider;
