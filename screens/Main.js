import React, { useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useThemeMode } from "@rneui/themed";
import { useSelector, useDispatch } from "react-redux";
import { fetchStores } from "../redux/storesSlice";

import HomeWrapper from "./HomeWrapper";
import Settings from "./Settings";
import TabBar from "../components/TabBar";
import Search from "./Search";
import WatchList from "./WatchList";

function Main() {
  const { stores } = useSelector((state) => state.stores);
  const dispatch = useDispatch();
  const { setMode } = useThemeMode();
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    if (stores.length === 0) {
      dispatch(fetchStores());
    }
  }, [dispatch, stores]);

  // Set dark on app init
  useEffect(() => {
    setMode("dark");
  }, [setMode]);

  const HomeComponent = useCallback(() => <HomeWrapper />, []);
  const SettingsComponent = useCallback(
    () => <Settings stores={stores} />,
    [stores]
  );

  const SearchComponent = useCallback(() => <Search />, []);
  const WatchListComponent = useCallback(() => <WatchList />, []);

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
