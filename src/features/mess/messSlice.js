// features/messSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createMess = createAsyncThunk('mess/createMess', async (messData, { getState, rejectWithValue }) => {
    try {
        const { auth } = getState();
        const response = await axios.post('http://localhost:5000/mess/createMess', {
            ...messData,
            managerId: [auth.user._id],
            members: [{ userId: auth.user._id, joinDate: new Date(), seatRent: 0 }],
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const messSlice = createSlice({
    name: 'mess',
    initialState: {
        mess: null,
        status:null,
        error: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createMess.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createMess.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mess = action.payload;
                state.error=false
            })
            .addCase(createMess.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.mess=null
            });
    },
});

export default messSlice.reducer;
