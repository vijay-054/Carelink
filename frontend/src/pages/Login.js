import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { login } from "../store/slices/authSlice";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth || {}
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  /*
   * Redirect user based on role after successful login.
   */
  useEffect(() => {
    if (user) {
      const role = String(
        user.role ||
          user.userRole ||
          user.roleName ||
          user.authority ||
          ""
      )
        .replace("ROLE_", "")
        .trim()
        .toUpperCase();

      if (role === "DOCTOR") {
        navigate("/doctor-dashboard", { replace: true });
      } else if (
        role === "CLINIC_ADMIN" ||
        role === "ADMIN"
      ) {
        navigate("/admin-dashboard", { replace: true });
      } else {
        navigate("/patient-dashboard", { replace: true });
      }
    }
  }, [user, navigate]);

  /*
   * Handle login form submission.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLocalError("");

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setLocalError("Please enter your email address.");
      return;
    }

    if (!password) {
      setLocalError("Please enter your password.");
      return;
    }

    try {
      await dispatch(
        login({
          email: cleanEmail,
          password,
        })
      ).unwrap();
    } catch (error) {
      setLocalError(
        typeof error === "string"
          ? error
          : "Unable to sign in. Please check your email and password."
      );
    }
  };

  const errorMessage = localError || (isError ? message : "");

  return (
    <div className="login-page">
      {/* Background decoration */}
      <div className="login-background">
        <div className="login-orb login-orb-one"></div>
        <div className="login-orb login-orb-two"></div>
        <div className="login-orb login-orb-three"></div>

        <span className="floating-plus plus-one">+</span>
        <span className="floating-plus plus-two">+</span>
        <span className="floating-plus plus-three">+</span>
        <span className="floating-plus plus-four">+</span>
      </div>

      {/* Top brand */}
      <header className="login-header">
        <Link to="/" className="login-brand">
          <span className="login-brand-icon">+</span>

          <span className="login-brand-text">
            Care<span>Link</span>
          </span>
        </Link>

        <div className="login-header-right">
          <span>New to CareLink?</span>

          <Link to="/register" className="login-register-link">
            Create account
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="login-main">
        <section className="login-container">
          {/* Left panel */}
          <div className="login-info-panel">
            <div className="login-info-content">
              <span className="login-badge">
                CARELINK HEALTHCARE
              </span>

              <h1>
                Welcome
                <br />
                <span>back.</span>
              </h1>

              <p>
                Your healthcare journey starts here. Access your
                appointments, doctors, medical records and
                prescriptions securely.
              </p>

              <div className="login-features">
                <div className="login-feature">
                  <div className="feature-check">✓</div>

                  <div>
                    <strong>Easy Appointment Booking</strong>
                    <span>
                      Book consultations in just a few clicks.
                    </span>
                  </div>
                </div>

                <div className="login-feature">
                  <div className="feature-check">✓</div>

                  <div>
                    <strong>Trusted Healthcare</strong>
                    <span>
                      Connect with qualified healthcare professionals.
                    </span>
                  </div>
                </div>

                <div className="login-feature">
                  <div className="feature-check">✓</div>

                  <div>
                    <strong>Secure Medical Records</strong>
                    <span>
                      Keep your healthcare information protected.
                    </span>
                  </div>
                </div>
              </div>

              {/* Medical illustration */}
              <div className="medical-illustration">
                <div className="medical-ring ring-one"></div>
                <div className="medical-ring ring-two"></div>

                <div className="medical-heart">
                  <span>+</span>
                </div>

                <div className="medical-pulse pulse-one">
                  ♥
                </div>

                <div className="medical-pulse pulse-two">
                  +
                </div>
              </div>
            </div>
          </div>

          {/* Right login panel */}
          <div className="login-form-panel">
            <div className="login-form-content">
              <div className="login-form-heading">
                <span className="form-label">
                  WELCOME BACK
                </span>

                <h2>Sign in to CareLink</h2>

                <p>
                  Enter your details to access your healthcare
                  dashboard.
                </p>
              </div>

              {/* Registration success message */}
              {location.state?.registered && (
                <div className="success-message">
                  Account created successfully. Please sign in.
                </div>
              )}

              {/* Login error */}
              {errorMessage && (
                <div className="login-error">
                  <span className="error-icon">!</span>

                  <div>
                    <strong>Sign in failed</strong>
                    <p>{errorMessage}</p>
                  </div>
                </div>
              )}

              <form
                className="login-form"
                onSubmit={handleSubmit}
              >
                {/* Email */}
                <div className="login-field">
                  <label htmlFor="login-email">
                    Email Address
                  </label>

                  <div className="login-input-wrapper">
                    <span className="input-icon">
                      ✉
                    </span>

                    <input
                      id="login-email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setLocalError("");
                      }}
                      placeholder="Enter your email"
                      autoComplete="email"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="login-field">
                  <div className="password-label-row">
                    <label htmlFor="login-password">
                      Password
                    </label>

                    <button
                      type="button"
                      className="forgot-password"
                      onClick={() => {
                        setLocalError(
                          "Please contact your administrator to reset your password."
                        );
                      }}
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="login-input-wrapper">
                    <span className="input-icon">
                      ●
                    </span>

                    <input
                      id="login-password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        setLocalError("");
                      }}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="login-submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="login-spinner"></span>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <span className="submit-arrow">→</span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="login-divider">
                <span>SECURE HEALTHCARE ACCESS</span>
              </div>

              {/* Register */}
              <div className="login-bottom">
                <span>
                  Don't have a CareLink account?
                </span>

                <Link to="/register">
                  Create an account
                </Link>
              </div>

              <div className="login-security">
                <span>✓</span>
                Your information is securely protected
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="login-footer">
        <span>
          © {new Date().getFullYear()} CareLink
        </span>

        <span>
          Healthcare Management Platform
        </span>
      </footer>
    </div>
  );
};

export default Login;