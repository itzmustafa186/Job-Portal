import { Mail, Phone, FileText, PenSquare } from "lucide-react";
import Navbar from "./shared/Navbar";
import { useEffect, useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import Footer from "./Footer";

import useGetAppliedJobs from "@/Hooks/useGetAppliedJobs";
import AppliedJobTable from "./AppliedJobTable";

const Profile = () => {
        useEffect(() => {
            window.scrollTo(0, 0);
        },[])
    useGetAppliedJobs();
    const { user } = useSelector((store) => store.auth)

    const [open, setOpen] = useState(false);



    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-10">
                <div className="mx-auto max-w-4xl px-4">
                    <div className="rounded-2xl bg-white p-8 shadow-md">

                        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
                            <div className="flex items-center gap-5">
                                <img
                                    src={user?.profile?.profilePhoto}
                                    alt={user?.fullname}
                                    className="h-28 w-28 rounded-full object-cover"
                                />

                                <div>
                                    <h1 className="text-2xl font-bold">
                                        {user?.fullname}
                                    </h1>

                                    <p className="mt-1 text-gray-600">
                                        {user?.profile?.bio}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setOpen(true)}
                                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                            >
                                <PenSquare size={18} />
                                Edit Profile
                            </button>
                        </div>

                        <div className="mt-8 border-t pt-8">
                            <h2 className="mb-6 text-xl font-semibold">
                                Contact Information
                            </h2>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Mail size={18} />
                                    <span>{user?.email}</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Phone size={18} />
                                    <span>{user?.phoneNumber}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 border-t pt-8">
                            <h2 className="mb-6 text-xl font-semibold">
                                Skills
                            </h2>

                            <div className="flex flex-wrap gap-3">
                                {user?.profile?.skills?.length > 0 ? (
                                    user.profile.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
                                        >
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-500">No skills added</span>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 border-t pt-8">
                            <h2 className="mb-6 text-xl font-semibold">
                                Resume
                            </h2>

                            {user?.profile?.resume ? (
                                <a
                                    href={user?.profile?.resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-blue-600 hover:underline"
                                >
                                    <FileText size={18} />
                                    <span>{user?.profile?.resumeOriginalName}</span>
                                </a>

                            ) : (
                                <span className="text-gray-500">No resume uploaded</span>
                            )}


                        </div>
                        <div className="mt-8 border-t pt-8">
                            <h2 className="mb-6 text-xl font-semibold">
                                Applied Jobs
                            </h2>

                            <AppliedJobTable />
                        </div>

                    </div>
                </div>
            </div>

            <UpdateProfileDialog
                open={open}
                setOpen={setOpen}
                user={user}
            />

            <Footer />
        </>
    );
};

export default Profile;