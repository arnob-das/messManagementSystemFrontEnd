import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { leaveMessForUser } from '../mess/messSlice';

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

export const getUserById = createAsyncThunk(
    'auth/getUserById',
    async ({ id }, { rejectWithValue }) => {
        console.log(id);
        try {
            const response = await axios.get(`http://localhost:5000/user/getUserById/${id}`);
            return response.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue("Server error");
        }
    }
);

// New thunk action to update user
export const updateUserById = createAsyncThunk(
    'auth/updateUser',
    async ({ userId, userData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:5000/user/update/${userId}`, userData);
            console.log(response.payload)
            return response.data.updatedUser;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue("Server error");
        }
    }
);

// change password slice
export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async ({ userId, oldPassword, newPassword }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/user/change-password', {
                userId,
                oldPassword,
                newPassword
            });
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
            .addCase(getUserById.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserById.fulfilled,(state,action)=>{
                state.isAuthenticated = true;
                state.loading = true;
                state.user=action.payload
                state.error = null;
            })
            .addCase(getUserById.rejected,(state,action)=>{
                state.isAuthenticated = false;
                state.loading = true;
                state.user=action.payload
                state.error = null;
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
            })
            .addCase(updateUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user.currentMessId = action.payload.currentMessId;
                state.user.approved = action.payload.approved;
                state.user.approved = action.payload.approved;
            })
            .addCase(updateUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(leaveMessForUser.fulfilled, (state) => {
                if (state.user) {
                    state.user.currentMessId = null;
                    state.user.approved = false;
                }
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
