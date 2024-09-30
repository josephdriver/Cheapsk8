import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import firestore from "@react-native-firebase/firestore";

import { GAMES } from "../constants/Urls";
import { HEADERS } from "../constants/Defaults";
import { getAlertTime, getGameReferenceValues } from "../utilities/dealAlerts";

const updateFavourites = (data, favourites) => {
  const fetchTime = new Date().getTime();
  const updatedFavourites = [];

  Object.keys(data).forEach((key) => {
    const existing = favourites.find((f) => f.gameId === key);

    const game = data[key];

    const { highestPercent, lowestPrice, lowestStoreId } =
      getGameReferenceValues(game.deals);

    const updated = {
      gameId: key,
      title: game.info.title,
      thumb: game.info.thumb,
      steamId: game.info.steamAppID,
      alertLevel: existing.alertLevel,
      dealCount: game.deals.length,
      lowestStoreId,
      highestPercent,
      lowestPrice,
      lowestPriceEver: game.cheapestPriceEver.price,
      lowestPriceEverDate: game.cheapestPriceEver.date,
      fetchTime,
      lastSeen: existing ? existing.lastSeen : null,
      alertTime: getAlertTime(
        lowestPrice,
        game.cheapestPriceEver.price,
        highestPercent,
        existing.alertTime,
        existing.alertLevel
      ),
    };

    updatedFavourites.push(updated);
  });

  return updatedFavourites;
};

export const FavouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
    alertState: false,
    loading: false,
    error: false,
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
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
    },
    setAlertState: (state, { payload }) => {
      state.alertState = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLoading,
  setFavourites,
  setLastVisited,
  setError,
  setAlertState,
} = FavouritesSlice.actions;

export default FavouritesSlice.reducer;

// fetch stores
export function fetchWatchList(ids, favourites, user) {
  const params = { ids: ids.join(",") };

  const api = axios.create({
    baseURL: GAMES,
    withCredentials: false,
    params,
    headers: HEADERS,
  });

  return async (dispatch) => {
    dispatch(setLoading(true));
    api
      .get()
      .then((response) => {
        const updatedFavourites = updateFavourites(response.data, favourites);
        dispatch(setFavourites(updatedFavourites));
        firestore().collection("watchLists").doc(user.uid).set({
          favourites: updatedFavourites,
        });
        dispatch(setLoading(false));
      })
      .catch(() => {
        dispatch(setError(true));
        dispatch(setLoading(false));
      });
  };
}
