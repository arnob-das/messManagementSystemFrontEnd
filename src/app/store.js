import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import messSlice from "../features/mess/messSlice";
import mealCountSlice from "../features/meal/mealCountSlice";
import mealDepositSlice from "../features/meal/mealDepositSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        mess: messSlice,
        mealCount:mealCountSlice,
        mealDeposit:mealDepositSlice
    }
})

export default store;