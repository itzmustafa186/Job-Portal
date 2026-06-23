import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BriefcaseBusiness } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utills/constant";

const PostJob = () => {
    const navigate = useNavigate();

    const { companies } = useSelector((store) => store.company);


    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        experience: "",
        position: "",
        jobType: "",
        companyId: "",
    });

    const changeHandler = async (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {

            console.log(input);

            // axios.post(...)
            const response = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                withCredentials: true,
            });
            if (response?.data?.success) {
                toast.success(response?.data?.message)
                navigate("/admin/jobs")
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message)

        }
    };

    if (companies.length === 0) {
        return (
            <>
                <Navbar />

                <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4">
                    <div className="w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-lg">

                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                            <BriefcaseBusiness className="h-10 w-10 text-blue-600" />
                        </div>

                        <h2 className="text-3xl font-bold">
                            No Company Found
                        </h2>

                        <p className="mt-3 text-gray-500">
                            Before posting a job you need to register a company.
                        </p>

                        <Link
                            to="/admin/companies/create"
                            className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                        >
                            Register Company
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 py-10">
                <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow">

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">
                            Post New Job
                        </h1>

                        <p className="text-gray-500">
                            Fill all required information.
                        </p>
                    </div>

                    <form
                        onSubmit={submitHandler}
                        className="space-y-6"
                    >
                        <div className="grid gap-6 md:grid-cols-2">

                            <div>
                                <label className="mb-2 block font-medium">
                                    Job Title
                                </label>

                                <input
                                    name="title"
                                    required
                                    value={input.title}
                                    onChange={changeHandler}
                                    className="w-full rounded-xl border px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-medium">
                                    Location
                                </label>

                                <input
                                    name="location"
                                    required
                                    value={input.location}
                                    onChange={changeHandler}
                                    className="w-full rounded-xl border px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-medium">
                                    Salary (LPA)
                                </label>

                                <input
                                    type="number"
                                       required
                                    name="salary"
                                    value={input.salary}
                                    onChange={changeHandler}
                                    className="w-full rounded-xl border px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-medium">
                                    Experience (Years)
                                </label>

                                <input
                                    type="number"
                                    name="experience"
                                       required
                                    value={input.experience}
                                    onChange={changeHandler}
                                    className="w-full rounded-xl border px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-medium">
                                    Open Positions
                                </label>

                                <input
                                    type="number"
                                    name="position"
                                    value={input.position}
                                       required
                                    onChange={changeHandler}
                                    className="w-full rounded-xl border px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-medium">
                                    Job Type
                                </label>

                                <select
                                    name="jobType"
                                       required
                                    value={input.jobType}
                                    onChange={changeHandler}
                                    className="w-full rounded-xl border px-4 py-3"
                                >
                                    <option value="">Select Job Type</option>
                                    <option>Full Time</option>
                                    <option>Part Time</option>
                                    <option>Internship</option>
                                    <option>Remote</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-2 block font-medium">
                                    Company
                                </label>

                                <select
                                    name="companyId"
                                       required
                                    value={input.companyId}
                                    onChange={changeHandler}
                                    className="w-full rounded-xl border px-4 py-3"
                                >
                                    <option value="">
                                        Select Company
                                    </option>

                                    {companies.map((company) => (
                                        <option
                                            key={company._id}
                                            value={company._id}
                                        >
                                            {company.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-2 block font-medium">
                                    Requirements
                                </label>

                                <input
                                    name="requirements"
                                       required
                                    value={input.requirements}
                                    onChange={changeHandler}
                                    placeholder="React, Node, MongoDB"
                                    className="w-full rounded-xl border px-4 py-3"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-2 block font-medium">
                                    Description
                                </label>

                                <textarea
                                   required
                                    rows={6}
                                    name="description"
                                    value={input.description}
                                    onChange={changeHandler}
                                    className="w-full rounded-xl border px-4 py-3"
                                />
                            </div>

                        </div>

                        <div className="flex gap-4">

                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="flex-1 rounded-xl border py-3 font-semibold"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
                            >
                                Post Job
                            </button>

                        </div>
                    </form>

                </div>
            </div>
        </>
    );
};

export default PostJob;