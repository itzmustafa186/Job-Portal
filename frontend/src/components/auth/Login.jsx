import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Briefcase, Loader2 } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utills/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice/authSlice';
import Footer from '../Footer';

const Login = () => {

    let [input, setInput] = useState({

        email: "",
        password: "",
        role: "student",

    });
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    const dispatch = useDispatch();
    const { loading, user } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    ;
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files })
    };
    const loginHandler = async (e) => {

        e.preventDefault();
        try {
            dispatch(setLoading(true))

            const response = await axios.post(`${USER_API_END_POINT}/login`,
                input,
                {
                    withCredentials: true,
                });
            if (response.data.message) {
                dispatch(setUser(response.data.userData))


                toast.success("Login Successfully", {
                    className: "!bg-green-500 !text-white !border-green-500",
                })
            };

            navigate("/")

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, {
                className: "!bg-red-500 !text-white !border-red-500",
            });

        } finally {
            dispatch(setLoading(false));
        }

    };

    useEffect(() => {
        if (user) {
            navigate("/")
            
        }
    }, [user, navigate])
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
                            Welcome Back
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Sign in to continue to your account
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={loginHandler} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Email Address
                            </label>

                            <input
                                required
                                value={input.email}
                                name='email'
                                onChange={changeEventHandler}
                                type="email"
                                placeholder="you@example.com"
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <div className="mb-1 flex items-center justify-between">
                                <label className="text-sm font-medium">
                                    Password
                                </label>


                            </div>

                            <input
                                type="password"
                                required
                                value={input.password}
                                name='password'
                                onChange={changeEventHandler}
                                placeholder="••••••••"
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Role
                            </label>
                            <select value={input.role}
                                name='role'
                                onChange={changeEventHandler}
                                required className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500">
                                <option>student</option>
                                <option>recruiter</option>
                            </select>
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
                                    Login
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



                    {/* Signup Link */}
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link
                            to={"/signup"}
                            className="font-semibold text-blue-600 hover:underline"
                        >
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login
