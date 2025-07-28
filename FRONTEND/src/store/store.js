import {configureStore} from '@reduxjs/toolkit';
import urlStatsReducer from './userUrlStatsSlice';
import demoUrlStatsReducer from './demoUrlStatsSlice';
import shortCodeStatsReducer from "./shortCodeStatsSlice";

const store = configureStore({
    reducer : {
        urlStats : urlStatsReducer,
        demoStats : demoUrlStatsReducer,
        shortCodeStats: shortCodeStatsReducer,
    },
    devTools: true
})

export default store;