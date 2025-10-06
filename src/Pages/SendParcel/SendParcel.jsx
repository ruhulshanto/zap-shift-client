import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router";
import { MdOutlineAccessTime } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const SendParcel = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const serviceCenters = useLoaderData();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();




    const parcelType = watch("type");
    const senderRegion = watch("senderRegion");
    const receiverRegion = watch("receiverRegion");

    // Extract unique regions
    const regions = [...new Set(serviceCenters.map((c) => c.region))];

    // Group districts by region
    const districtsByRegion = serviceCenters.reduce((acc, center) => {
        if (!acc[center.region]) acc[center.region] = [];
        if (!acc[center.region].includes(center.district)) {
            acc[center.region].push(center.district);
        }
        return acc;
    }, {});

    // 📦 Price Calculation
    const calculateCost = (data) => {
        const sameDistrict = data.senderServiceCenter === data.receiverServiceCenter;
        const weight = Number(data.weight) || 0;

        if (data.type === "document") {
            return { base: sameDistrict ? 60 : 80, extra: 0, total: sameDistrict ? 60 : 80 };
        }

        if (data.type === "non-document") {
            if (weight <= 3) {
                const base = sameDistrict ? 110 : 150;
                return { base, extra: 0, total: base };
            } else {
                const extraKg = weight - 3;
                const extra = extraKg * 40;
                const base = sameDistrict ? 110 : 150;
                const outsideExtra = sameDistrict ? 0 : 40;
                return { base, extra: extra + outsideExtra, total: base + extra + outsideExtra };
            }
        }
        return { base: 0, extra: 0, total: 0 };
    };

    // This is "Tracking ID"
    const generateTrackingID = () => {
        const date = new Date();
        const datePart = date.toISOString().split('T')[0].replace(/-/g, ""); // 20250916
        const rand = Math.random().toString(36).substring(2, 6).toUpperCase(); // e.g., F3G9
        return `TRK-${datePart}-${rand}`; // TRK-20250916-F3G9
    };

    const onSubmit = (data) => {
        const breakdown = calculateCost(data);
        const sameDistrict = data.senderServiceCenter === data.receiverServiceCenter;
        const deliveryZone = sameDistrict ? "Same District" : "Outside District";

        let extraLine = "";
        if (data.type === "non-document" && Number(data.weight) > 3) {
            const extraKg = Number(data.weight) - 3;
            extraLine = `<p><strong>Extra Charge:</strong> ${extraKg} × 40 = ৳${extraKg * 40}</p>`;
        }

        let outsideLine = "";
        if (!sameDistrict && data.type === "non-document") {
            outsideLine = `<p><strong>+ Outside District Fee:</strong> ৳40</p>`;
        }

        Swal.fire({
            title: "Delivery Cost Breakdown",
            html: `
      <div class="text-left space-y-3">
        <p><strong>Parcel Type:</strong> ${data.type}</p>
        <p><strong>Weight:</strong> ${data.weight || "N/A"} KG</p>
        <p><strong>From:</strong> ${data.senderServiceCenter} → <strong>To:</strong> ${data.receiverServiceCenter}</p>
        <p><strong>Delivery Zone:</strong> ${deliveryZone}</p>
        <hr />
        <p><strong>Base Cost:</strong> ৳${breakdown.base}</p>
        ${extraLine}
        ${outsideLine}
        <p class="text-lg font-bold text-green-600">Total Cost: ৳${breakdown.total}</p>
      </div>
    `,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Proceed to Payment",
            cancelButtonText: "Edit & Continue",
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#d1d5db",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const parcelData = {
                    ...data,
                    userEmail: user?.email || "unknown",
                    creation_date: new Date().toISOString(),
                    payment_status: "unpaid",
                    delivery_status: "not_collected",
                    tracking_id: generateTrackingID(),
                    cost: breakdown.total,
                };
                console.log("Saving parcel:", parcelData);

                axiosSecure.post('/parcels', parcelData)
                    .then(res => {
                        console.log(res.data);
                        if (res.data?.insertedId) {
                            Swal.fire({
                                title: "Success!",
                                text: "Your parcel has been saved. Redirecting to payment...",
                                icon: "success"
                            });
                        }
                        // 👉 TODO: Send `parcelData` to the database or redirect to payment
                    })
            }

        });
    };


    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md">
            {/* ==== Header Section ==== */}
            <div className="mb-6 border-b pb-4">
                <h1 className="text-2xl font-bold text-green-700">Add Parcel</h1>
                <p className="text-gray-600">Enter your parcel details</p>

                {/* Parcel Type Selection */}
                <div className="mt-4 flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            value="document"
                            {...register("type", { required: true })}
                            className="radio radio-success"
                        />
                        <span>Document</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            value="non-document"
                            {...register("type", { required: true })}
                            className="radio radio-success"
                        />
                        <span>Non-Document</span>
                    </label>
                </div>
                {errors.type && <p className="text-red-700 text-sm mt-2">Parcel type is required</p>}

                {/* Parcel Name + Weight */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Parcel Name"
                            className="input input-bordered w-full rounded-lg bg-gray-100"
                            {...register("title", { required: true })}
                        />
                        {errors.title && <p className="text-red-700 text-sm mt-1">Parcel name is required</p>}
                    </div>
                    <div>
                        {parcelType === "non-document" ? (
                            <>
                                <input
                                    type="number"
                                    placeholder="Parcel Weight (KG)"
                                    className="input input-bordered w-full rounded-lg bg-gray-100"
                                    {...register("weight", { required: true, min: 0.01 })}
                                />
                                {errors.weight?.type === "required" && (
                                    <p className="text-red-700 text-sm mt-1">Weight is required</p>
                                )}
                                {errors.weight?.type === "min" && (
                                    <p className="text-red-700 text-sm mt-1">Weight must be positive</p>
                                )}
                            </>
                        ) : (
                            <input
                                type="text"
                                disabled
                                placeholder="Parcel Weight (KG) — Not Required"
                                className="input input-bordered w-full rounded-lg bg-gray-50 text-gray-400"
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* ==== Form Section (Sender & Receiver) ==== */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Sender Info */}
                    <section>
                        <h2 className="font-semibold text-lg mb-4">Sender Details</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {/* Sender Name */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Sender Name"
                                    className="input input-bordered w-full rounded-lg bg-gray-100"
                                    {...register("senderName", { required: true })}
                                />
                                {errors.senderName && <p className="text-red-700 text-sm">Sender name is required</p>}
                            </div>

                            {/* Sender Contact */}
                            <div>
                                <input
                                    type="number"
                                    placeholder="Sender Contact No"
                                    className="input input-bordered w-full rounded-lg bg-gray-100"
                                    {...register("senderContact", { required: true })}
                                />
                                {errors.senderContact && <p className="text-red-700 text-sm">Sender contact is required</p>}
                            </div>

                            {/* Region */}
                            <div>
                                <select
                                    {...register("senderRegion", { required: true })}
                                    className="select select-bordered w-full rounded-lg bg-gray-100"
                                >
                                    <option value="">Select your region</option>
                                    {regions.map((region) => (
                                        <option key={region} value={region}>
                                            {region}
                                        </option>
                                    ))}
                                </select>
                                {errors.senderRegion && <p className="text-red-700 text-sm">Sender region is required</p>}
                            </div>

                            {/* Service Center */}
                            <div>
                                <select
                                    {...register("senderServiceCenter", { required: true })}
                                    className="select select-bordered w-full rounded-lg bg-gray-100"
                                >
                                    <option value="">Select Warehouse</option>
                                    {(districtsByRegion[senderRegion] || []).map((district) => (
                                        <option key={district} value={district}>
                                            {district}
                                        </option>
                                    ))}
                                </select>
                                {errors.senderServiceCenter && <p className="text-red-700 text-sm">Sender service center is required</p>}
                            </div>

                            {/* Address */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Sender Address"
                                    className="input input-bordered w-full rounded-lg bg-gray-100"
                                    {...register("senderAddress", { required: true })}
                                />
                                {errors.senderAddress && <p className="text-red-700 text-sm">Sender address is required</p>}
                            </div>

                            {/* Pickup Instruction */}
                            <div>
                                <textarea
                                    placeholder="Pickup Instruction"
                                    className="textarea textarea-bordered w-full rounded-lg bg-gray-100 h-[70px]"
                                    {...register("pickupInstruction", { required: true })}
                                />
                                {errors.pickupInstruction && <p className="text-red-700 text-sm">Pickup instruction is required</p>}
                            </div>
                        </div>
                    </section>

                    {/* Receiver Info */}
                    <section>
                        <h2 className="font-semibold text-lg mb-4">Receiver Details</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {/* Receiver Name */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Receiver Name"
                                    className="input input-bordered w-full rounded-lg bg-gray-100"
                                    {...register("receiverName", { required: true })}
                                />
                                {errors.receiverName && <p className="text-red-700 text-sm">Receiver name is required</p>}
                            </div>

                            {/* Receiver Contact */}
                            <div>
                                <input
                                    type="number"
                                    placeholder="Receiver Contact No"
                                    className="input input-bordered w-full rounded-lg bg-gray-100"
                                    {...register("receiverContact", { required: true })}
                                />
                                {errors.receiverContact && <p className="text-red-700 text-sm">Receiver contact is required</p>}
                            </div>

                            {/* Region */}
                            <div>
                                <select
                                    {...register("receiverRegion", { required: true })}
                                    className="select select-bordered w-full rounded-lg bg-gray-100"
                                >
                                    <option value="">Select your region</option>
                                    {regions.map((region) => (
                                        <option key={region} value={region}>
                                            {region}
                                        </option>
                                    ))}
                                </select>
                                {errors.receiverRegion && <p className="text-red-700 text-sm">Receiver region is required</p>}
                            </div>

                            {/* Service Center */}
                            <div>
                                <select
                                    {...register("receiverServiceCenter", { required: true })}
                                    className="select select-bordered w-full rounded-lg bg-gray-100"
                                >
                                    <option value="">Select Warehouse</option>
                                    {(districtsByRegion[receiverRegion] || []).map((district) => (
                                        <option key={district} value={district}>
                                            {district}
                                        </option>
                                    ))}
                                </select>
                                {errors.receiverServiceCenter && <p className="text-red-700 text-sm">Receiver service center is required</p>}
                            </div>

                            {/* Address */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Receiver Address"
                                    className="input input-bordered w-full rounded-lg bg-gray-100"
                                    {...register("receiverAddress", { required: true })}
                                />
                                {errors.receiverAddress && <p className="text-red-700 text-sm">Receiver address is required</p>}
                            </div>

                            {/* Delivery Instruction */}
                            <div>
                                <textarea
                                    placeholder="Delivery Instruction"
                                    className="textarea textarea-bordered w-full rounded-lg bg-gray-100 h-[70px]"
                                    {...register("deliveryInstruction", { required: true })}
                                />
                                {errors.deliveryInstruction && <p className="text-red-700 text-sm">Delivery instruction is required</p>}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                    <button type="submit" className="btn bg-green-600 hover:bg-green-700 text-white px-6">
                        Proceed to Confirm Booking
                    </button>
                </div>
            </form>

            {/* Pickup Note */}
            <p className="mt-4 font-semibold text-gray-500 flex items-center gap-1">
                <MdOutlineAccessTime className="text-xl" />PickUp Time <span className="italic text-green-600">4pm - 7pm</span> Approx.</p>
        </div>
    );
};

export default SendParcel;
