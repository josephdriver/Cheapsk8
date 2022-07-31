import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { STORES_URL } from "../constants/Urls";

export const storesSlice = createSlice({
  name: "stores",
  initialState: {
    items: [],
    loading: false,
    error: false,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setItems: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.items = payload;
    },
    setError: (state) => {
      state.error = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, setItems, setError } = storesSlice.actions;

export default storesSlice.reducer;

// set up axios - simple json-server prototype config here
const api = axios.create({
  baseURL: STORES_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// fetch all items
export function fetchItems() {
  return async (dispatch) => {
    api
      .get()
      .then((response) => {
        dispatch(setItems(response.data));
      })
      .catch((er) => {
        dispatch(setError());
      });
  };
}
