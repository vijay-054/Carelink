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

export const getMyAppointments = createAsyncThunk(
    'appointments/getMy',
    async (_, thunkAPI) => {
        try {
            return await appointmentService.getMyAppointments();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                'Unable to fetch appointments'
            );
        }
    }
);

export const getAllAppointments = createAsyncThunk(
    'appointments/getAll',
    async (_, thunkAPI) => {
        try {
            return await appointmentService.getAllAppointments();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                'Unable to fetch appointments'
            );
        }
    }
);

export const bookAppointment = createAsyncThunk(
    'appointments/book',
    async (appointmentData, thunkAPI) => {
        try {
            return await appointmentService.bookAppointment(appointmentData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                'Unable to book appointment'
            );
        }
    }
);

export const cancelAppointment = createAsyncThunk(
    'appointments/cancel',
    async (appointmentId, thunkAPI) => {
        try {
            await appointmentService.cancelAppointment(appointmentId);

            return appointmentId;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                'Unable to cancel appointment'
            );
        }
    }
);

const appointmentSlice = createSlice({
    name: 'appointments',
    initialState,

    reducers: {
        setFilterStatus: (state, action) => {
            state.filterStatus = action.payload;
        },

        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },

        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },

    extraReducers: (builder) => {
        builder

            .addCase(getMyAppointments.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
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

            .addCase(getAllAppointments.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })

            .addCase(getAllAppointments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.items = action.payload;
            })

            .addCase(getAllAppointments.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            .addCase(bookAppointment.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
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

            .addCase(cancelAppointment.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })

            .addCase(cancelAppointment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;

                state.items = state.items.filter(
                    (item) => item.id !== action.payload
                );
            })

            .addCase(cancelAppointment.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const {
    setFilterStatus,
    setSearchQuery,
    reset,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;