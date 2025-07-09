import React from 'react';
import { NavLink } from 'react-router-dom';
import { BiHome, BiBarChart, BiLogIn, BiUserPlus } from 'react-icons/bi';

const linkItems = [
  { name: 'Home', to: '/', icon: <BiHome className="me-1" /> },
  { name: 'Analytics', to: '/analytics', icon: <BiBarChart className="me-1" /> },
];

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white py-2 shadow-sm">
      <div className="container container-fluid-md">
        {/* Logo & Brand */}
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <span className="fw-bold">SHORTIE</span>
        </NavLink>

        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 d-flex flex-nowrap">
          {linkItems.map(({ name, to, icon }) => (
            <li className="nav-item" key={name}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `nav-link px-3 d-flex align-items-center ${
                    isActive ? 'active bg-light rounded-pill' : ''
                  }`
                }
              >
                {icon}
                <span>{name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="d-flex align-items-center">
          <NavLink to="/login" className="btn btn-outline-primary me-3 d-flex align-items-center">
            <BiLogIn className="me-1" />
            Login
          </NavLink>
          <NavLink to="/register" className="btn btn-primary d-flex align-items-center">
            <BiUserPlus className="me-1" />
            Register
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
