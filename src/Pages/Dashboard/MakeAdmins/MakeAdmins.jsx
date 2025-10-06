import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MakeAdmins = () => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { user: currentUser } = useAuth(); // ✅ Get logged-in user

    const handleSearch = async () => {
        if (!search) return;
        setLoading(true);
        try {
            const res = await axiosSecure.get(`/users/search?email=${search}`);
            setUsers(res.data);
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Could not fetch users. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };

    const createAdmin = async (email) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You are about to make ${email} an admin.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch("/users/make-admin", { email });
                    if (res.data.updated > 0) {
                        Swal.fire("Success", `${email} is now an admin!`, "success");
                        handleSearch();
                    } else {
                        Swal.fire("Info", "The operation could not be completed.", "info");
                    }
                } catch (err) {
                    console.error(err);
                    Swal.fire("Error", "An error occurred while making the user an admin.", "error");
                }
            }
        });
    };

    const removeAdmin = async (email) => {
        // Prevent self-removal on client-side
        if (email === currentUser?.email) {
            Swal.fire("Warning", "You cannot remove yourself as admin.", "warning");
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: `You are about to remove ${email} from the admin role.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove admin!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch("/users/remove-admin", { email });

                    if (res.data.updated > 0) {
                        Swal.fire("Updated", `${email} is no longer an admin.`, "success");
                        handleSearch();
                    } else {
                        Swal.fire("Info", "The operation could not be completed.", "info");
                    }
                } catch (err) {
                    console.error(err);

                    if (err.response?.data?.error) {
                        Swal.fire("Warning", err.response.data.error, "warning");
                    } else {
                        Swal.fire("Error", "An unexpected error occurred.", "error");
                    }
                }
            }
        });
    };

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
                Manage Admins
            </h2>

            {/* Search box */}
            <div className="flex flex-col sm:flex-row gap-2 mb-6 w-full">
                <input
                    type="text"
                    placeholder="Search by user email..."
                    className="input input-bordered w-full sm:max-w-md focus:ring-2 focus:ring-primary"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                    onClick={handleSearch}
                    className="btn btn-primary w-full sm:w-auto"
                    disabled={loading || !search}
                >
                    {loading ? (
                        <span className="loading loading-ring loading-sm"></span>
                    ) : (
                        "Search"
                    )}
                </button>
            </div>

            {/* Results Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="table table-zebra w-full min-w-[600px]">
                    <thead className="bg-base-200 text-base-content">
                        <tr>
                            <th className="p-4">Email</th>
                            <th className="p-4">Created At</th>
                            <th className="p-4">Role</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center text-gray-500 py-6">
                                    No users found. Please enter an email and click search.
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user._id} className="hover">
                                    <td className="p-4 font-medium break-words">{user.email}</td>
                                    <td className="p-4 text-gray-600">
                                        {user?.created_at
                                            ? new Date(user.created_at).toLocaleString()
                                            : "N/A"}
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`badge ${
                                                user.role === "admin"
                                                    ? "badge-secondary"
                                                    : "badge-ghost"
                                            }`}
                                        >
                                            {user.role || "user"}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        {user.role === "admin" ? (
                                            user.email === currentUser?.email ? (
                                                <button
                                                    className="btn btn-disabled btn-sm"
                                                    disabled
                                                >
                                                    You
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-warning btn-sm"
                                                    onClick={() => removeAdmin(user.email)}
                                                >
                                                    Remove Admin
                                                </button>
                                            )
                                        ) : (
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => createAdmin(user.email)}
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MakeAdmins;
