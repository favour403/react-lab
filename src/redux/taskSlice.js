  
   import { createSlice } from "@reduxjs/toolkit";
     
    const initialState = {
        tasks: [
            {id: 1, name: 'Learning React',completed: true},
            {id: 2,name: 'Learning Tailwind',completed: false},
            {id: 3, name: 'Learning Node.js',completed: true}
        ],
    };
       
    const tasksSlice = createSlice ({
        name: 'tasks',
        initialState,
       reducers: {
         addTask: (state,action) => {
         state.tasks.push (action.payload)
        },
        deleteTask: (state,action) => {
        state.tasks = state.tasks.filter (task => task.id !== action.payload);
        },
        toggleTask: (state,action) => {
            const task = state.tasks.find (task => task.id === action.payload);
            if (task){
                task.completed = !task.completed
            }
        }
       }
    });
    export const {addTask,deleteTask,toggleTask} = tasksSlice.actions
    export  default tasksSlice.reducer