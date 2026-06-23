import { setSearchedQuery } from "@/redux/jobSlice/jobSlice";
import {
  Code2,
  Database,
  Brain,
  Palette,
  Server,
  Briefcase,
  Smartphone,
  Bot,
  Megaphone,
  Layers3,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const icons = [
  Code2,
  Database,
  Brain,
  Palette,
  Server,
  Briefcase,
  Smartphone,
  Bot,
  Megaphone,
  Layers3,
];

export default function CategoryCarousel() {
   
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const searchJobHandler = (query)=>{
      dispatch(setSearchedQuery(query));
      navigate("/browse")
    };

  return (
    <section className="bg-gradient-to-b from-slate-50 via-white to-slate-100 py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="text-center">
          <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            🚀 Explore Careers
          </span>

          <h2 className="mt-5 text-4xl font-extrabold text-slate-900">
            Browse Jobs by Category
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Find opportunities from top companies and discover your
            next career move in the fastest-growing industries.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 flex gap-7 overflow-x-auto pb-5 scrollbar-hide">
          {allJobs.map((job, index) => {
            const Icon = icons[index % icons.length];

            return (
              <div
                key={job._id}
                className="group min-w-[320px] rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-xl p-7 shadow-md transition duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-blue-500"
              >
                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white transition duration-300 group-hover:scale-110">
                  <Icon size={30} />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  {job.title}
                </h3>

                {/* Badge */}
                <div className="mt-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                  🔥 Hiring Now
                </div>

                {/* Description */}
                <p className="mt-5 text-[15px] leading-7 text-slate-600">
                  Explore exciting opportunities, grow your skills, and
                  join innovative companies looking for talented
                  professionals.
                </p>

                {/* Button */}
                <button
                  onClick={() => searchJobHandler(job.title)}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-600"
                >
                  Explore Jobs
                  <ArrowRight size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}