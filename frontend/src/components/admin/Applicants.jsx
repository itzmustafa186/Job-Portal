import { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantTable from "./ApplicantsTable";
import { Users } from "lucide-react";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utills/constant";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setApplicants } from "@/redux/applicationSlice/applicationSlice";

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const response = await axios.get(
          `${APPLICATION_API_END_POINT}/${id}/applicants`,
          {
            withCredentials: true,
          }
        );

        

        if (response.data.success) {
          dispatch(setApplicants(response.data.job.applications));
        }
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    };

    fetchAllApplicants();
  }, [id, dispatch]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-3">
                <Users className="text-blue-600" size={26} />
              </div>

              <div>
                <h1 className="text-3xl font-bold">Applicants</h1>

                <p className="text-gray-500">
                  View all applicants for this job
                </p>
              </div>
            </div>
          </div>

          <ApplicantTable />
        </div>
      </div>
    </>
  );
};

export default Applicants;