/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useCallback, useMemo } from "react";
import analytics from "@react-native-firebase/analytics";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import SearchableFlatList from "../components/shared/SearchableFlatList";
import ListItem from "../components/favourites/ListItem";
import EmptyList from "../components/shared/EmptyList";
import { BACKGROUND_PRIMARY } from "../constants/Colours";

function WatchList({ navigation }) {
  const { favourites } = useSelector((state) => state.favourites);
  const message = useMemo(
    () =>
      "You have not watch listed any games yet. Search for Titles on the Home screen and add them to your watch list.",
    []
  );

  const [inputValue, setInputValue] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      analytics().logScreenView({
        screen_name: "Watchlist",
        screen_class: "Watchlist",
      });
    }, [])
  );

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
    <View style={styles.view}>
      <SearchableFlatList
        autoFocus={false}
        inputValue={inputValue}
        data={favourites}
        handleDealNavigate={handleDealNavigate}
        handleInputChange={setInputValue}
        ListItem={ListItem}
        ListEmptyComponent={<EmptyList message={message} />}
        isSearchable={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    border: "none",
    height: "100%",
    backgroundColor: BACKGROUND_PRIMARY,
  },
});
export default WatchList;
