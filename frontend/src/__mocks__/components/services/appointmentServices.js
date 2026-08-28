import API from './apiServices';

// Retrieves all appointments for the authenticated patient or doctor
const getMyAppointments = async () => {
    const response = await API.get('/appointments/my');
    return response.data;
};

// Books an appointment passing the bookingData body
const bookAppointment = async (bookingData) => {
    const response = await API.post('/appointments/book', bookingData);
    return response.data;
};

// Cancels an appointment and releases the slot
const cancelAppointment = async (id) => {
    const response = await API.put(`/appointments/cancel/${id}`);
    return response.data;
};

// Retrieves all appointments in the system (Clinic Admin)
const getAllAppointments = async () => {
    const response = await API.get('/appointments');
    return response.data;
};

const appointmentService = {
    getMyAppointments,
    bookAppointment,
    cancelAppointment,
    getAllAppointments,
};

export default appointmentService;