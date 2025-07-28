import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

const fetchDemoUrlStats = createAsyncThunk(
  "demoUrlStats/fetch",
  async ({startDate = null, endDate = null}, thunkAPI) => {
    try {
      const response = await axiosInstance.post("api/fakedata", {startDate , endDate}, {
        headers: {
          "Accept": "application/json",
          "Content-Type" : "application/json"
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: error?.message || "Something went Wrong",
        }
      );
    }
  }
);
export default fetchDemoUrlStats;