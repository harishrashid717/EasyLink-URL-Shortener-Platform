import React from "react";
import { NavLink } from "react-router-dom";
import {
  BiHome,
  BiBarChart,
  BiLogIn,
  BiUserPlus,
  BiShow,
  BiBarcode,
  BiMenu,
} from "react-icons/bi";
import { useSelector } from "react-redux";
import LogoutButton from "./Button/LogoutButton";
import styles from "./Navbar.module.css"; // Modular CSS

const linkItems = [
  { name: "Home", to: "/", icon: <BiHome className={`me-1 ${styles.iconResponsive}`} /> },
  { name: "Analytics", to: "/analytics", icon: <BiBarChart className={`me-1 ${styles.iconResponsive}`} /> },
  { name: "Short Code Analytics", to: "/short-code-analytics", icon: <BiBarcode className={`me-1 ${styles.iconResponsive}`} /> },
  { name: "Demo Analytics", to: "/demo-analytics", icon: <BiShow className={`me-1 ${styles.iconResponsive}`} /> },
];

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.urlStats);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm py-2">
      <div className="container-fluid">
        {/* Brand */}
        <NavLink className="navbar-brand fw-bold" to="/">
          EasyLink
        </NavLink>

        {/* Toggle for small screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <BiMenu />
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarContent">
          {/* Nav Links */}
          <ul className="navbar-nav d-flex flex-wrap justify-content-center mb-2 mb-md-0">
            {linkItems.map(({ name, to, icon }) => (
              <li className="nav-item" key={name}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `nav-link d-flex align-items-center px-3 ${
                      isActive ? "active bg-light rounded-pill" : ""
                    }`
                  }
                >
                  {icon}
                  <span className={styles.navText}>{name}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Auth Buttons */}
          <div className="d-flex align-items-center ms-md-3 mt-2 mt-md-0">
            {isAuthenticated ? (
              <LogoutButton onLogout={handleLogout} />
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="btn btn-outline-primary me-2 d-flex align-items-center"
                >
                  <BiLogIn className={`me-1 ${styles.iconResponsive}`} />
                  <span className={styles.navText}>Login</span>
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn btn-primary d-flex align-items-center"
                >
                  <BiUserPlus className={`me-1 ${styles.iconResponsive}`} />
                  <span className={styles.navText}>Register</span>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
