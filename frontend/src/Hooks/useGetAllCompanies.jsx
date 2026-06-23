

import { setCompanies } from '@/redux/companySlice/companySlice'
import { setAllJobs } from '@/redux/jobSlice/jobSlice'
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utills/constant'
import axios from 'axios'
import { LogIn } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch()

    useEffect(() => {

        const fetchAllCompanies = async () => {
            try {
                const response = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });

                if (response.data.success) {


                    dispatch(setCompanies(response.data.companies))
                    


                }
            } catch (error) {
                console.log(error.response?.data?.message);

            }

        }

        fetchAllCompanies()
    }, [])

}

export default useGetAllCompanies
