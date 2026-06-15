import { MapPin, Briefcase, IndianRupee, Clock3 } from "lucide-react";
import Navbar from "./shared/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSingleJob } from "@/redux/jobSlice/jobSlice";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utills/constant";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import { toast } from "sonner";

const JobDescription = () => {

    const dispatch = useDispatch();
    const { singleJob } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);
    const params = useParams();
    const jobId = params.id;
    const isInitiallyApplied = singleJob?.applications?.some(
        application =>
            application.applicant?._id?.toString() === user?._id?.toString()
    );
    let [ isApplied, setIsApplied ] = useState(isInitiallyApplied);
    const applyJobHandler = async () => {
        if (isApplied) return;
        try {
            const response = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            console.log(response.data);
            if (response.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(response.data.message);
            }

        } catch (error) {
            console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message)
        }

    }

    useEffect(() => {

        const fetchSingleJobs = async () => {
            try {
                const response = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (response.data.success) {
                    setIsApplied(response.data.job.applications.some(application =>
                        application.applicant?._id?.toString() === user?._id?.toString()))

                    dispatch(setSingleJob(response.data.job))


                }
            } catch (error) {
                console.log(error.response?.data?.message);

            }

        }

        fetchSingleJobs()
    }, [dispatch,jobId,user?._id])

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 py-10">
                <div className="mx-auto max-w-5xl px-4">

                    <div className="rounded-3xl bg-white p-8 shadow-md">

                        {/* Header */}
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {singleJob?.title}
                                </h1>

                                <p className="mt-2 text-lg text-gray-600">
                                    {singleJob?.company?.name}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-3">

                                    <span className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm">
                                        <MapPin size={16} />
                                        {singleJob?.location}
                                    </span>

                                    <span className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm">
                                        <Briefcase size={16} />
                                        {singleJob?.jobType}
                                    </span>

                                    <span className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm">
                                        <Clock3 size={16} />
                                        {singleJob?.experience} Years Exp
                                    </span>

                                </div>
                            </div>

                            <button
                                onClick={applyJobHandler}
                                disabled={isApplied}
                                className={`rounded-xl px-8 py-3 font-semibold text-white transition ${isApplied
                                    ? "cursor-not-allowed bg-green-600"
                                    : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                                    }`}
                            >
                                {isApplied ? "✓ Applied" : "Apply Now"}
                            </button>
                        </div>

                        {/* Job Info */}
                        <div className="mt-10 grid gap-6 md:grid-cols-3">

                            <div className="rounded-2xl border p-5">
                                <h3 className="text-sm text-gray-500">
                                    Salary
                                </h3>
                                <p className="mt-2 flex items-center text-xl font-bold text-green-600">
                                    <IndianRupee size={18} />
                                    {singleJob?.salary} LPA
                                </p>
                            </div>

                            <div className="rounded-2xl border p-5">
                                <h3 className="text-sm text-gray-500">
                                    Open Positions
                                </h3>
                                <p className="mt-2 text-xl font-bold">
                                    {singleJob?.position}
                                </p>
                            </div>

                            <div className="rounded-2xl border p-5">
                                <h3 className="text-sm text-gray-500">
                                    Total Applicants
                                </h3>
                                <p className="mt-2 text-xl font-bold">
                                    {singleJob?.applications?.length || 0}
                                </p>
                            </div>

                            <div className="rounded-2xl border p-5">
                                <h3 className="text-sm text-gray-500">
                                    Posted
                                </h3>
                                <p className="mt-2 text-xl font-bold">
                                    {singleJob?.createdAt?.split("T")[0]}
                                </p>
                            </div>

                        </div>

                        {/* Description */}
                        <div className="mt-10">
                            <h2 className="mb-4 text-2xl font-bold">
                                Job Description
                            </h2>

                            <p className="leading-8 text-gray-600">
                                {singleJob?.description}
                            </p>
                        </div>

                        {/* Requirements */}
                        <div className="mt-10">
                            <h2 className="mb-4 text-2xl font-bold">
                                Requirements
                            </h2>

                            <ul className="space-y-3">
                                {singleJob?.requirements?.map((req, index) => (
                                    <li
                                        key={index}
                                        className="rounded-xl bg-gray-100 px-4 py-3"
                                    >
                                        ✓ {req}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
};

export default JobDescription;