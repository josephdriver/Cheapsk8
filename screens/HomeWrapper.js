import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { OPTIONS, NAVIGATOR_OPTIONS } from "../constants/NavigatorConfig";
import Home from "./Home";
import Game from "./Game";
import WebViewWrapper from "../components/WebViewWrapper";
import Search from "./Search";

function HomeWrapper() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={NAVIGATOR_OPTIONS}>
      <Stack.Screen name="Featured" component={Home} options={OPTIONS} />
      <Stack.Screen name="Deal" component={Game} options={OPTIONS} />
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
