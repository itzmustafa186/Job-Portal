import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Briefcase, Loader2 } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utills/constant';
import { toast } from 'sonner';
import { setLoading } from '@/redux/authSlice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Footer';

const Signup = () => {

    let [input, setInput] = useState({
        fullname: "",
        email: "",
        password: "",
        role: "student",
        phoneNumber: "",
        file: ""
    });

    const dispatch = useDispatch();
    const { loading } = useSelector((store) => store.auth);
   


    const navigate = useNavigate();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files[0] })
    };
    const SignupHandler = async (e) => {

        e.preventDefault();

        try {
            dispatch(setLoading(true))
            let formData = new FormData();
            formData.append("fullname", input.fullname);
            formData.append("email", input.email);
            formData.append("password", input.password);
            formData.append("phoneNumber", input.phoneNumber);
            formData.append("role", input.role);
            formData.append("file", input.file);

            const response = await axios.post(`${USER_API_END_POINT}/register`, formData);
            if (response.data.message) {
                toast.success("Signup Successfully", {
                    className: "!bg-green-500 !text-white !border-green-500",
                })
            };

            navigate("/login")

        } catch (error) {
            console.log(error.response);
            toast.error(error.response.data.message, {
                className: "!bg-red-500 !text-white !border-red-500",
            });

        } finally {
            dispatch(setLoading(false))
        }
    }
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                    {/* Logo */}
                    <div className="mb-8 flex flex-col items-center">
                        <div className="rounded-xl bg-blue-600 p-3 text-white">
                            <Briefcase size={28} />
                        </div>
                        <h1 className="mt-4 text-2xl font-bold">
                            Create Account
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">
                            Join and discover your next opportunity
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={SignupHandler} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={input.fullname}
                                name='fullname'
                                onChange={changeEventHandler}
                                placeholder="Muhammad Mustafa"
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                value={input.email}
                                name='email'
                                onChange={changeEventHandler}
                                placeholder="mustafa@example.com"
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                value={input.password}
                                name='password'
                                onChange={changeEventHandler}
                                placeholder="••••••••"
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                value={input.phoneNumber}
                                name='phoneNumber'
                                onChange={changeEventHandler}
                                placeholder="+92"
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Role
                            </label>
                            <select required
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                                value={input.role}
                                name='role'
                                onChange={changeEventHandler}
                            >
                                <option>student</option>
                                <option>recruiter</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Profile
                            </label>
                            <input
                                type="file"
                                onChange={changeFileHandler}
                                placeholder="+92"
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        {
                            loading ? (
                                <button
                                    disabled
                                    className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-3 font-medium text-white"
                                >
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                      <span className='ps-3'>Please Wait</span>
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
                                >
                                    Create Account
                                </button>
                            )
                        }
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center">
                        <div className="h-px flex-1 bg-gray-200" />
                        <span className="px-3 text-sm text-gray-400">
                            OR
                        </span>
                        <div className="h-px flex-1 bg-gray-200" />
                    </div>



                    {/* Login Link */}
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link

                            to={"/login"}
                            className="font-semibold text-blue-600 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Signup
