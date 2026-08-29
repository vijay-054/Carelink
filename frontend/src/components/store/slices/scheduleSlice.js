import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import scheduleService from '../../../services/scheduleService';

const initialState = {
    slots: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

// Get slots by doctor ID (Type prefix required by test: schedule/getSlots)
export const getSlots = createAsyncThunk(
    'schedule/getSlots',
    async (doctorId, thunkAPI) => {
        try {
            return await scheduleService.getAvailableSlots(doctorId);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.error) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Create availability slot
export const createSlot = createAsyncThunk(
    'schedule/createSlot',
    async (slotData, thunkAPI) => {
        try {
            return await scheduleService.createSlot(slotData);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.error) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get authenticated doctor slots
export const getMySlots = createAsyncThunk(
    'schedule/getMySlots',
    async (_, thunkAPI) => {
        try {
            return await scheduleService.getMySlots();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.error) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            // getSlots
            .addCase(getSlots.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSlots.fulfilled, (state, action) => {
                state.isLoading = false;
                state.slots = action.payload;
            })
            .addCase(getSlots.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // createSlot
            .addCase(createSlot.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createSlot.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createSlot.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // getMySlots
            .addCase(getMySlots.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMySlots.fulfilled, (state, action) => {
                state.isLoading = false;
                state.slots = action.payload;
            })
            .addCase(getMySlots.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = scheduleSlice.actions;
export default scheduleSlice.reducer;