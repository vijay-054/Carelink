import React from "react";
import { useSelector } from "react-redux";

import PatientDashboard from "./PatientDashboard";
import DoctorDashboard from "./DoctorDashboard";

const Dashboard = () => {
  const { user } = useSelector(
    (state) => state.auth || {}
  );

  const role = String(
    user?.role ||
    user?.userRole ||
    user?.roleName ||
    ""
  )
    .replace("ROLE_", "")
    .toUpperCase();

  if (role === "DOCTOR") {
    return <DoctorDashboard />;
  }

  return <PatientDashboard />;
};

export default Dashboard;