import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import scheduleService from '../../services/scheduleService';

const initialState = {
    slots: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

export const getSlots = createAsyncThunk(
    'schedule/getSlots',
    async (doctorId, thunkAPI) => {
        try {
            return await scheduleService.getAvailableSlots(doctorId);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                'Unable to fetch slots'
            );
        }
    }
);

export const createSlot = createAsyncThunk(
    'schedule/createSlot',
    async (slotData, thunkAPI) => {
        try {
            return await scheduleService.createSlot(slotData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                'Unable to create slot'
            );
        }
    }
);

export const getMySlots = createAsyncThunk(
    'schedule/getMySlots',
    async (_, thunkAPI) => {
        try {
            return await scheduleService.getMySlots();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                'Unable to fetch schedules'
            );
        }
    }
);

const scheduleSlice = createSlice({
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

            .addCase(getSlots.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })

            .addCase(getSlots.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.slots = action.payload;
            })

            .addCase(getSlots.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

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

            .addCase(getMySlots.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })

            .addCase(getMySlots.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
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