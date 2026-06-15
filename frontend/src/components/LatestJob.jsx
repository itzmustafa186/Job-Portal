import { useSelector } from "react-redux";
import LatestJobCard from "./LatestJobCard";

const LatestJobs = () => {
    const { allJobs } = useSelector((store) => store.job);

    return (
        <section className="bg-gray-50 py-20">
            <div className="mx-auto max-w-7xl px-4">

                <div className="text-center">
                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                        Latest Opportunities
                    </span>

                    <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                        Latest & Top Job Openings
                    </h2>

                    <p className="mt-3 text-gray-500">
                        Find your next opportunity from top companies.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {allJobs?.length > 0 ? (
                        allJobs.slice(0, 6).map((job) => (
                            <LatestJobCard
                                key={job._id}
                                job={job}
                            />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500 text-lg">
                            No Jobs Available
                        </p>
                    )}
                </div>

            </div>
        </section>
    );
};

export default LatestJobs;