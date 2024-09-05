// eslint-disable-next-line import/no-extraneous-dependencies
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useCallback, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, useDispatch } from "react-redux";
import { fetchStores } from "../redux/storesSlice";

import HomeWrapper from "./HomeWrapper";
import Settings from "./Settings";
import TabBar from "../components/TabBar";
import FavouritesWrapper from "./FavouritesWrapper";
import { OPTIONS } from "../constants/NavigatorConfig";
import Offline from "./Offline";

function Main() {
  const { isConnected } = useNetInfo();
  const { stores } = useSelector((state) => state.stores);
  const dispatch = useDispatch();
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    if (stores.length === 0) {
      dispatch(fetchStores());
    }
  }, [dispatch, stores]);

  const HomeComponent = useCallback(() => <HomeWrapper />, []);
  const SettingsComponent = useCallback(
    () => <Settings stores={stores} />,
    [stores]
  );

  const WatchListComponent = useCallback(() => <FavouritesWrapper />, []);

  if (isConnected === false) {
    return <Offline />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
          <Tab.Screen name="home" options={OPTIONS} component={HomeComponent} />
          <Tab.Screen
            name="heart"
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
