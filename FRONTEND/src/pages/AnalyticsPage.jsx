import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUrlStats } from "../store/fetchUserUrlStats";
import DashboardHeader from "../components/Analytics/DashboardHeader";
import SummaryCards from "../components/Analytics/SummaryCards";
import Filters from "../components/Analytics/Filters";
import FilteredSummaryCards from "../components/Analytics/FilteredSummaryCard";
import ClickTrendChart from "../components/Analytics/ClickTrendChart";
import DeviceBreakdownChart from "../components/Analytics/DeviceBreakdownChart";
import URLCreationTrendChart from "../components/Analytics/URLCreationTrendChart";
import TopURLs from "../components/Analytics/TopURLs";
import VisitLogsTable from "../components/Analytics/VisitLogsTable";
import AuthRequiredMessage from "../components/AuthRequiredMessage";
const AnalyticsPage = () => {
  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const { loading, error, isAuthenticated } = useSelector((state) => state.urlStats);
  

  // const isAuthenticated = useSelector(
  //     (state) => state.urlStats?.isAuthenticated
  //   );
  // Fetch default all-time stats only once on mount
  useEffect(() => {
    dispatch(fetchUrlStats({ startDate: null, endDate: null }));
  }, [dispatch]);

  // Fetch filtered stats only when both dates are selected
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      dispatch(fetchUrlStats(dateRange));
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

  if(!isAuthenticated){
    return (
      // <h1>Login or register first</h1>
      <AuthRequiredMessage/>
    )
  }
  return (
    <div className="container-fluid-sm container-fluid-md container">
      <h1>{isAuthenticated}</h1>
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

export default AnalyticsPage;
