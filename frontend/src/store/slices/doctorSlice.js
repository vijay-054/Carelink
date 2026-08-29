import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import doctorService from "../../services/doctorService";

/* =========================================================
   GET DOCTORS
========================================================= */

export const getDoctors = createAsyncThunk(
  "doctors/getDoctors",
  async (_, thunkAPI) => {
    try {
      return await doctorService.getDoctors();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Unable to fetch doctors"
      );
    }
  }
);

/* =========================================================
   DELETE DOCTOR
========================================================= */

export const deleteDoctor = createAsyncThunk(
  "doctors/deleteDoctor",
  async (doctorId, thunkAPI) => {
    try {
      await doctorService.deleteDoctor(
        doctorId
      );

      return doctorId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Unable to delete doctor"
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

const doctorSlice = createSlice({
  name: "doctors",

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

      /* GET DOCTORS */

      .addCase(
        getDoctors.pending,
        (state) => {
          state.isLoading = true;
          state.isError = false;
          state.error = null;
        }
      )

      .addCase(
        getDoctors.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;

          state.items =
            action.payload || [];
        }
      )

      .addCase(
        getDoctors.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.payload;
        }
      )

      /* DELETE DOCTOR */

      .addCase(
        deleteDoctor.pending,
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )

      .addCase(
        deleteDoctor.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;

          state.items = state.items.filter(
            (doctor) =>
              doctor.id !== action.payload
          );
        }
      )

      .addCase(
        deleteDoctor.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.payload;
        }
      );
  },
});

export const { reset } =
  doctorSlice.actions;

export default doctorSlice.reducer;