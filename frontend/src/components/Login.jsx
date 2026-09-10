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

        <h2>
          Login
        </h2>

        <p className="auth-subtitle">
          Sign in to access your CareLink account.
        </p>


        <form onSubmit={handleSubmit}>

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