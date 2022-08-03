/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SearchBar, Button, useThemeMode, useTheme } from "@rneui/themed";
import { fetchDeals } from "../redux/dealsSlice";
import { HOME_FILTER, DELIM_ID } from "../constants/Urls";
import DEFAULT_STORES from "../constants/Defaults";

import ContentBlock from "../components/ContentBlock";

function Home() {
  const [search, setSearch] = useState("");
  const { mode, setMode } = useThemeMode();
  const { theme } = useTheme();
  const { deals } = useSelector((state) => state.deals);
  const { stores, savedStores } = useSelector((state) => state.stores);
  const dispatch = useDispatch();

  const updateSearch = (e) => {
    setSearch(e);
  };

  const getUrlArray = useCallback(() => {
    let storesArray = savedStores;

    if (savedStores.length === 0) {
      storesArray = DEFAULT_STORES;
    }

    const urlArray = [];
    let count = 0;
    storesArray.map((item) => {
      if (count < 10 && item.isActive === 1) {
        urlArray.push(HOME_FILTER.replace(DELIM_ID, item.storeID));
        count += 1;
      }
      return item;
    });

    return urlArray;
  }, [savedStores]);

  useEffect(() => {
    if (deals.length === 0) {
      dispatch(fetchDeals(getUrlArray()));
    }
  }, [deals, getUrlArray, dispatch]);

  return (
    <View style={[styles.view, { backgroundColor: theme.colors.grey5 }]}>
      <ScrollView>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={(e) => updateSearch(e)}
          value={search}
          round={2}
          containerStyle={{
            backgroundColor: theme.colors.grey5,
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
          }}
        />
        <ContentBlock deals={deals} savedStores={savedStores} stores={stores} />
        <Button
          title={`Toggle Theme ${mode}`}
          onPress={() => setMode(mode === "dark" ? "light" : "dark")}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    height: "100%",
  },
  image: {
    flex: 1,
    alignSelf: "center",
  },
});

export default Home;
