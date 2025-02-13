import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from '../auth/authSlice';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create mess
export const createMess = createAsyncThunk('mess/createMess', async (messData, { getState, rejectWithValue }) => {
    try {
        const { auth } = getState();
        const response = await axios.post(`${BASE_URL}/mess/create`, {
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
        const response = await axios.post(`${BASE_URL}/mess/addMemberToMess`, { messId, userId });
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
        const response = await axios.get(`${BASE_URL}/mess/${id}`);
        return response.data.mess;
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Failed to fetch mess data");
    }
});

// Fetch unapproved users
export const getUnapprovedUsers = createAsyncThunk(
    'mess/fetchUnapprovedUsers',
    async ({ messId }) => {
        try {
            const response = await axios.get(`${BASE_URL}/mess/getUnapprovedMembers/${messId}`);
            return response.data;
        } catch (error) {
            throw Error(error.response.data.message || 'Failed to fetch unapproved users');
        }
    }
);

// Fetch unapproved users
export const getApprovedUsers = createAsyncThunk(
    'mess/fetchApprovedUsers',
    async ({ messId }) => {
        try {
            const response = await axios.get(`${BASE_URL}/mess/getApprovedMembers/${messId}`);
            return response.data;
        } catch (error) {
            throw Error(error.response.data.message || 'Failed to fetch unapproved users');
        }
    }
);

export const getApprovedMembersSeatRents = createAsyncThunk(
    'mess/fetchApprovedMembersSeatRents',
    async ({ messId }) => {
        try {
            const response = await axios.get(`${BASE_URL}/mess/getApprovedMembersSeatRents/${messId}`);
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
            const response = await axios.put(`${BASE_URL}/mess/updateSeatRentForUser`, { messId, userId, seatRent });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || "Failed to update seat rent for member");
        }
    }
);

// get seat rent for a member
export const getSeatRentForSingleMember = createAsyncThunk(
    'mess/getSeatRentForSingleMember',
    async ({ messId, userId }) => {
        try {
            const response = await axios.get(`${BASE_URL}/mess/getSeatRentForSingleMember/${messId}/${userId}`);
            return response.data;
        } catch (error) {
            throw Error(error.response.data.message || 'Failed to fetch seat rents');
        }
    }
);

// get seat rent for mess
export const getTotalSeatRentForApprovedUsers = createAsyncThunk(
    'mess/getTotalSeatRentForApprovedUsers',
    async ({ messId }) => {
        try {
            const response = await axios.get(`${BASE_URL}/mess/getTotalSeatRentForApprovedUsers/${messId}`);
            return response.data;
        } catch (error) {
            throw Error(error.response.data.message || 'Failed to fetch seat rents');
        }
    }
);

export const updateUserRole = createAsyncThunk('mess/updateUserRole', async ({ messId, userId, role }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${BASE_URL}/mess/updateUserRole`, { messId, userId, role });
        return response.data;
    } catch (error) {   
        return rejectWithValue(error.response.data.message || "Failed to update user role");
    }
});

export const leaveMessForUser = createAsyncThunk('mess/leaveMess', async ({ messId, userId }, { rejectWithValue }) => {
    console.log(userId,messId);
    try {
        const response = await axios.put(`${BASE_URL}/mess/leave`, { messId, userId });
        return response.data;
    } catch (error) {
        if (error.response) {
            return rejectWithValue(error.response.data.message);
        }
        return rejectWithValue("Server error");
    }
});


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
            })
            .addCase(leaveMessForUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(leaveMessForUser.fulfilled, (state) => {
                state.status = 'succeeded';
                state.mess = null;
                state.error = false;
            })
            .addCase(leaveMessForUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(logout, (state) => {
                state.mess = null;
                state.status = null;
                state.error = false;
                state.approvedMembersSeatRents=[]
            });
    },
});

export default messSlice.reducer;
