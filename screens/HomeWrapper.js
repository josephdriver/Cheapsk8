import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
// import { StyleSheet } from "react-native";
// import { useTheme } from "@rneui/themed";

import { OPTIONS } from "../constants/NavigatorConfig";
import Home from "./Home";
import Deal from "./Deal";
import WebViewWrapper from "../components/WebViewWrapper";
import Search from "./Search";

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
    }),
  };

  return (
    <Stack.Navigator screenOptions={navigatorOptions}>
      <Stack.Screen
        name="Featured"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Deal" component={Deal} options={OPTIONS} />
      <Stack.Screen name="Search" component={Search} options={OPTIONS} />
      <Stack.Screen
        name="WebView"
        component={WebViewWrapper}
        options={OPTIONS}
      />
    </Stack.Navigator>
  );
}

export default HomeWrapper;
