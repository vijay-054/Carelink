import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

const initialState = {
    user: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

export const login = createAsyncThunk(
    'auth/login',
    async (loginData, thunkAPI) => {
        try {
            return await authService.login(loginData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                'Login failed'
            );
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (registerData, thunkAPI) => {
        try {
            return await authService.register(registerData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                'Registration failed'
            );
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },

        logout: (state) => {
            state.user = null;
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = '';
            })

            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.user = action.payload;
                state.message = '';
            })

            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload || 'Login failed';
            })

            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = '';
            })

            .addCase(register.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = '';
            })

            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload || 'Registration failed';
            });
    },
});

export const { reset, logout } = authSlice.actions;

export default authSlice.reducer;