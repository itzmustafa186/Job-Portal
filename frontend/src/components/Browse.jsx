import { useEffect, useMemo } from "react";
import Navbar from "./shared/Navbar";
import Footer from "./Footer";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "@/Hooks/useGetAllJobs";
import { SearchX } from "lucide-react";


const Browse = () => {
    useGetAllJobs();

    const dispatch = useDispatch();

    const { searchedQuery, allJobs } = useSelector(
        (store) => store.job
    );

    // Scroll to top on page open
    useEffect(() => {
        
        window.scrollTo(0, 0);
    }, []);

    // SAFE FILTER (frontend fallback)
    const filteredJobs = useMemo(() => {
        if (!searchedQuery?.trim()) return allJobs;

        return allJobs?.filter((job) =>
            job.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job.location?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job.jobType?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job.company?.name?.toLowerCase().includes(searchedQuery.toLowerCase())

        );
    }, [allJobs, searchedQuery]);

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 py-10">

                    {/* Heading */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">
                            Browse Jobs
                        </h1>

                        <p className="mt-2 text-gray-500">
                            {searchedQuery
                                ? `Showing results for "${searchedQuery}"`
                                : "Browse latest available jobs"}
                        </p>
                    </div>

                    {/* Jobs */}
                    {filteredJobs?.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredJobs.map((job) => (
                                <JobCard key={job._id} job={job} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex h-[50vh] flex-col items-center justify-center rounded-3xl bg-white shadow-sm">

                            <SearchX size={60} className="text-gray-300" />

                            <h2 className="mt-5 text-2xl font-bold">
                                No Jobs Found
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Try searching with another keyword.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Browse;