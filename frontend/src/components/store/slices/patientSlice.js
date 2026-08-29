import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

const initialState = {
    items: [],
    isLoading: false,
    isError: false,
    message: '',
};

// Get all patients (Clinic Admin)
export const getPatients = createAsyncThunk(
    'patients/getAll',
    async (_, thunkAPI) => {
        try {
            const response = await API.get('/patients');
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

// Delete patient (Clinic Admin)
export const deletePatient = createAsyncThunk(
    'patients/delete',
    async (id, thunkAPI) => {
        try {
            await API.delete(`/patients/${id}`);
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

export const patientSlice = createSlice({
    name: 'patients',
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
            .addCase(getPatients.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPatients.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(getPatients.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.items = [];
            })
            .addCase(deletePatient.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
            });
    },
});

export const { reset } = patientSlice.actions;
export default patientSlice.reducer;