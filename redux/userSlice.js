import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: false,
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setUser: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.user = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { setLoading, setUser, setError } = UserSlice.actions;
export default UserSlice.reducer;
