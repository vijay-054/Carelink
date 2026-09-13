import api from "./api";

/* =========================================================
   GET PATIENT APPOINTMENTS
========================================================= */

const getMyAppointments = async () => {
  const response = await api.get("/appointments/my");

  return response.data;
};

/* =========================================================
   GET DOCTOR APPOINTMENTS
========================================================= */

const getDoctorAppointments = async () => {
  const response = await api.get("/appointments/doctor");

  return response.data;
};

/* =========================================================
   GET ALL APPOINTMENTS - ADMIN
========================================================= */

const getAllAppointments = async () => {
  const response = await api.get("/appointments");

  return response.data;
};

/* =========================================================
   BOOK APPOINTMENT
========================================================= */

const bookAppointment = async (appointmentData) => {
  const response = await api.post(
    "/appointments/book",
    appointmentData
  );

  return response.data;
};

/* =========================================================
   CANCEL APPOINTMENT
========================================================= */

const cancelAppointment = async (appointmentId) => {
  const response = await api.put(
    `/appointments/cancel/${appointmentId}`
  );

  return response.data;
};

/* =========================================================
   EXPORT
========================================================= */

const appointmentService = {
  getMyAppointments,
  getDoctorAppointments,
  getAllAppointments,
  bookAppointment,
  cancelAppointment,
};

export default appointmentService;