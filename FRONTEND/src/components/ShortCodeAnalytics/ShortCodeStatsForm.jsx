import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import fetchShortCodeStats from "../../store/fetchShortCodeStats";
const ShortCodeStatsForm = () => {
  const [shortCode, setShortCode] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    setShortCode(shortCode.trim())
    if (!shortCode) return;
    // onSubmit(shortCode);
    dispatch(fetchShortCodeStats({shortCode}));
  };

  return (
    <div className="container py-3">
      <h3 className="text-center mb-4 fw-semibold">🔍 Get Your Short Code Stats</h3>
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6">
            <div className="input-group input-group-lg">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your shortcode e.g. o4P5q6R"
                value={shortCode}
                onChange={(e) => setShortCode(e.target.value)}
              />
              <button
                className="btn btn-primary"
                type="submit"
              >
                Get Stats
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShortCodeStatsForm;
