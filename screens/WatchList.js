import React from "react";
import { View, ScrollView } from "react-native";
import { useTheme, Text } from "@rneui/themed";

function WatchList() {
  const { theme } = useTheme();
  return (
    <View style={{ height: "100%", backgroundColor: theme.colors.grey5 }}>
      <ScrollView>
        <Text>Watchlist</Text>
      </ScrollView>
    </View>
  );
}
export default WatchList;
