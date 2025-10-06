import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUser, FaEnvelope, FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaIdCard, FaMotorcycle, FaCar, FaFileAlt, FaPaperPlane } from "react-icons/fa";

const BeARider = () => {
    const serviceCenters = useLoaderData();
    const { user } = useAuth();
    const [selectedRegion, setSelectedRegion] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const axiosSecure = useAxiosSecure();

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

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        const riderApplication = {
            name: user?.displayName,
            email: user?.email,
            ...data,
            region: selectedRegion,
            status: "pending",
            appliedAt: new Date().toISOString(),
        };

        try {
            const res = await axiosSecure.post('/riders', riderApplication);
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Application Submitted! 🎉",
                    text: "Your rider application is under review. We'll notify you once it's approved.",
                    icon: "success",
                    confirmButtonColor: "#10b981",
                });
                reset();
                setSelectedRegion("");
            }
        } catch {

            Swal.fire({
                title: "Error!",
                text: "Failed to submit application. Please try again.",
                icon: "error",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center mb-4">
                        <FaMotorcycle className="text-[180px]" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                        Join Our Rider Team
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Become a ProFast rider and start earning with flexible hours. Fill out the form below to apply.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Benefits Sidebar */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <FaCar className="text-blue-500" />
                                Rider Benefits
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                    Flexible working hours
                                </li>
                                <li className="flex items-start gap-3 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                    Competitive earnings
                                </li>
                                <li className="flex items-start gap-3 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                    Weekly payments
                                </li>
                                <li className="flex items-start gap-3 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                    Supportive team environment
                                </li>
                                <li className="flex items-start gap-3 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                    Training provided
                                </li>
                            </ul>

                            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <h4 className="font-semibold text-blue-800 text-sm mb-2">Requirements</h4>
                                <ul className="text-xs text-blue-700 space-y-1">
                                    <li>• Valid driving license</li>
                                    <li>• Own motorcycle</li>
                                    <li>• Smartphone</li>
                                    <li>• 18+ years old</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Application Form */}
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Rider Application Form</h2>
                            <p className="text-gray-600 mb-6">Please provide accurate information for faster approval.</p>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Personal Information Section */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <FaUser className="text-blue-500" />
                                        Personal Information
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {/* Name */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <FaUser className="text-gray-400 text-sm" />
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue={user?.displayName || ""}
                                                readOnly
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <FaEnvelope className="text-gray-400 text-sm" />
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                defaultValue={user?.email || ""}
                                                readOnly
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        {/* Age */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <FaCalendarAlt className="text-gray-400 text-sm" />
                                                Age
                                            </label>
                                            <input
                                                type="number"
                                                {...register("age", {
                                                    required: "Age is required",
                                                    min: { value: 18, message: "Must be at least 18 years old" },
                                                    max: { value: 65, message: "Must be under 65 years old" }
                                                })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter your age"
                                            />
                                            {
                                                errors.age && (
                                                    <span className="text-red-500 text-xs flex items-center gap-1">
                                                        {errors.age.message}
                                                    </span>
                                                )
                                            }
                                        </div>

                                        {/* Phone */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <FaPhone className="text-gray-400 text-sm" />
                                                Phone Number
                                            </label>
                                            <input
                                                type="text"
                                                {...register("phone", {
                                                    required: "Phone number is required",
                                                    pattern: {
                                                        value: /^01[3-9]\d{8}$/,
                                                        message: "Enter a valid Bangladeshi phone number (01XXXXXXXXX)"
                                                    }
                                                })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="01XXXXXXXXX"
                                            />
                                            {
                                                errors.phone && (
                                                    <span className="text-red-500 text-xs flex items-center gap-1">
                                                        {errors.phone.message}
                                                    </span>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>

                                {/* Location Section */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-blue-500" />
                                        Service Area
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {/* Region */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Preferred Region
                                            </label>
                                            <select
                                                value={selectedRegion}
                                                onChange={(e) => setSelectedRegion(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                                required
                                            >
                                                <option value="">Select your region</option>
                                                {
                                                    regions.map((region) => (
                                                        <option key={region} value={region}>
                                                            {region}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        {/* District */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Preferred District
                                            </label>
                                            <select
                                                {...register("district", { required: "District is required" })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                                disabled={!selectedRegion}
                                            >
                                                <option value="">Select District</option>
                                                {
                                                    (districtsByRegion[selectedRegion] || []).map((district) => (
                                                        <option key={district} value={district}>
                                                            {district}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                            {
                                                errors.district && (
                                                    <span className="text-red-500 text-xs flex items-center gap-1">
                                                        {errors.district.message}
                                                    </span>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>

                                {/* Vehicle & Documents Section */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <FaIdCard className="text-blue-500" />
                                        Vehicle & Documents
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {/* NID */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                NID Card Number
                                            </label>
                                            <input
                                                type="text"
                                                {...register("nid", {
                                                    required: "NID is required",
                                                    pattern: {
                                                        value: /^\d{10,17}$/,
                                                        message: "Please enter a valid NID number (10-17 digits)"
                                                    }
                                                })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter NID number"
                                            />
                                            {
                                                errors.nid && (
                                                    <span className="text-red-500 text-xs flex items-center gap-1">
                                                        {errors.nid.message}
                                                    </span>
                                                )
                                            }
                                        </div>

                                        {/* Bike Brand */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Bike Brand
                                            </label>
                                            <input
                                                type="text"
                                                {...register("bikeBrand", { required: "Bike brand is required" })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="e.g., Honda, Yamaha"
                                            />
                                            {errors.bikeBrand && (
                                                <span className="text-red-500 text-xs flex items-center gap-1">
                                                    ⚠️ {errors.bikeBrand.message}
                                                </span>
                                            )}
                                        </div>

                                        {/* Bike Reg No */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Bike Registration No
                                            </label>
                                            <input
                                                type="text"
                                                {...register("bikeRegNo", { required: "Registration no is required" })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter registration number"
                                            />
                                            {errors.bikeRegNo && (
                                                <span className="text-red-500 text-xs flex items-center gap-1">
                                                    {errors.bikeRegNo.message}
                                                </span>
                                            )}
                                        </div>

                                        {/* License */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                <FaFileAlt className="text-gray-400 text-sm" />
                                                Driving License No
                                            </label>
                                            <input
                                                type="text"
                                                {...register("licenseNo", { required: "License number is required" })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter license number"
                                            />
                                            {errors.licenseNo && (
                                                <span className="text-red-500 text-xs flex items-center gap-1">
                                                    ⚠️ {errors.licenseNo.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane className="text-sm" />
                                            Submit Application
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeARider;