import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Add a new grocery cost
export const addGroceryCost = createAsyncThunk('groceryCosts/addGroceryCost', async (groceryData, { rejectWithValue }) => {
    const { messId, month, year, groceries } = groceryData;
    try {
        const response = await axios.post('http://localhost:5000/groceryCost/add', { messId, month, year, groceries });
        console.log({messId,month,year,groceries})
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to add grocery cost");
    }
});

// Get grocery costs for a specific mess, month, and year
export const getGroceryCost = createAsyncThunk('groceryCosts/getGroceryCost', async ({ messId, month, year }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`http://localhost:5000/groceryCost/get/${messId}/${month}/${year}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to fetch grocery costs");
    }
});

// Update a grocery cost by grocery ID
export const updateGroceryCost = createAsyncThunk('groceryCosts/updateGroceryCost', async (updateData, { rejectWithValue }) => {
    try {
        const response = await axios.put('http://localhost:5000/groceryCost/update', updateData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to update grocery cost");
    }
});

// Delete a grocery cost by grocery ID
export const deleteGroceryCost = createAsyncThunk('groceryCosts/deleteGroceryCost', async ({ messId, month, year, groceryId }, { rejectWithValue }) => {
    try {
        const response = await axios.delete('http://localhost:5000/groceryCost/delete', { data: { messId, month, year, groceryId } });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to delete grocery cost");
    }
});

const groceryCostSlice = createSlice({
    name: 'groceryCosts',
    initialState: {
        groceryCost: null,
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addGroceryCost.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addGroceryCost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.groceryCost = action.payload.groceryCost;
                state.error = null;
            })
            .addCase(addGroceryCost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getGroceryCost.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getGroceryCost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.groceryCost = action.payload;
                state.error = null;
            })
            .addCase(getGroceryCost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateGroceryCost.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateGroceryCost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.groceryCost = action.payload.groceryCost;
                state.error = null;
            })
            .addCase(updateGroceryCost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteGroceryCost.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteGroceryCost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.groceryCost = action.payload.groceryCost;
                state.error = null;
            })
            .addCase(deleteGroceryCost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default groceryCostSlice.reducer;
