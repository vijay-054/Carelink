import React, {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  Link,
  useNavigate,
} from "react-router-dom";

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
  } = useSelector(
    (state) => state.auth || {}
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    bloodGroup: "",
    emergencyContact: "",
  });

  useEffect(() => {

    if (isError) {

      alert(
        message ||
        "Registration failed"
      );

      dispatch(reset());
    }

    if (isSuccess) {

      navigate("/login");

      dispatch(reset());
    }

  }, [
    isError,
    isSuccess,
    message,
    navigate,
    dispatch,
  ]);

  const handleChange = (event) => {

    setFormData({
      ...formData,
      [event.target.name]:
        event.target.value,
    });
  };

  const handleSubmit = (event) => {

    event.preventDefault();

    dispatch(
      register(formData)
    );
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h2>Register</h2>

        <p className="auth-subtitle">
          Create your CareLink patient account.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="fullName">
              Full Name *
            </label>

            <input
              id="fullName"
              name="fullName"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email *
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
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
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bloodGroup">
              Blood Group *
            </label>

            <select
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
            >

              <option value="">
                -- Select Blood Group --
              </option>

              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>

            </select>

          </div>

          <div className="form-group">

            <label htmlFor="emergencyContact">
              Emergency Contact *
            </label>

            <input
              id="emergencyContact"
              name="emergencyContact"
              type="tel"
              placeholder="Enter contact number"
              value={
                formData.emergencyContact
              }
              onChange={handleChange}
              required
            />

          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading
              ? "Registering..."
              : "Register"}
          </button>

        </form>

        <div className="auth-footer">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Register;