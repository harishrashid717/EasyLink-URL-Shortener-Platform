import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./TopURLs.module.css";
import { BiTrash } from "react-icons/bi";
import axiosInstance from "../../utils/axiosInstance";

const TopURLs = () => {
  const topUrls = useSelector(
    (state) => state.urlStats?.data?.topUrls || []
  );
  const [data, setData] = useState(
    topUrls.map((item) => ({
      id: item.id, // Replace with the actual unique key
      shortCode: item.short_code,
      url: item.full_url,
      clicks: item.clicks,
      created: item.created,
    }))
  );

  const handleDelete = async (id) => {
  alert("You are not authorized to delete the short code in Demo Analytics. Please delete only your own generated URLs")
};


  return (
    <div className="container mb-4">
      <h5 className="mb-3">Top URLs</h5>
      <div className="card shadow-sm border-0 rounded">
        <div className="card-body p-0">
          <div className={styles.tableScroll}>
            <table className="table table-hover mb-0">
              <thead className={`bg-light ${styles.stickyHeader}`}>
                <tr>
                  <th scope="col">Short Code</th>
                  <th scope="col">Original URL</th>
                  <th scope="col" className="text-end">Clicks</th>
                  <th scope="col">Created</th>
                  <th scope="col" className="text-end">Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map(({ id, shortCode, url, clicks, created }) => (
                    <tr key={id}>
                      <td>
                        <span className="text-primary fw-medium">{shortCode}</span>
                      </td>
                      <td className="text-truncate" style={{ maxWidth: "200px" }}>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {url}
                        </a>
                      </td>
                      <td className="text-end">{clicks.toLocaleString()}</td>
                      <td>{created}</td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm "
                          onClick={() => handleDelete(id)}
                        >
                          <BiTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-3">
                      No data available
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

export default TopURLs;
