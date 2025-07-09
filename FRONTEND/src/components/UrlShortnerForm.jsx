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
      <form
        onSubmit={handleSubmit}
        className="d-flex align-items-center gap-2 w-100"
      >
        <input
          type="url"
          className="form-control form-control-lg flex-grow-1"
          style={{ flexBasis: "60%" }}
          placeholder="Paste your long URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
        <button
          type="submit"
          className="btn btn-primary btn-lg"
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
      </form>

      {/* Error Container */}
      {error && (
        <div className="mt-4">
          <div className="alert alert-danger" role="alert">
            <strong>Error:</strong> {error}
          </div>
        </div>
      )}

      {shortenedUrl && (
        <div className="mt-4">
          <p className="mb-1">Your shortened URL:</p>
          <div className="d-flex align-items-center gap-2">
            <input
              type="text"
              className="form-control form-control-lg"
              value={shortenedUrl}
              readOnly
            />
            <CopyButton shortenUrl={shortenedUrl} />
          </div>
        </div>
      )}
    </div>
  );
}
