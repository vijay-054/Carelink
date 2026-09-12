import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth || {});

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Brand */}
      <Link to="/" className="navbar-brand">
        <span className="brand-icon">+</span>
        <span>Care<span className="brand-highlight">Link</span></span>
      </Link>

      {/* Navigation */}
      <div className="navbar-links">
        {user && (
          <>
            <Link to="/">Dashboard</Link>

            {user.role === "PATIENT" && (
              <Link to="/patient-dashboard">
                Appointments
              </Link>
            )}

            {user.role === "DOCTOR" && (
              <Link to="/doctor-dashboard">
                Doctor Dashboard
              </Link>
            )}

            {user.role === "CLINIC_ADMIN" && (
              <Link to="/admin-dashboard">
                Admin Dashboard
              </Link>
            )}
          </>
        )}
      </div>

      {/* User section */}
      <div className="navbar-user">
        {user ? (
          <>
            <div className="navbar-avatar">
              {(user.fullName || user.email || "U")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="navbar-user-info">
              <strong>
                {user.fullName || user.email}
              </strong>

              <small>
                {user.role || "User"}
              </small>
            </div>

            <button
              type="button"
              className="navbar-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-login">
              Login
            </Link>

            <Link to="/register" className="navbar-register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;