import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from '../auth/authSlice';

// Add a new utility bill
export const addUtility = createAsyncThunk(
  'utilityBill/addUtility',
  async (utilityData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/utilityBill/add', utilityData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get a utility bill
export const getUtility = createAsyncThunk(
  'utilityBill/getUtility',
  async ({ messId, month, year }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/utilityBill/getUtility/${messId}/${month}/${year}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update a utility bill
export const updateUtility = createAsyncThunk(
  'utilityBill/updateUtility',
  async (utilityData, { rejectWithValue }) => {
    try {
      const response = await axios.put('http://localhost:5000/utilityBill/update', utilityData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a utility bill
export const deleteUtility = createAsyncThunk(
  'utilityBill/deleteUtility',
  async (utilityData, { rejectWithValue }) => {
    try {
      const response = await axios.delete('http://localhost:5000/utilityBill/delete', { data: utilityData });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get total utility bill for a mess of a month and year
// Get a utility bill
export const getTotalUtilityForMess = createAsyncThunk(
  'utilityBill/getTotalUtilityForMess',
  async ({ messId, month, year }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/utilityBill/getTotalUtilityBill/${messId}/${month}/${year}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const utilityBillSlice = createSlice({
  name: 'utilityBill',
  initialState: {
    utilityBill: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUtility.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUtility.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.utilityBill = action.payload;
        state.error = null;
      })
      .addCase(addUtility.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getUtility.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUtility.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.utilityBill = action.payload;
        state.error = null;
      })
      .addCase(getUtility.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateUtility.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUtility.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.utilityBill = action.payload;
        state.error = null;
      })
      .addCase(updateUtility.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteUtility.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUtility.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.utilityBill = action.payload;
        state.error = null;
      })
      .addCase(deleteUtility.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(logout, (state) => {
        state.utilityBill = null;
        state.status = 'idle';
        state.error = null;
      });
  },
});

export default utilityBillSlice.reducer;
