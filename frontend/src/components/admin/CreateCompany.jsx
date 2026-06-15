import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Building2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utills/constant";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice/companySlice";

const CreateCompany = () => {
    const [input, setInput] = useState({
        companyName: "",
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };



    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.companyName.trim()) {
            return toast.error("Company name is required", {
                className: "!bg-red-500 !text-white",
            });
        }

        try {
            setLoading(true);

            const response = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                input,
                {
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                dispatch(setSingleCompany(response.data.company));

                const companyId = response.data.company._id;

                toast.success(response.data.message, {
                    className: "!bg-green-500 !text-white",
                });

                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);

            toast.error(
                error?.response?.data?.message || "Something went wrong",
                {
                    className: "!bg-red-500 !text-white",
                }
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50">
                <div className="mx-auto max-w-3xl px-4 py-10">
                    <div className="rounded-3xl bg-white p-8 shadow-sm">

                        {/* Header */}
                        <div className="mb-8 flex items-center gap-4">
                            <div className="rounded-2xl bg-blue-100 p-3">
                                <Building2 size={28} className="text-blue-600" />
                            </div>

                            <div>
                                <h1 className="text-3xl font-bold">
                                    Create Company
                                </h1>

                                <p className="text-gray-500">
                                    Add a new company to start posting jobs
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
                                    name="companyName"
                                    required
                                    value={input.companyName}
                                    onChange={changeEventHandler}
                                    placeholder="Google, Microsoft..."
                                    className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() => navigate("/admin/companies")}
                                    className="flex-1 rounded-xl border py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                                >
                                    Cancel
                                </button>

                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Creating...
                                        </span>
                                    ) : (
                                        "Continue"
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

export default CreateCompany;