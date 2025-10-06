
import { FaGoogle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";

const GoogleLogin = () => {
    const locaion = useLocation();
    const navigate = useNavigate();
    const from = locaion.state?.from || '/';
    const axiosInstance = useAxios();

    const { signInWithGoogle } = useAuth();

    const handleGoogleLogin = () => {

        signInWithGoogle()
            .then(async (result) => {
                const user = result.user;
                console.log(user);

                const userInfo = {
                    email: user.email,
                    role: 'user', //default role will be 'user'
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }
                const res = await axiosInstance.post('/users', userInfo);
                console.log('user update Info',res.data)
                
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.log(err.message)
            })
    }


    return (
        <button
            onClick={handleGoogleLogin}
            className="btn btn-circle bg-gray-200 hover:bg-blue-500 hover:text-white">
            <FaGoogle />
        </button>
    );
};

export default GoogleLogin;
