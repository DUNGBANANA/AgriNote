import { configureStore } from "@reduxjs/toolkit";
import getData from '../features/getData'
import getInfor from "../features/getInfor";
import getNotify from "../features/getNotify";



export const store = configureStore({
    reducer: { 
        newData: getData,
        infor: getInfor,
        data: getNotify,
    },
  });
