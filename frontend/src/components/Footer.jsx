import {
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-16">
        
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Logo Section */}
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-600 p-2">
                <Briefcase className="h-6 w-6 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-white">
                Job Portal
              </h2>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              Find your dream job from thousands of opportunities.
              Connect with top companies and grow your career.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link to={"/"} className="hover:text-blue-400">
                  Home
                </Link>
              </li>

              <li>
                <Link to={"/jobs"} className="hover:text-blue-400">
                  Browse Jobs
                </Link>
              </li>

              <li>
                <Link to={"/"} className="hover:text-blue-400">
                  Companies
                </Link>
              </li>

              <li>
                <Link to={"/"} className="hover:text-blue-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Categories
            </h3>

            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-blue-400">
                  Frontend Developer
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-blue-400">
                  Backend Developer
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-blue-400">
                  Full Stack Developer
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-blue-400">
                  AI Engineer
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Contact
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>itzmustafa186@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>+92 309 1214625</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <span>Karachi, Pakistan</span>
              </div>

              <div className="flex items-center gap-3">
                <Globe size={18} />
                <span>www.jobportal.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-slate-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-500 md:flex-row">
            <p>
              © 2026 Job Portal. All rights reserved.
            </p>

            <div className="flex gap-6">
              <a href="#" className="hover:text-blue-400">
                Privacy Policy
              </a>

              <a href="#" className="hover:text-blue-400">
                Terms of Service
              </a>

              <a href="#" className="hover:text-blue-400">
                Help Center
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;