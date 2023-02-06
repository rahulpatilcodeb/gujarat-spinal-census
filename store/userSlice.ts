import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:null as any,
  islogin:false as boolean
  // token:"" as string
}

export const userSlice = createSlice({
  name: 'users',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state,action) => {
      // console.log("this is slice:",action);
      // console.log(action)
      // state.token = action.payload.token;
      state.user = action.payload
      state.islogin = true;
    },
    // logout: (state) => {
    //   state.user = null
    //   state.islogin = false;
    // },
    // Use the PayloadAction type to declare the contents of `action.payload`
    
  },
})

export const { login} = userSlice.actions


export default userSlice.reducer