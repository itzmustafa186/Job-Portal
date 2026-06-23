import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice/jobSlice";
import { MapPin, Briefcase, BadgeDollarSign, GraduationCap } from "lucide-react";

const filterData = [
  {
    title: "Location",
    icon: <MapPin size={18} />,
    options: ["Karachi", "Lahore", "Islamabad", "Remote"],
  },
  {
    title: "Job Type",
    icon: <Briefcase size={18} />,
    options: ["Full Time", "Part Time", "Internship", "Contract"],
  },
  {
    title: "Experience",
    icon: <GraduationCap size={18} />,
    options: ["Fresher", "1+ Years", "2+ Years", "3+ Years", "5+ Years"],
  },
  {
    title: "Salary",
    icon: <BadgeDollarSign size={18} />,
    options: ["10+ LPA", "20+ LPA", "30+ LPA"],
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="sticky top-24 rounded-3xl border bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Filters
        </h2>

        <button
          onClick={() => {
            setSelectedValue("");
            dispatch(setSearchedQuery(""));
          }}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Clear
        </button>
      </div>

      {filterData.map((item) => (
        <div key={item.title} className="mb-7">

          <div className="mb-3 flex items-center gap-2">
            {item.icon}
            <h3 className="font-semibold">
              {item.title}
            </h3>
          </div>

          <div className="space-y-3">
            {item.options.map((option) => (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-gray-100"
              >
                <input
                  type="radio"
                  name={item.title}
                  value={option}
                  checked={selectedValue === option}
                  onChange={() => setSelectedValue(option)}
                  className="h-4 w-4 accent-blue-600"
                />

                <span className="text-sm text-gray-700">
                  {option}
                </span>
              </label>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
};

export default FilterCard;