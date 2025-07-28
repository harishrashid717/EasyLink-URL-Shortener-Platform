import React from "react";
import { useSelector } from "react-redux";

const FilteredSummaryCards = () => {
  // Grab the filtered metrics from Redux
  const totalURLs = useSelector(
    (state) => state.urlStats?.data?.filteredSummary?.total_urls
  );
  const totalClicks = useSelector(
    (state) => state.urlStats?.data?.filteredSummary?.total_clicks
  );
  const avgClicks = useSelector(
    (state) => state.urlStats?.data?.filteredSummary?.avg_clicks_per_url
  );

  // (Optional) grab the active filter range if you have it in state
  const { startDate, endDate } = useSelector(
    (state) => state.urlStats?.filters ?? {}
  );

  return (
    <div className="container mb-4">
      <h5 className="mb-3">
        Filtered Summary{" "}
        {startDate && endDate && (
          <small className="text-muted">
            ({startDate} – {endDate})
          </small>
        )}
      </h5>

      <div className="row g-3">
        {/** Use a slight color accent to distinguish from total summary */}
        <div className="col-md-4">
          <div className="card text-center shadow-sm border-0 rounded bg-light">
            <div className="card-body">
              <h6 className="text-primary">Total URLs</h6>
              <h4 className="fw-bold">{totalURLs ?? 0}</h4>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm border-0 rounded bg-light">
            <div className="card-body">
              <h6 className="text-primary">Total Clicks</h6>
              <h4 className="fw-bold">{totalClicks ?? 0}</h4>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm border-0 rounded bg-light">
            <div className="card-body">
              <h6 className="text-primary">Avg. Clicks per URL</h6>
              <h4 className="fw-bold">{avgClicks ?? "0.00"}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilteredSummaryCards;
