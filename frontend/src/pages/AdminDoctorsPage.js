import React from "react";

const AdminDoctorPage = () => {
  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}
      >
        <h1 style={{ marginBottom: "10px" }}>
          Doctor Management
        </h1>

        <p style={{ color: "#6b7280" }}>
          Manage doctors registered in CareLink.
        </p>

        <div
          style={{
            marginTop: "30px",
            padding: "25px",
            borderRadius: "12px",
            background: "#f8fafc",
            textAlign: "center",
          }}
        >
          <h2>No doctors to display</h2>

          <p style={{ color: "#6b7280" }}>
            Doctor accounts will appear here when they are
            registered in the system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDoctorPage;