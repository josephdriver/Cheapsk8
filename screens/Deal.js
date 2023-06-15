/* eslint-disable react/prop-types */
import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme, Text } from "@rneui/themed";

function Deal({ route }) {
  const { deal } = route.params;
  const { theme } = useTheme();

  return (
    <View>
      <Text>test</Text>
    </View>
  );
}

export default Deal;
