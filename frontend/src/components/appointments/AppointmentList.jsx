import React, {
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getMyAppointments,
  getAllAppointments,
  cancelAppointment,
  setFilterStatus,
  setSearchQuery,
} from "../../store/slices/appointmentSlice";

import EmptyState from "../common/EmptyState";
import SearchFilterBar from "../common/SearchFilterBar";

const AppointmentList = () => {

  const dispatch = useDispatch();

  const user = useSelector(
    (state) => state.auth?.user || null
  );

  const {
    items = [],
    isLoading = false,
    filterStatus = "ALL",
    searchQuery = "",
  } = useSelector(
    (state) => state.appointments || {}
  );

  useEffect(() => {

    if (user?.role === "CLINIC_ADMIN") {
      dispatch(getAllAppointments());
    } else {
      dispatch(getMyAppointments());
    }

  }, [dispatch, user]);

  const handleCancel = (id) => {

    if (
      window.confirm(
        "Are you sure you want to cancel this appointment?"
      )
    ) {
      dispatch(
        cancelAppointment(id)
      );
    }
  };

  const safeItems =
    Array.isArray(items)
      ? items
      : [];

  const filteredItems =
    safeItems.filter((item) => {

      const matchesStatus =
        filterStatus === "ALL" ||
        item.status === filterStatus;

      const reason =
        item.reasonForVisit || "";

      const matchesSearch =
        searchQuery === "" ||
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

  return (
    <div className="page-container">

      <div className="page-header">

        <div>
          <h1>
            {user?.role === "CLINIC_ADMIN"
              ? "All Appointments"
              : "My Appointments"}
          </h1>

          <p>
            View and manage your hospital appointments.
          </p>
        </div>

        {user?.role === "PATIENT" && (
          <a
            href="/book-appointment"
            className="primary-btn"
          >
            + Book Appointment
          </a>
        )}

      </div>

      <SearchFilterBar
        placeholder="Search by reason..."
        filterOptions={[
          "ALL",
          "CONFIRMED",
          "PENDING",
          "CANCELLED",
          "COMPLETED",
        ]}
        onSearch={(query) =>
          dispatch(
            setSearchQuery(query)
          )
        }
        onFilter={(filter) =>
          dispatch(
            setFilterStatus(filter)
          )
        }
      />

      {filteredItems.length === 0 &&
      !isLoading ? (

        <EmptyState
          message="No appointments found."
        />

      ) : (

        <div className="table-card">

          <table className="data-table">

            <thead>

              <tr>
                <th>
                  Date & Time
                </th>

                <th>
                  Doctor
                </th>

                <th>
                  Reason for Visit
                </th>

                <th>
                  Status
                </th>

                <th>
                  Action
                </th>
              </tr>

            </thead>

            <tbody>

              {filteredItems.map(
                (appointment) => (

                  <tr
                    key={
                      appointment.id
                    }
                  >

                    <td>
                      {appointment.date ||
                        appointment.appointmentDate ||
                        "—"}
                    </td>

                    <td>
                      {appointment.doctorEmail ||
                        appointment.doctor?.email ||
                        "—"}
                    </td>

                    <td>
                      {appointment.reasonForVisit ||
                        "—"}
                    </td>

                    <td>

                      <span
                        className={`status status-${(
                          appointment.status ||
                          "pending"
                        ).toLowerCase()}`}
                      >
                        {appointment.status ||
                          "PENDING"}
                      </span>

                    </td>

                    <td>

                      {appointment.status !==
                        "CANCELLED" &&
                        appointment.status !==
                          "COMPLETED" && (

                          <button
                            type="button"
                            className="action-btn danger-btn"
                            onClick={() =>
                              handleCancel(
                                appointment.id
                              )
                            }
                          >
                            Cancel
                          </button>

                        )}

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
};

export default AppointmentList;