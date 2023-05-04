import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "english",
};
export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    currentlng: (state, action) => {
      //   console.log("state,",action.payload);
      state.language = action.payload.language;
    },
  },
});

export const { currentlng } = languageSlice.actions;

export default languageSlice.reducer;
