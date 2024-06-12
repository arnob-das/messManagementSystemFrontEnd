// features/messSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// create mess
export const createMess = createAsyncThunk('mess/createMess', async (messData, { getState, rejectWithValue }) => {
    try {
        const { auth } = getState();
        const response = await axios.post('http://localhost:5000/mess/create', {
            ...messData,
            managerId: [auth.user._id],
            members: [{ userId: auth.user._id, joinDate: new Date(), seatRent: 0 }],
        });
        console.log(response);
        return response.data.mess;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// get mess by id
export const getMessById = createAsyncThunk('mess/getMessById', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`http://localhost:5000/mess/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to fetch mess data");
    }
});

const messSlice = createSlice({
    name: 'mess',
    initialState: {
        mess: null,
        status: null,
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
                state.error = false
            })
            .addCase(createMess.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.mess = null
            })
            .addCase(getMessById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMessById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mess = action.payload;
                state.error = false;
            })
            .addCase(getMessById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.mess = null;
            });
    },
});

export default messSlice.reducer;
