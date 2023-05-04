import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:null as any,
  islogin:false as boolean,
  token:"" as string,
}

export const userSlice = createSlice({
  name: "users",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.islogin = true;
    },
    logout: (state) => {
      state.user = null
      state.islogin = false;
      state.token="";
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
