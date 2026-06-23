import { setSearchedQuery } from "@/redux/jobSlice/jobSlice";
import { Search } from "lucide-react";
import { useState } from "react";
import CountUp from "react-countup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



export default function HeroSection() {
  const [query, setQuery] = useState();
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const searchJobHandler = ()=>{
    dispatch(setSearchedQuery(query));
    navigate("/browse")
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">

        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <span className="rounded-full border border-blue-200 bg-blue-100 px-4 py-2 text-xs sm:text-sm font-medium text-blue-700">
            🚀 No.1 Job Hunt Website
          </span>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-5xl text-center">

          {/* Heading */}
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
            Search, Apply &
            <br className="hidden sm:block" />
            Get Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dream Job
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-base text-gray-600 sm:text-lg lg:text-xl">
            Discover thousands of opportunities from top companies.
            Find the perfect role, apply instantly, and build the
            career you've always wanted.
          </p>

          {/* Search Box */}
          <div className="mx-auto mt-8 max-w-3xl">
            <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg sm:flex-row sm:items-center">

              <div className="flex flex-1 items-center">
                <Search className="ml-2 h-5 w-5 text-gray-400" />

                <input
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="Search jobs, skills, companies..."
                  className="w-full px-3 py-3 outline-none"
                />
              </div>

              <button onClick={searchJobHandler} className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto">
                Search Jobs
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                <CountUp.default end={10000} duration={3} separator="," />+
              </h3>
              <p className="text-gray-500">Active Jobs</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                <CountUp.default end={5000} duration={3} separator="," />+
              </h3>
              <p className="text-gray-500">Companies</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                <CountUp.default end={50000} duration={3} separator="," />+
              </h3>
              <p className="text-gray-500">Job Seekers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}