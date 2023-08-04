import {createSlice} from '@reduxjs/toolkit';

export const getInfor = createSlice({
  name: 'getInfor',
  initialState: {session_id: null},
  reducers: {
      setSessionId: (state, action) => {
      state.session_id = action.payload;
    },
  },
});


export const {setSessionId} = getInfor.actions;
export default getInfor.reducer;
