import React, { useState } from "react";
import CopyButton from "./Button/CopyButton";
import createShortUrl from "../api/shortUrl.api";

export default function UrlShortenerForm() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const shortUrl = await createShortUrl(originalUrl.trim());
      setShortenedUrl(shortUrl);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            type="url"
            className="form-control rounded-start-3"
            placeholder="Paste your long URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn btn-primary rounded-end-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Shorten It"
            )}
          </button>
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="mt-3">
          <div className="alert alert-danger mb-0" role="alert">
            <strong>Error:</strong> {error}
          </div>
        </div>
      )}

      {/* Result */}
      {shortenedUrl && (
        <div className="mt-3">
          <p className="mb-1">Your shortened URL:</p>
          <div className="input-group input-group-lg">
            <input
              type="text"
              className="form-control rounded-start-3"
              value={shortenedUrl}
              readOnly
            />
            <div className="input-group-append">
              <CopyButton shortenUrl={shortenedUrl} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
