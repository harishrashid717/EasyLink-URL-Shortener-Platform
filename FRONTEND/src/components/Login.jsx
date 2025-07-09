import React, { useState, useEffect } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";

const Login = ({ loginMutation, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible && onClose) {
      const timer = setTimeout(() => onClose(), 300);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  const handleClose = () => setVisible(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate({
      email,
      password,
    });
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
        style={{
          zIndex: 1040,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s",
          pointerEvents: visible ? "auto" : "none",
        }}
        onClick={handleClose}
      />

      {/* Centered modal panel */}
      <div
        className="position-fixed top-50 start-50 bg-white shadow-lg d-flex flex-column"
        style={{
          width: "360px",
          maxWidth: "90vw",
          padding: "1.5rem",
          borderRadius: "0.5rem",
          zIndex: 1045,
          transform: visible
            ? "translate(-50%, -50%)"
            : "translate(-50%, -60%)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.3s, opacity 0.3s",
        }}
      >
        <button
          type="button"
          className="btn-close align-self-end mb-2"
          aria-label="Close"
          onClick={handleClose}
        />
        <h2 className="fw-bold text-primary mb-1 text-center">
          <span className="fw-bold">SHORTIE</span>
        </h2>
        <p className="text-muted mb-4 text-center">Welcome to SHORTIE</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? <BiHide /> : <BiShow />}
              </button>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <Link to="/forgot-password" className="text-decoration-none">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            {loginMutation.isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          {loginMutation.isError && (
            <div className="alert alert-danger mt-3" role="alert">
              {loginMutation.error?.response?.data?.message ||
                loginMutation.error?.message ||
                "An unexpected error occurred"}
            </div>
          )}

          <p className="text-center mb-0">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary text-decoration-none">
              Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
