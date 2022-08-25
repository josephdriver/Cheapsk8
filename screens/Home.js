/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SearchBar, useTheme, Text, Button } from "@rneui/themed";
import { fetchDeals, clearDeals } from "../redux/dealsSlice";
import { HOME_FILTER, DELIM_ID } from "../constants/Urls";
import DEFAULT_STORES from "../constants/Defaults";
import dealsCache from "../constants/CacheTimers";
import ContentBlock from "../components/ContentBlock";

function Home() {
  const [search, setSearch] = useState("");

  const { theme } = useTheme();
  const { deals, fetchTime, loading } = useSelector((state) => state.deals);
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
    const time = new Date();
    console.log(deals);
    if (deals.length === 0 || fetchTime + dealsCache < time.getTime()) {
      console.log("In here");
      dispatch(fetchDeals(getUrlArray()));
    }
  }, [deals, fetchTime, getUrlArray, dispatch]);

  if (loading) {
    return (
      <View
        style={{
          height: "100%",
          justifyContent: "space-around",
          backgroundColor: theme.colors.grey5,
        }}
      >
        <View style={{ width: "100%" }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={{ alignSelf: "center" }}>
            Getting the latest deals... Hold tight!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.view, { backgroundColor: theme.colors.grey5 }]}>
      <Button onPress={() => dispatch(clearDeals())}>Clear Deals</Button>
      <SearchBar
        placeholder="Find a game"
        onChangeText={(e) => updateSearch(e)}
        value={search}
        round={2}
        containerStyle={{
          backgroundColor: theme.colors.grey5,
          borderBottomColor: "transparent",
          borderTopColor: "transparent",
        }}
      />
      <ContentBlock
        deals={deals}
        savedStores={savedStores}
        stores={stores}
        loading={loading}
      />
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
