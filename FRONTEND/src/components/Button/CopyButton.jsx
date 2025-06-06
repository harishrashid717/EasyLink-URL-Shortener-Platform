import React, { useState } from "react";

const CopyButton = ({ shortenUrl }) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  function handleCopy() {
    navigator.clipboard
      .writeText(shortenUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <div>
      <button
        className={`btn mx-1 ${copied ? "glow-green" : "btn-outline-secondary"} copy-button`}
        type="button"
        onClick={handleCopy}
        style={{ width: "100px" }}
      >
        {copied ? "Copied" : "Copy"}
      </button>

      {error && (
        <div className="alert alert-danger mt-2" role="alert">
          Error: {error}
        </div>
      )}

      <style>{`
        .glow-green {
          background-color: #28a745 !important;
          color: white !important;
          border: 1px solid #28a745;
          box-shadow: 0 0 3px #28a745, 0 0 3px #28a745;
          transition: all 0.3s ease-in-out;
        }

        .copy-button.btn-outline-secondary:hover {
          background-color: #e2e6ea;
          color: black;
        }
      `}</style>
    </div>
  );
};

export default CopyButton;
