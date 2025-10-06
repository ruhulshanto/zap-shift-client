import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-base-100">
      <h1 className="text-6xl font-bold text-error">403</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-base-content">
        Access Forbidden
      </h2>
      <p className="text-gray-500 mt-2 max-w-md">
        You don’t have permission to access this page. Please contact an admin if you believe this is a mistake.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <Link to="/">
          <button className="btn btn-primary">Go to Homepage</button>
        </Link>
        <button className="btn btn-outline" onClick={() => window.history.back()}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Forbidden;
