import { formatDistanceToNow } from "date-fns";
import {
    MapPin,
    Briefcase,
    Clock3,
    Bookmark,
    IndianRupee,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl">
            <p className="mt-1 pb-5 text-sm text-gray-600">
                {formatDistanceToNow(new Date(job.createdAt), {
                    addSuffix: true,
                })}
            </p>
            <hr className="text-gray-950" />
            {/* Top Section */}
            <div className="flex items-start pt-5 justify-between">
                <div className="flex gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                        <img src={job?.company?.logo} alt={job?.company?.name} />
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-gray-900">
                            {job?.title}
                        </h3>

                        <p className="text-sm font-medium text-gray-500">
                            {job?.company?.name}
                        </p>
                    </div>
                </div>

                <button className="rounded-full p-2 transition hover:bg-gray-100">
                    <Bookmark size={18} />
                </button>
            </div>

            {/* Description */}
            <p className="mt-4 line-clamp-2 text-sm text-gray-600">
                {job?.description}
            </p>

            {/* Info */}
            <div className="mt-5 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 text-sm">
                    <MapPin size={15} />
                    {job?.location}
                </div>

                <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 text-sm">
                    <Briefcase size={15} />
                    {job?.jobType}
                </div>

                <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 text-sm">
                    <Clock3 size={15} />
                    {job?.experience} Years
                </div>
            </div>

            {/* Salary */}
            <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold text-green-600">
                    <IndianRupee size={18} />
                    {job?.salary} LPA
                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Actively Hiring
                </span>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">
                <button onClick={() => navigate(`/description/${job?._id}`)} className="flex-1 rounded-xl border border-gray-300 py-3 font-medium transition hover:bg-gray-50">
                    View Details
                </button>

                <button onClick={() => navigate(`/description/${job?._id}`)} className="flex-1 rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700">
                    Apply Now
                </button>

            </div>

        </div>
    );
};

export default JobCard;