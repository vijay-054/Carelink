import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Bell,
  CalendarDays,
  CalendarPlus,
  FilePlus2,
  FileText,
  LayoutDashboard,
  LogOut,
  MapPin,
  MessageCircle,
  Pill,
  Search,
  Settings,
  Stethoscope,
  UserRound,
  Clock3,
  HeartPulse,
  Star,
} from "lucide-react";

import { logout } from "../../store/slices/authSlice";
import "./Dashboard.css";

const PatientDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth || {});

  const userName =
    user?.fullName ||
    user?.name ||
    user?.email?.split("@")[0] ||
    "Patient";

const handleLogout = () => {

  dispatch(logout());

  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("authToken");
  localStorage.removeItem("carelinkToken");
  localStorage.removeItem("carelinkUser");

  window.location.href = "/";
};

  return (
    <div className="care-dashboard patient-dashboard">
      <aside className="dashboard-sidebar">
        <div className="dashboard-logo">
          <div className="logo-heart"><HeartPulse size={20} strokeWidth={2.4} /></div>
          <span>CareLink</span>
        </div>

        <nav className="dashboard-nav">
          <button className="dashboard-nav-item active">
            <span><LayoutDashboard size={17} /></span> Dashboard
          </button>
          <button className="dashboard-nav-item" onClick={() => navigate("/doctor-list")}>
            <span><Stethoscope size={17} /></span> Find Doctors
          </button>
          <button className="dashboard-nav-item" onClick={() => navigate("/book-appointment")}>
            <span><CalendarPlus size={17} /></span> Book Appointment
          </button>
          <button className="dashboard-nav-item" onClick={() => navigate("/appointments")}>
            <span><CalendarDays size={17} /></span> My Appointments
          </button>
          <button className="dashboard-nav-item">
            <span><FileText size={17} /></span> Health Records
          </button>
          <button className="dashboard-nav-item">
            <span><Pill size={17} /></span> Prescriptions
          </button>
          <button className="dashboard-nav-item">
            <span><MessageCircle size={17} /></span> Messages
          </button>
          <button className="dashboard-nav-item">
            <span><UserRound size={17} /></span> Profile
          </button>
          <button className="dashboard-nav-item">
            <span><Settings size={17} /></span> Settings
          </button>
        </nav>

        <button className="dashboard-logout" onClick={handleLogout}>
          <span><LogOut size={17} /></span> Logout
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div />
          <div className="topbar-user">
            <button className="notification-button" aria-label="Notifications">
              <Bell size={17} />
              <span className="notification-dot" />
            </button>
            <div className="user-avatar patient-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <strong>{userName}</strong>
              <span>Patient</span>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="dashboard-heading">
            <h1>Hi, {userName}! <span>👋</span></h1>
            <p>Take charge of your health with CareLink.</p>
          </section>

          <section className="patient-hero">
            <div className="patient-hero-content">
              <h2>Better Health<br />Brighter Tomorrow</h2>
              <p>Book appointments, manage your health records and stay connected with your doctors.</p>
              <button className="hero-button patient-button" onClick={() => navigate("/book-appointment")}>
                <CalendarPlus size={15} /> Book an Appointment
              </button>
            </div>
            <div className="patient-hero-art" aria-hidden="true">
              <div className="leaf leaf-one">🌿</div>
              <div className="patient-woman">👩🏻</div>
              <div className="heart-shape">♥</div>
            </div>
            <div className="hero-script">Your Health<br />Matters</div>
          </section>

          <section className="dashboard-stats">
            <Stat icon={<CalendarDays size={19} />} tone="mint" label="Appointments" value="3" note="Upcoming" />
            <Stat icon={<FileText size={19} />} tone="teal" label="Health Records" value="5" note="Total Records" />
            <Stat icon={<Pill size={19} />} tone="orange" label="Prescriptions" value="2" note="Active" />
            <Stat icon={<MessageCircle size={19} />} tone="coral" label="Messages" value="1" note="Unread" />
          </section>

          <section className="two-column-grid">
            <div className="dashboard-card appointment-card">
              <div className="card-heading"><h3>Next Appointment</h3></div>
              <div className="doctor-appointment">
                <div className="doctor-photo"><Stethoscope size={34} /></div>
                <div className="appointment-doctor">
                  <strong>Dr. Ananya Sharma</strong>
                  <span>Cardiologist</span>
                  <small><CalendarDays size={11} /> Mon, 15 Sep 2025</small>
                  <small><Clock3 size={11} /> 10:00 AM</small>
                  <small><MapPin size={11} /> City Care Hospital</small>
                </div>
              </div>
              <div className="appointment-actions">
                <button className="outline-button">View Details</button>
                <button className="green-button">Reschedule</button>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-heading"><h3>Quick Actions</h3></div>
              <div className="quick-action-grid">
                <button className="quick-action green-action" onClick={() => navigate("/book-appointment")}>
                  <CalendarPlus size={20} /><small>Book Appointment</small>
                </button>
                <button className="quick-action blue-action" onClick={() => navigate("/doctor-list")}>
                  <Search size={20} /><small>Find Doctors</small>
                </button>
                <button className="quick-action orange-action">
                  <Pill size={20} /><small>View Prescriptions</small>
                </button>
                <button className="quick-action sky-action">
                  <FilePlus2 size={20} /><small>Upload Health Record</small>
                </button>
              </div>
            </div>
          </section>

          <section className="dashboard-card">
            <div className="card-heading">
              <h3>Recommended Doctors</h3>
              <button className="view-all" onClick={() => navigate("/doctor-list")}>View All</button>
            </div>
            <div className="recommended-doctors">
              <DoctorMiniCard initials="RM" name="Dr. Rohan Mehta" specialty="General Physician" rating="4.8" reviews="120" onClick={() => navigate("/doctor-list")} />
              <DoctorMiniCard initials="PN" name="Dr. Priya Nair" specialty="Dermatologist" rating="4.7" reviews="98" onClick={() => navigate("/doctor-list")} />
              <DoctorMiniCard initials="AP" name="Dr. Arjun Patel" specialty="Orthopedic" rating="4.6" reviews="76" onClick={() => navigate("/doctor-list")} />
            </div>
          </section>

          <section className="patient-bottom-grid">
            <div className="dashboard-card">
              <div className="card-heading"><h3>Recent Activity</h3></div>
              <ActivityItem icon={<CalendarDays size={14} />} text="Appointment booked with Dr. Ananya Sharma" time="2 days ago" />
              <ActivityItem icon={<Pill size={14} />} text="Prescription updated" time="5 days ago" />
              <ActivityItem icon={<FileText size={14} />} text="Health record uploaded" time="1 week ago" />
              <ActivityItem icon={<Activity size={14} />} text="Appointment completed with Dr. Karan Singh" time="2 weeks ago" />
            </div>
            <div className="wellness-card">
              <div className="wellness-icon">❤️</div>
              <h3>Small Steps<br />Big Changes</h3>
              <p>Stay consistent, stay healthy!</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const Stat = ({ icon, tone, label, value, note }) => (
  <div className="dashboard-stat">
    <div className={`stat-icon ${tone}`}>{icon}</div>
    <div><span>{label}</span><strong>{value}</strong><small>{note}</small></div>
  </div>
);

const DoctorMiniCard = ({ initials, name, specialty, rating, reviews, onClick }) => (
  <div className="recommended-doctor">
    <div className="recommended-avatar">{initials}</div>
    <strong>{name}</strong>
    <span>{specialty}</span>
    <div className="doctor-rating"><Star size={11} fill="currentColor" /> {rating}<small>({reviews} reviews)</small></div>
    <button onClick={onClick}>Book Now</button>
  </div>
);

const ActivityItem = ({ icon, text, time }) => (
  <div className="activity-item">
    <div className="activity-icon">{icon}</div>
    <div><strong>{text}</strong><span>{time}</span></div>
  </div>
);

export default PatientDashboard;
