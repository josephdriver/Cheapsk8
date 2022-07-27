import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Settings from "./Settings";

function Main({ storeOne, storeTwo, storeThree, storeFour }) {
  const HomeComponent = useCallback(
    () => <Home favoritesData={[storeOne, storeTwo, storeThree, storeFour]} />,
    [storeOne, storeTwo, storeThree, storeFour]
  );
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeComponent} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Main;
