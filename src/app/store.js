import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import messSlice from "../features/mess/messSlice";
import mealCountSlice from "../features/meal/mealCountSlice";
import mealDepositSlice from "../features/meal/mealDepositSlice";
import utilityBillSclice from "../features/utilityBill/utilityBillSclice";
import gorceryCostSlice from "../features/groceryCost/gorceryCostSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer as persistReducerToolkit } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const reducer = combineReducers({
    auth: authSlice,
    mess: messSlice,
    mealCount: mealCountSlice,
    mealDeposit: mealDepositSlice,
    utilityBill: utilityBillSclice,
    groceryCosts: gorceryCostSlice
})

const persistedReducer = persistReducerToolkit(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer
})

export default store;