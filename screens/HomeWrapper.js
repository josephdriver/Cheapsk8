import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
// import { StyleSheet } from "react-native";
// import { useTheme } from "@rneui/themed";

import Home from "./Home";
import StoreDeals from "./StoreDeals";

function HomeWrapper() {
  //   const { theme } = useTheme();
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Featured"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StoreDeals"
        component={StoreDeals}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
}

export default HomeWrapper;
