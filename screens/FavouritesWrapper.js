import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { OPTIONS, NAVIGATOR_OPTIONS } from "../constants/NavigatorConfig";
import Game from "./Game";
import WebViewWrapper from "../components/WebViewWrapper";
import WatchList from "./WatchList";

function FavouritesWrapper() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={NAVIGATOR_OPTIONS}>
      <Stack.Screen name="WatchList" component={WatchList} options={OPTIONS} />
      <Stack.Screen name="Deal" component={Game} options={OPTIONS} />
      <Stack.Screen
        name="WebView"
        component={WebViewWrapper}
        options={OPTIONS}
      />
    </Stack.Navigator>
  );
}

export default FavouritesWrapper;
