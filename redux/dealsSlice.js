import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
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
      const date = new Date();

      state.deals = payload.deals;
      state.content = payload.rows;
      state.fetchTime = date.getTime();
      state.loading = false;
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
export const { setLoading, setDeals, setError, clearDeals } =
  DealsSlice.actions;

export default DealsSlice.reducer;
