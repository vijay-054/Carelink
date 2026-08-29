import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import appointmentService from "../../services/appointmentService";

/* =========================================================
   GET APPOINTMENTS
========================================================= */

export const getAppointments = createAsyncThunk(
  "appointments/getAppointments",
  async (_, thunkAPI) => {
    try {
      return await appointmentService.getAppointments();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Unable to fetch appointments"
      );
    }
  }
);

/* =========================================================
   GET AVAILABLE SLOTS
========================================================= */

export const getAvailableSlots = createAsyncThunk(
  "appointments/getAvailableSlots",
  async (doctorId, thunkAPI) => {
    try {
      return await appointmentService.getAvailableSlots(
        doctorId
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Unable to fetch available slots"
      );
    }
  }
);

/* =========================================================
   BOOK APPOINTMENT
========================================================= */

export const bookAppointment = createAsyncThunk(
  "appointments/book",
  async (appointmentData, thunkAPI) => {
    try {
      return await appointmentService.bookAppointment(
        appointmentData
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Unable to book appointment"
      );
    }
  }
);

/* =========================================================
   CANCEL APPOINTMENT
========================================================= */

export const cancelAppointment = createAsyncThunk(
  "appointments/cancel",
  async (appointmentId, thunkAPI) => {
    try {
      await appointmentService.cancelAppointment(
        appointmentId
      );

      return appointmentId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Unable to cancel appointment"
      );
    }
  }
);

/* =========================================================
   INITIAL STATE
========================================================= */

const initialState = {
  items: [],
  slots: [],

  isLoading: false,
  isSuccess: false,
  isError: false,

  error: null,
  message: "",
};

/* =========================================================
   SLICE
========================================================= */

const appointmentSlice = createSlice({
  name: "appointments",

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

      /* -----------------------------------------------
         GET APPOINTMENTS
      ------------------------------------------------ */

      .addCase(
        getAppointments.pending,
        (state) => {
          state.isLoading = true;
          state.isError = false;
          state.error = null;
        }
      )

      .addCase(
        getAppointments.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.items = action.payload || [];
        }
      )

      .addCase(
        getAppointments.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.payload;
        }
      )

      /* -----------------------------------------------
         GET AVAILABLE SLOTS
      ------------------------------------------------ */

      .addCase(
        getAvailableSlots.pending,
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )

      .addCase(
        getAvailableSlots.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.slots = action.payload || [];
        }
      )

      .addCase(
        getAvailableSlots.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.payload;
          state.slots = [];
        }
      )

      /* -----------------------------------------------
         BOOK APPOINTMENT
      ------------------------------------------------ */

      .addCase(
        bookAppointment.pending,
        (state) => {
          state.isLoading = true;
          state.isError = false;
          state.error = null;
        }
      )

      .addCase(
        bookAppointment.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;

          state.items.push(action.payload);
        }
      )

      .addCase(
        bookAppointment.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.payload;
        }
      )

      /* -----------------------------------------------
         CANCEL APPOINTMENT
      ------------------------------------------------ */

      .addCase(
        cancelAppointment.pending,
        (state) => {
          state.isLoading = true;
          state.isError = false;
          state.error = null;
        }
      )

      .addCase(
        cancelAppointment.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;

          const appointmentId =
            action.meta.arg;

          state.items = state.items.filter(
            (appointment) =>
              appointment.id !== appointmentId
          );
        }
      )

      .addCase(
        cancelAppointment.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.payload;
        }
      );
  },
});

export const { reset } =
  appointmentSlice.actions;

export default appointmentSlice.reducer;