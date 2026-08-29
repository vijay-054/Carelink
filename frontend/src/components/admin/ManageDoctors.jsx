import React, {
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getDoctors,
  deleteDoctor,
} from "../../store/slices/doctorSlice";

const ManageDoctors = () => {
  const dispatch = useDispatch();

  const {
    items: doctors = [],
    isLoading,
    isError,
    error,
  } = useSelector(
    (state) => state.doctors || {}
  );

  useEffect(() => {
    dispatch(getDoctors());
  }, [dispatch]);

  const handleRemove = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this doctor?"
    );

    if (confirmed) {
      dispatch(deleteDoctor(id));
    }
  };

  return (
    <div className="manage-doctors">
      <h2>Manage Doctors</h2>

      {isLoading && (
        <p>Loading doctors...</p>
      )}

      {isError && (
        <p>
          {error || "Unable to load doctors"}
        </p>
      )}

      {!isLoading &&
        !isError &&
        doctors.length === 0 && (
          <p>No doctors found.</p>
        )}

      {doctors.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Consultation Fee</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>
                  {doctor.account?.email ||
                    doctor.email}
                </td>

                <td>
                  {doctor.specialization}
                </td>

                <td>
                  {doctor.yearsOfExperience}
                </td>

                <td>
                  ₹
                  {doctor.consultationFee}
                </td>

                <td>
                  <button
                    type="button"
                    onClick={() =>
                      handleRemove(
                        doctor.id
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

export default ManageDoctors;