import React, { useEffect, useState } from 'react';
import ShortCodeStatsForm from '../components/ShortCodeAnalytics/ShortCodeStatsForm';
import ClickTrendChart from '../components/ShortCodeAnalytics/ClickTrendChart';
import DashboardHeader from '../components/ShortCodeAnalytics/DashboardHeader';
import DeviceBreakdownChart from '../components/ShortCodeAnalytics/DeviceBreakdownChart';
import Filters from '../components/ShortCodeAnalytics/Filters';
import FilteredSummaryCards from '../components/ShortCodeAnalytics/FilteredSummaryCard';
import SummaryCards from '../components/ShortCodeAnalytics/SummaryCards';

import { useDispatch, useSelector } from 'react-redux';
import fetchShortCodeStats from '../store/fetchShortCodeStats';
import AuthRequiredMessage from '../components/AuthRequiredMessage';

const ShortCodeAnalyticsPage = () => {
  // const [test, setTest] = useState(false);
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const { loading, error, isAuthenticated , data} = useSelector((state) => state.shortCodeStats);

  useEffect(() => {
    dispatch(fetchShortCodeStats({shortCode : null, startDate: null, endDate: null }));
  }, [dispatch]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      dispatch(fetchShortCodeStats(dateRange));
    }
  }, [dispatch, dateRange]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthRequiredMessage />;
  }

  return (
    <div className="container-fluid-sm container-fluid-md container">
      {/* <button className='btn' onClick={()=> setTest(!test)}>Test</button> */}
      <ShortCodeStatsForm/>
      
      <h1>{isAuthenticated}</h1>
      <DashboardHeader />

      <SummaryCards />

      <Filters setDateRange={setDateRange} error={error} />

      <FilteredSummaryCards />

      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mb-4">
            <ClickTrendChart />
          </div>

          <div className="col-12 col-lg-6 mb-4">
            <DeviceBreakdownChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortCodeAnalyticsPage;
