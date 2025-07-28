import { createSlice } from "@reduxjs/toolkit";
import fetchShortCodeStats from "./fetchShortCodeStats";

const shortCodeStatsSlice = createSlice({
  name: "shortCodeStats",
  initialState: {
    data: {},
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShortCodeStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShortCodeStats.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
        state.isAuthenticated = action.payload?.isAuthenticated ?? true;
      })
      .addCase(fetchShortCodeStats.rejected, (state, action) => {
        state.loading = false;
        state.data = {};
        state.error = action.payload?.message || "Something went wrong";
        state.isAuthenticated = action.payload?.isAuthenticated ?? false;
      });
  },
});

export default shortCodeStatsSlice.reducer;
