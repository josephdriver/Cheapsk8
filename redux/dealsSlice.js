import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DEALS } from "../constants/Urls";
import { parseDeals } from "../utilities/dealsHelpers";

export const DealsSlice = createSlice({
  name: "deals",
  initialState: {
    deals: [],
    content: [],
    offset: null,
    fetchTime: null,
    loading: false,
    error: false,
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setOffset: (state, { payload }) => {
      state.offset = payload;
    },
    setDeals: (state, { payload }) => {
      const { deals, rows } = parseDeals(payload);
      state.deals = deals;
      state.content = rows;
      state.loading = false;
      state.error = false;
      state.fetchTime = new Date().getTime();
    },
    appendDeals: (state, { payload }) => {
      const { deals: newDeals, rows } = parseDeals(payload);

      state.deals = [...state.deals, ...newDeals];
      state.content = [...state.content, ...rows];

      state.loading = false;
      state.error = false;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    clearDeals: (state) => {
      state.deals = [];
      state.content = [];
      state.offset = null;
      state.fetchTime = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLoading,
  setDeals,
  setOffset,
  appendDeals,
  setError,
  clearDeals,
} = DealsSlice.actions;

export default DealsSlice.reducer;

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
    if (append) {
      dispatch(setOffset(params.pageNumber));
    } else {
      dispatch(setOffset(0));
    }
    api
      .get()
      .then((response) => {
        if (append) {
          dispatch(appendDeals(response.data));
        } else {
          dispatch(setDeals(response.data));
        }
      })
      .catch(() => {
        dispatch(setError(true));
        if (append) {
          setOffset(params.pageNumber - 1 > 0 ? params.pageNumber : 0);
        }
      });
  };
}
