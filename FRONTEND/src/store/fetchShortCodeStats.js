import axiosInstance from "../utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
const fetchShortCodeStats = createAsyncThunk(
    'shortCodeStats/fetch',
    async({shortCode, startDate = null, endDate=null}, thunkAPI) =>{
        try{
            const response = await axiosInstance.post(`api/stats/${shortCode}`, {startDate, endDate}, {
                headers : {
                    "Content-Type" : "application/json"
                }
            })
            // console.log('Response data', response.data);
            return response.data;
        }catch(error){
           return thunkAPI.rejectWithValue(
               error.response?.data || ({message : error.response?.message } || 'Something Went Wrong')  
            )
        }
    }
)
export default fetchShortCodeStats;