import React from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  logout,
} from "../../store/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector(
    (state) => state.auth || {}
  );

  /*
   * Dashboard has its own sidebar and topbar.
   * Therefore don't render the main navbar there.
   */
  if (location.pathname === "/dashboard") {
    return null;
  }

  /*
   * Proper logout:
   * 1. Clear Redux authentication state
   * 2. Remove saved authentication data
   * 3. Navigate to home page
   */
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("authToken");
  localStorage.removeItem("carelinkToken");
  localStorage.removeItem("carelinkUser");

  navigate("/", { replace: true });
};

    // Clear browser storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("authToken");

    // Go back to home page
    navigate("/", { replace: true });

    // Refresh application state
    window.location.reload();
  };

  return (
    <nav className="navbar">

      {/* Brand */}
      <Link
        to="/"
        className="brand"
      >
        <span className="brand-plus">+</span>
        <span>CareLink</span>
      </Link>

      {/* Navigation */}
      <div className="nav-links">

        {/* Guest User */}
        {!user ? (
          <>
            <Link
              to="/login"
              className={
                location.pathname === "/login"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Login
            </Link>

            <Link
              to="/register"
              className={
                location.pathname === "/register"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Register
            </Link>
          </>
        ) : (

          /* Logged-in User */
          <>
            {/* Patient */}
            {user.role === "PATIENT" && (
              <Link
                to="/appointments"
                className={
                  location.pathname === "/appointments"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                My Appointments
              </Link>
            )}

            {/* Doctor */}
            {user.role === "DOCTOR" && (
              <>
                <Link
                  to="/schedule"
                  className={
                    location.pathname === "/schedule"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  My Schedule
                </Link>

                <Link
                  to="/consultations"
                  className={
                    location.pathname === "/consultations"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  Consultations
                </Link>
              </>
            )}

            {/* Clinic Admin */}
            {user.role === "CLINIC_ADMIN" && (
              <>
                <Link
                  to="/doctors"
                  className={
                    location.pathname === "/doctors"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  Manage Doctors
                </Link>

                <Link
                  to="/patients"
                  className={
                    location.pathname === "/patients"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  Manage Patients
                </Link>

                <Link
                  to="/appointments"
                  className={
                    location.pathname === "/appointments"
                      ? "nav-link active"
                      : "nav-link"
                  }
                >
                  All Appointments
                </Link>
              </>
            )}

            {/* User profile indicator */}
            <span className="user-indicator">
              <span className="user-dot"></span>
              {user.name || user.email || "User"}
            </span>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
;

export default Navbar;