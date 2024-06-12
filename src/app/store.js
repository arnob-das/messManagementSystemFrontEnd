import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import messSlice from "../features/mess/messSlice";
import mealCountSlice from "../features/meal/mealCountSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        mess: messSlice,
        mealCount:mealCountSlice
    }
})

export default store;