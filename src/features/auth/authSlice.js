// features/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/user/login', userData);
            return response.data.user;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue("Server error");
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/user/register', userData);
            return response.data.message;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue("Server error");
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.loading = false;
                state.error = action.payload;
                state.user = null;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
