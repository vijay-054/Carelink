import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, error } = useSelector(
    (state) => state.auth || {}
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      return;
    }

    try {
      const result = await dispatch(
        login({
          email: email.trim(),
          password,
        })
      ).unwrap();

      const user = result?.user || result;

      const role = String(
        user?.role ||
          user?.userRole ||
          user?.roleName ||
          user?.authority ||
          user?.authorities?.[0]?.authority ||
          user?.authorities?.[0] ||
          ""
      )
        .replace("ROLE_", "")
        .toUpperCase();

      if (role === "DOCTOR") {
        navigate("/doctor-dashboard");
      } else if (
        role === "CLINIC_ADMIN" ||
        role === "ADMIN"
      ) {
        navigate("/admin-dashboard");
      } else {
        navigate("/patient-dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="login-page">

      {/* LEFT SIDE */}
      <section className="login-left">

        <div className="login-brand">
          <div className="login-brand-icon">
            +
          </div>

          <div className="login-brand-text">
            <strong>CareLink</strong>
            <span>HEALTHCARE PORTAL</span>
          </div>
        </div>

        <div className="login-left-content">

          <span className="eyebrow">
            SMARTER HEALTHCARE
          </span>

          <h1>
            Your Health.
            <br />
            <span>Our Priority.</span>
          </h1>

          <p>
            Connect with trusted doctors, manage your
            appointments and keep your healthcare journey
            simple — all in one place.
          </p>

          <div className="login-features">

            <div className="login-feature">
              <div className="login-feature-icon">
                ✓
              </div>
              <span>
                Easy appointment scheduling
              </span>
            </div>

            <div className="login-feature">
              <div className="login-feature-icon">
                ✓
              </div>
              <span>
                Connect with qualified doctors
              </span>
            </div>

            <div className="login-feature">
              <div className="login-feature-icon">
                ✓
              </div>
              <span>
                Secure healthcare management
              </span>
            </div>

          </div>

        </div>

      </section>

      {/* RIGHT SIDE */}
      <section className="login-right">

        <div className="login-card">

          <div className="login-header">

            <span className="welcome-text">
              WELCOME BACK
            </span>

            <h2>
              Sign in to CareLink
            </h2>

            <p>
              Access your healthcare dashboard and stay
              connected with your care team.
            </p>

          </div>

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >

            {/* EMAIL */}
            <div className="login-form-group">

              <label htmlFor="login-email">
                Email Address
              </label>

              <input
                id="login-email"
                type="email"
                className="login-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>

            {/* PASSWORD */}
            <div className="login-form-group">

              <label htmlFor="login-password">
                Password
              </label>

              <div className="login-password-wrapper">

                <input
                  id="login-password"
                  type="password"
                  className="login-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

              </div>

            </div>

            {/* OPTIONS */}
            <div className="login-options">

              <label className="login-remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <a
                href="#forgot"
                className="login-forgot"
                onClick={(e) =>
                  e.preventDefault()
                }
              >
                Forgot password?
              </a>

            </div>

            {/* ERROR */}
            {isError && (
              <div className="login-error">
                {error ||
                  "Unable to sign in. Please check your credentials."}
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              className="login-submit"
              disabled={
                isLoading ||
                !email.trim() ||
                !password.trim()
              }
            >
              {isLoading ? (
                <>
                  <span className="login-spinner" />
                  Signing in...
                </>
              ) : (
                "Sign In →"
              )}
            </button>

          </form>

          <div className="login-security">
            🔒 Secure healthcare access
          </div>

          <div className="login-register">
            Don't have a CareLink account?{" "}
            <Link to="/register">
              Create an account
            </Link>
          </div>

        </div>

      </section>

    </div>
  );
};

export default Login;