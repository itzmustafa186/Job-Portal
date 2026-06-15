import { formatDistanceToNow } from "date-fns";
import { MapPin, Briefcase, Clock3, Bookmark } from "lucide-react";

const LatestJobCard = ({ job }) => {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-xl font-bold text-white">
          G
        </div>

        <button className="rounded-lg p-2 hover:bg-gray-100">
          <Bookmark size={18} />
        </button>
      </div>

      <div className="mt-5">
        <h3 className="text-xl font-bold text-gray-900">
          {job?.title}
        </h3>

        <p className="mt-1 text-gray-500">
          {job?.company?.name}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-4">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <MapPin size={14} />
          {job?.position} Positions
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Briefcase size={14} />
          {job?.jobType}
        </div>
      </div>

      <div className="mt-4">
        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          {job?.salary} LPA
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Clock3 size={14} />
          
                          {formatDistanceToNow(new Date(job.createdAt), {
                              addSuffix: true,
                          })}
                      
        </div>

        <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default LatestJobCard;