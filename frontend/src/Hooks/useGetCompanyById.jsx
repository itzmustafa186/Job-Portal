

import { setSingleCompany } from '@/redux/companySlice/companySlice'
import { setAllJobs } from '@/redux/jobSlice/jobSlice'
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utills/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch()

    useEffect(() => {

        const fetchSingleComapny = async () => {
            try {
                const response = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, { withCredentials: true });
                if (response.data.success) {
                    dispatch(setSingleCompany(response.data.company))


                }
            } catch (error) {
                console.log(error.response?.data?.message);

            }

        }

        fetchSingleComapny()
    }, [companyId, dispatch])

}

export default useGetCompanyById
