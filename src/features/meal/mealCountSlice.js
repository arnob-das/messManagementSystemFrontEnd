import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch meals by user ID, month, and year
export const fetchMeals = createAsyncThunk('mealCount/fetchMeals', async ({ userId, month, year }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`http://localhost:5000/mealCount?userId=${userId}&month=${month}&year=${year}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to fetch meals");
    }
});

// Add a new meal
export const addMeal = createAsyncThunk('mealCount/addMeal', async (mealData, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5000/mealCount/addMeal', mealData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to add meal");
    }
});

const mealSlice = createSlice({
    name: 'mealCount',
    initialState: {
        mealCount: [],
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMeals.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMeals.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mealCount = action.payload;
            })
            .addCase(fetchMeals.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addMeal.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addMeal.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mealCount.push(action.payload);
            })
            .addCase(addMeal.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default mealSlice.reducer;
