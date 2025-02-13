import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from '../auth/authSlice';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Get meals by user ID, month, year, and mess ID
export const getMeals = createAsyncThunk('meals/fetchMeals', async ({ currentMessId, userId, month, year }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/mealCount/getMeals?currentMessId=${currentMessId}&userId=${userId}&month=${month}&year=${year}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to fetch meals");
    }
});

// Get meals by user ID, month, year, and mess ID
export const getAllMessMembersMeals = createAsyncThunk('meals/getAllMessMembersMeals', async ({ currentMessId, month, year }, { rejectWithValue }) => {
    console.log(currentMessId)
    console.log(month)
    console.log(year)
    const api = `${BASE_URL}/mealCount/getAllMessMembersMeals/${currentMessId}/${month}/${year}`;
    try {
        const response = await axios.get(`${BASE_URL}/mealCount/getAllMessMembersMeals/${currentMessId}/${month}/${year}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to fetch meals");
    }
});

// Add a new meal
export const addMeal = createAsyncThunk('mealCount/addMeal', async (mealData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_URL}/mealCount/addMeal`, mealData);
        return response.data.mealCount; 
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to add meal");
    }
});

// Edit a meal by meal ID
export const editMeal = createAsyncThunk('mealCount/editMeal', async ({ mealId, mealData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${BASE_URL}/mealCount/editMeal`, { mealId, meal: mealData });
        return response.data.mealCount; 
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to edit meal");
    }
});

// Delete a meal by meal ID
export const deleteMeal = createAsyncThunk('mealCount/deleteMeal', async ({ mealId }, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${BASE_URL}/mealCount/deleteMeal`, { data: { mealId } });
        return response.data.mealCount;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to delete meal");
    }
});

// get total meal count for a userid based on messid, month and year
export const getTotalMealCountForUser = createAsyncThunk('mealCount/totalMealForUser', async ({ messId,month,year,userId }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/mealCount/getTotalMealCountForUser/${messId}/${month}/${year}/${userId}`);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data.message || "failed to load meal");
    }
});

// get total meal count for a mess based on messId, month and year
export const getTotalMealCountForMess = createAsyncThunk('mealCount/totalMealForMess', async ({ messId,month,year }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/mealCount/getTotalMealCountForMess/${messId}/${month}/${year}`);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data.message || "failed to load meal");
    }
});

const mealSlice = createSlice({
    name: 'mealCount',
    initialState: {
        mealCount: { meals: [] },
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMeals.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMeals.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mealCount = action.payload;
            })
            .addCase(getMeals.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addMeal.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addMeal.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mealCount = action.payload;
                state.error = null;
            })
            .addCase(addMeal.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(editMeal.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(editMeal.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mealCount = action.payload; 
                state.error = null;
            })
            .addCase(editMeal.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteMeal.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteMeal.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mealCount = action.payload; 
                state.error = null;
            })
            .addCase(deleteMeal.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(logout, (state) => {
                state.mealCount = { meals: [] };
                state.status = null;
                state.error = null;
            });
    },
});

export default mealSlice.reducer;
