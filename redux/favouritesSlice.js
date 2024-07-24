import { createSlice } from "@reduxjs/toolkit";

export const FavouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
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

// fetch stores
// export function fetchDeals(params, append = false) {
//   const api = axios.create({
//     baseURL: DEALS,
//     withCredentials: false,
//     params,
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   });

//   return async (dispatch) => {
//     dispatch(setLoading(true));
//     if (append) {
//       dispatch(setOffset(params.pageNumber));
//     } else {
//       dispatch(setOffset(0));
//     }
//     api
//       .get()
//       .then((response) => {
//         if (append) {
//           dispatch(appendDeals(response.data));
//         } else {
//           dispatch(setDeals(response.data));
//         }
//       })
//       .catch(() => {
//         dispatch(setError(true));
//         if (append) {
//           setOffset(params.pageNumber - 1 > 0 ? params.pageNumber : 0);
//         }
//       });
//   };
// }
