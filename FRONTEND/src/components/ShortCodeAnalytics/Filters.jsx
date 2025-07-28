import React, { useState } from "react";

const Filters = ({ setDateRange, error }) => {
  const today = new Date().toISOString().slice(0, 10);
  const weekAgo = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [daysCount, setDaysCount] = useState(null);

  const handleApply = () => {
    setDateRange({ startDate, endDate });

    const diff =
      Math.round(
        (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
      ) + 1;

    setDaysCount(diff > 0 ? diff : 0);
  };

  return (
    <div className="mb-4">
      <h5 className="mb-3">Filters</h5>
      <div className="row g-3 align-items-center">
        <div className="col-12 col-sm-6 col-lg-5">
          <label className="form-label fw-medium mb-1">
            Time Range:
            <span>
              <small className="text-muted"> ({daysCount} days)</small>
            </span>
          </label>
          <div className="d-flex">
            <input
              type="date"
              className="form-control form-control-sm me-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span className="align-self-center">—</span>
            <input
              type="date"
              className="form-control form-control-sm ms-2"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-4 col-lg-auto ">
          <button
            className="btn btn-primary btn-sm w-100 mt-4"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
      {error && (
        <div className="badge text-bg-danger mt-3 w-40 " role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default Filters;
