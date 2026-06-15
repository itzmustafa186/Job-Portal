

const filterData = [
  {
    title: "Location",
    options: ["Remote", "Karachi", "Lahore", "Islamabad"],
  },
  {
    title: "Job Type",
    options: ["Full Time", "Part Time", "Internship"],
  },
  {
    title: "Experience",
    options: ["Fresher", "1+ Years", "3+ Years"],
  },
];

const FilterCard = () => {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Filters
      </h2>

      {filterData.map((item, index) => (
        <div key={index} className="mb-6">
          <h3 className="mb-3 font-semibold">
            {item.title}
          </h3>

          <div className="space-y-2">
            {item.options.map((option, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 text-gray-600"
              >
                <input type="radio" name={item.title} />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;