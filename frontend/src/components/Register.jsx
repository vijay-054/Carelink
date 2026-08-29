import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  register,
  reset,
} from "../store/slices/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.auth || {});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    bloodGroup: "",
    emergencyContact: "",
  });

  const {
    fullName,
    email,
    password,
    bloodGroup,
    emergencyContact,
  } = formData;

  useEffect(() => {
    if (isError) {
      alert(message || "Registration failed");
      dispatch(reset());
      return;
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/login");
    }
  }, [
    isError,
    isSuccess,
    message,
    navigate,
    dispatch,
  ]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      register({
        fullName,
        email,
        password,
        bloodGroup,
        emergencyContact,
      })
    );
  };

  return (
    <div className="auth-page">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="fullName">
            Full Name *
          </label>

          <input
            id="fullName"
            name="fullName"
            type="text"
            value={fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="register-email">
            Email *
          </label>

          <input
            id="register-email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="register-password">
            Password *
          </label>

          <input
            id="register-password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bloodGroup">
            Blood Group *
          </label>

          <input
            id="bloodGroup"
            name="bloodGroup"
            type="text"
            value={bloodGroup}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="emergencyContact">
            Emergency Contact *
          </label>

          <input
            id="emergencyContact"
            name="emergencyContact"
            type="text"
            value={emergencyContact}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
        >
          {isLoading
            ? "Registering..."
            : "Register"}
        </button>

      </form>
    </div>
  );
};

export default Register;