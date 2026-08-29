import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  const authState = useSelector(
    (state) => state.auth || {}
  );

  const appointmentState = useSelector(
    (state) => state.appointments || {}
  );

  const {
    user = null,
  } = authState;

  const {
    items = [],
    isLoading = false,
    filterStatus = "ALL",
    searchQuery = "",
  } = appointmentState;

  /*
   * Load appointments according to role
   */
  useEffect(() => {
    if (user?.role === "CLINIC_ADMIN") {
      dispatch(getAllAppointments());
    } else {
      dispatch(getMyAppointments());
    }
  }, [dispatch, user]);

  /*
   * Cancel appointment
   */
  const handleCancel = (id) => {
    if (
      window.confirm(
        "Are you sure you want to cancel this appointment?"
      )
    ) {
      dispatch(cancelAppointment(id));
    }
  };

  /*
   * Search and filter
   */
  const safeItems = Array.isArray(items) ? items : [];

  const filteredItems = safeItems.filter((item) => {
    const matchesStatus =
      filterStatus === "ALL" ||
      item.status === filterStatus;

    const reason =
      item.reasonForVisit || "";

    const matchesSearch =
      searchQuery === "" ||
      reason
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="appointment-list">
      <h2>Appointment List</h2>

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
          dispatch(setSearchQuery(query))
        }
        onFilter={(filter) =>
          dispatch(setFilterStatus(filter))
        }
      />

      {filteredItems.length === 0 && !isLoading ? (
        <EmptyState
          message="No appointments found."
        />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Reason for Visit</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.map((appointment) => (
              <tr key={appointment.id}>
                <td>
                  {appointment.reasonForVisit}
                </td>

                <td>
                  {appointment.status}
                </td>

                <td>
                  {appointment.status !== "CANCELLED" &&
                    appointment.status !== "COMPLETED" && (
                      <button
                        type="button"
                        onClick={() =>
                          handleCancel(appointment.id)
                        }
                      >
                        Cancel
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentList;