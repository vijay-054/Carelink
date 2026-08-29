import React, {
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getPatients,
  deletePatient,
} from "../../store/slices/patientSlice";

const ManagePatients = () => {
  const dispatch = useDispatch();

  const {
    items: patients = [],
    isLoading,
    isError,
    error,
  } = useSelector(
    (state) => state.patients || {}
  );

  useEffect(() => {
    dispatch(getPatients());
  }, [dispatch]);

  const handleRemove = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this patient?"
    );

    if (confirmed) {
      dispatch(deletePatient(id));
    }
  };

  return (
    <div className="manage-patients">
      <h2>Manage Patients</h2>

      {isLoading && (
        <p>Loading patients...</p>
      )}

      {isError && (
        <p>
          {error || "Unable to load patients"}
        </p>
      )}

      {!isLoading &&
        !isError &&
        patients.length === 0 && (
          <p>No patients found.</p>
        )}

      {patients.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Blood Group</th>
              <th>Emergency Contact</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>
                  {patient.fullName}
                </td>

                <td>
                  {patient.account?.email ||
                    patient.email}
                </td>

                <td>
                  {patient.bloodGroup}
                </td>

                <td>
                  {patient.emergencyContact}
                </td>

                <td>
                  <button
                    type="button"
                    onClick={() =>
                      handleRemove(
                        patient.id
                      )
                    }
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManagePatients;