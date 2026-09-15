import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, reset } from "../store/slices/authSlice";

import "../components/Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    user,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.auth || {});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isError) {
      setError(message || "Invalid email or password.");
      dispatch(reset());
    }

    if (isSuccess && user) {
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

      role = String(role)
        .trim()
        .toUpperCase()
        .replace("ROLE_", "");

      if (role === "DOCTOR") {
        navigate("/doctor-dashboard");
      } else if (
        role === "ADMIN" ||
        role === "CLINIC_ADMIN"
      ) {
        navigate("/admin-dashboard");
      } else {
        navigate("/patient-dashboard");
      }

      dispatch(reset());
    }
  }, [
    isError,
    isSuccess,
    user,
    message,
    navigate,
    dispatch,
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    dispatch(
      login({
        email: email.trim(),
        password,
      })
    );
  };

  return (
    <div className="auth-page">

      {/* Decorative background */}
      <div className="auth-background">
        <div className="floating-circle circle-one"></div>
        <div className="floating-circle circle-two"></div>
        <div className="floating-circle circle-three"></div>

        <div className="floating-plus plus-one">+</div>
        <div className="floating-plus plus-two">+</div>
        <div className="floating-plus plus-three">+</div>
      </div>

      {/* Main Card */}
      <div className="auth-card">

        {/* Logo */}
        <div className="auth-logo">

          <div className="auth-logo-icon">
            +
          </div>

          <div className="auth-logo-text">
            <strong>
              Care<span>Link</span>
            </strong>

            <small>
              Healthcare Portal
            </small>
          </div>

        </div>

        {/* Heading */}
        <div className="auth-heading">

          <span className="auth-tag">
            WELCOME BACK
          </span>

          <h1>
            Sign in to CareLink
          </h1>

          <p>
            Access your healthcare dashboard and stay
            connected with your care team.
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="auth-error">
            <span>!</span>
            <p>{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {/* Email */}
          <div className="form-group">

            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              autoComplete="email"
              required
            />

          </div>

          {/* Password */}
          <div className="form-group">

            <div className="password-label">
              <label htmlFor="password">
                Password
              </label>

              <button
                type="button"
                className="forgot-password"
              >
                Forgot password?
              </button>
            </div>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              autoComplete="current-password"
              required
            />

          </div>

          {/* Remember */}
          <div className="login-options">

            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="submit-btn"
            disabled={isLoading}
          >

            {isLoading ? (
              <>
                <span className="button-spinner"></span>
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <span className="submit-arrow">
                  →
                </span>
              </>
            )}

          </button>

        </form>

        {/* Security */}
        <div className="auth-divider">
          <span>
            🔒 Secure healthcare access
          </span>
        </div>

        {/* Register */}
        <div className="auth-footer">

          <span>
            Don't have a CareLink account?
          </span>

          <Link to="/register">
            Create an account
          </Link>

        </div>

      </div>
    </div>
  );
};

export default Login;