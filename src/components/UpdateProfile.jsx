import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "./Loading";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [profilePic, setProfilePic] = useState(user?.photoURL || "");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();

  const { data: userProfile = {}, isLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
      phone: userProfile?.phone || "",
      address: userProfile?.address || "",
    },
  });

  // ✅ Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.success) {
        setProfilePic(data.data.url);
        Swal.fire("Success", "Profile picture uploaded!", "success");
      } else throw new Error("Upload failed");
    } catch {
      Swal.fire("Error", "Failed to upload image", "error");
    } finally {
      setIsUploading(false);
    }
  };

  // ✅ Handle clicking on image to open hidden input
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // ✅ Submit form
  const onSubmit = async (data) => {
    const updateData = {
      displayName: data.name,
      photoURL: profilePic,
      phone: data.phone,
      address: data.address,
      last_updated: new Date().toISOString(),
    };

    try {
      await updateUserProfile(updateData);

      const res = await axiosSecure.patch(
        `/users/update-profile/${user.email}`,
        updateData
      );

      if (res.data.success) {
        queryClient.invalidateQueries(["userProfile", user?.email]);
        Swal.fire("Success", "Profile updated successfully!", "success");
        reset({
          name: data.name,
          email: user.email,
          phone: data.phone,
          address: data.address,
        });
      } else {
        Swal.fire("Error", res.data.error || "Failed to update profile", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update profile", "error");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* ✅ Profile picture */}
        <div className="text-center">
          <img
            src={
              profilePic ||
              `https://ui-avatars.com/api/?name=${user?.displayName || user?.email}`
            }
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-2 cursor-pointer border-2 border-gray-300 hover:scale-105 hover:border-blue-500 transition-all duration-300"
            onClick={handleImageClick}
            title="Click to change profile picture"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border px-3 py-2 rounded-lg"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            readOnly
            className="w-full border px-3 py-2 rounded-lg bg-gray-100"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium mb-1">Phone</label>
          <input
            type="text"
            {...register("phone")}
            className="w-full border px-3 py-2 rounded-lg"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium mb-1">Address</label>
          <textarea
            {...register("address")}
            className="w-full border px-3 py-2 rounded-lg"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
