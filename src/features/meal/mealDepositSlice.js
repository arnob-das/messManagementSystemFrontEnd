import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from '../auth/authSlice';

// Add a new meal deposit
export const addMealDeposit = createAsyncThunk('mealDeposits/addMealDeposit', async (depositData, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5000/mealDeposit/addMealDeposit', depositData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to add meal deposit");
    }
});

// Get all meal deposits for a specific mess and date
export const getMessMealDeposits = createAsyncThunk('mealDeposits/getMealDeposits', async ({ currentMessId, date }, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:5000/mealDeposit/getMessMealDeposits', { params: { currentMessId, date } });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to fetch meal deposits");
    }
});

// Get all meal deposits for a specific user
export const getUserMealDeposit = createAsyncThunk('mealDeposits/getUserMealDeposits', async ({ userId, date, currentMessId }, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:5000/mealDeposit/getUserMealDeposits', { params: { userId, date, currentMessId } });
        return response.data.mealDeposits;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to fetch user meal deposits");
    }
});

// Edit a meal deposit by deposit ID
export const editMealDeposit = createAsyncThunk('mealDeposits/editMealDeposit', async ({ depositId, depositAmount }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`http://localhost:5000/mealDeposit/editMealDeposit`, { depositId, depositAmount });
        return response.data.mealDeposit;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to edit meal deposit");
    }
});

// Edit a meal deposit by deposit ID
export const editMealDepositStatus = createAsyncThunk('mealDeposits/editMealDepositStatus', async ({ depositId, status }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`http://localhost:5000/mealDeposit/updateMealDepositStatus`, { depositId, status });
        return response.data.mealDeposit;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to edit meal deposit");
    }
});

// Delete a meal deposit by deposit ID
export const deleteMealDeposit = createAsyncThunk('mealDeposits/deleteMealDeposit', async ({ depositId }, { rejectWithValue }) => {
    try {
        console.log(depositId)
        const response = await axios.delete(`http://localhost:5000/mealDeposit/deleteMealDeposit`, { data: { depositId } });
        return response.data.mealDeposit;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to delete meal deposit");
    }
});

const mealDepositSlice = createSlice({
    name: 'mealDeposits',
    initialState: {
        mealDeposit: [],
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Add meal deposit
            .addCase(addMealDeposit.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addMealDeposit.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mealDeposit = action.payload;
                state.error = null;
            })
            .addCase(addMealDeposit.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Get meal deposits
            .addCase(getMessMealDeposits.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMessMealDeposits.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mealDeposit = action.payload;
                state.error = null;
            })
            .addCase(getMessMealDeposits.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Get user meal deposits
            .addCase(getUserMealDeposit.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserMealDeposit.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mealDeposit = action.payload;
                state.error = null;
            })
            .addCase(getUserMealDeposit.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Edit meal deposit
            .addCase(editMealDeposit.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(editMealDeposit.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mealDeposit = action.payload;
                state.error = null;
            })
            .addCase(editMealDeposit.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Edit meal deposit status
            .addCase(editMealDepositStatus.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(editMealDepositStatus.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mealDeposit = action.payload;
                state.error = null;
            })
            .addCase(editMealDepositStatus.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Delete meal deposit
            .addCase(deleteMealDeposit.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteMealDeposit.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // state.mealDeposit = state.mealDeposit.filter(deposit => deposit._id !== action.payload._id);
                state.mealDeposit = action.payload;
                state.error = null;
            })
            .addCase(deleteMealDeposit.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(logout, (state) => {
                state.mealDeposit = [];
                state.status = null;
                state.error = null;
            });
    },
});

export default mealDepositSlice.reducer;
