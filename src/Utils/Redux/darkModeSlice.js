import { createSlice } from "@reduxjs/toolkit";

export const darkModeSlice=createSlice({
  name:"darkMode",
  initialState:{
    darkMode:true
  },

  reducers:{
    setDarkMode:(state,action)=>void (state.darkMode=action.payload)
  }
})

export const {setDarkMode}=darkModeSlice.actions
export const darkMode=(state)=>state.darkMode.darkMode
export default darkModeSlice.reducer