import React from "react";
import { useSelector } from "react-redux";
const DashboardHeader = () => {
  const fullName = useSelector(
    (state) => state.urlStats?.data?.userFullname?.full_name
  );
  return (
    <div
      className="w-100 bg-white bg-opacity-75 py-2 mb-4 "
      style={{
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
    >
      <h2 className="mb-0">
        <span className="font-monospace fs-10">
          <span style={{ fontWeight: 10 }}>Welcome, </span>
          <span style={{ fontWeight: 500 }}>{fullName}!</span>
        </span>
      </h2>
      <p className="mb-0 text-muted">Here’s your URL analytics at a glance.</p>
    </div>
  );
};

export default DashboardHeader;
