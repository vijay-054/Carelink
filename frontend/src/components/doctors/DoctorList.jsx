import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors } from "../../store/slices/doctorSlice";
import AppointmentForm from "../appointments/AppointmentForm";

const DoctorList = () => {
  const dispatch = useDispatch();

  const {
    items: doctors = [],
    isLoading = false,
    isError = false,
    error = null,
  } = useSelector((state) => state.doctors || {});

  const [selectedDoctor, setSelectedDoctor] =
    useState(null);

  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] =
    useState("ALL");

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  const specializations = useMemo(() => {
    const values = doctors
      .map((doctor) => doctor?.specialization)
      .filter(Boolean);

    return ["ALL", ...new Set(values)];
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const name =
        doctor?.name ||
        doctor?.account?.name ||
        doctor?.account?.email ||
        doctor?.email ||
        "";

      const doctorSpecialization =
        doctor?.specialization || "";

      const matchesSearch =
        name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        doctorSpecialization
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesSpecialization =
        specialization === "ALL" ||
        doctorSpecialization === specialization;

      return (
        matchesSearch &&
        matchesSpecialization
      );
    });
  }, [doctors, search, specialization]);

  const getDoctorName = (doctor) => {
    return (
      doctor?.name ||
      doctor?.account?.name ||
      doctor?.account?.email ||
      doctor?.email ||
      "Doctor"
    );
  };

  const getInitial = (doctor) => {
    return getDoctorName(doctor)
      .replace(/^Dr\.\s*/i, "")
      .charAt(0)
      .toUpperCase();
  };

  return (
    <div className="doctors-page">
      <div className="doctors-container">

        {/* HEADER */}
        <div className="doctors-page-header">
          <div>
            <span className="page-eyebrow">
              CARELINK
            </span>

            <h1>Find Your Doctor</h1>

            <p>
              Choose a specialist and book your
              consultation in a few simple steps.
            </p>
          </div>

          <div className="doctor-count">
            <strong>{doctors.length}</strong>
            <span>Doctors</span>
          </div>
        </div>

        {/* SEARCH */}
        <div className="doctor-toolbar">
          <div className="doctor-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search doctors or specialization..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <select
            className="doctor-filter"
            value={specialization}
            onChange={(e) =>
              setSpecialization(e.target.value)
            }
          >
            {specializations.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item === "ALL"
                  ? "All Specializations"
                  : item}
              </option>
            ))}
          </select>
        </div>

        {/* LOADING */}
        {isLoading && (
          <div className="doctor-loading-grid">
            {[1, 2, 3].map((item) => (
              <div
                className="doctor-skeleton"
                key={item}
              >
                <div className="skeleton-avatar" />
                <div className="skeleton-line large" />
                <div className="skeleton-line" />
                <div className="skeleton-line short" />
                <div className="skeleton-button" />
              </div>
            ))}
          </div>
        )}

        {/* ERROR */}
        {!isLoading && isError && (
          <div className="doctor-message error">
            <div className="message-icon">!</div>

            <h3>Unable to load doctors</h3>

            <p>
              {error ||
                "Something went wrong while loading doctors."}
            </p>

            <button
              type="button"
              onClick={() =>
                dispatch(getDoctors())
              }
            >
              Try Again
            </button>
          </div>
        )}

        {/* EMPTY */}
        {!isLoading &&
          !isError &&
          filteredDoctors.length === 0 && (
            <div className="doctor-message">
              <div className="message-icon">⌕</div>

              <h3>No doctors found</h3>

              <p>
                Try changing your search or
                specialization filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSpecialization("ALL");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}

        {/* DOCTORS */}
        {!isLoading &&
          !isError &&
          filteredDoctors.length > 0 && (
            <div className="professional-doctor-grid">
              {filteredDoctors.map((doctor) => {
                const name =
                  getDoctorName(doctor);

                return (
                  <article
                    className="professional-doctor-card"
                    key={doctor.id}
                  >
                    <div className="doctor-card-top">
                      <div className="professional-doctor-avatar">
                        {getInitial(doctor)}
                      </div>

                      <span className="doctor-available">
                        <span />
                        Available
                      </span>
                    </div>

                    <div className="professional-doctor-body">
                      <h2>Dr. {name}</h2>

                      <p className="doctor-specialization">
                        {doctor.specialization ||
                          "Medical Specialist"}
                      </p>

                      <div className="doctor-details">
                        <div>
                          <span className="detail-icon">
                            ◷
                          </span>

                          <div>
                            <small>
                              Experience
                            </small>

                            <strong>
                              {doctor.yearsOfExperience ??
                                0}{" "}
                              years
                            </strong>
                          </div>
                        </div>

                        <div>
                          <span className="detail-icon">
                            ₹
                          </span>

                          <div>
                            <small>
                              Consultation
                            </small>

                            <strong>
                              ₹
                              {doctor.consultationFee ??
                                "N/A"}
                            </strong>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="doctor-book-btn"
                        onClick={() =>
                          setSelectedDoctor(doctor)
                        }
                      >
                        Book Appointment
                        <span>→</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
      </div>

      {/* APPOINTMENT MODAL */}
      {selectedDoctor && (
        <AppointmentForm
          doctor={selectedDoctor}
          onClose={() =>
            setSelectedDoctor(null)
          }
          onSuccess={() => {
            setSelectedDoctor(null);
          }}
        />
      )}
    </div>
  );
};

export default DoctorList;