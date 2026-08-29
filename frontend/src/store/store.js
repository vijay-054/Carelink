import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import appointmentReducer from "./slices/appointmentSlice";
import doctorReducer from "./slices/doctorSlice";
import patientReducer from "./slices/patientSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentReducer,
    doctors: doctorReducer,
    patients: patientReducer,
  },
});

export default store;