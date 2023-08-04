import { createSlice } from "@reduxjs/toolkit";

export const getNotify = createSlice({
    name: 'getNotify',
    initialState: {data: null},
    reducers: {
        setNotify: (state, action) =>{
            state.data = action.payload
        }
    }
})


export const {setNotify} = getNotify.actions;
export default getNotify.reducer;
