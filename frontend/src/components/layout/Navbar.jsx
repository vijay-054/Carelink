import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <span className="brand-icon">+</span>
          <span>CareLink</span>
        </Link>
      </div>

      <div className="navbar-title">
        Hospital Appointment Management System
      </div>

      <div className="navbar-actions">
        <Link to="/login" className="navbar-link">
          Login
        </Link>

        <Link to="/register" className="navbar-button">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;