import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  login,
  reset,
} from "../store/slices/authSlice";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    user,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector(
    (state) => state.auth || {}
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("PATIENT");


  /* =====================================================
     LOGIN RESULT
  ===================================================== */

  useEffect(() => {

    if (isError) {

      alert(
        message || "Login failed"
      );

      dispatch(reset());

      return;
    }


    if (isSuccess && user) {

      navigate("/dashboard");

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


  /* =====================================================
     SUBMIT LOGIN
  ===================================================== */

  const handleSubmit = (event) => {

    event.preventDefault();


    /*
     * Send email, password and selected role.
     */

    dispatch(
      login({
        email,
        password,
        role,
      })
    );
  };


  return (
    <div className="auth-page">

      <div className="auth-card">

        <h2>
          Login
        </h2>

        <p className="auth-subtitle">
          Sign in to access your CareLink account.
        </p>


        <form onSubmit={handleSubmit}>

          {/* EMAIL */}

          <div className="form-group">

            <label htmlFor="email">
              Email *
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="form-group">

            <label htmlFor="password">
              Password *
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />

          </div>


          {/* ROLE */}

          <div className="form-group">

            <label htmlFor="loginRole">
              Login As *
            </label>

            <select
              id="loginRole"
              name="loginRole"
              value={role}
              onChange={(event) =>
                setRole(event.target.value)
              }
              required
            >

              <option value="PATIENT">
                Patient
              </option>

              <option value="DOCTOR">
                Doctor
              </option>

              <option value="CLINIC_ADMIN">
                Clinic Admin
              </option>

            </select>

          </div>


          {/* LOGIN */}

          <button
            type="submit"
            className="submit-btn"
            disabled={isLoading}
          >

            {isLoading
              ? "Logging in..."
              : "Login"}

          </button>

        </form>


        <div className="auth-footer">

          Don't have an account?{" "}

          <Link to="/register">
            Register
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Login;