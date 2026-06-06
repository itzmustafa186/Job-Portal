import { useState } from "react";
import {
  Briefcase,
  Search,
  Bell,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Change to false to see Login/Signup buttons
  const isLoggedIn = false;

  const user = {
    name: "Muhammad Mustafa",
    avatar: "https://i.pravatar.cc/150?img=12",
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-blue-600 p-2 text-white">
            <Briefcase size={20} />
          </div>
          <h1 className="text-xl font-bold text-gray-900">
            JobPortal
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="font-medium text-gray-600 transition hover:text-blue-600"
          >
            Find Jobs
          </a>

          <a
            href="#"
            className="font-medium text-gray-600 transition hover:text-blue-600"
          >
            Companies
          </a>

          <a
            href="#"
            className="font-medium text-gray-600 transition hover:text-blue-600"
          >
            Remote Jobs
          </a>

          <a
            href="#"
            className="font-medium text-gray-600 transition hover:text-blue-600"
          >
            Career Advice
          </a>
        </div>

        {/* Search */}
        <div className="hidden lg:flex items-center rounded-full border bg-gray-50 px-3 py-2 w-72">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs..."
            className="ml-2 w-full bg-transparent outline-none"
          />
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <button className="rounded-full p-2 hover:bg-gray-100">
                <Bell size={20} />
              </button>

              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-10 w-10 rounded-full"
                />

                <div>
                  <h4 className="font-semibold">{user.name}</h4>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to={"/login"}><button className="rounded-lg border px-4 py-2 font-medium hover:bg-gray-50">
                Login
              </button></Link>

              <Link to={"/signup"}><button className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
                Sign Up
              </button></Link>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="space-y-4 p-4">
            <div className="flex items-center rounded-lg border px-3 py-2">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="ml-2 w-full outline-none"
              />
            </div>

            <Link className="block font-medium">
              Home
            </Link>

            <Link className="block font-medium">
              Jobs
            </Link>

            <Link className="block font-medium">
              Browse
            </Link>

            

            {isLoggedIn ? (
              <div className="flex items-center gap-3 border-t pt-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-10 w-10 rounded-full"
                />

                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">
                    Job Seeker
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 border-t pt-4">
                <button className="rounded-lg border py-2">
                  <Link to={"/login"}>Login</Link>
                </button>

                <button className="rounded-lg bg-blue-600 py-2 text-white">
                  <Link to={"/signup"}>Sign Up</Link>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}