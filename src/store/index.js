import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/user.slice";
import menuReducer from "../slices/menu.slice";
import orderReducer from "../slices/order.slice";


const reducer = {
    user: userReducer,
    menu: menuReducer,
    order: orderReducer
};

const store = configureStore({
    reducer: reducer,
    devTools: true
});

export default store;