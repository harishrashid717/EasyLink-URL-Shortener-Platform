import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';

export const fetchUrlStats = createAsyncThunk(
  'urlStats/fetch', 
  async ({ startDate, endDate }, thunkAPI) => {
    try {
      const response = await axiosInstance.post('api/stats/', { startDate, endDate }, {
        headers : {
          "Content-Type" : "application/json"
        }
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {message : error.message || 'Something went wrong'}
      );
    }
  }
);
