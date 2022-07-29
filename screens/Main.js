import React, { useState, useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useThemeMode } from "@rneui/themed";
import Home from "./Home";
import Settings from "./Settings";
import { STORES } from "../constants/Urls";
import useAxiosFetch from "../utilities/useAxiosFetch";

function Main() {
  const { setMode } = useThemeMode();
  const [fetch, setFetch] = useState(false);
  const [stores, setStores] = useState(null);
  const [favoriteStores, setFavoriteStores] = useState(null);
  const [ignoredStores, setIgnoredStores] = useState(null);
  const Tab = createBottomTabNavigator();
  const { data } = useAxiosFetch(STORES, 0, fetch, false, false, null);

  useEffect(() => {
    setMode("dark");
  }, [setMode]);

  const HomeComponent = useCallback(
    () => <Home setStores={setStores} setFavoriteStores={setFavoriteStores} />,
    []
  );
  const SettingsComponent = useCallback(
    () => (
      <Settings
        stores={stores}
        favoriteStores={favoriteStores}
        setFavoriteStores={setFavoriteStores}
        ignoredStores={ignoredStores}
        setIgnoredStores={setIgnoredStores}
      />
    ),
    [stores, favoriteStores, ignoredStores]
  );

  // Check for cached stores data
  // If none exists check if an API has already been called for data
  // Finally call API to fetch stores data if necessary
  useEffect(() => {
    async function getCachedStores() {
      const result = await AsyncStorage.getItem("@stores").then((res) => res);
      if (result) {
        return setStores(JSON.parse(result));
      }

      if (data) {
        await AsyncStorage.setItem("@stores", JSON.stringify(data)).then(
          (res) => res
        );
        setStores(data);
      }
      return setFetch(true);
    }

    if (!stores) {
      getCachedStores();
    }
  }, [stores, data]);

  useEffect(() => {
    async function setCachedStores() {
      const result = await AsyncStorage.setItem(
        "@stores",
        JSON.stringify(data)
      ).then((res) => res);
      return result;
    }

    if (data) {
      setFetch(false);
      setCachedStores();
    }
  }, [data]);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeComponent} />
        <Tab.Screen name="Search" component={Settings} />
        <Tab.Screen name="Watchlist" component={Settings} />
        <Tab.Screen name="Settings" component={SettingsComponent} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Main;
