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
        return response.data.mess;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addMemberToMess = createAsyncThunk('mess/addMember', async ({ messId, userId }, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5000/mess/addMemberToMess', { messId, userId });
        return response.data;
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data.message);
        }
        return rejectWithValue("Server error");
    }
}
);

// get mess by id
export const getMessById = createAsyncThunk('mess/getMessById', async ({ id }, { rejectWithValue }) => {
    console.log(id)
    try {
        const response = await axios.get(`http://localhost:5000/mess/${id}`);
        return response.data.mess;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to fetch mess data");
    }
});

// Async thunk to fetch unapproved users
export const getUnapprovedUsers = createAsyncThunk(
    'mess/fetchUnapprovedUsers',
    async ({messId}) => {
        try {
            const response = await axios.get(`http://localhost:5000/mess/getUnapprovedMembers/${messId}`);
            return response.data;
        } catch (error) {
            throw Error(error.response.data.message || 'Failed to fetch unapproved users');
        }
    }
);

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
            })
            .addCase(addMemberToMess.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addMemberToMess.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mess = action.payload;
                state.error = null;
            })
            .addCase(addMemberToMess.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default messSlice.reducer;




