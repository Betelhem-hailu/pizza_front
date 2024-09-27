import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/user.slice";


const reducer = {
    user: userReducer
};

const store = configureStore({
    reducer: reducer,
    devTools: true
});

export default store;