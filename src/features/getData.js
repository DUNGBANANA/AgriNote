import {createSlice} from '@reduxjs/toolkit';
import data from './Data';



const initialState = data;


// 
// const levelup = (state, item) => {
//     item.payload.children[0].parent = data;
//     return item.payload.children;
// };

const levelup = (state, item) => {
    console.log(state);
    const updatedChildren = item.payload.children.map(child => ({
      ...child,
      parent: state,
    }));
    console.log(updatedChildren)
    return updatedChildren;
   
  };

const leveldown = (state, item) => {
    return item.payload[0].parent;
};


export const getData = createSlice({
  name: 'getData',
  initialState,
  reducers: {
    levelUp: (state, item) => {
      return levelup(state, item);
    },
    levelDown: (state, item) => {
      return leveldown(state, item);
    },
  },
});


export const {levelUp, levelDown} = getData.actions;
export default getData.reducer;
