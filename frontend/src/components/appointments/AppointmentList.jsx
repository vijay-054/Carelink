import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getMyAppointments,
  getAllAppointments,
  cancelAppointment,
  setFilterStatus,
  setSearchQuery,
} from "../../store/slices/appointmentSlice";

const AppointmentList = () => {
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.auth || {}
  );

  const {
    items = [],
    isLoading = false,
    isError = false,
    error = null,
    filterStatus = "ALL",
    searchQuery = "",
  } = useSelector(
    (state) => state.appointments || {}
  );

  useEffect(() => {
    if (!user) return;

    if (user.role === "CLINIC_ADMIN") {
      dispatch(getAllAppointments());
    } else {
      dispatch(getMyAppointments());
    }
  }, [dispatch, user]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const status =
        item?.status || "";

      const reason =
        item?.reasonForVisit || "";

      const matchesStatus =
        filterStatus === "ALL" ||
        status === filterStatus;

      const matchesSearch =
        !searchQuery ||
        reason
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          );

      return (
        matchesStatus &&
        matchesSearch
      );
    });
  }, [
    items,
    filterStatus,
    searchQuery,
  ]);

  const handleCancel = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmed) return;

    try {
      await dispatch(
        cancelAppointment(id)
      ).unwrap();
    } catch {
      // Redux handles the error state.
    }
  };

  const getStatusClass = (status) => {
    return (
      status || "PENDING"
    )
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  const getDoctorName = (item) => {
    return (
      item?.doctor?.name ||
      item?.doctor?.account?.name ||
      item?.doctor?.account?.email ||
      item?.doctor?.email ||
      item?.doctorName ||
      "Doctor"
    );
  };

  const getPatientName = (item) => {
    return (
      item?.patient?.name ||
      item?.patient?.account?.name ||
      item?.patient?.account?.email ||
      item?.patient?.email ||
      item?.patientName ||
      "Patient"
    );
  };

  const formatDate = (item) => {
    const value =
      item?.appointmentDate ||
      item?.date ||
      item?.slot?.date;

    if (!value) {
      return "Date not available";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const formatTime = (item) => {
    return (
      item?.slot?.startTime ||
      item?.startTime ||
      item?.time ||
      "Time not available"
    );
  };

  return (
    <div className="appointments-page">
      <div className="appointments-container">

        {/* HEADER */}
        <div className="appointments-header">
          <div>
            <span className="page-eyebrow">
              CARELINK
            </span>

            <h1>My Appointments</h1>

            <p>
              View, search and manage your
              appointments.
            </p>
          </div>

          <div className="appointment-summary">
            <strong>{items.length}</strong>
            <span>Total Appointments</span>
          </div>
        </div>

        {/* TOOLBAR */}
        <div className="appointment-toolbar">
          <div className="appointment-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search by reason for visit..."
              value={searchQuery}
              onChange={(e) =>
                dispatch(
                  setSearchQuery(
                    e.target.value
                  )
                )
              }
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) =>
              dispatch(
                setFilterStatus(
                  e.target.value
                )
              )
            }
          >
            <option value="ALL">
              All Status
            </option>

            <option value="CONFIRMED">
              Confirmed
            </option>

            <option value="PENDING">
              Pending
            </option>

            <option value="CANCELLED">
              Cancelled
            </option>

            <option value="COMPLETED">
              Completed
            </option>
          </select>
        </div>

        {/* ERROR */}
        {isError && (
          <div className="appointment-list-error">
            <strong>
              Unable to load appointments
            </strong>

            <span>
              {error ||
                "Please try again later."}
            </span>
          </div>
        )}

        {/* LOADING */}
        {isLoading && (
          <div className="appointments-loading">
            <div />
            <div />
            <div />
          </div>
        )}

        {/* EMPTY */}
        {!isLoading &&
          filteredItems.length === 0 && (
            <div className="appointments-empty">
              <div className="empty-calendar">
                ✓
              </div>

              <h2>
                No appointments found
              </h2>

              <p>
                There are no appointments matching
                your current search or filter.
              </p>
            </div>
          )}

        {/* TABLE */}
        {!isLoading &&
          filteredItems.length > 0 && (
            <div className="appointments-table-wrapper">
              <table className="professional-appointments-table">
                <thead>
                  <tr>
                    <th>Doctor / Patient</th>
                    <th>Reason</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredItems.map(
                    (appointment) => {
                      const status =
                        appointment?.status ||
                        "PENDING";

                      return (
                        <tr
                          key={
                            appointment.id
                          }
                        >
                          <td>
                            <div className="appointment-person">
                              <div>
                                {user?.role ===
                                "CLINIC_ADMIN"
                                  ? getPatientName(
                                      appointment
                                    ).charAt(0)
                                  : getDoctorName(
                                      appointment
                                    ).charAt(0)}
                              </div>

                              <span>
                                {user?.role ===
                                "CLINIC_ADMIN"
                                  ? getPatientName(
                                      appointment
                                    )
                                  : `Dr. ${getDoctorName(
                                      appointment
                                    )}`}
                              </span>
                            </div>
                          </td>

                          <td>
                            <span className="reason-text">
                              {appointment.reasonForVisit ||
                                "General consultation"}
                            </span>
                          </td>

                          <td>
                            {formatDate(
                              appointment
                            )}
                          </td>

                          <td>
                            {formatTime(
                              appointment
                            )}
                          </td>

                          <td>
                            <span
                              className={`appointment-status ${getStatusClass(
                                status
                              )}`}
                            >
                              {status}
                            </span>
                          </td>

                          <td>
                            {status !==
                              "CANCELLED" &&
                              status !==
                                "COMPLETED" ? (
                              <button
                                type="button"
                                className="appointment-cancel-action"
                                onClick={() =>
                                  handleCancel(
                                    appointment.id
                                  )
                                }
                                disabled={isLoading}
                              >
                                Cancel
                              </button>
                            ) : (
                              <span className="no-action">
                                —
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          )}
      </div>
    </div>
  );
};

export default AppointmentList;