import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DEALS } from "../constants/Urls";
import { parseDeals } from "../utilities/dealsHelpers";

export const DealsSlice = createSlice({
  name: "deals",
  initialState: {
    deals: [],
    content: [],
    fetchTime: null,
    loading: false,
    error: false,
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setDeals: (state, { payload }) => {
      const { deals, rows } = parseDeals(payload);
      state.deals = deals;
      state.content = rows;
      state.fetchTime = new Date().getTime();
      state.loading = false;
      state.error = false;
    },
    appendDeals: (state, { payload }) => {
      console.log("in append");
      const { deals: newDeals, rows } = parseDeals(payload);
      console.log("JERE");
      const { deals } = state.deals;
      const { content } = state.content;

      state.deals = [...state.deals, ...newDeals];
      state.content = [...state.content, ...rows];

      state.loading = false;
      state.error = false;
    },
    setError: (state) => {
      state.error = true;
      state.loading = false;
    },
    clearDeals: (state) => {
      state.deals = [];
      state.dealBlocks = [];
      state.fetchTime = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, setDeals, appendDeals, setError, clearDeals } =
  DealsSlice.actions;

export default DealsSlice.reducer;

// set up axios - simple json-server prototype config here

// fetch stores
export function fetchDeals(params, append = false) {
  const api = axios.create({
    baseURL: DEALS,
    withCredentials: false,
    params,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return async (dispatch) => {
    dispatch(setLoading(true));
    api
      .get()
      .then((response) => {
        if (append) {
          dispatch(appendDeals(response.data));
        } else {
          dispatch(setDeals(response.data));
        }
        dispatch(setLoading(false));
        dispatch(setError(false));
      })
      .catch(() => {
        dispatch(setError(true));
      });
  };
}
