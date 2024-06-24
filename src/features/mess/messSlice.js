import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create mess
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
});

// Get mess by id
export const getMessById = createAsyncThunk('mess/getMessById', async ({ id }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`http://localhost:5000/mess/${id}`);
        return response.data.mess;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to fetch mess data");
    }
});

// Fetch unapproved users
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

// Fetch unapproved users
export const getApprovedUsers = createAsyncThunk(
    'mess/fetchApprovedUsers',
    async ({messId}) => {
        try {
            const response = await axios.get(`http://localhost:5000/mess/getApprovedMembers/${messId}`);
            return response.data;
        } catch (error) {
            throw Error(error.response.data.message || 'Failed to fetch unapproved users');
        }
    }
);

export const getApprovedMembersSeatRents = createAsyncThunk(
    'mess/fetchApprovedMembersSeatRents',
    async ({messId}) => {
        try {
            const response = await axios.get(`http://localhost:5000/mess/getApprovedMembersSeatRents/${messId}`);
            return response.data;
        } catch (error) {
            throw Error(error.response.data.message || 'Failed to fetch seat rents');
        }
    }
);

// Set seat rent for a member
export const updateSeatRentForMember = createAsyncThunk(
    'mess/updateSeatRentForMember',
    async ({ messId, userId, seatRent }, { rejectWithValue }) => {
        try {
            const response = await axios.put('http://localhost:5000/mess/updateSeatRentForUser', { messId, userId, seatRent });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to update seat rent for member");
        }
    }
);

const messSlice = createSlice({
    name: 'mess',
    initialState: {
        mess: null,
        status: null,
        error: false,
        approvedMembersSeatRents: [],
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
                state.error = false;
            })
            .addCase(createMess.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.mess = null;
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
            })
            .addCase(updateSeatRentForMember.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateSeatRentForMember.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mess = action.payload.mess;
                state.error = false;
            })
            .addCase(updateSeatRentForMember.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default messSlice.reducer;
