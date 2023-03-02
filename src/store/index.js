import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./map-slice";
import searchReducer from "./search-slice";

const store = configureStore({
  reducer: {
    map: mapReducer,
    search: searchReducer,
  },
});

export default store;
