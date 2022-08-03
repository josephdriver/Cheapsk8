import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const DealsSlice = createSlice({
  name: "deals",
  initialState: {
    deals: [],
    fetchTime: null,
    loading: false,
    error: false,
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setDeals: (state, { payload }) => {
      console.log(payload);
      const deals = [];
      payload.map((collection) => {
        if (collection.value.data.length > 0) {
          const storeObj = {
            storeID: collection.value.data[0].storeID,
            data: collection.value.data,
          };
          deals.push(storeObj);
        }
        return collection;
      });

      const date = new Date();

      state.deals = deals;
      state.fetchTime = date.getTime();
    },
    addDeal: (state, { payload }) => {
      const newDeals = [];
      const { response, deals } = payload;
      const { storeID } = response[0];
      const data = response;

      deals.map((item) => newDeals.push(item));
      newDeals.push({ storeID, data });
      state.deals = newDeals;
    },
    setError: (state) => {
      state.error = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, setDeals, addDeal, setError, setSavedStores } =
  DealsSlice.actions;

export default DealsSlice.reducer;

Promise.allSettled =
  Promise.allSettled ||
  ((promises) =>
    Promise.all(
      promises.map((p) =>
        p
          .then((value) => ({
            status: "fulfilled",
            value,
          }))
          .catch((reason) => ({
            status: "rejected",
            reason,
          }))
      )
    ));

export function fetchDeals(apiUrlArray) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const result = await Promise.allSettled(
      apiUrlArray.map((apiUrl) => axios.get(apiUrl))
    )
      .then((res) => res)
      .catch(() => {
        dispatch(setError());
      });
    dispatch(setDeals(result));
    dispatch(setLoading(false));
  };
}

// set up axios - simple json-server prototype config here
const initApi = (url) =>
  axios.create({
    baseURL: url,
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

// fetch stores
export function fetchDeal(url, deals) {
  const api = initApi(url);
  return async (dispatch) => {
    dispatch(setLoading(true));
    api
      .get()
      .then((response) => {
        dispatch(addDeal({ response: response.data, deals }));
        dispatch(setLoading(false));
      })
      .catch(() => {
        dispatch(setError());
      });
  };
}
