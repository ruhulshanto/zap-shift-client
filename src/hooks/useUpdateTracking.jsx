import useAxiosSecure from "./useAxiosSecure";

const useUpdateTracking = () => {
  const axiosSecure = useAxiosSecure();

  const addTrackingUpdate = async (trackId, { status, location }) => {
    const newUpdate = {
      status,
      location,
      updatedAt: new Date().toISOString(),
    };
    return axiosSecure.patch(`/tracking/${trackId}`, newUpdate);
  };

  return { addTrackingUpdate };
};

export default useUpdateTracking;
