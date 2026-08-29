import api from "./api";

const getDoctors = async () => {
  const response = await api.get("/doctors");

  return response.data;
};

const deleteDoctor = async (doctorId) => {
  const response = await api.delete(
    `/doctors/${doctorId}`
  );

  return response.data;
};

const doctorService = {
  getDoctors,
  deleteDoctor,
};

export default doctorService;