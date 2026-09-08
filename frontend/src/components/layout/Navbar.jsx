import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(
    (state) => state.auth?.user || null
  );

  const handleLogout = () => {

    dispatch(logout());

    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <nav className="navbar">

      <Link to="/" className="brand">
        CareLink
      </Link>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

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

            {user.role === "PATIENT" && (
              <>
                <Link to="/doctor-list">
                  Find Doctors
                </Link>

                <Link to="/appointments">
                  My Appointments
                </Link>
              </>
            )}

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

            <button
              type="button"
              className="logout-btn"
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