import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/user.slice";
import menuReducer from "../slices/menu.slice";


const reducer = {
    user: userReducer,
    menu: menuReducer
};

const store = configureStore({
    reducer: reducer,
    devTools: true
});

export default store;