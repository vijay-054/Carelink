import api from "./api";

const getPatients = async () => {
  const response = await api.get(
    "/patients"
  );

  return response.data;
};

const deletePatient = async (patientId) => {
  const response = await api.delete(
    `/patients/${patientId}`
  );

  return response.data;
};

const patientService = {
  getPatients,
  deletePatient,
};

export default patientService;