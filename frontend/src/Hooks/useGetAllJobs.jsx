import { setAllJobs } from '@/redux/jobSlice/jobSlice'

import { JOB_API_END_POINT } from '@/utills/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch()
const {searchedQuery} = useSelector((store)=>store.job)
    useEffect(() => {

        const fetchAllJobs = async () => {
            console.log(searchedQuery);
            
            try {
                const response = await axios.get(`${JOB_API_END_POINT}/get`, { withCredentials: true });
                if (response.data.success) {
                    dispatch(setAllJobs(response.data.jobs))
                   

                }
            } catch (error) {
                console.log(error.response?.data?.message);

            }

        }

        fetchAllJobs()
    }, [dispatch])

}

export default useGetAllJobs
