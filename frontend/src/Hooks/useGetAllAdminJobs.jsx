import { setAllAdminJobs } from '@/redux/jobSlice/jobSlice'
import { JOB_API_END_POINT } from '@/utills/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJob = () => {
    const dispatch = useDispatch()

    useEffect(() => {

        const fetchAllAdminJobs = async () => {
            try {
                const response = await axios.get(`${JOB_API_END_POINT}/getadminjob`, { withCredentials: true });
                if (response.data.success) {
                    dispatch(setAllAdminJobs(response.data.jobs))
                   
console.log(response.data);

                }
            } catch (error) {
                console.log(error.response?.data?.message);

            }

        }

        fetchAllAdminJobs()
    }, [dispatch])

}

export default useGetAllAdminJob;
