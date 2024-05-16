import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducers/userListReducer';
export const store = configureStore({
  reducer: {
    userData:userSlice
  },
})