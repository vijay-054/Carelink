import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth?.user);

  const getRole = () => {
    if (!user) return "";

    let role =
      user.role ||
      user.userRole ||
      user.roleName ||
      user.authority ||
      user.authorities?.[0]?.authority ||
      user.authorities?.[0] ||
      "";

    if (typeof role === "object") {
      role =
        role.name ||
        role.role ||
        role.authority ||
        "";
    }

    role = String(role).trim().toUpperCase();

    if (role.startsWith("ROLE_")) {
      role = role.substring(5);
    }

    return role;
  };

  const role = getRole();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* Brand */}
      <Link to="/" className="navbar-brand">
        <span className="brand-icon">+</span>
        <span>CareLink</span>
      </Link>

      {/* Navigation */}
      <div className="navbar-links">

        <Link to="/">
          Overview
        </Link>

        {role === "PATIENT" && (
          <Link to="/appointments">
            My Appointments
          </Link>
        )}

        {role === "DOCTOR" && (
          <Link to="/consultations">
            Consultations
          </Link>
        )}

        {role === "CLINIC_ADMIN" && (
          <>
            <Link to="/admin/doctors">
              Doctors
            </Link>

            <Link to="/admin/patients">
              Patients
            </Link>
          </>
        )}

      </div>

      {/* User section */}
      <div className="navbar-user">

        {user && (
          <>
            <div className="navbar-avatar">
              {(user.fullName || user.name || "U")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="navbar-user-info">
              <strong>
                {user.fullName || user.name || user.email}
              </strong>

              <span>
                {role || "User"}
              </span>
            </div>

            <button
              type="button"
              className="logout-button"
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