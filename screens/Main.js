import React, { useCallback, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useThemeMode } from "@rneui/themed";
import { useSelector, useDispatch } from "react-redux";
import { fetchStores } from "../redux/storesSlice";

import HomeWrapper from "./HomeWrapper";
import Settings from "./Settings";
import TabBar from "../components/TabBar";
import WatchList from "./WatchList";
import { OPTIONS } from "../constants/NavigatorConfig";

function Main() {
  const { stores } = useSelector((state) => state.stores);
  const dispatch = useDispatch();
  const { mode, setMode } = useThemeMode();
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    if (stores.length === 0) {
      dispatch(fetchStores());
    }
  }, [dispatch, stores]);

  // Set dark on app init
  useEffect(() => {
    if (mode === "light") {
      setMode("dark");
    }
  }, [mode, setMode]);

  const HomeComponent = useCallback(() => <HomeWrapper />, []);
  const SettingsComponent = useCallback(
    () => <Settings stores={stores} />,
    [stores]
  );

  const WatchListComponent = useCallback(() => <WatchList />, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
          <Tab.Screen name="home" options={OPTIONS} component={HomeComponent} />
          <Tab.Screen
            name="binoculars"
            component={WatchListComponent}
            options={OPTIONS}
          />
          <Tab.Screen
            name="cog"
            options={OPTIONS}
            component={SettingsComponent}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default Main;
