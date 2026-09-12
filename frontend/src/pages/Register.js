import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register, reset } from "../store/slices/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth || {}
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "PATIENT",
  });

  const { fullName, email, password, role } = formData;

  useEffect(() => {
    if (isError) {
      alert(message || "Registration failed");
      dispatch(reset());
    }

    if (isSuccess) {
      alert("Registration successful! Please login.");
      dispatch(reset());
      navigate("/login");
    }
  }, [isError, isSuccess, message, dispatch, navigate]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!fullName || !email || !password) {
      alert("Please fill all required fields.");
      return;
    }

    dispatch(
      register({
        fullName,
        email,
        password,
        role,
      })
    );
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="medical-orb orb-one"></div>
        <div className="medical-orb orb-two"></div>
        <div className="medical-orb orb-three"></div>

        <div className="floating-cross cross-one">+</div>
        <div className="floating-cross cross-two">+</div>
        <div className="floating-cross cross-three">+</div>
      </div>

      <div className="auth-card register-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">+</div>
          <div>
            <h1>CareLink</h1>
            <span>Healthcare Portal</span>
          </div>
        </div>

        <div className="auth-heading">
          <span className="auth-tag">JOIN CARELINK</span>

          <h2>Create your account</h2>

          <p>
            Register to manage your healthcare journey securely.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={handleChange}
              minLength={6}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Register As *</label>

            <select
              id="role"
              name="role"
              value={role}
              onChange={handleChange}
            >
              <option value="PATIENT">Patient</option>
              <option value="DOCTOR">Doctor</option>
            </select>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account →"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;