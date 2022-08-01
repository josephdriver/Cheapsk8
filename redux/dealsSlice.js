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
    setError: (state) => {
      state.error = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, setDeals, setError, setSavedStores } =
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
