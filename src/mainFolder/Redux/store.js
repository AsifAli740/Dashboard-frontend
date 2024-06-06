import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "../Redux/slice"

export const store = configureStore({
  reducer: {
    counter : counterReducer
  },
})

