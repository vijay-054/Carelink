import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appointmentService from "../../services/appointmentService";

/*
 * ============================================================
 * GET MY APPOINTMENTS
 * ============================================================
 */
export const getMyAppointments = createAsyncThunk(
  "appointments/getMyAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const response =
        await appointmentService.getMyAppointments();

      return response?.data ?? response ?? [];
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load appointments"
      );
    }
  }
);

/*
 * ============================================================
 * GET ALL APPOINTMENTS
 * ============================================================
 */
export const getAllAppointments = createAsyncThunk(
  "appointments/getAllAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const response =
        await appointmentService.getAllAppointments();

      return response?.data ?? response ?? [];
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load appointments"
      );
    }
  }
);

/*
 * ============================================================
 * BOOK APPOINTMENT
 * ============================================================
 */
export const bookAppointment = createAsyncThunk(
  "appointments/book",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response =
        await appointmentService.bookAppointment(
          appointmentData
        );

      return response?.data ?? response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to book appointment"
      );
    }
  }
);

/*
 * ============================================================
 * CANCEL APPOINTMENT
 * ============================================================
 */
export const cancelAppointment = createAsyncThunk(
  "appointments/cancel",
  async (id, { rejectWithValue }) => {
    try {
      const response =
        await appointmentService.cancelAppointment(id);

      /*
       * We don't need the API response to remove
       * the appointment. The original ID is available
       * through action.meta.arg in the fulfilled reducer.
       */
      return response?.data ?? response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to cancel appointment"
      );
    }
  }
);

/*
 * ============================================================
 * INITIAL STATE
 * ============================================================
 */
const initialState = {
  items: [],
  isLoading: false,
  isError: false,
  error: null,

  filterStatus: "ALL",
  searchQuery: "",

  slots: [],
};

/*
 * ============================================================
 * SLICE
 * ============================================================
 */
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
  },

  extraReducers: (builder) => {
    builder

      /*
       * ========================================================
       * GET MY APPOINTMENTS
       * ========================================================
       */

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

          state.items = Array.isArray(action.payload)
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

      /*
       * ========================================================
       * GET ALL APPOINTMENTS
       * ========================================================
       */

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

          state.items = Array.isArray(action.payload)
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

      /*
       * ========================================================
       * BOOK APPOINTMENT
       * ========================================================
       */

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

          /*
           * T19:
           * Add the newly booked appointment.
           */
          if (action.payload) {
            state.items.push(action.payload);
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

      /*
       * ========================================================
       * CANCEL APPOINTMENT
       * ========================================================
       */

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

          /*
           * T18:
           * The ID passed to cancelAppointment()
           * is stored in action.meta.arg.
           */
          const cancelledId =
            action.meta?.arg;

          state.items = state.items.filter(
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

/*
 * ============================================================
 * ACTIONS
 * ============================================================
 */
export const {
  setFilterStatus,
  setSearchQuery,
  clearAppointmentError,
} = appointmentSlice.actions;

/*
 * ============================================================
 * REDUCER
 * ============================================================
 */
export default appointmentSlice.reducer;