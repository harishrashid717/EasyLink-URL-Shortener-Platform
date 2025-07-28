import fetchDemoUrlStats from "./fetchDemoUrlStats";
import { createSlice } from "@reduxjs/toolkit";

const demoUrlStatsSlice = createSlice({
    name : 'demoUrlStats',
    initialState : {
        data : {},
        loading : false,
        error : null
    },
    reducers : {},
    extraReducers : (builder)=>{
        builder
            .addCase(fetchDemoUrlStats.pending, (state)=>{
                state.loading = true;
            })
            .addCase(fetchDemoUrlStats.fulfilled, (state, action)=>{
                state.loading = false;
                state.error = null;
                state.data = action.payload;
            })
            .addCase(fetchDemoUrlStats.rejected, (state, action)=>{
                state.loading = false;
                state.data = {};
                 state.error = action.payload?.message || 'Something went wrong';
            })
    }
})

export default demoUrlStatsSlice.reducer;