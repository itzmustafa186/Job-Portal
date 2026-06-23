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
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";


const Jobs = () => {
  useGetAllJobs();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const { allJobs, searchedQuery } = useSelector((store) => store.job)

  const filteredJobs = allJobs.filter((job) => {
    if (!searchedQuery) return true;

    const query = searchedQuery.toLowerCase();

    if (
      job.title?.toLowerCase().includes(query) ||
      job.location?.toLowerCase().includes(query) ||
      job.jobType?.toLowerCase().includes(query) ||
      job.company?.name?.toLowerCase().includes(query)
    ) {
      return true;
    }

    if (query.includes("years")) {
      const exp = parseInt(query);
      return job.experience >= exp;
    }

    if (query.includes("lpa")) {
      const salary = parseInt(query);
      return job.salary >= salary;
    }

    return false;
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.9,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.9,
      filter: "blur(6px)",
      transition: {
        duration: 0.2,
      },
    },
  };
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
              <AnimatePresence mode="wait">
                {filteredJobs.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-[400px] items-center justify-center"
                  >
                    <h1 className="text-xl font-semibold text-gray-500">
                      No Jobs Found
                    </h1>
                  </motion.div>
                ) : (
                  <motion.div
                    key={filteredJobs.length}
                    layout
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                  >
                    {filteredJobs.map((job) => (
                      <motion.div
                        key={job._id}
                        layout
                        variants={cardVariants}
                        whileHover={{
                          y: -8,
                          scale: 1.03,
                          transition: {
                            duration: 0.2,
                          },
                        }}
                        whileTap={{
                          scale: 0.98,
                        }}
                      >
                        <JobCard job={job} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>

  );
};

export default Jobs;