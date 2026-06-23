import { formatDistanceToNow } from "date-fns";
import { MapPin, Briefcase, Clock3, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LatestJobCard = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="flex items-start justify-between">
      

      
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

        <button  onClick={() => navigate(`/description/${job?._id}`)} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default LatestJobCard;