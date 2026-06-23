import Navbar from "../shared/Navbar";
import CompanyTable from "./CompanyTable";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import useGetAllCompanies from "@/Hooks/useGetAllCompanies";
import AdminJobTable from "./AdminJobTable";

import useGetAllAdminJob from "@/Hooks/useGetAllAdminJobs";

const AdminJobs = () => {
useGetAllAdminJob();
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8">

          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Jobs
              </h1>

              <p className="mt-1 text-gray-500">
                Manage your registered Jobs
              </p>
            </div>

            <Link
              to="/admin/jobs/post"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
            >
              <Plus size={18} />
              New Job
            </Link>
          </div>

          <AdminJobTable />
        </div>
      </div>
    </>
  );
};

export default AdminJobs;