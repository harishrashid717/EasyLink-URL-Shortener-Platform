import React, { useState } from "react";
import CopyButton from "./Button/CopyButton";
import createShortUrl from "../api/shortUrl.api";
import axios from "axios";
function UrlShortenerForm() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const shortUrl = await createShortUrl(originalUrl);
      setShortenedUrl(shortUrl);
    } catch (err) {
      setError("Error shortening URL: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">URL Shortener</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="urlInput" className="form-label">
                    Enter your URL
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="urlInput"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    placeholder="https://example.com/very-long-url"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Processing...
                    </>
                  ) : (
                    "Shorten URL"
                  )}
                </button>
              </form>

              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}

              {shortenedUrl && (
                <div className="mt-4">
                  <h5>Your shortened URL:</h5>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={shortenedUrl}
                      readOnly
                    />
                   <CopyButton shortenUrl={shortenedUrl}></CopyButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UrlShortenerForm;
