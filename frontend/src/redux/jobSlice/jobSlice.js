import { createSlice } from "@reduxjs/toolkit";


export const jobSlice = createSlice({
    name: "job",
    initialState: {

        allJobs: [],
        allAdminJob: [],
        singleJob: null,
        allAppliedJobs: [],
        searchedQuery: ""
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJob = action.payload
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload
        },
    }
});

export const { setAllJobs, setSingleJob, setAllAdminJobs, setAllAppliedJobs, setSearchedQuery } = jobSlice.actions;

export default jobSlice.reducer;