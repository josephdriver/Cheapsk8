import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { STORES_URL } from "../constants/Urls";

export const StoresSlice = createSlice({
  name: "stores",
  initialState: {
    stores: [],
    savedStores: [],
    loading: false,
    error: false,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setStores: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.stores = payload;
      if (state.savedStores.length === 0) {
        state.savedStores = payload.filter((item) => item.isActive === 1);
      }
    },
    setError: (state) => {
      state.error = true;
    },
    setSavedStores: (state, { payload }) => {
      state.savedStores = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, setStores, setError, setSavedStores } =
  StoresSlice.actions;

export default StoresSlice.reducer;

// set up axios - simple json-server prototype config here
const api = axios.create({
  baseURL: STORES_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// fetch stores
export function fetchStores() {
  return async (dispatch) => {
    dispatch(setLoading(true));
    api
      .get()
      .then((response) => {
        dispatch(setStores(response.data));
        dispatch(setLoading(false));
      })
      .catch(() => {
        dispatch(setError());
      });
  };
}