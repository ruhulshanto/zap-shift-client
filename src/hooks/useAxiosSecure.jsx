import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: `https://zap-shift-server-swart.vercel.app`,
});

const useAxiosSecure = () => {
    const { user, loading, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (loading || !user?.accessToken) return;

        // Add request interceptor
        const reqInterceptor = axiosSecure.interceptors.request.use(
            config => {
                config.headers.Authorization = `Bearer ${user.accessToken}`;
                return config;
            },
            error => Promise.reject(error)
        );

        // Add response interceptor
        const resInterceptor = axiosSecure.interceptors.response.use(
            res => res,
            error => {
                const status = error?.response?.status;
                if (status === 403) {
                    navigate('/forbidden');
                } else if (status === 401) {
                    logOut()
                        .then(() => navigate('/login'))
                        .catch(() => {});
                }
                return Promise.reject(error);
            }
        );

        // Cleanup: remove interceptors when user/logOut/navigate changes
        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };
    }, [user, loading, logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;