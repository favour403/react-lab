 import { configureStore } from "@reduxjs/toolkit";
 import taskReducers from '../redux/taskSlice'

 export  const store = configureStore ({
    reducer: {
        tasks: taskReducers
    }
  })