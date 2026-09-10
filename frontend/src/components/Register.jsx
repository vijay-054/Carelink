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


  /* =========================
     FORM DATA
  ========================= */

  const [formData, setFormData] = useState({

    fullName: "",
    email: "",
    password: "",

    role: "PATIENT",

    bloodGroup: "",
    emergencyContact: "",

    specialization: "",
    experience: "",
    consultationFee: "",
  });


  /* =========================
     SUCCESS / ERROR
  ========================= */

  useEffect(() => {

    if (isError) {

      alert(
        message ||
        "Registration failed"
      );

      dispatch(reset());
    }

    if (isSuccess) {

      alert(
        "Registration successful! Please login."
      );

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


  /* =========================
     HANDLE INPUT
  ========================= */

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };


  /* =========================
     HANDLE SUBMIT
  ========================= */

  const handleSubmit = (event) => {

    event.preventDefault();

    const dataToSend = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };


    /* =========================
       PATIENT DATA
    ========================= */

    if (formData.role === "PATIENT") {

      dataToSend.bloodGroup =
        formData.bloodGroup;

      dataToSend.emergencyContact =
        formData.emergencyContact;
    }


    /* =========================
       DOCTOR DATA
    ========================= */

    if (formData.role === "DOCTOR") {

      dataToSend.specialization =
        formData.specialization;

      dataToSend.experience =
        formData.experience;

      dataToSend.consultationFee =
        formData.consultationFee;
    }


    /* =========================
       CLINIC ADMIN
    ========================= */

    if (formData.role === "CLINIC_ADMIN") {

      dataToSend.role =
        "CLINIC_ADMIN";
    }


    dispatch(
      register(dataToSend)
    );
  };


  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* =========================
            HEADER
        ========================= */}

        <h2>
          Register
        </h2>

        <p className="auth-subtitle">
          Create your CareLink account.
        </p>


        <form onSubmit={handleSubmit}>

          {/* =========================
              FULL NAME
          ========================= */}

          <div className="form-group">

            <label htmlFor="fullName">
              Full Name *
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

          </div>


          {/* =========================
              EMAIL
          ========================= */}

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


          {/* =========================
              PASSWORD
          ========================= */}

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


          {/* =========================
              ROLE
          ========================= */}

          <div className="form-group">

            <label htmlFor="role">
              Account Role *
            </label>

            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
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


          {/* ==================================================
              PATIENT FIELDS
          ================================================== */}

          {formData.role === "PATIENT" && (
            <>

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

                  <option value="A+">
                    A+
                  </option>

                  <option value="A-">
                    A-
                  </option>

                  <option value="B+">
                    B+
                  </option>

                  <option value="B-">
                    B-
                  </option>

                  <option value="AB+">
                    AB+
                  </option>

                  <option value="AB-">
                    AB-
                  </option>

                  <option value="O+">
                    O+
                  </option>

                  <option value="O-">
                    O-
                  </option>

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

            </>
          )}


          {/* ==================================================
              DOCTOR FIELDS
          ================================================== */}

          {formData.role === "DOCTOR" && (
            <>

              <div className="form-group">

                <label htmlFor="specialization">
                  Specialization *
                </label>

                <input
                  id="specialization"
                  name="specialization"
                  type="text"
                  placeholder="e.g. Cardiology"
                  value={
                    formData.specialization
                  }
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="experience">
                  Experience (Years) *
                </label>

                <input
                  id="experience"
                  name="experience"
                  type="number"
                  min="0"
                  placeholder="Enter years of experience"
                  value={
                    formData.experience
                  }
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="consultationFee">
                  Consultation Fee *
                </label>

                <input
                  id="consultationFee"
                  name="consultationFee"
                  type="number"
                  min="0"
                  placeholder="Enter consultation fee"
                  value={
                    formData.consultationFee
                  }
                  onChange={handleChange}
                  required
                />

              </div>

            </>
          )}


          {/* ==================================================
              ADMIN INFORMATION
          ================================================== */}

          {formData.role === "CLINIC_ADMIN" && (

            <div className="admin-registration-note">

              <p>
                You are registering as a{" "}
                <strong>
                  Clinic Administrator
                </strong>.
              </p>

              <small>
                Administrator access should only be
                granted to authorized hospital staff.
              </small>

            </div>

          )}


          {/* =========================
              REGISTER BUTTON
          ========================= */}

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


        {/* =========================
            LOGIN LINK
        ========================= */}

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