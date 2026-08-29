import API from './api';

// Returns all unbooked slots for a given doctor ID[cite: 3]
const getAvailableSlots = async (doctorId) => {
    const response = await API.get(`/schedule/slots/${doctorId}`);
    return response.data;
};

// Creates a new availability slot with slotData passed as query parameters[cite: 3]
const createSlot = async (slotData) => {
    const response = await API.post('/schedule/slots', null, {
        params: slotData,
    });
    return response.data;
};

// Returns all slots (booked and unbooked) for the authenticated doctor[cite: 3]
const getMySlots = async () => {
    const response = await API.get('/schedule/my');
    return response.data;
};

const scheduleService = {
    getAvailableSlots,
    createSlot,
    getMySlots,
};

export default scheduleService;