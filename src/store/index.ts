import { configureStore } from "@reduxjs/toolkit";
import clients from "../components/clientsList/clientsSlice";

const store = configureStore({
    reducer: {clients},
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;