import { configureStore } from '@reduxjs/toolkit'
import LoadingReducer from './loadingSlice'
import UrlsReducer from './urlSlice'
import darkModeReducer from './darkModeSlice'
export default configureStore({
  reducer: {
    loader:LoadingReducer,
    urls:UrlsReducer,
    darkMode:darkModeReducer
  }
})

