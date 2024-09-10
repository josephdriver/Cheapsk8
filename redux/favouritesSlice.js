import { createSlice } from "@reduxjs/toolkit";

export const FavouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
    fetchTime: null,
    lastVisited: null,
    loading: false,
    error: false,
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setLastVisited: (state, { payload }) => {
      state.offset = payload;
    },
    setFavourites: (state, { payload }) => {
      state.favourites = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    clearFavourites: (state) => {
      state.favourites = [];
      state.lastVisited = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, setFavourites, setLastVisited, setError } =
  FavouritesSlice.actions;

export default FavouritesSlice.reducer;
