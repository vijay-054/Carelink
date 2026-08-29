import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import appointmentService from '../../services/appointmentService';

const initialState = {
    items: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    searchQuery: '',
    filterStatus: 'ALL',
};

// Book an appointment
export const bookAppointment = createAsyncThunk(
    'appointments/book',
    async (bookingData, thunkAPI) => {
        try {
            return await appointmentService.bookAppointment(bookingData);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.error) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get user appointments
export const getMyAppointments = createAsyncThunk(
    'appointments/getMyAppointments',
    async (_, thunkAPI) => {
        try {
            return await appointmentService.getMyAppointments();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.error) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Cancel an appointment
export const cancelAppointment = createAsyncThunk(
    'appointments/cancel',
    async (id, thunkAPI) => {
        try {
            await appointmentService.cancelAppointment(id);
            return id;
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.error) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const appointmentSlice = createSlice({
    name: 'appointments',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setFilterStatus: (state, action) => {
            state.filterStatus = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Book appointment
            .addCase(bookAppointment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(bookAppointment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.items.push(action.payload);
            })
            .addCase(bookAppointment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Get appointments
            .addCase(getMyAppointments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMyAppointments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.items = action.payload;
            })
            .addCase(getMyAppointments.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Cancel appointment
            .addCase(cancelAppointment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.items = state.items.filter((item) => item.id !== action.meta.arg);
            });
    },
});

export const { reset, setSearchQuery, setFilterStatus } = appointmentSlice.actions;
export default appointmentSlice.reducer;