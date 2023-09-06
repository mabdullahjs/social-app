import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "../reducer/LoginSlice.";



const Store = configureStore({
    reducer:{
        login:LoginSlice,
    }
})


export default Store;