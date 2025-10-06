
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: roleLoading, refetch } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !loading && !!user?.email, // run only if user exists
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role;
    },
  });

  return { role, roleLoading, refetch };
};

export default useUserRole;

