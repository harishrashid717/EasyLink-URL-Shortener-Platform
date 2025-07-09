import React, { useState, useEffect } from 'react';
import { BiShow, BiHide } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Register = ({ registerMutation, onClose }) => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [visible, setVisible] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!visible && onClose) {
      const timer = setTimeout(() => onClose(), 300);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  // ✅ Show success message for 1 second
  useEffect(() => {
    if (registerMutation.isSuccess) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [registerMutation.isSuccess]);

  const handleClose = () => setVisible(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate({
      username,
      full_name : fullName,
      email,
      password,
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
        style={{
          zIndex: 1040,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
          pointerEvents: visible ? 'auto' : 'none',
        }}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="position-fixed top-50 start-50 bg-white shadow-lg d-flex flex-column"
        style={{
          width: '360px',
          maxWidth: '90vw',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          zIndex: 1045,
          transform: visible ? 'translate(-50%, -50%)' : 'translate(-50%, -60%)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.3s, opacity 0.3s',
        }}
        onClick={(e) => e.stopPropagation()}  // ✅ Prevent backdrop click
      >
        <button
          type="button"
          className="btn-close align-self-end mb-2"
          aria-label="Close"
          onClick={handleClose}
        />

        <h2 className="fw-bold text-primary mb-1 text-center">Sign Up</h2>
        <p className="text-muted mb-4 text-center">Create a new account</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Choose a username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <input
              type="text"
              id="fullName"
              className="form-control"
              placeholder="Your full name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="form-control"
                placeholder="Create a password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(v => !v)}
                tabIndex={-1}
              >
                {showPassword ? <BiHide /> : <BiShow />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={registerMutation.isLoading}
          >
            {registerMutation.isLoading ? "Registering..." : (<><span className="me-2">✓</span> Register</>)}
          </button>
        </form>

        {/* ✅ Show error if any */}
        {registerMutation.isError && (
          <div className="alert alert-danger mt-3" role="alert">
            {registerMutation.error?.response?.data?.message ||
              registerMutation.error?.message ||
              "An unexpected error occurred"}
          </div>
        )}

        {/* ✅ Show success alert for 1 second */}
        {showSuccess && (
          <div className="alert alert-success mt-3" role="alert">
            {registerMutation.data?.message || "Registered successfully!"}
          </div>
        )}

        <p className="text-center mt-4 mb-0">
          Already have an account?{' '}
          <Link to="/login" className="text-primary text-decoration-none" onClick={handleClose}>
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
