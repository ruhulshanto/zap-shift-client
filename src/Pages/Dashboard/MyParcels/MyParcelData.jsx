import { useState } from "react";
import { FaEye, FaTrash, FaMoneyBill, FaCheckCircle, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const MyParcelData = ({ parcel, idx, refetch }) => {
    const [selectedParcel, setSelectedParcel] = useState(null); // modal data
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    if (!parcel) return null;

    const {
        _id,
        senderName,
        senderContact,
        receiverName,
        receiverContact,
        type,
        weight,
        description,
        creation_date,
        cost,
        payment_status,
        delivery_status,
        tracking_id,
        assignedRiderName,
    } = parcel;

    const formattedDate = new Date(creation_date).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const deliveryBadgeMap = {
        not_collected: { text: "Not Collected", className: "badge-warning" },
        in_transit: { text: "In Transit", className: "badge-info" },
        delivered: { text: "Delivered", className: "badge-success" },
    };

    const deliveryBadge = deliveryBadgeMap[delivery_status] ? (
        <span
            className={`badge ${deliveryBadgeMap[delivery_status].className} p-4 rounded text-xs font-bold`}
        >
            {deliveryBadgeMap[delivery_status].text}
        </span>
    ) : (
        <span className="badge badge-ghost p-4 rounded text-xs font-bold">
            {delivery_status}
        </span>
    );

    const handlePay = (id) => {
        navigate(`/dashboard/payment/${id}`);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire("Deleted!", "Your parcel has been deleted.", "success");
                        refetch();
                    }
                });
            }
        });
    };

    return (
        <>
            <tr>
                <th>{idx + 1}</th>
                <td>{senderName}</td>
                <td className="capitalize">{type}</td>
                <td>{formattedDate}</td>
                <td>৳{cost}</td>
                <td>{deliveryBadge}</td>
                <td>
                    <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
                        <button
                            onClick={() => setSelectedParcel(parcel)}
                            className="btn btn-sm btn-outline flex items-center gap-2"
                        >
                            <FaEye /> View
                        </button>

                        {payment_status === "paid" ? (
                            <span className="btn btn-sm btn-success text-white font-bold flex items-center gap-2 cursor-default">
                                <FaCheckCircle /> Paid
                            </span>
                        ) : (
                            <button
                                onClick={() => handlePay(_id)}
                                className="btn btn-sm btn-warning text-white font-bold flex items-center gap-2"
                            >
                                <FaMoneyBill /> Pay
                            </button>
                        )}

                        <button
                            onClick={() => handleDelete(_id)}
                            className="btn btn-sm btn-error text-white flex items-center gap-2"
                        >
                            <FaTrash /> Delete
                        </button>
                    </div>
                </td>
            </tr>

            {/* ======= Modal ======= */}
            {selectedParcel && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100/30 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
                        {/* Header */}
                        <div className="flex justify-between items-center p-5 border-b">
                            <h3 className="text-xl font-semibold text-gray-800">
                                Parcel #{tracking_id || _id}
                            </h3>
                            <button
                                onClick={() => setSelectedParcel(null)}
                                className="btn btn-circle btn-ghost hover:bg-gray-100 text-gray-500"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-5 space-y-3 text-sm text-gray-700">
                            <p><strong>Sender:</strong> {senderName} ({senderContact})</p>
                            <p><strong>Receiver:</strong> {receiverName} ({receiverContact})</p>
                            <p><strong>Type:</strong> {type}</p>
                            <p><strong>Weight:</strong> {weight} kg</p>
                            <p><strong>Cost:</strong> ৳{cost}</p>
                            <p>
                                <strong>Payment:</strong>{" "}
                                <span className={`badge ${payment_status === "paid" ? "badge-success" : "badge-warning"}`}>
                                    {payment_status || "pending"}
                                </span>
                            </p>
                            <p>
                                <strong>Delivery:</strong> <span className="bg-amber-300 rounded-2xl">{deliveryBadge}</span>
                            </p>
                            {assignedRiderName && (
                                <p><strong>Rider:</strong> {assignedRiderName}</p>
                            )}
                            <p><strong>Created:</strong> {formattedDate}</p>
                            {description && (
                                <p className="text-gray-600 mt-2">
                                    <strong>Note:</strong> {description}
                                </p>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t flex justify-end">
                            <button
                                onClick={() => setSelectedParcel(null)}
                                className="btn btn-primary px-6"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MyParcelData;
