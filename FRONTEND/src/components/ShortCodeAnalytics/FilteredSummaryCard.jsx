import React from "react";
import { useSelector } from "react-redux";

const FilteredSummaryCards = () => {
  // Updated selectors
  const shortCode = useSelector(
    (state) => state.shortCodeStats?.data?.shortCode
  );

  const totalClicks = useSelector(
    (state) => state.shortCodeStats?.data?.clicksInfo?.clicks
  );

  const createdDate = useSelector(
    (state) => state.shortCodeStats?.data?.clicksInfo?.created_date
  );

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
        {/* Short Code Card */}
        <div className="col-md-4">
          <div className="card text-center shadow-sm border-0 rounded bg-light">
            <div className="card-body">
              <h6 className="text-primary">Short Code</h6>
              <h4 className="fw-bold">{shortCode ?? "N/A"}</h4>
            </div>
          </div>
        </div>

        {/* Total Clicks Card */}
        <div className="col-md-4">
          <div className="card text-center shadow-sm border-0 rounded bg-light">
            <div className="card-body">
              <h6 className="text-primary">Total Clicks</h6>
              <h4 className="fw-bold">{totalClicks ?? 0}</h4>
            </div>
          </div>
        </div>

        {/* Created Date Card */}
        <div className="col-md-4">
          <div className="card text-center shadow-sm border-0 rounded bg-light">
            <div className="card-body">
              <h6 className="text-primary">Created Date</h6>
              <h4 className="fw-bold">{createdDate ?? "N/A"}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilteredSummaryCards;
