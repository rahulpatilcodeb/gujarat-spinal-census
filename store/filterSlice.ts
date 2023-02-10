import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchData: [],
  typeData: null,
  districtData: null,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    searchData: (state, action) => {
      state.searchData = action.payload;
    },
    typeData: (state, action) => {
      state.typeData = action.payload;
    },
    districtData: (state, action) => {
      state.districtData = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
});

export const {searchData, typeData, districtData } =
  filterSlice.actions;

export default filterSlice.reducer;
