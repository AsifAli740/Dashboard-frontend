import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    state : false,
    message : null,
    severity: null


  }
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state,action) => {
      state.value.state = action.payload .state
      state.value.message = action.payload.message
      state.value.severity = action.payload.severity


    },
    // decrement: (state,action) => {
    //   state.value = action.payload
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer