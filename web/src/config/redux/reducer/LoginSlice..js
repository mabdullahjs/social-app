import { createSlice } from "@reduxjs/toolkit";


const LoginSlice = createSlice({
    name: 'Login',
    initialState: {
        dummyData: 'DummyData...'
    },
    reducers: {
        add() { },
        del() { }
    }
})

export const { add, del } = LoginSlice.actions;
export default LoginSlice.reducer;