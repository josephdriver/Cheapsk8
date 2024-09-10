import { createSlice } from "@reduxjs/toolkit";

export const SettingsSlice = createSlice({
  name: "settings",
  initialState: {
    enablePushNotifications: false,
  },
  reducers: {
    setEnablePushNotifications: (state, { payload }) => {
      state.enablePushNotifications = payload;
    },
  },
});

export const { setLoading, setUser, setError } = SettingsSlice.actions;
export default SettingsSlice.reducer;
