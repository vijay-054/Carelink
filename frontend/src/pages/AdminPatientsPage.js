import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../App.css";

const initialPatients = [
  {
    id: 1,
    name: "Vijay Raj",
    email: "vijay@example.com",
    phone: "+91 XXXXX XXXXX",
    status: "Active",
    appointments: 0,
    joined: "Today",
  },
  {
    id: 2,
    name: "Arun Kumar",
    email: "arun@example.com",
    phone: "+91 98765 43210",
    status: "Active",
    appointments: 3,
    joined: "2 days ago",
  },
  {
    id: 3,
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 98765 12345",
    status: "Active",
    appointments: 5,
    joined: "5 days ago",
  },
  {
    id: 4,
    name: "Rahul Kumar",
    email: "rahul@example.com",
    phone: "+91 91234 56789",
    status: "Inactive",
    appointments: 1,
    joined: "1 week ago",
  },
];

function AdminPatientsPage() {
  const navigate = useNavigate();

  const { user } = useSelector(
    (state) => state.auth || {}
  );

  const [patients, setPatients] = useState(initialPatients);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const adminName =
    user?.fullName ||
    user?.name ||
    "Admin";

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        patient.name.toLowerCase().includes(searchText) ||
        patient.email.toLowerCase().includes(searchText) ||
        patient.phone.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        patient.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [patients, search, statusFilter]);

  const activePatients = patients.filter(
    (patient) => patient.status === "Active"
  ).length;

  const inactivePatients = patients.filter(
    (patient) => patient.status === "Inactive"
  ).length;

  const totalAppointments = patients.reduce(
    (total, patient) =>
      total + patient.appointments,
    0
  );

  const togglePatientStatus = (id) => {
    setPatients((currentPatients) =>
      currentPatients.map((patient) =>
        patient.id === id
          ? {
              ...patient,
              status:
                patient.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : patient
      )
    );
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");

    navigate("/login");
  };

  return (
    <div className="admin-page">

      {/* HEADER */}

      <header className="admin-header">

        <div className="admin-brand">
          <div className="admin-logo">+</div>

          <div>
            <h2>CareLink</h2>
            <span>Patient Portal</span>
          </div>
        </div>

        <div className="admin-header-right">

          <div className="admin-user">
            <div className="admin-avatar">
              {getInitials(adminName)}
            </div>

            <div>
              <strong>{adminName}</strong>
              <span>Clinic Admin</span>
            </div>
          </div>

          <button
            className="admin-logout"
            onClick={handleLogout}
          >
            ↪ Logout
          </button>

        </div>

      </header>


      {/* MAIN LAYOUT */}

      <div className="admin-layout">

        {/* SIDEBAR */}

        <aside className="admin-sidebar">

          <button
            className="admin-nav-item"
            onClick={() =>
              navigate("/admin-dashboard")
            }
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className="admin-nav-item"
            onClick={() =>
              navigate("/admin/doctors")
            }
          >
            <span>♙</span>
            Doctors
          </button>

          <button
            className="admin-nav-item active"
          >
            <span>♙</span>
            Patients
          </button>

          <button
            className="admin-nav-item"
            onClick={() =>
              navigate("/admin-dashboard")
            }
          >
            <span>▣</span>
            Appointments
          </button>

          <button
            className="admin-nav-item"
            onClick={() =>
              navigate("/admin-dashboard")
            }
          >
            <span>⚙</span>
            Settings
          </button>

        </aside>


        {/* CONTENT */}

        <main className="admin-content">

          {/* PAGE HEADING */}

          <div className="admin-page-heading">

            <div>
              <span className="admin-tag">
                CARELINK ADMIN
              </span>

              <h1>Patients</h1>

              <p>
                Manage registered patients and
                their healthcare activity.
              </p>
            </div>

            <button
              className="admin-back-btn"
              onClick={() =>
                navigate("/admin-dashboard")
              }
            >
              ← Dashboard
            </button>

          </div>


          {/* STAT CARDS */}

          <div className="admin-stat-grid">

            <div className="admin-stat-card">

              <div className="admin-stat-icon blue">
                ♙
              </div>

              <div>
                <span>Total Patients</span>
                <strong>{patients.length}</strong>
                <small>Registered patients</small>
              </div>

            </div>


            <div className="admin-stat-card">

              <div className="admin-stat-icon green">
                ✓
              </div>

              <div>
                <span>Active Patients</span>
                <strong>{activePatients}</strong>
                <small>Currently active</small>
              </div>

            </div>


            <div className="admin-stat-card">

              <div className="admin-stat-icon orange">
                !
              </div>

              <div>
                <span>Inactive Patients</span>
                <strong>{inactivePatients}</strong>
                <small>Inactive accounts</small>
              </div>

            </div>


            <div className="admin-stat-card">

              <div className="admin-stat-icon purple">
                ▣
              </div>

              <div>
                <span>Appointments</span>
                <strong>{totalAppointments}</strong>
                <small>Total appointments</small>
              </div>

            </div>

          </div>


          {/* PATIENT TABLE CARD */}

          <div className="patients-card">

            <div className="patients-card-header">

              <div>
                <h2>Patient Management</h2>

                <p>
                  Search and manage patient accounts.
                </p>
              </div>

            </div>


            {/* FILTERS */}

            <div className="patient-filters">

              <div className="patient-search">
                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search patients..."
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                />
              </div>


              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
              >
                <option value="All">
                  All Status
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>

            </div>


            {/* TABLE */}

            <div className="patients-table-wrapper">

              <table className="patients-table">

                <thead>

                  <tr>
                    <th>Patient</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Appointments</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredPatients.length > 0 ? (

                    filteredPatients.map(
                      (patient) => (

                        <tr key={patient.id}>

                          <td>

                            <div className="patient-name">

                              <div className="patient-avatar">
                                {getInitials(
                                  patient.name
                                )}
                              </div>

                              <strong>
                                {patient.name}
                              </strong>

                            </div>

                          </td>


                          <td>
                            {patient.email}
                          </td>


                          <td>
                            {patient.phone}
                          </td>


                          <td>
                            <span className="appointment-count">
                              {patient.appointments}
                            </span>
                          </td>


                          <td>

                            <span
                              className={`patient-status ${
                                patient.status ===
                                "Active"
                                  ? "status-active"
                                  : "status-inactive"
                              }`}
                            >
                              ● {patient.status}
                            </span>

                          </td>


                          <td>
                            {patient.joined}
                          </td>


                          <td>

                            <div className="patient-actions">

                              <button
                                className="view-patient-btn"
                                onClick={() =>
                                  setSelectedPatient(
                                    patient
                                  )
                                }
                              >
                                View
                              </button>

                              <button
                                className="status-patient-btn"
                                onClick={() =>
                                  togglePatientStatus(
                                    patient.id
                                  )
                                }
                              >
                                {patient.status ===
                                "Active"
                                  ? "Disable"
                                  : "Activate"}
                              </button>

                            </div>

                          </td>

                        </tr>

                      )
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="7"
                        className="patients-empty"
                      >

                        <div>
                          🔍
                        </div>

                        <strong>
                          No patients found
                        </strong>

                        <p>
                          Try changing your search
                          or filter.
                        </p>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </main>

      </div>


      {/* PATIENT DETAILS MODAL */}

      {selectedPatient && (

        <div
          className="admin-modal-overlay"
          onClick={() =>
            setSelectedPatient(null)
          }
        >

          <div
            className="admin-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="admin-modal-close"
              onClick={() =>
                setSelectedPatient(null)
              }
            >
              ×
            </button>


            <div className="modal-patient-header">

              <div className="modal-patient-avatar">
                {getInitials(
                  selectedPatient.name
                )}
              </div>

              <div>

                <span className="admin-tag">
                  PATIENT
                </span>

                <h2>
                  {selectedPatient.name}
                </h2>

                <p>
                  {selectedPatient.email}
                </p>

              </div>

            </div>


            <div className="patient-detail-grid">

              <div>
                <span>Phone</span>
                <strong>
                  {selectedPatient.phone}
                </strong>
              </div>

              <div>
                <span>Status</span>
                <strong>
                  {selectedPatient.status}
                </strong>
              </div>

              <div>
                <span>Appointments</span>
                <strong>
                  {selectedPatient.appointments}
                </strong>
              </div>

              <div>
                <span>Joined</span>
                <strong>
                  {selectedPatient.joined}
                </strong>
              </div>

            </div>


            <div className="modal-actions">

              <button
                className="modal-secondary-btn"
                onClick={() =>
                  setSelectedPatient(null)
                }
              >
                Close
              </button>

              <button
                className="modal-primary-btn"
                onClick={() => {
                  togglePatientStatus(
                    selectedPatient.id
                  );

                  setSelectedPatient(null);
                }}
              >
                {selectedPatient.status ===
                "Active"
                  ? "Disable Patient"
                  : "Activate Patient"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminPatientsPage;