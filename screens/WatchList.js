import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@rneui/themed";
import { useSelector } from "react-redux";

import SearchableFlatList from "../components/shared/SearchableFlatList";
import ListItem from "../components/favourites/ListItem";

function WatchList({ navigation }) {
  const { favourites } = useSelector((state) => state.favourites);
  const { theme } = useTheme();

  const [inputValue, setInputValue] = useState("");

  const handleDealNavigate = useCallback(
    (item) => {
      const deal = {
        gameID: item.gameID,
        steamAppID: item.info.steamAppID,
        external: item.info.title,
        thumb: item.info.thumb,
        cheapest: item.deals[0].price,
      };

      navigation.navigate("Deal", { deal });
    },
    [navigation]
  );

  return (
    <View style={[styles.view, { backgroundColor: theme.colors.grey5 }]}>
      <SearchableFlatList
        autoFocus={false}
        inputValue={inputValue}
        data={favourites}
        handleDealNavigate={handleDealNavigate}
        handleInputChange={setInputValue}
        ListItem={ListItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    border: "none",
    height: "100%",
  },
});
export default WatchList;
