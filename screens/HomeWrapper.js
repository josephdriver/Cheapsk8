import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
// import { StyleSheet } from "react-native";
// import { useTheme } from "@rneui/themed";

import Home from "./Home";
import StoreDeals from "./StoreDeals";
import Deal from "./Deal";

function HomeWrapper() {
  //   const { theme } = useTheme();
  const Stack = createStackNavigator();

  const navigatorOptions = {
    cardStyle: { backgroundColor: "transparent" },
    cardStyleInterpolator: ({ current: { progress } }) => ({
      cardStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
      overlayStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
          extrapolate: "clamp",
        }),
      },
    }),
  };

  return (
    <Stack.Navigator screenOptions={navigatorOptions}>
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
      <Stack.Screen name="Deal" component={Deal} />
    </Stack.Navigator>
  );
}

export default HomeWrapper;
