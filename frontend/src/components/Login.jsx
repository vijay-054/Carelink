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


  /* =====================================================
     LOGIN SUCCESS / ERROR
  ===================================================== */

  useEffect(() => {

    if (isError) {

      alert(
        message || "Login failed"
      );

      dispatch(reset());
    }


    if (isSuccess || user) {

      // After successful login,
      // open the role-based dashboard.
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
     SUBMIT
  ===================================================== */

  const handleSubmit = (event) => {

    event.preventDefault();

    dispatch(
      login({
        email,
        password,
      })
    );
  };


  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* =========================
            HEADER
        ========================= */}

        <h2>
          Login
        </h2>

        <p className="auth-subtitle">
          Sign in to access your CareLink account.
        </p>


        {/* =========================
            FORM
        ========================= */}

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


          {/* LOGIN BUTTON */}

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


        {/* =========================
            REGISTER LINK
        ========================= */}

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