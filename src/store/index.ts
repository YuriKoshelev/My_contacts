import { configureStore } from "@reduxjs/toolkit";
import clients from "../components/clientsList/clientsSlice";

// type Next = () => void | Promise<void>;

// const stringMiddleware = () => (next) => (action) => {
//     if (typeof action === 'string') {
//         return next({
//             type: action
//         })
//     }
//     return next(action)
// }

const store = configureStore({
    reducer: {clients},
    //middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV != 'production'
})

export default store;