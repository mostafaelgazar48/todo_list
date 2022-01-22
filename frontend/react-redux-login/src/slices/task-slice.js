  import {createSlice}  from '@reduxjs/toolkit';


  const initialState = {};

  const taskSlice = createSlice({
    name:"tasks",
    initialState,
    reducers:{
      getTasks:(state,action)=>{
        return { tasks:action.payload}
      },
      clearTasks:()=>{
          return {tasks:{}}
      }
    }
  })


  const {actions,reducer} = taskSlice;
  export const {getTasks,clearTasks} =actions;
  export default reducer;
