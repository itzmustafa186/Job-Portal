import { setAllAppliedJobs } from "@/redux/jobSlice/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utills/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux"


const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {

        const fetchAppliedJob = async () => {
            try {
                const response = await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true});
                console.log(response.data);
                if (response.data.success) {
                    dispatch(setAllAppliedJobs(response.data.application))
                }
            } catch (error) {
                console.log(error.response);

            }

        };
        fetchAppliedJob();
    }, [])
}

export default useGetAppliedJobs
