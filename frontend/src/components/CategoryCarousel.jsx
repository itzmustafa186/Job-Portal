import {
  Code2,
  Database,
  Layers3,
  Brain,
  Palette,
  Server,
  Briefcase,
  Smartphone,
  Bot,
  Megaphone,
} from "lucide-react";

const categories = [
  {
    title: "Frontend Developer",
    icon: Code2,
    jobs: "1,250+ Jobs",
  },
  {
    title: "Backend Developer",
    icon: Database,
    jobs: "980+ Jobs",
  },
  {
    title: "Full Stack Developer",
    icon: Layers3,
    jobs: "1,500+ Jobs",
  },
  {
    title: "Data Scientist",
    icon: Brain,
    jobs: "720+ Jobs",
  },
  {
    title: "UI/UX Designer",
    icon: Palette,
    jobs: "640+ Jobs",
  },
  {
    title: "DevOps Engineer",
    icon: Server,
    jobs: "540+ Jobs",
  },
  {
    title: "Product Manager",
    icon: Briefcase,
    jobs: "420+ Jobs",
  },
  {
    title: "Mobile Developer",
    icon: Smartphone,
    jobs: "890+ Jobs",
  },
  {
    title: "AI Engineer",
    icon: Bot,
    jobs: "780+ Jobs",
  },
  {
    title: "Digital Marketing",
    icon: Megaphone,
    jobs: "560+ Jobs",
  },
];

export default function CategoryCarousel() {
  return (
    <section className="bg-white py-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            Explore Opportunities
          </span>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Browse Jobs By Category
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Discover thousands of opportunities across the most
            in-demand industries and start your career journey today.
          </p>
        </div>

        {/* Carousel */}
        <div className="mt-12 flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <div
                key={index}
                className="group min-w-[280px] rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl"
              >
                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white transition-transform duration-300 group-hover:scale-110">
                  <Icon size={30} />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {category.title}
                </h3>

                {/* Jobs */}
                <p className="mt-2 text-sm text-gray-500">
                  {category.jobs}
                </p>

                {/* Description */}
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  Explore top opportunities and connect with leading
                  companies hiring skilled professionals.
                </p>

                {/* Button */}
                <button className="mt-6 w-full rounded-xl border border-gray-200 py-3 font-medium text-gray-700 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white">
                  Explore Jobs
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}