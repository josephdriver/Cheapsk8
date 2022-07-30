import React, { useState, useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useThemeMode } from "@rneui/themed";
import { STORES } from "../constants/Urls";
import Home from "./Home";
import useAxiosFetch from "../utilities/useAxiosFetch";
import Settings from "./Settings";
import TabBar from "../components/TabBar";
import Search from "./Search";
import WatchList from "./WatchList";
import { getCache, setCache } from "../utilities/cacheHelpers";

function Main() {
  const { setMode } = useThemeMode();
  const [fetch, setFetch] = useState(false);
  const [stores, setStores] = useState(null);
  const Tab = createBottomTabNavigator();
  const { data } = useAxiosFetch(STORES, 0, fetch, false, false, null);

  // Set dark on app init
  useEffect(() => {
    setMode("dark");
  }, [setMode]);

  const HomeComponent = useCallback(() => <Home setStores={setStores} />, []);
  const SettingsComponent = useCallback(
    () => <Settings stores={stores} />,
    [stores]
  );

  const SearchComponent = useCallback(() => <Search />, []);
  const WatchListComponent = useCallback(() => <WatchList />, []);

  // Retrieve cached stores or trigger request if no @stores cache exists
  useEffect(() => {
    if (!stores) {
      getCache("@stores", setStores, setFetch, true);
    }
  }, [stores]);

  // Handle request and add stores to cache
  useEffect(() => {
    if (data) {
      setFetch(false);
      setCache("@stores", data, setStores);
    }
  }, [data]);

  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen
          name="home"
          options={{ headerShown: false }}
          component={HomeComponent}
        />
        <Tab.Screen
          name="search"
          options={{ headerShown: false }}
          component={SearchComponent}
        />
        <Tab.Screen
          name="binoculars"
          options={{ headerShown: false }}
          component={WatchListComponent}
        />
        <Tab.Screen
          name="cog"
          options={{ headerShown: false }}
          component={SettingsComponent}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Main;
