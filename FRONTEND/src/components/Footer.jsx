import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container text-center">
        <p className="mb-3">
          Developed with ❤️ by <strong>Harish Rashid</strong>
        </p>

        <div className="d-flex flex-column flex-md-row justify-content-center gap-5">
          <a
            href="https://www.linkedin.com/in/harish-rashid-16b0b3217/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-decoration-none"
          >
            <i className="bi bi-linkedin me-1"></i>
            LinkedIn
          </a>

          <a
            href="https://github.com/harishrashid717"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-decoration-none"
          >
            <i className="bi bi-github me-1"></i>
            GitHub
          </a>

          <a
            href="mailto:harishrashid717@gmail.com"
            className="text-white text-decoration-none"
          >
            <i className="bi bi-envelope-fill me-1"></i>
            Gmail
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
