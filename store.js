/* eslint-disable import/no-named-as-default */
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StoresSlice from "./redux/storesSlice";
import DealsSlice from "./redux/dealsSlice";
import FavouritesSlice from "./redux/favouritesSlice";
import UserSlice from "./redux/userSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  user: UserSlice,
  stores: StoresSlice,
  deals: DealsSlice,
  favourites: FavouritesSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
