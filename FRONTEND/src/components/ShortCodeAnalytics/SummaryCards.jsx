import React from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

const SummaryCards = () => {
  const shortCode = useSelector(
    (state) => state.shortCodeStats?.data?.shortCode
  );

  const totalClicks = useSelector(
    (state) => state.shortCodeStats?.data?.clicksInfo?.clicks
  );

  const handleDelete = async () => {
    if (!shortCode) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete the short code: ${shortCode}?`
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`api/short-urls/${shortCode}`);
      alert(`Deleted successfully: ${shortCode}`);
      // Optionally refresh or reset state
    } catch (error) {
      alert(`Failed to delete short code: ${shortCode}`);
      console.error(error);
    }
  };

  return (
    <div className="mb-4">
      <h5 className="mb-3">Summary</h5>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card text-center shadow-sm border-0 rounded">
            <div className="card-body">
              <h6 className="text-muted">Short Code</h6>
              <h4 className="fw-bold">{shortCode || "—"}</h4>
              {shortCode && (
                <button
                  className="btn btn-danger btn-sm mt-2"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card text-center shadow-sm border-0 rounded">
            <div className="card-body">
              <h6 className="text-muted">Total Clicks</h6>
              <h4 className="fw-bold">{totalClicks ?? 0}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
