import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

const initialState = {
    items: [],
    isLoading: false,
    isError: false,
    message: '',
};

// Get all doctors
export const getDoctors = createAsyncThunk(
    'doctors/getAll',
    async (_, thunkAPI) => {
        try {
            const response = await API.get('/doctors');
            return response.data;
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.error) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Delete doctor (Clinic Admin)
export const deleteDoctor = createAsyncThunk(
    'doctors/delete',
    async (id, thunkAPI) => {
        try {
            await API.delete(`/doctors/${id}`);
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

export const doctorSlice = createSlice({
    name: 'doctors',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDoctors.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDoctors.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(getDoctors.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.items = [];
            })
            .addCase(deleteDoctor.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
            });
    },
});

export const { reset } = doctorSlice.actions;
export default doctorSlice.reducer;