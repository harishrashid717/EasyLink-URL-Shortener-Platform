import React from "react";
import { useSelector } from "react-redux";
import styles from "./VisitLogsTable.module.css"; // Create this file

const VisitLogsTable = () => {
  const detailedLogs = useSelector(
    (state) => state.urlStats?.data?.detailedLogs || []
  );

  const data = detailedLogs.map((item) => ({
    date: new Date(item.date).toISOString().slice(0, 10),
    shortCode: item.short_code,
    clicks: item.clicks,
    device: item.device,
  }));

  return (
    <div className="container mb-4">
      <h5 className="mb-3">
        Visit Logs <small className="text-muted"></small>
      </h5>
      <div className="card shadow-sm border-0 rounded">
        <div className="card-body p-0">
          <div className={styles.tableScroll}>
            <table className="table table-hover mb-0">
              <thead className={`bg-light ${styles.stickyHeader}`}>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Short Code</th>
                  <th scope="col" className="text-end mx-4">Clicks</th>
                  <th scope="col" className="mx-4">Device</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map(({ date, shortCode, clicks, device }, idx) => (
                    <tr key={idx}>
                      <td>{date}</td>
                      <td>
                        <span className="text-primary fw-medium">
                          {shortCode}
                        </span>
                      </td>
                      <td className="text-end">{clicks}</td>
                      <td>{device}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-3">
                      No logs available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitLogsTable;
