import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { Navigate, useLocation } from 'react-router';

const RiderRoute = ({children}) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();
    const location = useLocation();

    if (loading || roleLoading) {
        return (
            <div className="flex items-center justify-center mt-16">
                <progress className="progress w-56 mx-auto mt-12"></progress>
            </div>
        );
    }


    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // if (role !== "rider") {
    //     return <Navigate to="/forbidden" state={{ from: location }} replace />;
    // }
    if (role !== "rider") {
        return <Navigate to="/forbidden" replace />;
    }

    return children;
};

export default RiderRoute;