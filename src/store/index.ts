import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import linksReducer from '../features/linksSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    links: linksReducer
  },
})

export default store
export type AppDispatch = typeof store.dispatch