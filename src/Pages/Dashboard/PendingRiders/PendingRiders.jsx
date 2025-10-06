import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaCheck, FaEye, FaTimes } from "react-icons/fa";

const PendingRiders = () => {
    const [selectedRider, setSelectedRider] = useState(null);
    const axiosSecure = useAxiosSecure();

    const { data: pendingRiders = [], isLoading, refetch } = useQuery({
        queryKey: ["pendingRiders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/pending");
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <progress className="progress w-56"></progress>
            </div>
        );
    }

    const handleApprove = (id, email) => {
        Swal.fire({
            title: "Approve Rider?",
            text: "This rider will be approved and gain full access.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#22c55e",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/riders/approve/${id}`, { email }).then((res) => {
                    if (res.data.riderUpdated > 0) {
                        refetch();
                        Swal.fire("Approved!", "Rider has been approved.", "success");
                    }
                });
            }
        });
    };

    const handleReject = (id) => {
        Swal.fire({
            title: "Reject Application?",
            text: "This rider's application will be permanently removed.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, reject",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/riders/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire("Rejected", "Rider application has been removed.", "success");
                    }
                });
            }
        });
    };

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 text-center sm:text-left">
                Pending Riders
            </h2>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border">
                <table className="table w-full text-sm">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Region</th>
                            <th>District</th>
                            <th>Phone</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            pendingRiders.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="text-center text-gray-500 py-8 text-sm sm:text-base"
                                    >
                                        No pending rider applications.
                                    </td>
                                </tr>
                            ) : (
                                pendingRiders.map((rider, index) => (
                                    <tr key={rider._id}>
                                        <td>{index + 1}</td>
                                        <td className="whitespace-nowrap">{rider.name}</td>
                                        <td className="whitespace-nowrap">{rider.email}</td>
                                        <td>{rider.region}</td>
                                        <td>{rider.district}</td>
                                        <td className="whitespace-nowrap">{rider.phone}</td>
                                        <td>
                                            <div className="flex justify-center gap-2">
                                                {/* View */}
                                                <button
                                                    onClick={() => setSelectedRider(rider)}
                                                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition transform hover:scale-105 focus:outline-none"
                                                    title="View Details"
                                                >
                                                    <FaEye size={14} />
                                                </button>

                                                {/* Approve */}
                                                <button
                                                    onClick={() => handleApprove(rider._id, rider.email)}
                                                    className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition transform hover:scale-105 focus:outline-none"
                                                    title="Approve Rider"
                                                >
                                                    <FaCheck size={14} />
                                                </button>

                                                {/* Reject */}
                                                <button
                                                    onClick={() => handleReject(rider._id)}
                                                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition transform hover:scale-105 focus:outline-none"
                                                    title="Reject Application"
                                                >
                                                    <FaTimes size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {
                selectedRider && (
                    <dialog
                        open
                        className="modal modal-open flex items-center justify-center p-2 sm:p-4"
                    >
                        <div className="modal-box w-full sm:max-w-lg md:max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl">
                            <h3 className="font-bold text-lg sm:text-xl mb-4 text-gray-800 text-center">
                                Rider Details — {selectedRider.name}
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-sm sm:text-base">
                                <p><strong>Email:</strong> {selectedRider.email}</p>
                                <p><strong>Phone:</strong> {selectedRider.phone}</p>
                                <p><strong>Region:</strong> {selectedRider.region}</p>
                                <p><strong>District:</strong> {selectedRider.district}</p>
                                <p><strong>Age:</strong> {selectedRider.age}</p>
                                <p><strong>NID:</strong> {selectedRider.nid}</p>
                                <p><strong>Bike Brand:</strong> {selectedRider.bikeBrand}</p>
                                <p><strong>Bike Reg No:</strong> {selectedRider.bikeRegNo}</p>
                                <p><strong>License No:</strong> {selectedRider.licenseNo}</p>
                            </div>

                            <div className="modal-action mt-6 flex justify-center">
                                <button
                                    className="btn btn-neutral w-full sm:w-auto"
                                    onClick={() => setSelectedRider(null)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </dialog>
                )
            }
        </div>
    );
};

export default PendingRiders;
