import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import appointmentService from "../../services/appointmentService";

/* =========================================================
   GET MY APPOINTMENTS - PATIENT
========================================================= */

export const getMyAppointments =
  createAsyncThunk(
    "appointments/getMyAppointments",
    async (_, { rejectWithValue }) => {
      try {
        return await appointmentService.getMyAppointments();
      } catch (error) {
        return rejectWithValue(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to load appointments"
        );
      }
    }
  );

/* =========================================================
   GET DOCTOR APPOINTMENTS
========================================================= */

export const getDoctorAppointments =
  createAsyncThunk(
    "appointments/getDoctorAppointments",
    async (_, { rejectWithValue }) => {
      try {
        return await appointmentService.getDoctorAppointments();
      } catch (error) {
        return rejectWithValue(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to load doctor appointments"
        );
      }
    }
  );

/* =========================================================
   GET ALL APPOINTMENTS - ADMIN
========================================================= */

export const getAllAppointments =
  createAsyncThunk(
    "appointments/getAllAppointments",
    async (_, { rejectWithValue }) => {
      try {
        return await appointmentService.getAllAppointments();
      } catch (error) {
        return rejectWithValue(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to load appointments"
        );
      }
    }
  );

/* =========================================================
   BOOK APPOINTMENT
========================================================= */

export const bookAppointment =
  createAsyncThunk(
    "appointments/book",
    async (
      appointmentData,
      { rejectWithValue }
    ) => {
      try {
        return await appointmentService.bookAppointment(
          appointmentData
        );
      } catch (error) {
        return rejectWithValue(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to book appointment"
        );
      }
    }
  );

/* =========================================================
   CANCEL APPOINTMENT
========================================================= */

export const cancelAppointment =
  createAsyncThunk(
    "appointments/cancel",
    async (
      appointmentId,
      { rejectWithValue }
    ) => {
      try {
        await appointmentService.cancelAppointment(
          appointmentId
        );

        return appointmentId;
      } catch (error) {
        return rejectWithValue(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to cancel appointment"
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
  isError: false,
  error: null,

  filterStatus: "ALL",
  searchQuery: "",
};

/* =========================================================
   SLICE
========================================================= */

const appointmentSlice = createSlice({
  name: "appointments",

  initialState,

  reducers: {

    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    clearAppointmentError: (state) => {
      state.isError = false;
      state.error = null;
    },

    clearAppointments: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {

    builder

      /* =====================================================
         GET MY APPOINTMENTS
      ===================================================== */

      .addCase(
        getMyAppointments.pending,
        (state) => {

          state.isLoading = true;
          state.isError = false;
          state.error = null;
        }
      )

      .addCase(
        getMyAppointments.fulfilled,
        (state, action) => {

          state.isLoading = false;
          state.isError = false;
          state.error = null;

          state.items =
            Array.isArray(action.payload)
              ? action.payload
              : [];
        }
      )

      .addCase(
        getMyAppointments.rejected,
        (state, action) => {

          state.isLoading = false;
          state.isError = true;

          state.error =
            action.payload ||
            "Failed to load appointments";
        }
      )

      /* =====================================================
         GET DOCTOR APPOINTMENTS
      ===================================================== */

      .addCase(
        getDoctorAppointments.pending,
        (state) => {

          state.isLoading = true;
          state.isError = false;
          state.error = null;
        }
      )

      .addCase(
        getDoctorAppointments.fulfilled,
        (state, action) => {

          state.isLoading = false;
          state.isError = false;
          state.error = null;

          state.items =
            Array.isArray(action.payload)
              ? action.payload
              : [];
        }
      )

      .addCase(
        getDoctorAppointments.rejected,
        (state, action) => {

          state.isLoading = false;
          state.isError = true;

          state.error =
            action.payload ||
            "Failed to load doctor appointments";
        }
      )

      /* =====================================================
         GET ALL APPOINTMENTS
      ===================================================== */

      .addCase(
        getAllAppointments.pending,
        (state) => {

          state.isLoading = true;
          state.isError = false;
          state.error = null;
        }
      )

      .addCase(
        getAllAppointments.fulfilled,
        (state, action) => {

          state.isLoading = false;
          state.isError = false;
          state.error = null;

          state.items =
            Array.isArray(action.payload)
              ? action.payload
              : [];
        }
      )

      .addCase(
        getAllAppointments.rejected,
        (state, action) => {

          state.isLoading = false;
          state.isError = true;

          state.error =
            action.payload ||
            "Failed to load appointments";
        }
      )

      /* =====================================================
         BOOK APPOINTMENT
      ===================================================== */

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
          state.isError = false;
          state.error = null;

          if (action.payload) {

            state.items.unshift(
              action.payload
            );
          }
        }
      )

      .addCase(
        bookAppointment.rejected,
        (state, action) => {

          state.isLoading = false;
          state.isError = true;

          state.error =
            action.payload ||
            "Failed to book appointment";
        }
      )

      /* =====================================================
         CANCEL APPOINTMENT
      ===================================================== */

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
          state.isError = false;
          state.error = null;

          const cancelledId =
            action.payload;

          state.items =
            state.items.filter(
              (item) =>
                String(item.id) !==
                String(cancelledId)
            );
        }
      )

      .addCase(
        cancelAppointment.rejected,
        (state, action) => {

          state.isLoading = false;
          state.isError = true;

          state.error =
            action.payload ||
            "Failed to cancel appointment";
        }
      );
  },
});

/* =========================================================
   ACTIONS
========================================================= */

export const {
  setFilterStatus,
  setSearchQuery,
  clearAppointmentError,
  clearAppointments,
} = appointmentSlice.actions;

/* =========================================================
   REDUCER
========================================================= */

export default appointmentSlice.reducer;