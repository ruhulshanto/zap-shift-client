import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TrackParcel = () => {
  const [trackId, setTrackId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const axiosSecure = useAxiosSecure();

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!trackId) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await axiosSecure.get(`/tracking/${trackId}`);
      if (!res.data || Object.keys(res.data).length === 0) {
        setError("No data found for this Tracking ID.");
      } else {
        setData(res.data);
      }
    } catch (err) {
      setError("Failed to fetch tracking data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Format status text nicely
  const formatStatus = (status) => {
    return status
      .split("_")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-4">Track Your Parcel</h2>

        {/* Search box */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter parcel Tracking ID"
            value={trackId}
            onChange={(e) => setTrackId(e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {loading ? "Loading..." : "Track"}
          </button>
        </form>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-3">{error}</div>
        )}

        {/* Tracking result */}
        {data && (
          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-2">Tracking Details</h3>
            <p><strong>Tracking ID:</strong> {data.trackId}</p>
            <p><strong>Parcel ID:</strong> {data.parcelId}</p>

            <h4 className="mt-4 font-semibold">Updates:</h4>
            <ul className="mt-2 space-y-2">
              {data.updates?.map((update, i) => (
                <li
                  key={i}
                  className="p-3 border rounded shadow-sm hover:shadow-md transition"
                >
                  <p><strong>Status:</strong> {formatStatus(update.status)}</p>
                  <p><strong>Location:</strong> {update.location}</p>
                  <p><strong>Time:</strong> {new Date(update.updatedAt).toLocaleString()}</p>
                  {update.updatedBy && (
                    <p><strong>Updated By:</strong> {update.updatedBy}</p>
                  )}
                  {update.details && (
                    <p><strong>Details:</strong> {update.details}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Default message */}
        {!data && !error && !loading && (
          <p className="text-center text-gray-500 mt-4">
            Enter your tracking number above to see updates.
          </p>
        )}
      </div>
    </div>
  );
};

export default TrackParcel;
