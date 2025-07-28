import { createSlice } from '@reduxjs/toolkit';
import { fetchUrlStats } from './fetchUserUrlStats';

const urlStats = createSlice({
  name: 'userUrlStats',
  initialState: {
    data: {},
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUrlStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUrlStats.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        state.isAuthenticated = action.payload?.isAuthenticated ?? true;
      })
      .addCase(fetchUrlStats.rejected, (state, action) => {
        state.loading = false;
        state.data = {};
        state.error = action.payload?.message || 'Something went wrong';
        state.isAuthenticated = action.payload?.isAuthenticated ?? false;
      });
  },
});

export default urlStats.reducer;
