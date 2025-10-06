
import { Link, useLocation, useNavigate } from 'react-router';
import signInSvgImg from '../../../assets/AuthenticationIMG/SignInSVG.svg';
import { useForm } from 'react-hook-form';
import GoogleLogin from '../GoogleLogin/GoogleLogin';
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const onSubmit = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
      .then(result => {
        console.log(result.user);
        Swal.fire({
          title: 'Login Successful!',
          text: 'Welcome back!',
          icon: 'success',
          confirmButtonText: 'Continue',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          navigate(from, { replace: true });
        });
      })
      .catch(err => {
        console.log(err.message);
        Swal.fire({
          title: 'Login Failed!',
          text: 'Invalid email or password.',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      });
  };


  return (
    <div
      data-aos="flip-left"
      data-aos-duration="1000"
      className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="bg-white/95 shadow-2xl rounded-2xl flex w-11/12 md:w-3/4 lg:w-2/3 overflow-hidden">
        {/* Left Image */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-6 bg-gray-100">
          <img
            src={signInSvgImg}
            alt="Restaurant Illustration"
            className="max-w-xs"
          />
        </div>



        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-bold text-center mb-8">Login Log</h2>

          {/* Form start form here */}

          <form onSubmit={handleSubmit((onSubmit))} className="space-y-5">

            <div>
              <label className="block font-medium mb-1">Email</label>
              <input type="email"  {...register("email", { required: true })} name="email" placeholder="Email" className="w-full input input-bordered rounded-lg" />
              {errors.email?.type === "required" && (
                <p className='text-red-700 text-sm'>Email is required</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Password</label>
              <input type="password" name="password" placeholder="Enter your password" className="w-full input input-bordered rounded-lg"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password?.type === "required" && (
                <p className='text-red-700 text-sm'>Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className='text-red-700 text-sm'>Password should be at least 6 characters</p>
              )}
            </div>

            {/* Captcha */}
            {/* <div>
              if i want to use Captcha
            </div> */}

            <button className="btn btn-neutral mt-4 w-full">Login</button>
          </form>

          {/* Form End here */}

          {/* Signup link */}
          <p className="text-center mt-4 text-[16px] font-semibold">
            New here?{" "}
            <Link
              to="/register"
              className="text-yellow-600 hover:text-[#316ff6] underline underline-offset-4 font-medium"
            >
              Create a New Account
            </Link>
          </p>

          {/* Social Logins */}
          <div className="mt-6 text-center">
            <p className="mb-2">Or sign in with</p>
            <div className="flex justify-center gap-4">

              <button className="btn btn-circle bg-gray-200 hover:bg-blue-500 hover:text-white">
                <FaFacebookF />
              </button>

              <GoogleLogin></GoogleLogin>

              <button className="btn btn-circle bg-gray-200 hover:bg-blue-500 hover:text-white">
                <FaTwitter />
              </button>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;
