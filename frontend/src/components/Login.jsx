import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  HeartPulse,
  ShieldCheck,
  Clock3,
  ArrowRight,
  Mail,
  Lock,
} from "lucide-react";

import { loginUser } from "../store/slices/authSlice";
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
        loginUser({
          email: email.trim(),
          password,
        })
      ).unwrap();

      const role =
        result?.role ||
        result?.user?.role ||
        result?.userRole ||
        "";

      const normalizedRole = String(role)
        .replace("ROLE_", "")
        .toUpperCase();

      if (normalizedRole === "DOCTOR") {
        navigate("/doctor-dashboard");
      } else if (
        normalizedRole === "CLINIC_ADMIN" ||
        normalizedRole === "ADMIN"
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
            <HeartPulse size={24} />
          </div>

          <div>
            <div className="login-brand-name">CareLink</div>
            <div className="login-brand-subtitle">
              Healthcare Portal
            </div>
          </div>
        </div>

        <div className="login-left-content">

          <div className="login-eyebrow">
            YOUR HEALTH. OUR PRIORITY.
          </div>

          <h1>
            Healthcare that
            <span> connects.</span>
          </h1>

          <p>
            Access your healthcare dashboard, manage appointments,
            connect with doctors and keep your health information
            organized — all in one secure place.
          </p>

          <div className="login-features">

            <div className="login-feature">
              <div className="login-feature-icon">
                <ShieldCheck size={19} />
              </div>

              <div>
                <strong>Secure & Private</strong>
                <span>Your healthcare information stays protected.</span>
              </div>
            </div>

            <div className="login-feature">
              <div className="login-feature-icon">
                <Clock3 size={19} />
              </div>

              <div>
                <strong>Easy Appointment Management</strong>
                <span>Book and manage appointments with ease.</span>
              </div>
            </div>

          </div>

        </div>

        <div className="login-left-footer">
          © 2026 CareLink Healthcare Management System
        </div>

      </section>

      {/* RIGHT SIDE */}
      <section className="login-right">

        <div className="login-card">

          <div className="login-header">

            <span className="login-welcome">
              WELCOME BACK
            </span>

            <h2>Sign in to CareLink</h2>

            <p>
              Access your healthcare dashboard and stay connected
              with your care team.
            </p>

          </div>

          {isError && (
            <div className="login-error">
              {error || "Invalid email or password. Please try again."}
            </div>
          )}

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >

            {/* EMAIL */}
            <div className="login-form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="login-input-wrapper">

                <Mail size={18} />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div className="login-form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="login-input-wrapper">

                <Lock size={18} />

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

              </div>

            </div>

            <div className="login-options">

              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="forgot-password"
              >
                Forgot password?
              </button>

            </div>

            <button
              type="submit"
              className="login-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                "Signing in..."
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>

          </form>

          <div className="login-divider">
            <span>OR</span>
          </div>

          <div className="login-register">
            <span>Don't have a CareLink account?</span>

            <Link to="/register">
              Create an account
            </Link>
          </div>

          <div className="login-security">
            <ShieldCheck size={14} />
            <span>Secure healthcare access</span>
          </div>

        </div>

      </section>

    </div>
  );
};

export default Login;