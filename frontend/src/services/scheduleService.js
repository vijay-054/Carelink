import api from './api';

const getAvailableSlots = async (doctorId) => {
    const response = await api.get(`/schedule/slots/${doctorId}`);
    return response.data;
};

const createSlot = async (slotData) => {
    const response = await api.post('/schedule/slots', slotData);
    return response.data;
};

const getMySlots = async () => {
    const response = await api.get('/schedule/my');
    return response.data;
};

const scheduleService = {
    getAvailableSlots,
    createSlot,
    getMySlots,
};

export default scheduleService;