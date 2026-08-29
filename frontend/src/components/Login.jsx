import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login, reset } from "../store/slices/authSlice";

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

  useEffect(() => {
    if (isError) {
      alert(message || "Login failed");
      dispatch(reset());
      return;
    }

    if (isSuccess || user) {
      dispatch(reset());
      navigate("/");
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
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login-email">
            Email *
          </label>

          <input
            id="login-email"
            name="email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="login-password">
            Password *
          </label>

          <input
            id="login-password"
            name="password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;