import api from './api';

const getMyAppointments = async () => {
    const response = await api.get('/appointments/my');
    return response.data;
};

const bookAppointment = async (appointmentData) => {
    const response = await api.post(
        '/appointments/book',
        appointmentData
    );

    return response.data;
};

const cancelAppointment = async (appointmentId) => {
    const response = await api.put(
        `/appointments/cancel/${appointmentId}`
    );

    return response.data;
};

const getAllAppointments = async () => {
    const response = await api.get('/appointments');
    return response.data;
};

const appointmentService = {
    getMyAppointments,
    bookAppointment,
    cancelAppointment,
    getAllAppointments,
};

export default appointmentService;