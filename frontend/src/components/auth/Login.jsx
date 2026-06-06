import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Briefcase } from "lucide-react";
import { Link } from 'react-router-dom';

const Login = () => {

    let [input, setInput] = useState({

        email: "",
        password: "",
        role: "",

    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files })
    };
    const loginHandler = (e) => {

        e.preventDefault();
        console.log(input);

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

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
                        >
                            Login
                        </button>
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
        </>
    )
}

export default Login
