import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(
    (state) => state.auth || {}
  );

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">

      {/* Brand */}

      <Link to="/" className="brand">
        CareLink
      </Link>

      {/* Navigation Links */}

      <div className="nav-links">

        {!user ? (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        ) : (
          <>
            {/* PATIENT */}

            {user.role === "PATIENT" && (
              <Link to="/appointments">
                My Appointments
              </Link>
            )}

            {/* DOCTOR */}

            {user.role === "DOCTOR" && (
              <>
                <Link to="/schedule">
                  My Schedule
                </Link>

                <Link to="/consultations">
                  Consultations
                </Link>
              </>
            )}

            {/* CLINIC ADMIN */}

            {user.role === "CLINIC_ADMIN" && (
              <>
                <Link to="/doctors">
                  Manage Doctors
                </Link>

                <Link to="/patients">
                  Manage Patients
                </Link>

                <Link to="/appointments">
                  All Appointments
                </Link>
              </>
            )}

            {/* LOGOUT */}

            <button
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;