import { Search, Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import FilterCard from "./FilterCard";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";
import Navbar from "./shared/Navbar";
import useGetAllJobs from "@/Hooks/useGetAllJobs";
import Footer from "./Footer";



const Jobs = () => {
  useGetAllJobs();

  const { allJobs } = useSelector((store) => store.job)
  const jobSArray = [1, 2, 3, 4]
  return (

    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-10">

          {/* Search + Filter */}
          <div className="mb-8 flex items-center gap-4">
            <div className="flex flex-1 items-center rounded-xl border bg-white px-4 py-3">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="ml-2 w-full outline-none"
              />
            </div>

            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-white lg:hidden">
                  <Filter size={18} />
                  Filters
                </button>
              </SheetTrigger>

              <SheetContent side="left" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>

                <div className="mt-6">
                  <FilterCard />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex gap-6">
            {/* Desktop Filter */}
            <div className="hidden w-72 lg:block">
              <FilterCard />
            </div>

            {/* Job Cards */}
            <div className="flex-1">
              {allJobs?.length === 0 ? (
                <div className="flex h-[400px] items-center justify-center">
                  <h1 className="text-xl font-semibold text-gray-500">
                    No Jobs Found
                  </h1>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {allJobs?.map((job) => (
                    <JobCard
                      key={job._id}
                      job={job}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      <Footer/>
    </>

  );
};

export default Jobs;