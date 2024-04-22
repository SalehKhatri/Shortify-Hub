/* eslint-disable no-unused-vars */
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


export const fetchAllUrls=createAsyncThunk('fetchAllUrls',async ()=>{
  const res = await fetch(`${import.meta.env.VITE_BASE_API_URL}/user/getlinks`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
      });

      return res.json();
})

export const urlSlice = createSlice({
  name:'user',
  initialState:{
    isLoading:false,
    urls:null,
    isError:false,
  },


  reducers:{
    setUrls:(state,action)=>void (state.urls=action.payload)
  },

  extraReducers:(builder)=>{

    builder.addCase(fetchAllUrls.pending,(state,action)=>{
      state.isLoading=true
    })

    builder.addCase(fetchAllUrls.rejected,(state,action)=>{
      console.log("Error",action.payload);
      state.isError=true
    })

    builder.addCase(fetchAllUrls.fulfilled,(state,action)=>{
      state.isLoading=false,
      state.urls=action.payload
    })
  }
})

export const {setUrls}=urlSlice.actions
export const urls=(state)=>state.urls
export default urlSlice.reducer