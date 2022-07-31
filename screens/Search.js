import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "@rneui/themed";

function Search() {
  const { theme } = useTheme();
  return (
    <View style={[styles.view, { backgroundColor: theme.colors.grey5 }]}>
      <Text>Search</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    border: "none",
    height: "100%",
  },
});
export default Search;
