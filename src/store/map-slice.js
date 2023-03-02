import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "map",
  initialState: {
    currentLocation: {
      lat: 3.1577167,
      lng: 101.7121716,
    },
    toggleMap: false,
  },
  reducers: {
    setCurrentLocation(state, action) {
      state.currentLocation = action.payload;
    },
    toggleMapPan(state) {
      state.toggleMap = !state.toggleMap;
    },
  },
});

export default mapSlice.reducer;
export const mapActions = mapSlice.actions;
