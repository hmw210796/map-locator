import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchList",
  initialState: {
    list: [],
    listOpen: false,
    error: { isError: false, message: "" },
  },
  reducers: {
    replaceList(state, action) {
      state.list = action.payload;
    },
    addToList(state, action) {
      if (
        state.list.findIndex((item) => item.name === action.payload.name) >= 0
      ) {
        return;
      } else {
        state.list.push(action.payload);
        localStorage.setItem("searchList", JSON.stringify(state.list));
      }
    },
    removeFromList(state, action) {
      state.list = state.list.filter((item) => item.id !== action.payload);
      localStorage.setItem("searchList", JSON.stringify(state.list));
    },
    toggleList(state, action) {
      state.listOpen = !state.listOpen;
    },
    toggleError(state, action) {
      state.error.isError = !state.error.isError;
      state.error.message = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const searchActions = searchSlice.actions;
