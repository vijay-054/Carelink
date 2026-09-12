import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, reset } from "../store/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.auth || {});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isError) {
      setError(message || "Invalid email or password");
      dispatch(reset());
    }

    if (isSuccess && user) {
      const role = user.role?.toUpperCase();

      if (role === "DOCTOR") {
        navigate("/doctor-dashboard");
      } else if (
        role === "ADMIN" ||
        role === "CLINIC_ADMIN"
      ) {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
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

    if (!email || !password) {
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
      <div className="auth-background">
        <div className="floating-circle circle-one"></div>
        <div className="floating-circle circle-two"></div>
        <div className="floating-circle circle-three"></div>
        <div className="floating-plus plus-one">+</div>
        <div className="floating-plus plus-two">+</div>
      </div>

      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">+</div>
          <div>
            <strong>
              Care<span>Link</span>
            </strong>
            <small>Healthcare Portal</small>
          </div>
        </div>

        <div className="auth-heading">
          <span className="auth-tag">WELCOME BACK</span>

          <h1>Sign in to CareLink</h1>

          <p>
            Access your healthcare dashboard and stay
            connected with your care team.
          </p>
        </div>

        {error && (
          <div className="auth-error">
            <span>!</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>

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

          <div className="form-group">
            <div className="password-label">
              <label htmlFor="password">Password</label>
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
                <span>→</span>
              </>
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>Secure healthcare access</span>
        </div>

        <div className="auth-footer">
          <span>Don't have a CareLink account?</span>{" "}
          <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;