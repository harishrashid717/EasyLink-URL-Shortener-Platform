import React from "react";
import { useSelector } from "react-redux";

const SummaryCards = () => {
const totalURLs = useSelector(
  (state) => state.demoStats?.data?.totalSummary?.total_urls
);

const totalClicks = useSelector(
  (state) => state.demoStats?.data?.totalSummary?.total_clicks
);

const avgClicks = useSelector(
  (state) => state.demoStats?.data?.totalSummary?.avg_clicks_per_url
);


  return (
    <div className=" mb-4">
      <h5 className="mb-3">Summary</h5>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card text-center shadow-sm border-0 rounded">
            <div className="card-body">
              <h6 className="text-muted ">Total URLs</h6>
              <h4 className="fw-bold">{totalURLs}</h4>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm border-0 rounded">
            <div className="card-body">
              <h6 className="text-muted">Total Clicks</h6>
              <h4 className="fw-bold">{totalClicks}</h4>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm border-0 rounded">
            <div className="card-body">
              <h6 className="text-muted">Average Clicks per URL</h6>
              <h4 className="fw-bold">{avgClicks}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
