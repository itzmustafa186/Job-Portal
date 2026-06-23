import { useState } from "react";
import {
  Briefcase,
  Search,
  Bell,
  Menu,
  X,
  LogOut,
  User2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utills/constant";
import { setUser } from "@/redux/authSlice/authSlice";
import { toast } from "sonner";
import { persistor } from "@/redux/store";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        `${USER_API_END_POINT}/logout`,
        {},
        {
          withCredentials: true,
        }
      );


      if (response.data.success) {
       
dispatch(setUser(null))
        await persistor.purge();

        toast.success(response.data.message, {
          className:
            "!bg-green-500 !text-white !border-green-500",
        });

        navigate("/");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message,
        {
          className:
            "!bg-red-500 !text-white !border-red-500",
        }
      );
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-xl bg-blue-600 p-2 text-white">
            <Briefcase size={20} />
          </div>

          <h1 className="text-xl font-bold text-gray-900">
            JobPortal
          </h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {user?.role === "recruiter" ? (
            <>
              <Link
                to="/admin/companies"
                className="font-medium text-gray-600 transition hover:text-blue-600"
              >
                Companies
              </Link>

              <Link
                to="/admin/jobs"
                className="font-medium text-gray-600 transition hover:text-blue-600"
              >
                Jobs
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="font-medium text-gray-600 transition hover:text-blue-600"
              >
                Home
              </Link>

              <Link
                to="/jobs"
                className="font-medium text-gray-600 transition hover:text-blue-600"
              >
                Jobs
              </Link>

              <Link
                to="/browse"
                className="font-medium text-gray-600 transition hover:text-blue-600"
              >
                Browse
              </Link>
            </>
          )}
        </div>



        {/* Desktop Right Side */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <button className="rounded-full p-2 hover:bg-gray-100">
                <Bell size={20} />
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <img
                    src={
                      user?.profile?.profilePhoto ||
                      "https://ui-avatars.com/api/?name=User"
                    }
                    alt={user?.fullname}
                    className="h-10 w-10 cursor-pointer rounded-full border-2 border-blue-100 object-cover hover:border-blue-500"
                  />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-64"
                >
                  <div className="p-3">
                    <h4 className="font-semibold">
                      {user?.fullname}
                    </h4>

                    <p className="text-sm text-gray-500">
                      {user?.role}
                    </p>
                  </div>

                  <DropdownMenuSeparator />

                  {user?.role === "student" && (
                    <DropdownMenuItem asChild>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2"
                      >
                        <User2 size={16} />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem
                    onClick={logoutHandler}
                    className="cursor-pointer text-red-500 focus:text-red-500"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="rounded-lg border px-4 py-2 font-medium hover:bg-gray-50">
                  Login
                </button>
              </Link>

              <Link to="/signup">
                <button className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() =>
            setMobileMenuOpen(!mobileMenuOpen)
          }
        >
          {mobileMenuOpen ? (
            <X size={26} />
          ) : (
            <Menu size={26} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="space-y-4 p-4">


            {user?.role === "recruiter" ? (
              <>
                <Link
                  to="/admin/companies"
                  className="block font-medium"
                >
                  Companies
                </Link>

                <Link
                  to="/admin/jobs"
                  className="block font-medium"
                >
                  Jobs
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="block font-medium"
                >
                  Home
                </Link>

                <Link
                  to="/jobs"
                  className="block font-medium"
                >
                  Jobs
                </Link>

                <Link
                  to="/browse"
                  className="block font-medium"
                >
                  Browse
                </Link>
              </>
            )}

            {user ? (
              <div className="border-t pt-4">
                <div className="mb-4 flex items-center gap-3">
                  <img
                    src={
                      user?.profile?.profilePhoto ||
                      "https://ui-avatars.com/api/?name=User"
                    }
                    alt={user?.fullname}
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="font-semibold">
                      {user?.fullname}
                    </h4>

                    <p className="text-sm text-gray-500">
                      {user?.role}
                    </p>
                  </div>
                </div>

                {user?.role === "student" && (
                  <Link
                    to="/profile"
                    className="mb-3 flex items-center gap-2 rounded-lg border p-3"
                  >
                    <User2 size={18} />
                    Profile
                  </Link>
                )}

                <button
                  onClick={logoutHandler}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 p-3 text-white"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 border-t pt-4">
                <Link to="/login">
                  <button className="w-full rounded-lg border py-2">
                    Login
                  </button>
                </Link>

                <Link to="/signup">
                  <button className="w-full rounded-lg bg-blue-600 py-2 text-white">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}