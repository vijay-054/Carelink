import API from './api';

// Transitions appointment from PENDING to CONFIRMED[cite: 3]
const approveAppointment = async (appointmentId) => {
    const response = await API.post(`/consultations/${appointmentId}/approve`);
    return response.data;
};

// Transitions appointment from CONFIRMED to IN_PROGRESS[cite: 3]
const startConsultation = async (appointmentId) => {
    const response = await API.post(`/consultations/${appointmentId}/start`);
    return response.data;
};

// Finalizes consultation with diagnosis and medications serialized as URLSearchParams query parameters[cite: 3]
const finalizeConsultation = async (appointmentId, data) => {
    const params = new URLSearchParams();
    if (data.diagnosis) {
        params.append('diagnosis', data.diagnosis);
    }
    if (data.medicationsJson) {
        params.append('medications.Json', data.medicationsJson);
    }

    const response = await API.post(
        `/consultations/${appointmentId}/finalize?${params.toString()}`
    );
    return response.data;
};

const consultationService = {
    approveAppointment,
    startConsultation,
    finalizeConsultation,
};

export default consultationService;