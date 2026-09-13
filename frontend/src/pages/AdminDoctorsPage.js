import React from "react";

const AdminDoctorsPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "32px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "30px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                background: "#0d8ecf",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "25px",
                fontWeight: "700",
              }}
            >
              +
            </div>

            <div>
              <h1
                style={{
                  margin: 0,
                  color: "#142b43",
                  fontSize: "28px",
                }}
              >
                Doctor Management
              </h1>

              <p
                style={{
                  margin: "6px 0 0",
                  color: "#718096",
                  fontSize: "14px",
                }}
              >
                Manage doctors registered in CareLink.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#718096",
                fontSize: "14px",
              }}
            >
              Total Doctors
            </p>

            <h2
              style={{
                margin: "10px 0 0",
                color: "#142b43",
                fontSize: "32px",
              }}
            >
              0
            </h2>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#718096",
                fontSize: "14px",
              }}
            >
              Active Doctors
            </p>

            <h2
              style={{
                margin: "10px 0 0",
                color: "#16a34a",
                fontSize: "32px",
              }}
            >
              0
            </h2>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#718096",
                fontSize: "14px",
              }}
            >
              Pending Approval
            </p>

            <h2
              style={{
                margin: "10px 0 0",
                color: "#d97706",
                fontSize: "32px",
              }}
            >
              0
            </h2>
          </div>
        </div>

        {/* Doctors table */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "30px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  color: "#142b43",
                  fontSize: "21px",
                }}
              >
                Registered Doctors
              </h2>

              <p
                style={{
                  margin: "6px 0 0",
                  color: "#718096",
                  fontSize: "14px",
                }}
              >
                View and manage doctor accounts.
              </p>
            </div>
          </div>

          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "50px 20px",
              textAlign: "center",
              background: "#f8fafc",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                margin: "0 auto 16px",
                borderRadius: "50%",
                background: "#e0f2fe",
                color: "#0284c7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                fontWeight: "700",
              }}
            >
              +
            </div>

            <h3
              style={{
                margin: "0 0 8px",
                color: "#142b43",
              }}
            >
              No doctors to display
            </h3>

            <p
              style={{
                margin: 0,
                color: "#718096",
                fontSize: "14px",
              }}
            >
              Doctor accounts will appear here when they
              are registered in the system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDoctorsPage;