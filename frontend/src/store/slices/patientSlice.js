import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import ... from '../../services/PatientService';

/* =========================================================
   GET PATIENTS
========================================================= */

export const getPatients = createAsyncThunk(
  "patients/getPatients",
  async (_, thunkAPI) => {
    try {
      return await patientService.getPatients();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Unable to fetch patients"
      );
    }
  }
);

/* =========================================================
   DELETE PATIENT
========================================================= */

export const deletePatient = createAsyncThunk(
  "patients/deletePatient",
  async (patientId, thunkAPI) => {
    try {
      await patientService.deletePatient(
        patientId
      );

      return patientId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Unable to delete patient"
      );
    }
  }
);

/* =========================================================
   INITIAL STATE
========================================================= */

const initialState = {
  items: [],

  isLoading: false,
  isSuccess: false,
  isError: false,

  error: null,
  message: "",
};

/* =========================================================
   SLICE
========================================================= */

const patientSlice = createSlice({
  name: "patients",

  initialState,

  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      /* GET PATIENTS */

      .addCase(
        getPatients.pending,
        (state) => {
          state.isLoading = true;
          state.isError = false;
          state.error = null;
        }
      )

      .addCase(
        getPatients.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;

          state.items =
            action.payload || [];
        }
      )

      .addCase(
        getPatients.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.payload;
        }
      )

      /* DELETE PATIENT */

      .addCase(
        deletePatient.pending,
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )

      .addCase(
        deletePatient.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;

          state.items = state.items.filter(
            (patient) =>
              patient.id !== action.payload
          );
        }
      )

      .addCase(
        deletePatient.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.payload;
        }
      );
  },
});

export const { reset } =
  patientSlice.actions;

export default patientSlice.reducer;