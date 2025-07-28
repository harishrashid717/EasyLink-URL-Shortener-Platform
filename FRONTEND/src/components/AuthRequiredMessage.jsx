import React from "react";
import { Link } from "react-router-dom";

const AuthRequiredMessage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-95 bg-light">
      <div className="card shadow p-4 text-center" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body">
          <h4 className="text-danger mb-3">
            <i className="bi bi-lock-fill me-2"></i>Authentication Required
          </h4>
          <p className="text-muted mb-4">
            You need to <strong>Login</strong> or <strong>Register</strong> first to access this page.
          </p>
          <div className="d-flex justify-content-around">
            <Link to="/login" className="btn btn-outline-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline-success">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthRequiredMessage;
