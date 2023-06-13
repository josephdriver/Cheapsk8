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
      <Stack.Screen name="Featured" component={Home} />
      <Stack.Screen
        name="StoreDeals"
        component={StoreDeals}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
}
// const styles = StyleSheet.create({
//   view: {
//     border: "none",
//     height: "100%",
//   },
// });
export default HomeWrapper;
