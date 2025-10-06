
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import { useForm } from "react-hook-form";
import registerSvgImg from '../../../assets/AuthenticationIMG/RegisterSVG.svg';
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { useState } from "react";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const [profilePic, setProfilePic] = useState('');
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(async (result) => {
                console.log(result.user);

                // update user info in the Database
                const userInfo = {
                    email: data.email,
                    role: 'user', //default role will be 'user'
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }
                const userRef = await axiosInstance.post('/users', userInfo);
                console.log(userRef.data);

                // Update User Profile in Firebase
                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                }
                updateUserProfile(userProfile)
                    .then(() => {
                        console.log('Profile Name & Picture is Uploaded');
                        Swal.fire({
                            title: 'Registration Successful!',
                            text: 'You have successfully signed up. Please log in.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then(() => {
                            navigate('/login');
                        });
                    })
                    .catch(err => {
                        console.log(err.message);
                    });



            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        console.log(image);

        const formData = new FormData();
        formData.append('image', image)

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`

        const res = await axios.post(imageUploadUrl, formData);
        setProfilePic(res.data.data.url);
    }



    return (
        <div
            data-aos="flip-right"
            data-aos-duration="1000"
            className="min-h-screen flex items-center justify-center bg-cover bg-center">
            <div className="bg-white/95 shadow-2xl rounded-2xl flex w-11/12 md:w-3/4 lg:w-2/3 overflow-hidden">

                <div className="w-full md:w-1/2 p-10">
                    <h2 className="text-2xl font-bold text-center mb-8">Register</h2>



                    <form onSubmit={handleSubmit((onSubmit))} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block font-medium mb-1">Name</label>
                            {errors.name?.type === "required" && (
                                <p className='text-red-700 text-sm'>Your Name is required</p>
                            )}
                            <input type="text" name='name'  {...register("name", { required: true })} placeholder="Enter Your Name" className="w-full input input-bordered rounded-lg mt-1" />
                        </div>

                        {/* photo */}
                        <div>
                            <label className="block font-medium mb-1">Profile Picture</label>
                            {errors.photo?.type === "required" && (
                                <p className='text-red-700 text-sm'>Photo is required</p>
                            )}
                            <input onChange={handleImageUpload} type="file" name='photo'
                                className="w-full input input-bordered rounded-lg mt-1" />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block font-medium mb-1">Email</label>
                            {errors.email?.type === "required" && (
                                <p className='text-red-700 text-sm'>Email is required</p>
                            )}
                            <input type="email" name='email'  {...register("email", { required: true })} placeholder="Email" className="w-full input input-bordered rounded-lg mt-1" />
                        </div>
                        {/* Password */}
                        <div>
                            <label className="block font-medium mb-1">Password</label>
                            {errors.password?.type === "required" && (
                                <p className='text-red-700 text-sm'>Password is required</p>
                            )}
                            {errors.password?.type === "minLength" && (
                                <p className='text-red-700 text-sm'>Password should be at least 6 characters</p>
                            )}
                            <input type="password" name='password'  {...register("password", { required: true, minLength: 6 })} placeholder="Enter your password" className="w-full input input-bordered rounded-lg mt-1" />
                        </div>
                        {/* Submit button */}
                        <input type="submit" value="Sign Up" className="btn w-full my-2 text-white bg-blue-500 hover:bg-blue-600 font-semibold uppercase" />
                    </form>



                    <p className="text-center mt-4 text-[16px] font-semibold">
                        Already registered?{" "}
                        <Link to="/login" className="text-yellow-600 hover:text-[#316ff6] underline underline-offset-4">
                            GO to Login
                        </Link>
                    </p>

                    {/* Social Logins */}
                    <div className="mt-6 text-center">
                        <p className="mb-2">Or Sign Up with</p>
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


                {/* Right Image */}
                <div className="hidden md:flex md:w-1/2 items-center justify-center p-6 bg-gray-100">
                    <img
                        src={registerSvgImg}
                        alt="Restaurant Illustration"
                        className="max-w-xs"
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;