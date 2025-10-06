import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const ActiveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState("");
    const { isPending, refetch, data: activeRiders = [] } = useQuery({
        queryKey: ["activeRiders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/active");
            return res.data;
        },
    });

    if (isPending) {
        return <progress className="progress w-56 mx-auto mt-12"></progress>;
    }

    // Handle deactivation
    const handleDeactivate = (id, email) => {
        Swal.fire({
            title: "Deactivate Rider?",
            text: "This rider will be deactivated and moved to pending list.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, deactivate",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/riders/deactivate/${id}`, {email})
                    .then((res) => {
                        if (res.data.riderUpdated > 0) {                            
                            Swal.fire("Deactivated", "Rider has been deactivated.", "success");
                            refetch();
                        }
                    });
            }
        });
    };

    // Filter riders by search input
    const filteredRiders = activeRiders.filter(
        (rider) =>
            rider.name?.toLowerCase().includes(search.toLowerCase()) ||
            rider.email?.toLowerCase().includes(search.toLowerCase()) ||
            rider.phone?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Active Riders</h2>

            {/* Search bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name, email, or phone"
                    className="input input-bordered w-full max-w-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Riders table */}
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Region</th>
                            <th>District</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredRiders.map((rider, index) => (
                                <tr key={rider._id}>
                                    <td>{index + 1}</td>
                                    <td>{rider.name}</td>
                                    <td>{rider.email}</td>
                                    <td>{rider.region}</td>
                                    <td>{rider.district}</td>
                                    <td>{rider.phone}</td>
                                    <td>
                                        <span className="badge badge-success">
                                            {rider.status === "approved" ? "Active" : rider.status}
                                        </span>
                                    </td>


                                    <td className="text-center">
                                        <button
                                            onClick={() => handleDeactivate(rider._id, rider.email)}
                                            className="btn btn-sm btn-warning text-white"
                                        >
                                            Deactivate
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                        {

                            filteredRiders.length === 0 && (
                                <tr>
                                    <td colSpan="8" className="text-center text-gray-500 py-4">
                                        No matching riders found.
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActiveRiders;
