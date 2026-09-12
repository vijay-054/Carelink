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
   * Therefore don't render the old navbar there.
   */

  if (location.pathname === "/dashboard") {
    return null;
  }


const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("authToken");

  window.location.href = "/";
};


  return (
    <nav className="navbar">

      <Link
        to="/"
        className="brand"
      >
        CareLink
      </Link>


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

            {user.role === "PATIENT" && (

              <Link to="/appointments">
                My Appointments
              </Link>

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