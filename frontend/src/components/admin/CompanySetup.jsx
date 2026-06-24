import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Building2, Upload, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utills/constant";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/Hooks/useGetCompanyById";

const CompanySetup = () => {
  const navigate = useNavigate();
  const params = useParams();
  const companyId = params.id;
  useGetCompanyById(companyId)
 

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: "",
  });
  const [loading, setLoading] = useState();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const fileChangeHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files?.[0],
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const formData = new FormData();

      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("website", input.website);
      formData.append("location", input.location);

      if (input.file) {
        formData.append("logo", input.file);
      }

      console.log([...formData.entries()]);

      // API Call Here
      const response = await axios.put(`${COMPANY_API_END_POINT}/update/${companyId}`, formData, { withCredentials: true });
      console.log(response);

      if (response.data.success) {
        navigate('/admin/companies');
        toast.success(response?.data?.message, {
          className: "!bg-green-500 !text-white !border-green-500",
        })
      };

    } catch (error) {
      console.log(error.response);
      toast.error(error?.response?.data?.messsage, {
        className: "!bg-red-500 !text-white !border-red-500",
      })

    } finally {
      setLoading(false);
    }
  };

  const { singleCompany } = useSelector(
    (store) => store.company
  );

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany.logo || null,
      });
    }
  }, [singleCompany]);
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-10">

          <div className="mb-6">
            <button
              onClick={() => navigate("/admin/companies")}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
            >
              <ArrowLeft size={18} />
              Back to Companies
            </button>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">

            {/* Header */}
            <div className="mb-8 flex items-center gap-4">
              <div className="rounded-2xl bg-blue-100 p-3">
                <Building2
                  size={28}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h1 className="text-3xl font-bold">
                  Company Setup
                </h1>

                <p className="text-gray-500">
                  Complete your company profile
                </p>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={submitHandler}
              className="space-y-6"
            >
              <div>
                <label className="mb-2 block font-medium">
                  Company Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  placeholder="Google"
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Description
                </label>

                <textarea
                  rows={5}
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Write company description..."
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-medium">
                    Website
                  </label>

                  <input
                    type="text"
                    name="website"
                    value={input.website}
                    onChange={changeEventHandler}
                    placeholder="https://company.com"
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={input.location}
                    onChange={changeEventHandler}
                    placeholder="Karachi, Pakistan"
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Company Logo
                </label>

                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 p-6 hover:border-blue-500">
                  <Upload size={20} />

                  <span>
                    Upload Company Logo
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={fileChangeHandler}
                    className="hidden"
                  />
                </label>

                {input.file && (
                  <p className="mt-2 text-sm text-green-600">
                    {input.file.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    navigate("/admin/companies")
                  }
                  className="flex-1 rounded-xl border py-3 font-semibold hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    "Save Company"
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  );
};

export default CompanySetup;