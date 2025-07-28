import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchDemoUrlStats from "../store/fetchDemoUrlStats";
import DashboardHeader from "../components/DemoAnalytics/DashboardHeader";
import SummaryCards from "../components/DemoAnalytics/SummaryCards";
import Filters from "../components/DemoAnalytics/Filters";
import FilteredSummaryCards from "../components/DemoAnalytics/FilteredSummaryCard";
import ClickTrendChart from "../components/DemoAnalytics/ClickTrendChart";
import DeviceBreakdownChart from "../components/DemoAnalytics/DeviceBreakdownChart";
import URLCreationTrendChart from "../components/DemoAnalytics/URLCreationTrendChart";
import TopURLs from "../components/DemoAnalytics/TopURLs";
import VisitLogsTable from "../components/DemoAnalytics/VisitLogsTable";

const DemoAnalyticsPage = () => {
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const { loading, error} = useSelector((state) => state.demoStats);

  useEffect(() => {
    dispatch(fetchDemoUrlStats({ startDate: null, endDate: null }));
  }, [dispatch]);

  // Fetch filtered stats only when both dates are selected
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      dispatch(fetchDemoUrlStats(dateRange));
    }
  }, [dispatch, dateRange]);

  // Don't fetch on every re-render anymore

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }


  return (
    <div className="container-fluid-sm container-fluid-md container">
      <DashboardHeader />

      <SummaryCards />

      <Filters setDateRange={setDateRange} error={error} />

      <FilteredSummaryCards />

      <TopURLs />
      <div className="container-fluid">
        <div className="row">
          {/* Always full width */}
          <div className="col-12 mb-4">
            <ClickTrendChart />
          </div>


          <div className="col-12 col-lg-6 mb-4">
            <DeviceBreakdownChart />
          </div>
          <div className="col-12 col-lg-6 mb-4">
            <URLCreationTrendChart />
          </div>
        </div>
      </div>

      <VisitLogsTable />
    </div>
  );
};

export default DemoAnalyticsPage;
